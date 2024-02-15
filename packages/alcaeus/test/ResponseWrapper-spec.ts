import { EventEmitter } from 'events'
import { Stream } from '@rdfjs/types'
import sinon from 'sinon'
import { expect } from 'chai'
import SinkMap from '@rdfjs/sink-map'
import ResponseWrapper from '../ResponseWrapper.js'
import { Bodies } from './test-objects/index.js'
import { responseBuilder } from './test-utils.js'

describe('ResponseWrapper', () => {
  let parsers: SinkMap<EventEmitter, Stream>

  beforeEach(() => {
    parsers = new SinkMap<EventEmitter, Stream>()
  })

  describe('apiDocumentationLink', () => {
    it('should get absolute link', async () => {
      // given
      const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).apiDocumentation().build({
        url: 'http://resources.example.com/',
      })

      // when
      const res = new ResponseWrapper('http://resources.example.com/', xhrResponse, parsers)

      // then
      expect(res.apiDocumentationLink).to.eq('http://api.example.com/doc/')
    })

    it('should get relative link', async () => {
      // given
      const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).apiDocumentation('doc/').build({
        url: 'http://api.example.com/resource/',
      })

      // when
      const res = new ResponseWrapper('http://api.example.com/resource/', xhrResponse, parsers)

      // then
      expect(res.apiDocumentationLink).to.eq('http://api.example.com/resource/doc/')
    })

    it('should base relative link on redirect target', async () => {
      // given
      const xhrResponse = {
        headers: {
          get: () => '</api-doc>; rel=http://www.w3.org/ns/hydra/core#apiDocumentation',
          has: () => true,
        },
        redirected: true,
        url: 'http://other.example.api',
      } as any
      xhrResponse.clone = () => xhrResponse

      // when
      const res = new ResponseWrapper('http://api.example.com/resorce/', xhrResponse, parsers)

      // then
      expect(res.apiDocumentationLink).to.eq('http://other.example.api/api-doc')
    })
  })

  describe('redirectUrl', () => {
    it('should get redirect URL if redirected', async () => {
      // given
      const xhrResponse = {
        redirected: true,
        url: 'urn:actual:resource',
      } as Response
      xhrResponse.clone = () => xhrResponse

      // when
      const res = new ResponseWrapper('', xhrResponse, parsers)

      // then
      expect(res.redirectUrl).to.eq('urn:actual:resource')
    })
  })

  describe('resolveUri', () => {
    it('returns absolute URL unchanged', () => {
      // given
      const xhrResponse = {
      } as any
      const wrapper = new ResponseWrapper('http://api.example.com/resource/', xhrResponse, parsers)

      // when
      const resolved = wrapper.resolveUri('http://localhost:9876/whatever')

      // then
      expect(resolved).to.eq('http://localhost:9876/whatever')
    })

    it('returns absolute URL resolved to request base', () => {
      // given
      const xhrResponse = {
        url: 'http://localhost:9876/to-strip',
      } as any
      const wrapper = new ResponseWrapper('http://localhost:9876/to-strip', xhrResponse, parsers)

      // when
      const resolved = wrapper.resolveUri('/whatever')

      // then
      expect(resolved).to.eq('http://localhost:9876/whatever')
    })

    it('uses response URL to resolve relative reference', () => {
      // given
      const xhrResponse = {
        url: 'http://localhost:9876/to-strip',
      } as any
      const wrapper = new ResponseWrapper('/to-strip', xhrResponse, parsers)

      // when
      const resolved = wrapper.resolveUri('/whatever')

      // then
      expect(resolved).to.eq('http://localhost:9876/whatever')
    })

    it('returns absolute URL resolved to redirected url', () => {
      // given
      const xhrResponse = {
        redirected: true,
        url: 'http://localhost:1234/base/',
      } as any
      const wrapper = new ResponseWrapper('http://localhost:9876/resource', xhrResponse, parsers)

      // when
      const resolved = wrapper.resolveUri('whatever')

      // then
      expect(resolved).to.eq('http://localhost:1234/base/whatever')
    })
  })

  describe('requestUri', () => {
    it('returns the original value', () => {
      const originalUri = 'foo-bar'
      const response = new ResponseWrapper(originalUri, new Response(), parsers)

      // when
      const requestUri = response.requestedUri

      // then
      expect(requestUri).to.eq(originalUri)
    })
  })

  describe('quadStream', () => {
    it('should parse response when media type has additional parameters', async () => {
      // given
      const xhrResponse = await responseBuilder()
        .body(Bodies.someJsonLd, 'application/ld+json; charset=utf-8')
        .build()
      const parser = {
        import: sinon.spy(),
      }
      parsers.set('application/ld+json', parser)
      const response = new ResponseWrapper('', xhrResponse, parsers)

      // when
      await response.quadStream()

      // then
      expect(parser.import.calledOnce).to.be.ok
    })

    it('should apply effectiveUri as baseIRI parser option', async () => {
      // given
      const xhrResponse = {
        url: 'http://example.com/res',
        headers: new Headers({
          'content-type': 'application/ld+json',
        }),
      } as Response
      const parser = {
        import: sinon.stub(),
      }
      parsers.set('application/ld+json', parser)
      const response = new ResponseWrapper('http://example.com/res', xhrResponse, parsers)

      // when
      await response.quadStream()

      // then
      expect(parser.import).to.have.been.calledWith(
        sinon.match.any,
        sinon.match({
          baseIRI: 'http://example.com/res',
        }),
      )
    })

    it('should apply redirected Uri as baseIRI parser option', async () => {
      // given
      const xhrResponse = {
        redirected: true,
        url: 'http://example.com/redir',
        headers: new Headers({
          'content-type': 'application/ld+json',
        }),
      } as Response
      const parser = {
        import: sinon.stub(),
      }
      parsers.set('application/ld+json', parser)
      const response = new ResponseWrapper('', xhrResponse, parsers)

      // when
      await response.quadStream()

      // then
      expect(parser.import).to.have.been.calledWith(
        sinon.match.any,
        sinon.match({
          baseIRI: 'http://example.com/redir',
        }),
      )
    })

    it('should parse plain JSON as LD when context link is present', async () => {
      // given
      const xhrResponse = {
        redirected: true,
        url: 'http://example.com/redir',
        headers: new Headers({
          'content-type': 'application/json',
          link: '<https://www.w3.org/ns/hydra/error>; rel="http://www.w3.org/ns/json-ld#context"',
        }),
      } as Response
      const parser = {
        import: sinon.stub(),
      }
      parsers.set('application/ld+json', parser)
      const response = new ResponseWrapper('', xhrResponse, parsers)

      // when
      await response.quadStream()

      // then
      expect(parser.import).to.have.been.called
    })

    it('should parse with given JSON-LD context', async () => {
      // given
      const xhrResponse = {
        redirected: true,
        url: 'http://example.com/redir',
        headers: new Headers({
          'content-type': 'application/ld+json',
        }),
      } as Response
      const parser = {
        import: sinon.stub(),
      }
      parsers.set('application/ld+json', parser)
      const context = {}
      const response = new ResponseWrapper('', xhrResponse, parsers, context)

      // when
      await response.quadStream()

      // then
      expect(parser.import).to.have.been.calledWith(
        sinon.match.any,
        sinon.match({
          context,
        }),
      )
    })
  })

  describe('resourceUri', () => {
    it('should select resource with canonical id if original is not present', async () => {
      // given
      const redirectUri = 'http://example.com/canonical'

      const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).canonical(redirectUri).build({
        url: 'http://example.com/original',
      })
      const response = new ResponseWrapper('http://example.com/original', xhrResponse, parsers)

      // when
      const value = response.resourceUri

      // then
      expect(value).to.eq('http://example.com/canonical')
    })

    describe('when canonical link header is set', () => {
      it('should equal link value', async () => {
        // given
        const xhrResponse = await responseBuilder()
          .canonical('http://example.com/canonical')
          .build({ url: 'http://example.com/original' })
        const response = new ResponseWrapper('http://example.com/original', xhrResponse, parsers)

        // when
        const value = response.resourceUri

        // then
        expect(value).to.eq('http://example.com/canonical')
      })
    })

    describe('when location header is set', () => {
      it('should select the resource with id matching location header', async () => {
        // given
        const xhrResponse = await responseBuilder()
          .header('Location', 'http://example.com/the-real-id')
          .statusCode(201)
          .build({ url: 'http://example.com/original' })
        const response = new ResponseWrapper('http://example.com/original', xhrResponse, parsers)

        // when
        const value = response.resourceUri

        // then
        expect(value).to.eq('http://example.com/the-real-id')
      })

      it('should not select the resource when status is not 201', async () => {
        // given
        const xhrResponse = await responseBuilder()
          .header('Location', 'http://example.com/the-real-id')
          .build({ url: 'http://example.com/original' })
        const response = new ResponseWrapper('http://example.com/original', xhrResponse, parsers)

        // when
        const value = response.resourceUri

        // then
        expect(value).to.eq('http://example.com/original')
      })
    })
  })
})

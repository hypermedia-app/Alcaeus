import { EventEmitter } from 'events'
import { Sink, Stream } from '@rdfjs/types'
import SinkMap from '@rdfjs/sink-map'
import { expect } from 'chai'
import sinon from 'sinon'
import FetchUtil from '../FetchUtil.js'
import { Bodies } from './test-objects/index.js'
import { responseBuilder } from './test-utils.js'
import 'isomorphic-form-data'

describe('FetchUtil', () => {
  let mockFetch: sinon.SinonStub
  let fetchUtil: ReturnType<typeof FetchUtil>
  const parsers = new SinkMap<EventEmitter, Stream>()

  beforeEach(() => {
    mockFetch = sinon.stub()
    fetchUtil = FetchUtil(mockFetch, Headers)
  })

  before(() => {
    const dummyParser: Sink<EventEmitter, Stream> = {} as any

    parsers.set('application/ld+json', dummyParser)
    parsers.set('application/n-triples', dummyParser)
    parsers.set('application/n-quads', dummyParser)
  })

  describe('resource', () => {
    it('should load resource with RDF accept header', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.resource('http://example.com/resource', { parsers })

      // then
      expect(mockFetch)
        .to.have.been.calledWith(sinon.match.any, sinon.match({
          headers: new Headers({
            accept: 'application/ld+json, application/n-triples, application/n-quads',
          }),
        }))
    })

    it('should append provided headers to the default', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.resource('http://example.com/resource', {
        parsers,
        headers: {
          'x-foo': 'bar',
        },
      })

      // then
      expect(mockFetch)
        .to.have.been.calledWith(sinon.match.any, sinon.match({
          headers: new Headers({
            'x-foo': 'bar',
            accept: 'application/ld+json, application/n-triples, application/n-quads',
          }),
        }))
    })

    it('should not alter accept header if other headers added', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.resource('http://example.com/resource', {
        parsers,
        headers: {
          'x-foo': 'bar',
        },
      })

      // then
      expect(mockFetch)
        .to.have.been.calledWith(sinon.match.any, sinon.match({
          headers: new Headers({
            accept: 'application/ld+json, application/n-triples, application/n-quads',
            'x-foo': 'bar',
          }),
        }))
    })

    it('should replace default accept header', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.resource('http://example.com/resource', {
        parsers,
        headers: {
          accept: 'application/vnd.custom+rdf',
        },
      })

      // then
      expect(mockFetch)
        .to.have.been.calledWith(sinon.match.any, sinon.match({
          headers: new Headers({
            accept: 'application/vnd.custom+rdf',
          }),
        }))
    })

    it('should fetch linked JSON-LD context', async () => {
      // given
      mockFetch.onFirstCall().returns(
        responseBuilder()
          .body(Bodies.someJsonLd)
          .link('https://www.w3.org/ns/hydra/error', 'http://www.w3.org/ns/json-ld#context')
          .build(),
      )
      const context = {
        foo: 'bar',
      }
      mockFetch.onSecondCall().returns(responseBuilder().body(context).build())

      // when
      const wrapper = await fetchUtil.resource('http://example.com/resource', {
        parsers,
      })

      // then
      expect(mockFetch.secondCall.firstArg).to.eq('https://www.w3.org/ns/hydra/error')
      expect(wrapper).to.have.deep.property('jsonLdContext', context)
    })
  })

  describe('invokeOperation', () => {
    it('should not send body with GET request', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.operation('get', 'http://example.com/resource', { parsers, body: 'foo' })

      // then
      expect(mockFetch)
        .to.have.been.calledWith(sinon.match.any, sinon.match({
          body: sinon.match.falsy,
        }))
    })

    it('should append provided headers to the default', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.operation('get', 'http://example.com/resource', {
        parsers,
        headers: {
          'x-foo': 'bar',
        },
      })

      // then
      expect(mockFetch)
        .to.have.been.calledWith(sinon.match.any, sinon.match({
          headers: new Headers({
            'x-foo': 'bar',
            accept: 'application/ld+json, application/n-triples, application/n-quads',
          }),
        }))
    })

    it('should set additional request options', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.operation('get', 'http://example.com/resource', {
        parsers,
        headers: {
          'x-foo': 'bar',
        },
        cache: 'no-cache',
      })

      // then
      expect(mockFetch)
        .to.have.been.calledWith(sinon.match.any, sinon.match({
          headers: new Headers({
            'x-foo': 'bar',
            accept: 'application/ld+json, application/n-triples, application/n-quads',
          }),
          cache: 'no-cache',
        }))
    })

    it('should not alter accept header if other headers added', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.operation('get', 'http://example.com/resource', {
        parsers,
        headers: {
          'x-foo': 'bar',
        },
      })

      // then
      expect(mockFetch)
        .to.have.been.calledWith(sinon.match.any, sinon.match({
          headers: new Headers({
            accept: 'application/ld+json, application/n-triples, application/n-quads',
            'x-foo': 'bar',
          }),
        }))
    })

    it('should replace default accept header', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.operation('get', 'http://example.com/resource', {
        parsers,
        headers: {
          accept: 'application/vnd.custom+rdf',
        },
      })

      // then
      expect(mockFetch)
        .to.have.been.calledWith(sinon.match.any, sinon.match({
          headers: new Headers({
            accept: 'application/vnd.custom+rdf',
          }),
        }))
    })

    it('should set not set content-type header for FormData bodies', async () => {
      // given
      mockFetch.returns(responseBuilder().body(Bodies.someJsonLd).build())

      // when
      await fetchUtil.operation('post', 'http://example.com/resource', { parsers, body: new FormData() })

      // then
      expect(mockFetch.firstCall.lastArg.headers.get('content-type')).not.to.be.ok
    })
  })
})

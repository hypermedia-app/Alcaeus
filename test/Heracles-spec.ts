import namespace from '@rdfjs/namespace'
import clownface from 'clownface'
import type { DatasetExt } from 'rdf-ext/lib/Dataset.js'
import $rdf from 'rdf-ext'
import { hydra, rdfs } from '@tpluscode/rdf-ns-builders'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot'
import { create, PartialCollectionView } from '../src/index.js'
import { HydraClient } from '../src/alcaeus.js'
import FetchUtil from '../src/FetchUtil.js'
import { Bodies } from './test-objects/index.js'
import { mockedResponse, responseBuilder } from './test-utils.js'

// eslint-disable-next-line no-unused-vars
let fetchUtil: ReturnType<typeof FetchUtil>
let invokeOperation: sinon.SinonStub
let fetchResource: sinon.SinonStub

function mockFetchUtil() {
  invokeOperation = sinon.stub()
  fetchResource = sinon.stub()
  fetchUtil = {
    operation: invokeOperation,
    resource: fetchResource,
  }
}

const ex = namespace('http://example.com/')

describe('Hydra loadDocumentation', () => {
  let client: HydraClient
  let dataset: DatasetExt

  chai.use(jestSnapshotPlugin())
  beforeEach(mockFetchUtil)
  beforeEach(() => {
    dataset = $rdf.dataset()
    client = create({
      dataset,
      environment: $rdf,
    })
  })

  it('should store its representation in the dataset', async () => {
    // given
    const body = {
      '@id': 'http://api.example.com/doc/',
      '@type': hydra.ApiDocumentation.value,
    }
    fetchResource.onFirstCall().returns(mockedResponse({
      xhrBuilder: responseBuilder().body(body),
    }))

    // when
    await client.loadDocumentation('http://api.example.com/doc/')

    // then
    expect(dataset.toCanonical()).toMatchSnapshot()
  })

  it('should replace its representation in the dataset when loading twice', async () => {
    // given
    const body = (suffix = '') => ({
      '@id': 'http://api.example.com/doc/' + suffix,
      '@type': hydra.ApiDocumentation.value,
    })
    fetchResource.onFirstCall().returns(mockedResponse({
      xhrBuilder: responseBuilder().body(body('1')),
    }))
    fetchResource.onFirstCall().returns(mockedResponse({
      xhrBuilder: responseBuilder().body(body('2')),
    }))

    // when
    await client.loadDocumentation('http://api.example.com/doc/')
    await client.loadDocumentation('http://api.example.com/doc/')

    // then
    expect(dataset.toCanonical()).toMatchSnapshot()
  })

  it('passes absolute URI to fetch', async () => {
    // given
    fetchResource.onFirstCall().returns(mockedResponse({
      xhrBuilder: responseBuilder().body(''),
    }))
    client.baseUri = 'http://example.com/foo/'

    // when
    await client.loadDocumentation('bar/docs')

    // then
    expect(fetchResource)
      .to.have.been.calledWith(
        'http://example.com/foo/bar/docs',
        sinon.match.any)
  })

  it('forwards additional options to fetch', async () => {
    // given
    fetchResource.onFirstCall().returns(mockedResponse({
      xhrBuilder: responseBuilder().body(''),
    }))
    client.baseUri = 'http://example.com/foo/'

    // when
    await client.loadDocumentation('bar/docs', {}, {
      credentials: 'same-origin',
    })

    // then
    expect(fetchResource)
      .to.have.been.calledWith(
        'http://example.com/foo/bar/docs',
        sinon.match({
          credentials: 'same-origin',
        }))
  })
})

describe('Hydra', () => {
  let loadDocumentation: sinon.SinonStub
  let client: HydraClient
  let dataset: DatasetExt

  beforeEach(mockFetchUtil)
  beforeEach(() => {
    dataset = $rdf.dataset()
    client = create({
      dataset,
      environment: $rdf,
    })
    loadDocumentation = (client.loadDocumentation = sinon.stub().resolves({}))
    fetchResource.reset()
    invokeOperation.reset()
  })

  describe('loadResource', () => {
    it('should return object with matching @id when it is unescaped in response', async () => {
      // given
      const unescaped = 'http://example.com/biała-gęś'
      const id = 'http://example.com/bia%C5%82a-g%C4%99%C5%9B'
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.unescapedDiacritics),
      }))

      // when
      const hydraRes = await client.loadResource(id)
      const res = hydraRes.representation?.get(id)

      // then
      expect(res!.id.value).to.eq(unescaped)
    })

    it('should return object with matching @id when selected with unescaped uri', async () => {
      // given
      const id = 'http://example.com/biała-gęś'
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.unescapedDiacritics),
      }))

      // when
      const hydraRes = await client.loadResource(id)
      const res = hydraRes.representation?.get(id)

      // then
      expect(res!.id.value).to.eq(id)
    })

    it('should load documentation', async () => {
      // given
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      }))

      // when
      await client.loadResource('http://example.com/resource')

      // then
      expect(loadDocumentation).to.have.been.calledWith('http://api.example.com/doc/', {})
    })

    it('should not load documentation in absence of Link header', async () => {
      // given
      fetchResource.onFirstCall().returns(mockedResponse({
        includeDocsLink: false,
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      }))

      // when
      await client.loadResource('http://example.com/resource')

      // then
      expect(fetchResource).to.have.callCount(1)
    })

    it('should load parent of collection view as Resource', async () => {
      // given
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.hydraCollectionWithView),
      }))

      // when
      const hydraRes = await client.loadResource('http://example.com/resource?page=3')
      const res = hydraRes.representation?.get<PartialCollectionView>('http://example.com/resource?page=3')

      // then
      expect(res?.parent).not.to.be.undefined
      expect(res?.parent).not.to.be.null
    })

    it('should load resource with deep blank node structure', async () => {
      // given
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.deepBlankNodes),
      }))

      // when
      const hydraRes = await client.loadResource('http://example.com/root')
      const res = hydraRes.representation?.get('http://example.com/root') as any

      // then
      const p = 'http://example.com/prop'
      const t = 'http://example.com/text'

      expect(res[p][p][p][p][t].value).to.eq('I\'m nested way deep')
    })

    it('should return typed string literals as their values', async () => {
      // given
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
      }))

      // when
      const hydraRes = await client.loadResource('http://example.com/resource')
      const res = hydraRes.representation?.get('http://example.com/resource') as any

      // then
      expect(res['http://schema.org/image']['http://schema.org/contentUrl'].value)
        .to.eq('http://wikibus-test.gear.host/book/1936/image')
    })

    it('should return only response when is cannot be parsed', async () => {
      // given
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().notFound(),
      }))

      // when
      const hydraRes = await client.loadResource('http://example.com/resource')

      // then
      expect(hydraRes.representation).to.be.undefined
    })

    it('should not add representation to store if status is not success', async () => {
      // given
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder()
          .notFound()
          .body({
            '@id': 'http://example.com/Foo',
            [rdfs.label.value]: 'Bar',
          }),
      }))

      // when
      await client.loadResource('http://example.com/resource')

      // then
      expect(client.resources.get($rdf.namedNode('http://example.com/resource'))).to.be.undefined
    })

    it.skip('should return typed numeric literals as their values', async () => {
      // given
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.typedNumericLiteral),
      }))

      // when
      const hydraRes = await client.loadResource('http://example.com/resource')
      const res = <any> hydraRes.representation?.get('http://example.com/resource')

      // then
      expect(res['http://schema.org/age']).to.eq(21)
    })

    afterEach(() => {
      loadDocumentation.restore()
      fetchResource.reset()
    })
  })

  describe('default root selectors', () => {
    it('should select by exact id if exists', async () => {
      // given
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      }))

      // when
      const { representation } = await client.loadResource('http://example.com/resource')

      // then
      expect(representation?.root!.id.value).to.eq('http://example.com/resource')
    })

    it.skip('should select resource with redirected id if original is not present', async () => {
      // given
      const redirectUri = 'http://example.com/resource'

      const xhrBuilder = responseBuilder().body(Bodies.someJsonLd).redirect(redirectUri)
      fetchResource.onFirstCall().returns(mockedResponse({ xhrBuilder }))

      // when
      const { representation } = await client.loadResource('http://example.com/not-there')

      // then
      expect(representation?.root!.id).to.eq('http://example.com/resource')
    })
  })

  describe('invokeOperation', () => {
    describe('POST method', () => {
      it('does not store response in dataset', async () => {
        // given
        invokeOperation.onFirstCall().returns(mockedResponse({
          xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
        }))
        const operation = {
          method: 'POST',
          target: {
            id: ex.resource,
          },
        }

        // when
        await client.invokeOperation(operation)

        // then
        expect(dataset).to.have.length(0)
      })

      it('returns data from the response', async () => {
        // given
        invokeOperation.onFirstCall().returns(mockedResponse({
          xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
        }))
        const operation = {
          method: 'POST',
          target: {
            id: ex.resource,
          },
        }

        // when
        const { representation } = await client.invokeOperation(operation)

        // then
        expect(representation?.length).to.be.gt(0)
      })
    })

    describe('GET method', () => {
      it('stores response in dataset', async () => {
        // given
        invokeOperation.onFirstCall().returns(mockedResponse({
          xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
        }))
        const operation = {
          method: 'GET',
          target: {
            id: ex.resource,
          },
        }

        // when
        await client.invokeOperation(operation)

        // then
        expect(dataset.size).to.be.gt(0)
      })
    })
  })

  describe('customizing default request init', () => {
    let client: HydraClient

    beforeEach(() => {
      client = create({ environment: $rdf })
      fetchResource.callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(''),
      }))
      invokeOperation.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(''),
      }))
    })

    it('combines default init with per-request init', async () => {
      // given
      client.defaultRequestInit = {
        cache: 'no-cache',
        mode: 'cors',
      }

      // when
      await client.loadResource('uri', {}, {
        credentials: 'omit',
        mode: 'no-cors',
      })

      // then
      expect(fetchResource).to.have.been.calledWith(
        'uri',
        sinon.match({
          headers: new Headers({
            Authorization: 'Bearer foobar',
          }),
          cache: 'no-cache',
          credentials: 'omit',
          mode: 'no-cors',
        }))
    })

    it('combines lazy request init defaults with per-request init', async () => {
      // given
      client.defaultRequestInit = async () => ({
        cache: 'no-cache',
        mode: 'cors',
      })

      // when
      await client.loadResource('uri', {}, {
        credentials: 'omit',
        mode: 'no-cors',
      })

      // then
      expect(fetchResource).to.have.been.calledWith(
        'uri',
        sinon.match({
          headers: new Headers({
            Authorization: 'Bearer foobar',
          }),
          cache: 'no-cache',
          credentials: 'omit',
          mode: 'no-cors',
        }))
    })

    it('combines default init with per-request init when invoking operation', async () => {
      // given
      client.defaultRequestInit = {
        cache: 'no-cache',
        mode: 'cors',
      }
      const operation = {
        method: 'POST',
        target: {
          id: ex.resource,
        },
      }

      // when
      await client.invokeOperation(operation, {}, undefined, {
        credentials: 'omit',
        mode: 'no-cors',
      })

      // then
      expect(invokeOperation).to.have.been.calledWith(
        'POST',
        ex.resource.value,
        sinon.match({
          headers: sinon.match({
            Authorization: 'Bearer foobar',
          }),
          cache: 'no-cache',
          credentials: 'omit',
          mode: 'no-cors',
        }))
    })

    it('combines func request init with per-request init when invoking operation', async () => {
      // given
      client.defaultRequestInit = () => ({
        cache: 'no-cache',
        mode: 'cors',
      })
      const operation = {
        method: 'POST',
        target: {
          id: ex.resource,
        },
      }

      // when
      await client.invokeOperation(operation, {}, undefined, {
        credentials: 'omit',
        mode: 'no-cors',
      })

      // then
      expect(invokeOperation).to.have.been.calledWith(
        'POST',
        ex.resource.value,
        sinon.match({
          headers: sinon.match({
            Authorization: 'Bearer foobar',
          }),
          cache: 'no-cache',
          credentials: 'omit',
          mode: 'no-cors',
        }))
    })
  })

  describe('customizing default headers', () => {
    let client: HydraClient

    beforeEach(() => {
      client = create({ environment: $rdf })
      fetchResource.callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(''),
      }))
      invokeOperation.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().body(''),
      }))
    })

    describe('as HeadersInit object', () => {
      it('passes them to loadResource', async () => {
        // given
        client.defaultHeaders = {
          Authorization: 'Bearer foobar',
        }

        // when
        await client.loadResource('uri')

        // then
        expect(fetchResource).to.have.been.calledWith(
          'uri',
          sinon.match({
            headers: new Headers({
              Authorization: 'Bearer foobar',
            }),
          }))
      })

      it('passes them to invokeOperation', async () => {
        // given
        client.defaultHeaders = {
          Authorization: 'Bearer foobar',
        }
        const operation = {
          method: 'post',
          target: {
            id: ex.uri,
          },
        }

        // when
        await client.invokeOperation(operation)

        // then
        expect(invokeOperation)
          .to.have.been.calledWith(
            'post',
            ex.uri.value,
            sinon.match({
              headers: new Headers({
                Authorization: 'Bearer foobar',
              }),
            }))
      })

      it('passes them to loadDocumentation', async () => {
        // given
        client.defaultHeaders = {
          Authorization: 'Bearer foobar',
        }

        // when
        await client.loadDocumentation('doc')

        // then
        expect(fetchResource).to.have.been.calledWith(
          'doc', sinon.match({
            headers: new Headers({
              Authorization: 'Bearer foobar',
            }),
          }))
      })
    })

    describe('as HeadersInit function', () => {
      it('passes them to loadResource', async () => {
        // given
        client.defaultHeaders = () => ({
          Authorization: 'Token xyz',
        })

        // when
        await client.loadResource('uri')

        // then
        expect(fetchResource).to.have.been.calledWith(
          'uri', sinon.match({
            headers: new Headers({
              Authorization: 'Token xyz',
            }),
          }))
      })

      it('passes them to loadDocumentation', async () => {
        // given
        client.defaultHeaders = () => ({
          Authorization: 'Token xyz',
        })

        // when
        await client.loadDocumentation('doc')

        // then
        expect(fetchResource).to.have.been.calledWith(
          'doc', sinon.match({
            headers: new Headers({
              Authorization: 'Token xyz',
            }),
          }))
      })

      it('passes them to invokeOperation', async () => {
        // given
        client.defaultHeaders = () => ({
          Authorization: 'Token xyz',
        })
        const operation = {
          method: 'post',
          target: {
            id: ex.uri,
          },
        }

        // when
        await client.invokeOperation(operation)

        // then
        expect(invokeOperation)
          .to.have.been.calledWith(
            'post',
            ex.uri.value,
            sinon.match({
              headers: new Headers({
                Authorization: 'Token xyz',
              }),
            }))
      })
    })

    describe('as async HeadersInit function', () => {
      it('passes them to loadResource', async () => {
        // given
        client.defaultHeaders = async () => ({
          Authorization: 'Token xyz',
        })

        // when
        await client.loadResource('uri')

        // then
        expect(fetchResource).to.have.been.calledWith(
          'uri', sinon.match({
            headers: new Headers({
              Authorization: 'Token xyz',
            }),
          }))
      })

      it('passes them to loadDocumentation', async () => {
        // given
        client.defaultHeaders = async () => ({
          Authorization: 'Token xyz',
        })

        // when
        await client.loadDocumentation('doc')

        // then
        expect(fetchResource).to.have.been.calledWith(
          'doc', sinon.match({
            headers: new Headers({
              Authorization: 'Token xyz',
            }),
          }))
      })

      it('passes them to invokeOperation', async () => {
        // given
        client.defaultHeaders = async () => ({
          Authorization: 'Token xyz',
        })
        const operation = {
          method: 'post',
          target: {
            id: ex.uri,
          },
        }

        // when
        await client.invokeOperation(operation)

        // then
        expect(invokeOperation)
          .to.have.been.calledWith(
            'post',
            ex.uri.value,
            sinon.match({
              headers: new Headers({
                Authorization: 'Token xyz',
              }),
            }))
      })

      it('receives requested uri', async () => {
        // given
        client.defaultHeaders = sinon.stub()

        // when
        await client.loadResource('http://example.com/resource')

        // then
        expect(client.defaultHeaders).to.have.been.calledWith({
          uri: 'http://example.com/resource',
        })
      })

      it('receives absolute uri when using baseUri setting', async () => {
        // given
        client.defaultHeaders = sinon.stub()
        client.baseUri = 'http://example.com/'

        // when
        await client.loadResource('resource')

        // then
        expect(client.defaultHeaders).to.have.been.calledWith({
          uri: 'http://example.com/resource',
        })
      })

      it('receives absolute uri when using baseUri setting from operation', async () => {
        // given
        client.defaultHeaders = sinon.stub()
        client.baseUri = 'http://example.com/'
        const operation = {
          method: 'post',
          target: {
            id: $rdf.namedNode('resource'),
          },
        }

        // when
        await client.invokeOperation(operation)

        // then
        expect(client.defaultHeaders).to.have.been.calledWith({
          uri: 'http://example.com/resource',
        })
      })
    })
  })

  describe('loadResource + cache strategy', () => {
    const id = 'http://example.com/resource'

    it('should not do a request when resource is used from store', async () => {
      // given
      const responseMock = mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      })
      fetchResource.onFirstCall().returns(responseMock)
      client.cacheStrategy.shouldLoad = () => false
      clownface({ dataset }).namedNode(id).addOut(rdfs.label, 'Foo')
      await client.resources.set($rdf.namedNode(id), {
        response: await responseMock(id),
        dataset,
      })

      // when
      await client.loadResource(id)

      // then
      expect(fetchResource).not.to.to.have.been.called
    })

    it('should reuse previous representation when server responds with 304', async () => {
      // given
      const previousResponse = await mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      })(id)
      fetchResource.onFirstCall().returns(mockedResponse({
        xhrBuilder: responseBuilder().statusCode(304),
      }))
      client.cacheStrategy.shouldLoad = () => true
      clownface({ dataset }).namedNode(id).addOut(rdfs.label, 'Foo')
      await client.resources.set($rdf.namedNode(id), {
        response: previousResponse,
        dataset,
      })

      // when
      const res = await client.loadResource(id)

      // then
      expect(res.representation).to.be.ok
      expect(res.response).to.eq(previousResponse)
    })

    it('should reuse previous representation when server responds with equal etag', async () => {
      // given
      const previousResponse = await mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd).header('etag', 'foobar'),
      })(id)
      fetchResource.callsFake(mockedResponse({
        xhrBuilder: responseBuilder().statusCode(200).header('etag', 'foobar'),
      }))
      client.cacheStrategy.shouldLoad = () => true
      clownface({ dataset }).namedNode(id).addOut(rdfs.label, 'Foo')
      await client.resources.set($rdf.namedNode(id), {
        response: previousResponse,
        dataset,
      })

      // when
      const res = await client.loadResource(id)

      // then
      expect(res.representation).not.to.be.undefined
      expect(res.response).to.eq(previousResponse)
    })

    it('should set caching request headers provided by cache strategy', async () => {
      // given
      const previousResponse = mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      })
      fetchResource.onFirstCall().returns(previousResponse)
      client.cacheStrategy.shouldLoad = () => true
      client.cacheStrategy.requestCacheHeaders = () => ({
        'if-none-match': 'foo',
      })
      clownface({ dataset }).namedNode(id).addOut(rdfs.label, 'Foo')
      await client.resources.set($rdf.namedNode(id), {
        response: await previousResponse(id),
        dataset,
      })

      // when
      await client.loadResource(id)

      // then
      expect(fetchResource).to.have.been.calledWith(
        id,
        sinon.match({
          headers: new Headers({ 'if-none-match': 'foo' }),
        }))
    })

    it('should replace cached resource when cache strategy returns true', async () => {
      // given
      const responseMock = mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      })
      fetchResource.onFirstCall().returns(responseMock)
      client.cacheStrategy.shouldLoad = () => true
      const term = $rdf.namedNode(id)
      clownface({ dataset, graph: term, term }).addOut(rdfs.label, 'Foo')
      await client.resources.set($rdf.namedNode(id), {
        response: await responseMock(id),
        dataset,
      })

      // when
      await client.loadResource(id)

      // then
      expect(fetchResource).to.to.have.been.called
      expect(dataset.toCanonical()).toMatchSnapshot()
    })
  })
})

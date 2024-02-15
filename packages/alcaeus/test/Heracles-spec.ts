import { Dataset } from '@zazuko/env/lib/Dataset.js'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot'
import { DatasetCore } from '@rdfjs/types'
import { PartialCollectionView } from '../index.js'
import { Alcaeus, HydraClient } from '../alcaeus.js'
import FetchUtil from '../FetchUtil.js'
import rootSelectors from '../RootSelectors/index.js'
import ResourceStoreImpl from '../ResourceStore.js'
import inferences from '../inferences/index.js'
import $rdf from './env.js'
import { Bodies } from './test-objects/index.js'
import { mockedResponse, responseBuilder } from './test-utils.js'

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

const ex = $rdf.namespace('http://example.com/')

describe('Hydra loadDocumentation', () => {
  let hydra: HydraClient
  let dataset: Dataset

  chai.use(jestSnapshotPlugin())
  beforeEach(mockFetchUtil)
  beforeEach(() => {
    dataset = $rdf.dataset()
    hydra = new Alcaeus<DatasetCore>({
      fetch,
      Headers,
      environment: $rdf,
      rootSelectors,
      resources: new ResourceStoreImpl({
        dataset,
        inferences,
        environment: $rdf,
      }),
    }, fetchUtil)
  })

  it('should store its representation in the dataset', async () => {
    // given
    const body = {
      '@id': 'http://api.example.com/doc/',
      '@type': $rdf.ns.hydra.ApiDocumentation.value,
    }
    fetchResource.onFirstCall().callsFake(mockedResponse({
      xhrBuilder: responseBuilder().body(body),
    }))

    // when
    await hydra.loadDocumentation('http://api.example.com/doc/')

    // then
    expect(dataset.toCanonical()).toMatchSnapshot()
  })

  it('should replace its representation in the dataset when loading twice', async () => {
    // given
    const body = (suffix = '') => ({
      '@id': 'http://api.example.com/doc/' + suffix,
      '@type': $rdf.ns.hydra.ApiDocumentation.value,
    })
    fetchResource.onFirstCall().callsFake(mockedResponse({
      xhrBuilder: responseBuilder().body(body('1')),
    }))
    fetchResource.onSecondCall().callsFake(mockedResponse({
      xhrBuilder: responseBuilder().body(body('2')),
    }))

    // when
    await hydra.loadDocumentation('http://api.example.com/doc/')
    await hydra.loadDocumentation('http://api.example.com/doc/')

    // then
    expect(dataset.toCanonical()).toMatchSnapshot()
  })

  it('passes absolute URI to fetch', async () => {
    // given
    fetchResource.onFirstCall().callsFake(mockedResponse({
      xhrBuilder: responseBuilder().body(''),
    }))
    hydra.baseUri = 'http://example.com/foo/'

    // when
    await hydra.loadDocumentation('bar/docs')

    // then
    expect(fetchResource)
      .to.have.been.calledWith(
        'http://example.com/foo/bar/docs',
        sinon.match.any)
  })

  it('forwards additional options to fetch', async () => {
    // given
    fetchResource.onFirstCall().callsFake(mockedResponse({
      xhrBuilder: responseBuilder().body(''),
    }))
    hydra.baseUri = 'http://example.com/foo/'

    // when
    await hydra.loadDocumentation('bar/docs', {}, {
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

  describe('customizing default headers', () => {
    beforeEach(() => {
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(''),
      }))
    })

    it('headers map', async () => {
      // given
      hydra.defaultHeaders = {
        Authorization: 'Bearer foobar',
      }

      // when
      await hydra.loadDocumentation('https://example.com/doc')

      // then
      expect(fetchResource).to.have.been.calledWith(
        'https://example.com/doc', sinon.match({
          headers: new Headers({
            Authorization: 'Bearer foobar',
          }),
        }))
    })

    it('HeadersInit', async () => {
      // given
      hydra.defaultHeaders = () => ({
        Authorization: 'Token xyz',
      })

      // when
      await hydra.loadDocumentation('https://example.com/doc')

      // then
      expect(fetchResource).to.have.been.calledWith(
        'https://example.com/doc', sinon.match({
          headers: new Headers({
            Authorization: 'Token xyz',
          }),
        }))
    })

    it(' lazy headers', async () => {
      // given
      hydra.defaultHeaders = async () => ({
        Authorization: 'Token xyz',
      })

      // when
      await hydra.loadDocumentation('https://example.com/doc')

      // then
      expect(fetchResource).to.have.been.calledWith(
        'https://example.com/doc', sinon.match({
          headers: new Headers({
            Authorization: 'Token xyz',
          }),
        }))
    })
  })
})

describe('Hydra', () => {
  let loadDocumentation: sinon.SinonStub
  let hydra: HydraClient
  let dataset: Dataset

  beforeEach(mockFetchUtil)
  beforeEach(() => {
    dataset = $rdf.dataset()
    hydra = new Alcaeus<DatasetCore>({
      fetch,
      Headers,
      environment: $rdf,
      rootSelectors,
      resources: new ResourceStoreImpl({
        dataset,
        inferences,
        environment: $rdf,
      }),
    }, fetchUtil)
    loadDocumentation = (hydra.loadDocumentation = sinon.stub().resolves({}))
  })

  describe('loadResource', () => {
    it('should return object with matching @id when it is unescaped in response', async () => {
      // given
      const unescaped = 'http://example.com/biała-gęś'
      const id = 'http://example.com/bia%C5%82a-g%C4%99%C5%9B'
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.unescapedDiacritics),
      }))

      // when
      const hydraRes = await hydra.loadResource(id)
      const res = hydraRes.representation?.get(id)

      // then
      expect(res!.id.value).to.eq(unescaped)
    })

    it('should return object with matching @id when selected with unescaped uri', async () => {
      // given
      const id = 'http://example.com/biała-gęś'
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.unescapedDiacritics),
      }))

      // when
      const hydraRes = await hydra.loadResource(id)
      const res = hydraRes.representation?.get(id)

      // then
      expect(res!.id.value).to.eq(id)
    })

    it('should load documentation', async () => {
      // given
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      }))

      // when
      await hydra.loadResource('http://example.com/resource')

      // then
      expect(loadDocumentation).to.have.been.calledWith('http://api.example.com/doc/', {})
    })

    it('should not load documentation in absence of Link header', async () => {
      // given
      fetchResource.onFirstCall().callsFake(mockedResponse({
        includeDocsLink: false,
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      }))

      // when
      await hydra.loadResource('http://example.com/resource')

      // then
      expect(fetchResource).to.have.callCount(1)
    })

    it('should load parent of collection view as Resource', async () => {
      // given
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.hydraCollectionWithView),
      }))

      // when
      const hydraRes = await hydra.loadResource('http://example.com/resource?page=3')
      const res = hydraRes.representation?.get<PartialCollectionView>('http://example.com/resource?page=3')

      // then
      expect(res?.parent).not.to.be.undefined
      expect(res?.parent).not.to.be.null
    })

    it('should load resource with deep blank node structure', async () => {
      // given
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.deepBlankNodes),
      }))

      // when
      const hydraRes = await hydra.loadResource('http://example.com/root')
      const res = hydraRes.representation?.get('http://example.com/root') as any

      // then
      const p = 'http://example.com/prop'
      const t = 'http://example.com/text'

      expect(res[p][p][p][p][t].value).to.eq('I\'m nested way deep')
    })

    it('should return typed string literals as their values', async () => {
      // given
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
      }))

      // when
      const hydraRes = await hydra.loadResource('http://example.com/resource')
      const res = hydraRes.representation?.get('http://example.com/resource') as any

      // then
      expect(res['http://schema.org/image']['http://schema.org/contentUrl'].value)
        .to.eq('http://wikibus-test.gear.host/book/1936/image')
    })

    it('should return only response when is cannot be parsed', async () => {
      // given
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().notFound(),
      }))

      // when
      const hydraRes = await hydra.loadResource('http://example.com/resource')

      // then
      expect(hydraRes.representation).to.be.undefined
    })

    it('should not add representation to store if status is not success', async () => {
      // given
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder()
          .notFound()
          .body({
            '@id': 'http://example.com/Foo',
            [$rdf.ns.rdfs.label.value]: 'Bar',
          }),
      }))

      // when
      await hydra.loadResource('http://example.com/resource')

      // then
      expect(hydra.resources.get($rdf.namedNode('http://example.com/resource'))).to.be.undefined
    })

    it.skip('should return typed numeric literals as their values', async () => {
      // given
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.typedNumericLiteral),
      }))

      // when
      const hydraRes = await hydra.loadResource('http://example.com/resource')
      const res = <any> hydraRes.representation?.get('http://example.com/resource')

      // then
      expect(res['http://schema.org/age']).to.eq(21)
    })
  })

  describe('default root selectors', () => {
    it('should select by exact id if exists', async () => {
      // given
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      }))

      // when
      const { representation } = await hydra.loadResource('http://example.com/resource')

      // then
      expect(representation?.root!.id.value).to.eq('http://example.com/resource')
    })

    it.skip('should select resource with redirected id if original is not present', async () => {
      // given
      const redirectUri = 'http://example.com/resource'

      const xhrBuilder = responseBuilder().body(Bodies.someJsonLd).redirect(redirectUri)
      fetchResource.onFirstCall().callsFake(mockedResponse({ xhrBuilder }))

      // when
      const { representation } = await hydra.loadResource('http://example.com/not-there')

      // then
      expect(representation?.root!.id).to.eq('http://example.com/resource')
    })
  })

  describe('invokeOperation', () => {
    describe('POST method', () => {
      it('does not store response in dataset', async () => {
        // given
        invokeOperation.onFirstCall().callsFake(mockedResponse({
          xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
        }))
        const operation = {
          method: 'POST',
          target: {
            id: ex.resource,
          },
        }

        // when
        await hydra.invokeOperation(operation)

        // then
        expect(dataset).to.have.property('size', 0)
      })

      it('returns data from the response', async () => {
        // given
        invokeOperation.onFirstCall().callsFake(mockedResponse({
          xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
        }))
        const operation = {
          method: 'POST',
          target: {
            id: ex.resource,
          },
        }

        // when
        const { representation } = await hydra.invokeOperation(operation)

        // then
        expect(representation?.length).to.be.gt(0)
      })
    })

    describe('GET method', () => {
      it('stores response in dataset', async () => {
        // given
        invokeOperation.onFirstCall().callsFake(mockedResponse({
          xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
        }))
        const operation = {
          method: 'GET',
          target: {
            id: ex.resource,
          },
        }

        // when
        await hydra.invokeOperation(operation)

        // then
        expect(dataset.size).to.be.gt(0)
      })
    })
  })

  describe('customizing default request init', () => {
    beforeEach(() => {
      fetchResource.callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(''),
      }))
      invokeOperation.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(''),
      }))
    })

    it('combines default init with per-request init', async () => {
      // given
      hydra.defaultRequestInit = {
        cache: 'no-cache',
        mode: 'cors',
      }

      // when
      await hydra.loadResource('uri', {}, {
        credentials: 'omit',
        mode: 'no-cors',
      })

      // then
      expect(fetchResource).to.have.been.calledWith(
        'uri',
        sinon.match({
          cache: 'no-cache',
          credentials: 'omit',
          mode: 'no-cors',
        }))
    })

    it('combines lazy request init defaults with per-request init', async () => {
      // given
      hydra.defaultRequestInit = async () => ({
        cache: 'no-cache',
        mode: 'cors',
      })

      // when
      await hydra.loadResource('uri', {}, {
        credentials: 'omit',
        mode: 'no-cors',
      })

      // then
      expect(fetchResource).to.have.been.calledWith(
        'uri',
        sinon.match({
          cache: 'no-cache',
          credentials: 'omit',
          mode: 'no-cors',
        }))
    })

    it('combines default init with per-request init when invoking operation', async () => {
      // given
      hydra.defaultRequestInit = {
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
      await hydra.invokeOperation(operation, {}, undefined, {
        credentials: 'omit',
        mode: 'no-cors',
      })

      // then
      expect(invokeOperation).to.have.been.calledWith(
        'POST',
        ex.resource.value,
        sinon.match({
          cache: 'no-cache',
          credentials: 'omit',
          mode: 'no-cors',
        }))
    })

    it('combines func request init with per-request init when invoking operation', async () => {
      // given
      hydra.defaultRequestInit = () => ({
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
      await hydra.invokeOperation(operation, {}, undefined, {
        credentials: 'omit',
        mode: 'no-cors',
      })

      // then
      expect(invokeOperation).to.have.been.calledWith(
        'POST',
        ex.resource.value,
        sinon.match({
          cache: 'no-cache',
          credentials: 'omit',
          mode: 'no-cors',
        }))
    })
  })

  describe('customizing default headers', () => {
    beforeEach(() => {
      fetchResource.callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(''),
      }))
      invokeOperation.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().body(''),
      }))
    })

    describe('as HeadersInit object', () => {
      it('passes them to loadResource', async () => {
        // given
        hydra.defaultHeaders = {
          Authorization: 'Bearer foobar',
        }

        // when
        await hydra.loadResource('https://example.com/uri')

        // then
        expect(fetchResource).to.have.been.calledWith(
          'https://example.com/uri',
          sinon.match({
            headers: new Headers({
              Authorization: 'Bearer foobar',
            }),
          }))
      })

      it('passes them to invokeOperation', async () => {
        // given
        hydra.defaultHeaders = {
          Authorization: 'Bearer foobar',
        }
        const operation = {
          method: 'post',
          target: {
            id: ex.uri,
          },
        }

        // when
        await hydra.invokeOperation(operation)

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
    })

    describe('as HeadersInit function', () => {
      it('passes them to loadResource', async () => {
        // given
        hydra.defaultHeaders = () => ({
          Authorization: 'Token xyz',
        })

        // when
        await hydra.loadResource('https://example.com/uri')

        // then
        expect(fetchResource).to.have.been.calledWith(
          'https://example.com/uri', sinon.match({
            headers: new Headers({
              Authorization: 'Token xyz',
            }),
          }))
      })

      it('passes them to invokeOperation', async () => {
        // given
        hydra.defaultHeaders = () => ({
          Authorization: 'Token xyz',
        })
        const operation = {
          method: 'post',
          target: {
            id: ex.uri,
          },
        }

        // when
        await hydra.invokeOperation(operation)

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
        hydra.defaultHeaders = async () => ({
          Authorization: 'Token xyz',
        })

        // when
        await hydra.loadResource('https://example.com/uri')

        // then
        expect(fetchResource).to.have.been.calledWith(
          'https://example.com/uri', sinon.match({
            headers: new Headers({
              Authorization: 'Token xyz',
            }),
          }))
      })

      it('passes them to invokeOperation', async () => {
        // given
        hydra.defaultHeaders = async () => ({
          Authorization: 'Token xyz',
        })
        const operation = {
          method: 'post',
          target: {
            id: ex.uri,
          },
        }

        // when
        await hydra.invokeOperation(operation)

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
        hydra.defaultHeaders = sinon.stub()

        // when
        await hydra.loadResource('http://example.com/resource')

        // then
        expect(hydra.defaultHeaders).to.have.been.calledWith({
          uri: 'http://example.com/resource',
        })
      })

      it('receives absolute uri when using baseUri setting', async () => {
        // given
        hydra.defaultHeaders = sinon.stub()
        hydra.baseUri = 'http://example.com/'

        // when
        await hydra.loadResource('resource')

        // then
        expect(hydra.defaultHeaders).to.have.been.calledWith({
          uri: 'http://example.com/resource',
        })
      })

      it('receives absolute uri when using baseUri setting from operation', async () => {
        // given
        hydra.defaultHeaders = sinon.stub()
        hydra.baseUri = 'http://example.com/'
        const operation = {
          method: 'post',
          target: {
            id: $rdf.namedNode('resource'),
          },
        }

        // when
        await hydra.invokeOperation(operation)

        // then
        expect(hydra.defaultHeaders).to.have.been.calledWith({
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
      hydra.cacheStrategy.shouldLoad = () => false
      $rdf.clownface({ dataset }).namedNode(id).addOut($rdf.ns.rdfs.label, 'Foo')
      await hydra.resources.set($rdf.namedNode(id), {
        response: await responseMock(id),
        dataset,
      })

      // when
      await hydra.loadResource(id)

      // then
      expect(fetchResource).not.to.to.have.been.called
    })

    it('should reuse previous representation when server responds with 304', async () => {
      // given
      const previousResponse = await mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      })(id)
      fetchResource.onFirstCall().callsFake(mockedResponse({
        xhrBuilder: responseBuilder().statusCode(304),
      }))
      hydra.cacheStrategy.shouldLoad = () => true
      $rdf.clownface({ dataset }).namedNode(id).addOut($rdf.ns.rdfs.label, 'Foo')
      await hydra.resources.set($rdf.namedNode(id), {
        response: previousResponse,
        dataset,
      })

      // when
      const res = await hydra.loadResource(id)

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
      hydra.cacheStrategy.shouldLoad = () => true
      $rdf.clownface({ dataset }).namedNode(id).addOut($rdf.ns.rdfs.label, 'Foo')
      await hydra.resources.set($rdf.namedNode(id), {
        response: previousResponse,
        dataset,
      })

      // when
      const res = await hydra.loadResource(id)

      // then
      expect(res.representation).not.to.be.undefined
      expect(res.response).to.eq(previousResponse)
    })

    it('should set caching request headers provided by cache strategy', async () => {
      // given
      const previousResponse = mockedResponse({
        xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
      })
      fetchResource.onFirstCall().callsFake(previousResponse)
      hydra.cacheStrategy.shouldLoad = () => true
      hydra.cacheStrategy.requestCacheHeaders = () => ({
        'if-none-match': 'foo',
      })
      $rdf.clownface({ dataset }).namedNode(id).addOut($rdf.ns.rdfs.label, 'Foo')
      await hydra.resources.set($rdf.namedNode(id), {
        response: await previousResponse(id),
        dataset,
      })

      // when
      await hydra.loadResource(id)

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
      fetchResource.onFirstCall().callsFake(responseMock)
      hydra.cacheStrategy.shouldLoad = () => true
      const term = $rdf.namedNode(id)
      $rdf.clownface({ dataset, graph: term, term }).addOut($rdf.ns.rdfs.label, 'Foo')
      await hydra.resources.set($rdf.namedNode(id), {
        response: await responseMock(id),
        dataset,
      })

      // when
      await hydra.loadResource(id)

      // then
      expect(fetchResource).to.to.have.been.called
      expect(dataset.toCanonical()).toMatchSnapshot()
    })
  })
})

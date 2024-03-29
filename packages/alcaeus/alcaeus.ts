import type { DatasetCore, NamedNode } from '@rdfjs/types'
import type { RdfResourceCore } from '@tpluscode/rdfine/RdfResource'
import type { GraphPointer } from 'clownface'
import type { Resource, ApiDocumentation } from '@rdfine/hydra'
import { hydra } from '@tpluscode/rdf-ns-builders'
import fromStream from 'rdf-dataset-ext/fromStream.js'
import type { ResourceIdentifier } from '@tpluscode/rdfine'
import {
  AllowedRequestInit,
  HydraClient,
  HydraEnvironment, HydraResponse,
  InvokedOperation,
  ResourceCacheStrategy,
  ResourceStore,
  ResponseWrapper,
  RootNodeCandidate,
  ResourceRepresentation,
} from 'alcaeus-core'
import FetchUtil from './FetchUtil.js'
import { merge } from './helpers/MergeHeaders.js'
import { getAbsoluteUri } from './helpers/uri.js'
import * as DefaultCacheStrategy from './ResourceCacheStrategy.js'

export * from 'alcaeus-core'

function byInProperties(left: GraphPointer, right: GraphPointer) {
  return left.in().terms.length - right.in().terms.length
}

interface AlcaeusInit<D extends DatasetCore> {
  rootSelectors: [string, RootNodeCandidate][]
  resources: ResourceStore<D>
  environment: HydraEnvironment<D>
  fetch: typeof fetch
  Headers: typeof Headers
}

export class Alcaeus<D extends DatasetCore> implements HydraClient<D> {
  public baseUri?: string = undefined

  public rootSelectors: [string, RootNodeCandidate][]

  public defaultHeaders: HeadersInit | ((params: { uri: string }) => HeadersInit | Promise<HeadersInit>) = {}

  public defaultRequestInit = {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public log: (msg: string) => void = () => {
  }

  public cacheStrategy: ResourceCacheStrategy = { ...DefaultCacheStrategy }

  public readonly resources: ResourceStore<D>

  private readonly __apiDocumentations: Map<NamedNode, ResourceRepresentation<D, ApiDocumentation<D>>>

  private readonly environment: HydraEnvironment<D>

  private readonly _fetch: ReturnType<typeof FetchUtil>

  private readonly _headers: typeof Headers

  public constructor(init: AlcaeusInit<D>, fetchUtil?: ReturnType<typeof FetchUtil>) {
    const { resources, environment, rootSelectors, fetch } = init

    this.rootSelectors = rootSelectors
    this.resources = resources
    this.environment = environment
    this._headers = init.Headers
    this._fetch = fetchUtil || FetchUtil(fetch, this._headers)
    this.__apiDocumentations = environment.termMap()
  }

  public get apiDocumentations() {
    return [...this.__apiDocumentations.values()]
  }

  public async loadResource<T extends RdfResourceCore<any>>(id: string | NamedNode, headers: HeadersInit = {}, requestInit?: AllowedRequestInit, dereferenceApiDocumentation = true): Promise<HydraResponse<D, T>> {
    const term = typeof id === 'string' ? this.environment.namedNode(id) : id
    let requestHeaders = new this._headers(headers)

    const previousResource = this.resources.get<T>(term)
    if (previousResource) {
      if (!this.cacheStrategy.shouldLoad(previousResource)) {
        return previousResource
      }

      const cacheHeadersInit = this.cacheStrategy.requestCacheHeaders(previousResource)
      if (cacheHeadersInit) {
        const cacheHeaders = new this._headers(cacheHeadersInit)
        requestHeaders = merge(requestHeaders, cacheHeaders, this._headers)
      }
    }

    const uri = getAbsoluteUri(term.value, this.baseUri)
    const defaultRequestInit = typeof this.defaultRequestInit === 'function'
      ? await this.defaultRequestInit({ uri })
      : this.defaultRequestInit
    const response = await this._fetch.resource(uri, {
      parsers: this.environment.formats.parsers,
      headers: await this.__mergeHeaders(requestHeaders, { uri }),
      ...{ ...defaultRequestInit, ...requestInit },
    })

    if (previousResource) {
      const etag = response.xhr.headers.get('etag')
      const previousEtag = previousResource.response.xhr.headers.get('etag')
      const etagsEqual = etag && etag === previousEtag
      if (response.xhr.status === 304 || etagsEqual) {
        return previousResource
      }
    }

    const stream = await response.quadStream()
    if (stream) {
      const dataset = await fromStream(this.environment.dataset(), stream)
      const rootResource = this.__findRootResource(dataset, response)

      if (dereferenceApiDocumentation) {
        await this.__getApiDocumentation(response, headers)
      }

      const resources = response.xhr.ok ? this.resources : this.resources.clone()
      await resources.set(term, {
        response,
        dataset,
        rootResource,
      })

      return resources.get<T>(term)!
    }

    return {
      response,
    }
  }

  public async loadDocumentation(id: string | NamedNode, headers: HeadersInit = {}, requestInit: AllowedRequestInit = {}): Promise<ApiDocumentation<D> | null> {
    const term = typeof id === 'string' ? this.environment.namedNode(id) : id

    const resource = await this.loadResource<ApiDocumentation<D>>(term, headers, requestInit, false)
    if (resource && resource.representation) {
      this.__apiDocumentations.set(term, resource.representation)
      const [apiDocs] = resource.representation.ofType<ApiDocumentation<D>>(hydra.ApiDocumentation)
      if (apiDocs) {
        return apiDocs
      }
    }

    return null
  }

  public async invokeOperation<T extends RdfResourceCore<any> = Resource<D>>(operation: InvokedOperation, headers: HeadersInit = {}, body?: BodyInit, requestInit: AllowedRequestInit = {}): Promise<HydraResponse<D, T>> {
    const uri = getAbsoluteUri(operation.target.id.value, this.baseUri)
    const mergedHeaders = await this.__mergeHeaders(new this._headers(headers), { uri })

    if (!operation.method) {
      throw new Error('Cannot invoke operation without a hydra:method')
    }

    const defaultRequestInit = typeof this.defaultRequestInit === 'function'
      ? await this.defaultRequestInit({ uri })
      : this.defaultRequestInit
    const response = await this._fetch.operation(operation.method, uri, {
      parsers: this.environment.formats.parsers,
      headers: mergedHeaders,
      body,
      ...{ ...defaultRequestInit, ...requestInit },
    })
    await this.__getApiDocumentation(response, headers)

    const responseStream = await response.quadStream()

    if (responseStream) {
      const dataset = await fromStream(this.environment.dataset(), responseStream)
      const rootResource = this.__findRootResource(dataset, response)
      let resources = this.resources
      if (operation.method?.toUpperCase() !== 'GET') {
        resources = this.resources.clone()
      }

      await resources.set(this.environment.namedNode(response.resourceUri), {
        dataset,
        rootResource,
        response,
      })

      return resources.get<T>(this.environment.namedNode(response.resourceUri))!
    }

    return {
      response,
    }
  }

  private async __getApiDocumentation(response: ResponseWrapper, headers: HeadersInit): Promise<void> {
    if (!response.apiDocumentationLink) {
      this.log(`Resource ${response.requestedUri} does not expose API Documentation link`)
      return
    }

    await this.loadDocumentation(response.apiDocumentationLink, headers)
  }

  private async __mergeHeaders(headers: Headers, { uri }: { uri: string }): Promise<Headers> {
    const defaultHeaders = typeof this.defaultHeaders === 'function' ? await this.defaultHeaders({ uri }) : this.defaultHeaders

    return merge(new this._headers(defaultHeaders), headers, this._headers)
  }

  private __findRootResource(dataset: D, response: ResponseWrapper): ResourceIdentifier | undefined {
    const candidateNodes = this.rootSelectors.reduce((candidates, [, getCandidate]) => {
      const candidate = getCandidate(this.environment, response, dataset)
      if (candidate && dataset.match(candidate).size) {
        candidates.add(candidate)
      }

      return candidates
    }, this.environment.termSet<ResourceIdentifier>())

    if (!candidateNodes.size) {
      return undefined
    }

    const candidates = [...candidateNodes].map(term => this.environment.clownface({ dataset, term }))

    return candidates.sort(byInProperties)[0].term
  }
}

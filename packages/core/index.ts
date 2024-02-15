/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DatasetCore, NamedNode, Stream, Quad, DatasetCoreFactory, DataFactory } from '@rdfjs/types'
import type { RdfResourceCore } from '@tpluscode/rdfine/RdfResource'
import type { ApiDocumentation, Operation, Resource } from '@rdfine/hydra'
import type { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import type { RdfineFactory, RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import type { GraphPointer } from 'clownface'
import type { Environment } from '@rdfjs/environment/Environment.js'
import type { TermMapFactory } from '@rdfjs/term-map/Factory.js'
import type ClownfaceFactory from 'clownface/Factory.js'
import type { FormatsFactory } from '@rdfjs/formats/Factory.js'
import type TermSetFactory from '@rdfjs/term-set/Factory.js'
import type { HydraFactory } from '@rdfine/hydra/Factory'

export type AllowedRequestInit = Omit<RequestInit, 'headers' | 'method' | 'body' | 'redirect'>

export type InvokedOperation = Pick<Operation, 'method'> & {
  target: Pick<Resource, 'id'>
}

interface Defaults<T> {
  (arg: { uri: string }): T | Promise<T>
}

export interface ResponseWrapper {
  /**
   * Gets the URI used to perform the request
   */
  readonly requestedUri: string

  /**
   * Gets the response content type, as advertised in response HTTP header
   */
  mediaType: string

  /**
   * Gets the URI identifying the ApiDocumentation resource if present in the response Link header
   */
  apiDocumentationLink: string | null

  /**
   * If the request was redirected, returns the target resource
   */
  redirectUrl: string | null

  effectiveUri: string

  resourceUri: string

  /**
   * Gets the actual XMLHttpResponse object which can be used to do custom processing
   */
  xhr: Response

  /**
   * Returns a URL which is the product of applying it
   * to the request base.
   *
   * If the parameter is already an absolute URI reference,
   * it will be returned unchanged
   */
  resolveUri(uri: string): string

  quadStream(): Stream | null
}

export interface ResourceStoreEntry<D extends DatasetCore> {
  response: ResponseWrapper
  dataset: D
  rootResource?: ResourceIdentifier
}

export interface ResourceRepresentation<D extends DatasetCore = DatasetCore, T extends RdfResourceCore<D> = Resource<D>> extends Iterable<Resource<D>> {
  /**
   * Gets the root of the representation or undefined if it cannot be determined
   */
  root: (Resource<D> & T) | null

  /**
   * Gets the number of resource within this representation
   */
  length: number

  /**
   * Indexer to look up any arbitrary resource by its id within the representation
   *
   * @param {string} uri Resource to find
   * @param {object} opts Options
   * @param {boolean} opts.allObjects Include resources which are only objects
   */
  get<T = RdfResourceCore>(uri: string, opts?: { allObjects?: boolean }): (T & Resource<D>) | undefined

  /**
   * Gets all resources of given RDF type from the representation
   * @param {string} classId RDF class identifier
   * @returns {Array<Resource>}
   */
  ofType<T = RdfResourceCore>(classId: string | NamedNode): (T & Resource<D>)[]
}

export interface HydraResponse<D extends DatasetCore = DatasetCore, T extends RdfResourceCore<D> = Resource<D>> {
  representation?: ResourceRepresentation<D, T>
  response?: ResponseWrapper
}

export interface ResourceStore<D extends DatasetCore> {
  factory: ResourceFactory<D, RdfResource<D>>
  get<T extends RdfResourceCore<any> = Resource<D>>(idOrPointer: NamedNode | GraphPointer): Required<HydraResponse<D, T>> | undefined
  set(uri: NamedNode, entry: ResourceStoreEntry<D>): void
  clone(): ResourceStore<D>
}

export interface ResourceCacheStrategy {
  shouldLoad(previous: Required<HydraResponse<DatasetCore, RdfResourceCore>>): boolean
  requestCacheHeaders(previous: Required<HydraResponse<DatasetCore, RdfResourceCore>>): HeadersInit | null
}

interface AlcaeusFactory<D extends DatasetCore> {
  // eslint-disable-next-line no-use-before-define
  hydra: HydraClient<D>
}

export type HydraEnvironment<D extends DatasetCore = DatasetCore> = Environment<
TermMapFactory |
TermSetFactory |
DataFactory |
FormatsFactory |
DatasetCoreFactory<Quad, Quad, D>|
ClownfaceFactory |
RdfineFactory |
HydraFactory |
AlcaeusFactory<D>>

export interface RootNodeCandidate {
  (env: HydraEnvironment, response: ResponseWrapper, dataset: DatasetCore): ResourceIdentifier | undefined
}

export interface HydraClient<D extends DatasetCore = DatasetCore> {
  log: (msg: string) => void
  baseUri?: string
  rootSelectors: [string, RootNodeCandidate][]

  loadResource<T extends RdfResourceCore<any> = Resource<D>>(uri: string | NamedNode, headers?: HeadersInit, request?: AllowedRequestInit): Promise<HydraResponse<D, T>>

  loadDocumentation(uri: string | NamedNode, headers?: HeadersInit, request?: AllowedRequestInit): Promise<ApiDocumentation<D> | null>

  invokeOperation<T extends RdfResourceCore<any> = Resource<D>>(operation: InvokedOperation, headers?: HeadersInit, body?: BodyInit, request?: AllowedRequestInit): Promise<HydraResponse<D, T>>

  defaultHeaders: HeadersInit | Defaults<HeadersInit>
  defaultRequestInit: AllowedRequestInit | Defaults<AllowedRequestInit>
  resources: ResourceStore<D>
  apiDocumentations: ResourceRepresentation<D, ApiDocumentation<D>>[]
  cacheStrategy: ResourceCacheStrategy
}

import { namedNode } from '@rdf-esm/data-model'
import TermMap from '@rdf-esm/term-map'
import cf from 'clownface'
import type { GraphPointer } from 'clownface'
import type { EventEmitter } from 'events'
import type { SinkMap } from '@rdf-esm/sink-map'
import TermSet from '@rdf-esm/term-set'
import type { RdfResource } from '@tpluscode/rdfine'
import type { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import type { DatasetCore, NamedNode, Stream } from 'rdf-js'
import FetchUtil from './FetchUtil'
import { merge } from './helpers/MergeHeaders'
import * as DefaultCacheStrategy from './ResourceCacheStrategy'
import type { ResourceCacheStrategy } from './ResourceCacheStrategy'
import type { ResourceRepresentation } from './ResourceRepresentation'
import type { ApiDocumentation, HydraResource } from './Resources'
import type { Operation } from './Resources/Operation'
import type { ResourceStore } from './ResourceStore'
import type { ResponseWrapper } from './ResponseWrapper'
import type { RootNodeCandidate } from './RootSelectors'

type InvokedOperation = Pick<Operation, 'method'> & {
    target: Pick<HydraResource, 'id'>
}

export interface HydraResponse<D extends DatasetCore = DatasetCore, T extends RdfResource<D> = HydraResource<D>> {
    representation?: ResourceRepresentation<D, T>
    response?: ResponseWrapper
}

function byInProperties(left: GraphPointer, right: GraphPointer) {
    return left.in().terms.length - right.in().terms.length
}

export interface HydraClient<D extends DatasetIndexed = DatasetIndexed> {
    log: (msg: string) => void
    baseUri?: string
    rootSelectors: [string, RootNodeCandidate][]
    parsers: SinkMap<EventEmitter, Stream>
    loadResource<T extends RdfResource<D> = HydraResource<D>>(uri: string | NamedNode, headers?: HeadersInit): Promise<HydraResponse<D, T>>
    loadDocumentation(uri: string | NamedNode, headers?: HeadersInit): Promise<ApiDocumentation<D> | null>
    invokeOperation(operation: InvokedOperation, headers?: HeadersInit, body?: BodyInit): Promise<HydraResponse<D>>
    defaultHeaders: HeadersInit | (() => HeadersInit | Promise<HeadersInit>)
    resources: ResourceStore<D>
    apiDocumentations: ResourceRepresentation<D, ApiDocumentation<D>>[]
    cacheStrategy: ResourceCacheStrategy
}

interface AlcaeusInit<D extends DatasetIndexed> {
    rootSelectors: [string, RootNodeCandidate][]
    resources: ResourceStore<D>
    datasetFactory: () => D
    parsers?: SinkMap<EventEmitter, Stream>
    fetch: typeof fetch
    Headers: typeof Headers
}

export class Alcaeus<D extends DatasetIndexed> implements HydraClient<D> {
    public baseUri?: string = undefined;

    public rootSelectors: [string, RootNodeCandidate][];

    public parsers: SinkMap<EventEmitter, Stream>;

    public defaultHeaders: HeadersInit | (() => HeadersInit | Promise<HeadersInit>) = {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public log: (msg: string) => void = () => {}

    public cacheStrategy: ResourceCacheStrategy = { ...DefaultCacheStrategy }

    public readonly resources: ResourceStore<D>

    private readonly __apiDocumentations: Map<NamedNode, ResourceRepresentation<D, ApiDocumentation<D>>> = new TermMap()

    private readonly datasetFactory: () => D;

    private readonly _fetch: ReturnType<typeof FetchUtil>

    private readonly _headers: typeof Headers

    public constructor(init: AlcaeusInit<D>) {
        const { resources, datasetFactory, rootSelectors, parsers, fetch } = init

        if (!parsers) throw new Error('No parsers provided. Consider @rdfjs/formats-common or @rdf-esm/formats-common packages')

        this.rootSelectors = rootSelectors
        this.resources = resources
        this.datasetFactory = datasetFactory
        this.parsers = parsers
        this._headers = init.Headers
        this._fetch = FetchUtil(fetch, this._headers)
    }

    public get apiDocumentations() {
        return [...this.__apiDocumentations.values()]
    }

    public async loadResource <T extends RdfResource<D>>(id: string | NamedNode, headers: HeadersInit = {}, dereferenceApiDocumentation = true): Promise<HydraResponse<D, T>> {
        const term = typeof id === 'string' ? namedNode(id) : id
        let requestHeaders = new this._headers(headers)

        const previousResource = this.resources.get(term)
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

        const response = await this._fetch.resource(term.value, {
            parsers: this.parsers,
            baseUri: this.baseUri,
            headers: await this.__mergeHeaders(requestHeaders),
        })

        if (previousResource && response.xhr.status === 304) {
            return previousResource
        }

        const stream = await response.quadStream()
        if (stream) {
            const dataset = await this.datasetFactory().import(stream)
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

            return resources.get(term)!
        }

        return {
            response,
        }
    }

    public async loadDocumentation(id: string | NamedNode, headers: HeadersInit = {}): Promise<ApiDocumentation<D> | null> {
        const term = typeof id === 'string' ? namedNode(id) : id

        const resource = await this.loadResource<ApiDocumentation<D>>(term, headers, false)
        if (resource && resource.representation) {
            this.__apiDocumentations.set(term, resource.representation)
            const apiDocs = resource.representation.root
            if (apiDocs && 'classes' in apiDocs) {
                return apiDocs
            }
        }

        return null
    }

    public async invokeOperation(operation: InvokedOperation, headers: HeadersInit, body?: BodyInit): Promise<HydraResponse<D>> {
        const mergedHeaders = await this.__mergeHeaders(new this._headers(headers))
        const uri = operation.target.id.value

        const response = await this._fetch.operation(operation.method, uri, {
            parsers: this.parsers,
            headers: mergedHeaders,
            body,
            baseUri: this.baseUri,
        })
        await this.__getApiDocumentation(response, headers)

        const responseStream = await response.quadStream()

        if (responseStream) {
            const dataset = await this.datasetFactory().import(responseStream)
            const rootResource = this.__findRootResource(dataset, response)
            let resources = this.resources
            if (operation.method.toUpperCase() !== 'GET') {
                resources = this.resources.clone()
            }

            await resources.set(namedNode(response.resourceUri), {
                dataset,
                rootResource,
                response,
            })

            return resources.get(namedNode(response.resourceUri))!
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

    private async __mergeHeaders(headers: Headers): Promise<Headers> {
        const defaultHeaders = typeof this.defaultHeaders === 'function' ? await this.defaultHeaders() : this.defaultHeaders

        return merge(new this._headers(defaultHeaders), headers, this._headers)
    }

    private __findRootResource(dataset: D, response: ResponseWrapper): NamedNode | undefined {
        const candidateNodes = this.rootSelectors.reduce((candidates, [, getCandidate]) => {
            const candidate = getCandidate(response)
            if (candidate && dataset.match(candidate).length) {
                candidates.add(candidate)
            }

            return candidates
        }, new TermSet<NamedNode>())

        if (!candidateNodes.size) {
            return undefined
        }

        const candidates = [...candidateNodes].map(term => cf({ dataset, term }))

        return candidates.sort(byInProperties)[0].term
    }
}

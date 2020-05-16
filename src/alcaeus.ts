import cf, { SingleContextClownface } from 'clownface'
import { EventEmitter } from 'events'
import Parsers, { SinkMap } from '@rdfjs/sink-map'
import TermSet from '@rdfjs/term-set'
import { RdfResource } from '@tpluscode/rdfine'
import { Headers } from './fetch'
import { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import { NamedNode, Stream } from 'rdf-js'
import * as FetchUtil from './FetchUtil'
import { merge } from './helpers/MergeHeaders'
import { ResourceRepresentation } from './ResourceRepresentation'
import { ApiDocumentation, HydraResource } from './Resources'
import { Operation } from './Resources/Operation'
import { ResourceStore } from './ResourceStore'
import { ResponseWrapper } from './ResponseWrapper'
import { RootNodeCandidate } from './RootSelectors'

type InvokedOperation = Pick<Operation, 'method'> & {
    target: Pick<HydraResource, 'id'>
}

export interface HydraResponse<T extends RdfResource = HydraResource> {
    representation?: ResourceRepresentation<T>
    response?: ResponseWrapper
}

function byInProperties(left: SingleContextClownface, right: SingleContextClownface) {
    return left.in().terms.length - right.in().terms.length
}

export interface HydraClient<D extends DatasetIndexed = DatasetIndexed> {
    log: (msg: string) => void
    baseUri?: string
    rootSelectors: [string, RootNodeCandidate][]
    parsers: SinkMap<EventEmitter, Stream>
    loadResource<T extends RdfResource = HydraResource>(uri: string | NamedNode, headers?: HeadersInit): Promise<HydraResponse<T>>
    loadDocumentation(uri: string | NamedNode, headers?: HeadersInit): Promise<ApiDocumentation | null>
    invokeOperation(operation: InvokedOperation, headers?: HeadersInit, body?: BodyInit): Promise<HydraResponse>
    defaultHeaders: HeadersInit | (() => HeadersInit)
    resources: ResourceStore<D>
    apiDocumentations: ResourceRepresentation<ApiDocumentation>[]
}

interface AlcaeusInit<R extends HydraResource = never, D extends DatasetIndexed = DatasetIndexed> {
    rootSelectors: [string, RootNodeCandidate][]
    resources: ResourceStore<D>
    datasetFactory: () => D
}

export class Alcaeus<R extends HydraResource = never, D extends DatasetIndexed = DatasetIndexed> implements HydraClient<D> {
    public baseUri?: string = undefined;

    public rootSelectors: [string, RootNodeCandidate][];

    public parsers = new Parsers<EventEmitter, Stream>();

    public defaultHeaders: HeadersInit | (() => HeadersInit) = {}

    public log: (msg: string) => void = () => {}

    public readonly resources: ResourceStore<D>

    private readonly __apiDocumentations: Map<string, ResourceRepresentation<ApiDocumentation>> = new Map()

    private readonly datasetFactory: () => D;

    public constructor({ resources, datasetFactory, rootSelectors }: AlcaeusInit<R, D>) {
        this.rootSelectors = rootSelectors
        this.resources = resources
        this.datasetFactory = datasetFactory
    }

    public get apiDocumentations() {
        return [...this.__apiDocumentations.values()]
    }

    public async loadResource <T extends RdfResource>(id: string | NamedNode, headers: HeadersInit = {}, dereferenceApiDocumentation = true): Promise<HydraResponse<T>> {
        const uri = typeof id === 'string' ? id : id.value

        const response = await FetchUtil.fetchResource(uri, {
            parsers: this.parsers,
            baseUri: this.baseUri,
            headers: this.__mergeHeaders(new Headers(headers)),
        })

        const stream = await response.quadStream()
        if (stream) {
            const dataset = await this.datasetFactory().import(stream)
            const rootResource = this.__findRootResource(dataset, response)
            await this.resources.set(response.resourceUri, dataset, rootResource)

            if (dereferenceApiDocumentation) {
                await this.__getApiDocumentation(response, headers)
            }
        }

        return {
            representation: this.resources.get(response.resourceUri),
            response,
        }
    }

    public async loadDocumentation(id: string | NamedNode, headers: HeadersInit = {}): Promise<ApiDocumentation | null> {
        const uri: string = typeof id === 'string' ? id : id.value

        const { representation } = await this.loadResource<ApiDocumentation>(uri, headers, false)
        if (representation) {
            this.__apiDocumentations.set(uri, representation)
            const apiDocs = representation.root
            if (apiDocs && 'classes' in apiDocs) {
                return apiDocs
            }
        }

        return null
    }

    public async invokeOperation(operation: InvokedOperation, headers: HeadersInit, body?: BodyInit): Promise<HydraResponse> {
        const mergedHeaders = this.__mergeHeaders(new Headers(headers))
        const uri = operation.target.id.value

        const response = await FetchUtil.invokeOperation(operation.method, uri, {
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

            await resources.set(response.resourceUri, dataset, rootResource)
            return {
                response,
                representation: resources.get(response.resourceUri),
            }
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

    private __mergeHeaders(headers: Headers): Headers {
        const defaultHeaders = typeof this.defaultHeaders === 'function' ? this.defaultHeaders() : this.defaultHeaders

        return merge(new Headers(defaultHeaders), headers)
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

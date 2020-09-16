import cf from 'clownface'
import type { GraphPointer } from 'clownface'
import type { EventEmitter } from 'events'
import type { SinkMap } from '@rdf-esm/sink-map'
import TermSet from '@rdf-esm/term-set'
import type { RdfResource } from '@tpluscode/rdfine'
import { Headers } from './fetch'
import type { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import type { NamedNode, Stream } from 'rdf-js'
import * as FetchUtil from './FetchUtil'
import { merge } from './helpers/MergeHeaders'
import type { ResourceRepresentation } from './ResourceRepresentation'
import type { ApiDocumentation, HydraResource } from './Resources'
import type { Operation } from './Resources/Operation'
import type { ResourceStore } from './ResourceStore'
import type { ResponseWrapper } from './ResponseWrapper'
import type { RootNodeCandidate } from './RootSelectors'

type InvokedOperation = Pick<Operation, 'method'> & {
    target: Pick<HydraResource, 'id'>
}

export interface HydraResponse<T extends RdfResource = HydraResource> {
    representation?: ResourceRepresentation<T>
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
    loadResource<T extends RdfResource = HydraResource>(uri: string | NamedNode, headers?: HeadersInit): Promise<HydraResponse<T>>
    loadDocumentation(uri: string | NamedNode, headers?: HeadersInit): Promise<ApiDocumentation | null>
    invokeOperation(operation: InvokedOperation, headers?: HeadersInit, body?: BodyInit): Promise<HydraResponse>
    defaultHeaders: HeadersInit | (() => HeadersInit | Promise<HeadersInit>)
    resources: ResourceStore<D>
    apiDocumentations: ResourceRepresentation<ApiDocumentation>[]
}

interface AlcaeusInit<D extends DatasetIndexed = DatasetIndexed> {
    rootSelectors: [string, RootNodeCandidate][]
    resources: ResourceStore<D>
    datasetFactory: () => D
    parsers?: SinkMap<EventEmitter, Stream>
}

export class Alcaeus<D extends DatasetIndexed = DatasetIndexed> implements HydraClient<D> {
    public baseUri?: string = undefined;

    public rootSelectors: [string, RootNodeCandidate][];

    public parsers: SinkMap<EventEmitter, Stream>;

    public defaultHeaders: HeadersInit | (() => HeadersInit | Promise<HeadersInit>) = {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public log: (msg: string) => void = () => {}

    public readonly resources: ResourceStore<D>

    private readonly __apiDocumentations: Map<string, ResourceRepresentation<ApiDocumentation>> = new Map()

    private readonly datasetFactory: () => D;

    public constructor({ resources, datasetFactory, rootSelectors, parsers }: AlcaeusInit<D>) {
        if (!parsers) throw new Error('No parsers provided. Consider @rdfjs/formats-common or @rdf-esm/formats-common packages')

        this.rootSelectors = rootSelectors
        this.resources = resources
        this.datasetFactory = datasetFactory
        this.parsers = parsers
    }

    public get apiDocumentations() {
        return [...this.__apiDocumentations.values()]
    }

    public async loadResource <T extends RdfResource>(id: string | NamedNode, headers: HeadersInit = {}, dereferenceApiDocumentation = true): Promise<HydraResponse<T>> {
        const uri = typeof id === 'string' ? id : id.value

        const response = await FetchUtil.fetchResource(uri, {
            parsers: this.parsers,
            baseUri: this.baseUri,
            headers: await this.__mergeHeaders(new Headers(headers)),
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
        const mergedHeaders = await this.__mergeHeaders(new Headers(headers))
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

    private async __mergeHeaders(headers: Headers): Promise<Headers> {
        const defaultHeaders = typeof this.defaultHeaders === 'function' ? await this.defaultHeaders() : this.defaultHeaders

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

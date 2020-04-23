import { EventEmitter } from 'events'
import Parsers, { SinkMap } from '@rdfjs/sink-map'
import { RdfResource, ResourceFactory } from '@tpluscode/rdfine'
import createDataset from 'rdf-dataset-indexed'
import $rdf from '@rdfjs/data-model'
import { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import { DatasetCore, NamedNode, Stream } from 'rdf-js'
import TripleToQuadTransform from 'rdf-transform-triple-to-quad'
import * as FetchUtil from './FetchUtil'
import { patchResponseBody } from './helpers/fetchToStream'
import { merge } from './helpers/MergeHeaders'
import { HydraResponse, create } from './HydraResponse'
import RdfProcessor from './RdfProcessor'
import { ApiDocumentation, HydraResource } from './Resources'
import { Operation } from './Resources/Operation'
import { ResponseWrapper } from './ResponseWrapper'
import { RootSelector } from './RootSelectors'

type InvokedOperation = Pick<Operation, 'method'> & {
    target: Pick<HydraResource, 'id'>;
}

export interface HydraClient<D extends DatasetIndexed = DatasetIndexed> {
    baseUri?: string;
    rootSelectors: RootSelector[];
    parsers: SinkMap<EventEmitter, Stream>;
    loadResource<T extends RdfResource = HydraResource>(uri: string | NamedNode, headers?: HeadersInit): Promise<HydraResponse<T>>;
    loadDocumentation(uri: string | NamedNode, headers?: HeadersInit): Promise<ApiDocumentation | null>;
    invokeOperation(operation: InvokedOperation, headers?: HeadersInit, body?: BodyInit): Promise<HydraResponse>;
    defaultHeaders: HeadersInit | (() => HeadersInit);
    dataset: D;
    factory: ResourceFactory;
    apiDocumentations: ApiDocumentation[];
}

function stripContentTypeParameters (mediaType: string) {
    return mediaType.split(';').shift() || ''
}

async function parseResponse (uri: string, alcaeus: HydraClient, response: ResponseWrapper): Promise<Stream | null> {
    const quadStream = alcaeus.parsers.import(stripContentTypeParameters(response.mediaType), patchResponseBody(response.xhr))
    if (quadStream == null) {
        console.warn(`No parser found for media type ${response.mediaType}`)
        return null
    }

    const graph = $rdf.namedNode(uri)
    const parsedTriples = await RdfProcessor.process(quadStream)
    return parsedTriples.pipe(new TripleToQuadTransform(graph))
}

const addOrReplaceGraph = async (
    alcaeus: HydraClient,
    response: ResponseWrapper,
    uri: string): Promise<void> => {
    const graph = $rdf.namedNode(uri)
    const parsedTriples = await parseResponse(uri, alcaeus, response)

    if (!parsedTriples) return

    await alcaeus.dataset
        .removeMatches(undefined, undefined, undefined, graph)
        .import(parsedTriples)
}

interface AlcaeusInit<R extends HydraResource = never, D extends DatasetIndexed = DatasetIndexed> {
    rootSelectors: RootSelector[];
    factory: ResourceFactory<DatasetCore, R>;
    dataset: D;
}

export class Alcaeus<R extends HydraResource = never, D extends DatasetIndexed = DatasetIndexed> implements HydraClient<D> {
    public baseUri?: string = undefined;

    public rootSelectors: RootSelector[];

    public parsers = new Parsers<EventEmitter, Stream>();

    public defaultHeaders: HeadersInit | (() => HeadersInit) = {}

    public readonly dataset: D

    public readonly factory: ResourceFactory<DatasetCore, R>

    private readonly __apiDocumentations: Map<string, ApiDocumentation> = new Map()

    public constructor ({ rootSelectors, factory, dataset }: AlcaeusInit) {
        this.rootSelectors = rootSelectors
        this.factory = factory
        this.dataset = dataset || createDataset() as any
    }

    public get apiDocumentations () {
        return [...this.__apiDocumentations.values()]
    }

    public async loadResource <T extends RdfResource> (id: string | NamedNode, headers: HeadersInit = {}, dereferenceApiDocumentation = true): Promise<HydraResponse<T>> {
        const uri = typeof id === 'string' ? id : id.value

        const response = await FetchUtil.fetchResource(uri, {
            parsers: this.parsers,
            baseUri: this.baseUri,
            headers: this.__mergeHeaders(new Headers(headers)),
        })
        await addOrReplaceGraph(this, response, uri)
        if (dereferenceApiDocumentation) {
            await this.__getApiDocumentation(response, headers)
        }

        return create(uri, response, this.dataset, this.factory, this)
    }

    public async loadDocumentation (id: string | NamedNode, headers: HeadersInit = {}): Promise<ApiDocumentation | null> {
        const uri: string = typeof id === 'string' ? id : id.value

        const response = await this.loadResource<ApiDocumentation>(uri, headers, false)
        const apiDocs = response.root
        if (apiDocs && 'classes' in apiDocs) {
            this.__apiDocumentations.set(uri, apiDocs)
            return apiDocs
        }

        return null
    }

    public async invokeOperation (operation: InvokedOperation, headers: HeadersInit, body?: BodyInit): Promise<HydraResponse> {
        const mergedHeaders = this.__mergeHeaders(new Headers(headers))
        const uri = operation.target.id.value

        const response = await FetchUtil.invokeOperation(operation.method, uri, {
            parsers: this.parsers,
            headers: mergedHeaders,
            body,
            baseUri: this.baseUri,
        })
        await this.__getApiDocumentation(response, headers)

        if (operation.method.toUpperCase() === 'GET') {
            await addOrReplaceGraph(this, response, uri)
            return create(uri, response, this.dataset, this.factory, this)
        }

        const parsedResponse = await parseResponse(uri, this, response)
        if (!parsedResponse) {
            return create(uri, response, this.dataset, this.factory, this)
        }

        const dataset = await this.dataset.clone().import(parsedResponse)
        return create(uri, response, dataset, this.factory, this)
    }

    private async __getApiDocumentation (response: ResponseWrapper, headers: HeadersInit): Promise<void> {
        if (!response.apiDocumentationLink) {
            console.warn(`Resource ${response.requestedUri} does not expose API Documentation link`)
            return
        }

        await this.loadDocumentation(response.apiDocumentationLink, headers)
    }

    private __mergeHeaders (headers: Headers): Headers {
        const defaultHeaders = typeof this.defaultHeaders === 'function' ? this.defaultHeaders() : this.defaultHeaders

        return merge(new Headers(defaultHeaders), headers)
    }
}

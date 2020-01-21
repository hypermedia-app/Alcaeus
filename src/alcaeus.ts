import { RdfResource, ResourceFactory } from '@tpluscode/rdfine'
import $rdf from 'rdf-ext'
import DatasetExt from 'rdf-ext/lib/Dataset'
import { NamedNode } from 'rdf-js'
import TripleToQuadTransform from 'rdf-transform-triple-to-quad'
import * as FetchUtil from './FetchUtil'
import { merge } from './helpers/MergeHeaders'
import { HydraResponse, create } from './HydraResponse'
import { MediaTypeProcessor } from './MediaTypeProcessors/RdfProcessor'
import { ApiDocumentation, HydraResource } from './Resources'
import { Operation } from './Resources/Operation'
import { ResponseWrapper } from './ResponseWrapper'
import { RootSelector } from './RootSelectors'

export interface HydraClient {
    rootSelectors: RootSelector[];
    mediaTypeProcessors: { [name: string]: MediaTypeProcessor };
    loadResource(uri: string, headers?: HeadersInit): Promise<HydraResponse>;
    loadDocumentation (uri: string, headers: HeadersInit): void;
    invokeOperation(operation: Operation, uri: string, body?: BodyInit, headers?: string | HeadersInit): Promise<HydraResponse>;
    defaultHeaders: HeadersInit | (() => HeadersInit);
    dataset: DatasetExt;
    factory: ResourceFactory;
    apiDocumentations: Promise<ApiDocumentation[]>;
}

const addOrReplaceGraph = async (
    alcaeus: HydraClient,
    response: ResponseWrapper,
    uri: string): Promise<void> => {
    const suitableProcessor = Object.values(alcaeus.mediaTypeProcessors)
        .find((processor) => processor.canProcess(response.mediaType))

    if (!suitableProcessor) {
        console.warn(`No processor found for media type ${response.mediaType}`)
        return
    }

    const graph = $rdf.namedNode(uri)
    const parsedTriples = await suitableProcessor.process(uri, response)
    await alcaeus.dataset
        .removeMatches(undefined, undefined, undefined, graph)
        .import(parsedTriples.pipe(new TripleToQuadTransform(graph)))
}

export class Alcaeus<R extends HydraResource> implements HydraClient {
    public rootSelectors: RootSelector[];

    public mediaTypeProcessors: { [name: string]: MediaTypeProcessor };

    public defaultHeaders: HeadersInit | (() => HeadersInit) = {}

    public readonly dataset: DatasetExt = $rdf.dataset()

    public readonly factory: ResourceFactory<R>

    private readonly __documentationPromises: Map<string, Promise<HydraResponse>> = new Map()

    public constructor (
        rootSelectors: RootSelector[],
        mediaTypeProcessors: { [name: string]: MediaTypeProcessor },
        factory: ResourceFactory<R>
    ) {
        this.rootSelectors = rootSelectors
        this.mediaTypeProcessors = mediaTypeProcessors
        this.factory = factory
    }

    public get apiDocumentations () {
        return Promise.all(this.__documentationPromises.values())
            .then(responses => responses.map<ApiDocumentation | RdfResource | null>(r => r.root))
            .then(docs => {
                return docs.reduce((notNull, doc) => {
                    if (doc && 'loadEntrypoint' in doc) {
                        notNull.push(doc)
                    }

                    return notNull
                },
                [] as ApiDocumentation[])
            })
    }

    public async loadResource (id: string | NamedNode, headers: HeadersInit = {}): Promise<HydraResponse> {
        const uri = typeof id === 'string' ? id : id.value

        const response = await FetchUtil.fetchResource(uri, this.__mergeHeaders(new Headers(headers)))
        await addOrReplaceGraph(this, response, uri)
        this.__getApiDocumentation(response, headers)

        return create(uri, response, this)
    }

    public loadDocumentation (uri: string, headers: HeadersInit = {}) {
        const request = FetchUtil.fetchResource(uri, this.__mergeHeaders(new Headers(headers)))
            .then(async response => {
                await addOrReplaceGraph(this, response, uri)
                return response
            })
            .then(response => create(uri, response, this))

        this.__documentationPromises.set(uri, request)
    }

    public async invokeOperation (operation: Pick<Operation, 'method'>, uri: string, body?: BodyInit, headers: HeadersInit = {}): Promise<HydraResponse> {
        const mergedHeaders = this.__mergeHeaders(new Headers(headers))

        const response = await FetchUtil.invokeOperation(operation.method, uri, body, mergedHeaders)
        this.__getApiDocumentation(response, headers)

        return create(uri, response, this)
    }

    private __getApiDocumentation (response: ResponseWrapper, headers: HeadersInit) {
        if (!response.apiDocumentationLink) {
            console.warn(`Resource ${response.requestedUri} does not expose API Documentation link`)
            return
        }

        this.loadDocumentation(response.apiDocumentationLink, headers)
    }

    private __mergeHeaders (headers: Headers): Headers {
        const defaultHeaders = typeof this.defaultHeaders === 'function' ? this.defaultHeaders() : this.defaultHeaders

        return merge(new Headers(defaultHeaders), headers)
    }
}

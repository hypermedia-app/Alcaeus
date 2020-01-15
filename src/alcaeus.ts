import { ResourceFactory } from '@tpluscode/rdfine'
import $rdf from 'rdf-ext'
import DatasetExt from 'rdf-ext/lib/Dataset'
import TripleToQuadTransform from 'rdf-transform-triple-to-quad'
import * as FetchUtil from './FetchUtil'
import { merge } from './helpers/MergeHeaders'
import { IHydraResponse, create } from './HydraResponse'
import { IMediaTypeProcessor } from './MediaTypeProcessors/RdfProcessor'
import { IOperation } from './Resources'
import { IResponseWrapper } from './ResponseWrapper'
import { IRootSelector } from './RootSelectors'

export interface IHydraClient {
    rootSelectors: IRootSelector[];
    mediaTypeProcessors: { [name: string]: IMediaTypeProcessor };
    loadResource(uri: string, headers?: HeadersInit): Promise<IHydraResponse>;
    loadDocumentation (uri: string, headers: HeadersInit): void;
    invokeOperation(operation: IOperation, uri: string, body?: BodyInit, headers?: string | HeadersInit): Promise<IHydraResponse>;
    defaultHeaders: HeadersInit | (() => HeadersInit);
    dataset: DatasetExt;
    factory: ResourceFactory;
    documentationLoaded: Promise<IHydraResponse[]>;
}

const addOrReplaceGraph = async (
    alcaeus: IHydraClient,
    response: IResponseWrapper,
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

export class Alcaeus implements IHydraClient {
    public rootSelectors: IRootSelector[];

    public mediaTypeProcessors: { [name: string]: IMediaTypeProcessor };

    public defaultHeaders: HeadersInit | (() => HeadersInit) = {}

    public readonly dataset: DatasetExt = $rdf.dataset()

    public readonly factory: ResourceFactory

    private readonly __documentationPromises: Map<string, Promise<IHydraResponse>> = new Map()

    public constructor (
        rootSelectors: IRootSelector[],
        mediaTypeProcessors: { [name: string]: IMediaTypeProcessor },
        factory: ResourceFactory
    ) {
        this.rootSelectors = rootSelectors
        this.mediaTypeProcessors = mediaTypeProcessors
        this.factory = factory
    }

    public get documentationLoaded () {
        return Promise.all(this.__documentationPromises.values())
    }

    public async loadResource (uri: string, headers: HeadersInit = {}): Promise<IHydraResponse> {
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

    public async invokeOperation (operation: IOperation, uri: string, body?: BodyInit, headers: string | HeadersInit = {}): Promise<IHydraResponse> {
        if (typeof headers === 'string') {
            headers = {
                'content-type': headers,
            }

            // TODO: remove in 1.0
            console.warn('DEPRECATION NOTICE: passing content type as string will be removed in version 1.0')
        }

        const mergedHeaders = this.__mergeHeaders(new Headers(headers))

        const response = await FetchUtil.invokeOperation(operation.method, uri, body, mergedHeaders)
        this.__getApiDocumentation(response, headers)

        return create(uri, response, this)
    }

    private __getApiDocumentation (response: IResponseWrapper, headers: HeadersInit) {
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

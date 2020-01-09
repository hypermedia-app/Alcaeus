import { ResourceFactory } from '@tpluscode/rdfine'
import $rdf from 'rdf-ext'
import DatasetExt from 'rdf-ext/lib/Dataset'
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
    invokeOperation(operation: IOperation, uri: string, body?: BodyInit, headers?: string | HeadersInit): Promise<IHydraResponse>;
    defaultHeaders: HeadersInit | (() => HeadersInit);
    dataset: DatasetExt;
    factory: ResourceFactory;
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
    const dataset = await suitableProcessor.process(uri, response)
    await alcaeus.dataset
        .removeMatches(undefined, undefined, undefined, graph)
        .import(dataset.map(quad => {
            return $rdf.quad(
                quad.subject,
                quad.predicate,
                quad.object,
                graph,
            )
        }).toStream())
}

async function getApiDocumentation (this: Alcaeus, response: IResponseWrapper, headers): Promise<void> {
    if (!response.apiDocumentationLink) {
        console.warn(`Resource ${response.requestedUri} does not expose API Documentation link`)
        return
    }

    await this.loadDocumentation(response.apiDocumentationLink, headers)
}

export class Alcaeus implements IHydraClient {
    public rootSelectors: IRootSelector[];

    public mediaTypeProcessors: { [name: string]: IMediaTypeProcessor };

    public defaultHeaders: HeadersInit | (() => HeadersInit) = {}

    public readonly dataset: DatasetExt = $rdf.dataset()

    public readonly factory: ResourceFactory

    public constructor (
        rootSelectors: IRootSelector[],
        mediaTypeProcessors: { [name: string]: IMediaTypeProcessor },
        factory: ResourceFactory
    ) {
        this.rootSelectors = rootSelectors
        this.mediaTypeProcessors = mediaTypeProcessors
        this.factory = factory
    }

    public async loadResource (uri: string, headers: HeadersInit = {}): Promise<IHydraResponse> {
        const response = await FetchUtil.fetchResource(uri, this.__mergeHeaders(new Headers(headers)))
        await addOrReplaceGraph(this, response, uri)
        getApiDocumentation.call(this, response, headers)

        return create(uri, response, this)
    }

    public async loadDocumentation (uri: string, headers: HeadersInit = {}) {
        const response = await FetchUtil.fetchResource(uri, this.__mergeHeaders(new Headers(headers)))
        await addOrReplaceGraph(this, response, uri)
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
        getApiDocumentation.call(this, response, headers)

        return create(uri, response, this)
    }

    private __mergeHeaders (headers: Headers): Headers {
        const defaultHeaders = typeof this.defaultHeaders === 'function' ? this.defaultHeaders() : this.defaultHeaders

        return merge(new Headers(defaultHeaders), headers)
    }
}

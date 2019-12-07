// tslint:disable no-console
import { Core } from './Constants'
import * as FetchUtil from './FetchUtil'
import { merge } from './helpers/MergeHeaders'
import { IHydraResponse, create } from './HydraResponse'
import { IMediaTypeProcessor } from './MediaTypeProcessors/RdfProcessor'
import { ApiDocumentation, IOperation } from './Resources'
import { IResponseWrapper } from './ResponseWrapper'
import { IRootSelector } from './RootSelectors'

export interface IHydraClient {
    rootSelectors: IRootSelector[];
    mediaTypeProcessors: { [name: string]: IMediaTypeProcessor };
    loadResource(uri: string, headers?: HeadersInit): Promise<IHydraResponse>;
    invokeOperation(operation: IOperation, uri: string, body?: BodyInit, headers?: string | HeadersInit): Promise<IHydraResponse>;
    defaultHeaders: HeadersInit | (() => HeadersInit);
}

const getHydraResponse = async (
    alcaeus: IHydraClient,
    response: IResponseWrapper,
    uri: string,
    apiDocumentation?: ApiDocumentation): Promise<IHydraResponse> => {
    const suitableProcessor = Object.values(alcaeus.mediaTypeProcessors)
        .find((processor) => processor.canProcess(response.mediaType))

    if (suitableProcessor) {
        const graph = await suitableProcessor.process(alcaeus, uri, response, apiDocumentation)
        return create(uri, response, graph, alcaeus.rootSelectors)
    }

    console.warn(`No processor found for media type ${response.mediaType}`)

    return create(uri, response)
}

function getApiDocumentation (this: Alcaeus, response: IResponseWrapper, headers): Promise<ApiDocumentation | null> {
    if (response.apiDocumentationLink) {
        return this.loadDocumentation(response.apiDocumentationLink, headers)
    } else {
        console.warn(`Resource ${response.requestedUri} does not expose API Documentation link`)

        return Promise.resolve(null)
    }
}

export class Alcaeus implements IHydraClient {
    public rootSelectors: IRootSelector[];

    public mediaTypeProcessors: { [name: string]: IMediaTypeProcessor };

    public defaultHeaders: HeadersInit | (() => HeadersInit) = {}

    public constructor (rootSelectors: IRootSelector[], mediaTypeProcessors: { [name: string]: IMediaTypeProcessor }) {
        this.rootSelectors = rootSelectors
        this.mediaTypeProcessors = mediaTypeProcessors
    }

    public async loadResource (uri: string, headers: HeadersInit = {}): Promise<IHydraResponse> {
        const response = await FetchUtil.fetchResource(uri, this.__mergeHeaders(new Headers(headers)))

        const apiDocumentation = await getApiDocumentation.call(this, response, headers)

        if (apiDocumentation) {
            return getHydraResponse(this, response, uri, apiDocumentation)
        }

        return getHydraResponse(this, response, uri)
    }

    public async loadDocumentation (uri: string, headers: HeadersInit = {}) {
        try {
            const response = await FetchUtil.fetchResource(uri, this.__mergeHeaders(new Headers(headers)))
            const representation = await getHydraResponse(this, response, uri)
            const resource = representation.root
            if (!resource) {
                console.warn('Could not determine root resource')
                return null
            }
            const resourceType = resource['@type']

            let resourceHasApiDocType

            if (Array.isArray(resourceType)) {
                resourceHasApiDocType = resourceType.includes(Core.Vocab('ApiDocumentation'))
            } else {
                resourceHasApiDocType = resourceType === Core.Vocab('ApiDocumentation')
            }

            if (resourceHasApiDocType === false) {
                console.warn(`The resource ${uri} does not appear to be an API Documentation`)
            }

            return resource as any as ApiDocumentation
        } catch (e) {
            console.warn(`Failed to load ApiDocumentation from ${uri}`)
            console.warn(e)
            console.warn(e.stack)
            return null
        }
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
        const apiDocumentation = await getApiDocumentation.call(this, response, mergedHeaders)

        if (apiDocumentation) {
            return getHydraResponse(this, response, uri, apiDocumentation)
        }

        return getHydraResponse(this, response, uri)
    }

    private __mergeHeaders (headers: Headers): Headers {
        const defaultHeaders = typeof this.defaultHeaders === 'function' ? this.defaultHeaders() : this.defaultHeaders

        return merge(new Headers(defaultHeaders), headers)
    }
}

// tslint:disable no-console
import { Core } from './Constants'
import * as FetchUtil from './FetchUtil'
import { IHydraResponse, create } from './HydraResponse'
import { IMediaTypeProcessor } from './MediaTypeProcessors/RdfProcessor'
import { ApiDocumentation, IOperation } from './Resources'
import { IResponseWrapper } from './ResponseWrapper'
import { IRootSelector } from './RootSelectors'

export interface IHydraClient {
    rootSelectors: IRootSelector[];
    mediaTypeProcessors: { [name: string]: IMediaTypeProcessor };
    loadResource(uri: string): Promise<IHydraResponse>;
    invokeOperation(operation: IOperation, uri: string, body: any, mediaType?: string): Promise<IHydraResponse>;
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

    return create(uri, response, null, null)
}

function getApiDocumentation (this: Alcaeus, response: IResponseWrapper): Promise<ApiDocumentation> {
    if (response.apiDocumentationLink) {
        return this.loadDocumentation(response.apiDocumentationLink)
    } else {
        console.warn(`Resource ${response.requestedUri} does not expose API Documentation link`)

        return null
    }
}

export class Alcaeus implements IHydraClient {
    public rootSelectors: IRootSelector[];

    public mediaTypeProcessors: { [name: string]: any };

    public constructor (rootSelectors: IRootSelector[], mediaTypeProcessors: { [name: string]: IMediaTypeProcessor }) {
        this.rootSelectors = rootSelectors
        this.mediaTypeProcessors = mediaTypeProcessors
    }

    public async loadResource (uri: string): Promise<IHydraResponse> {
        const response = await FetchUtil.fetchResource(uri)

        const apiDocumentation = await getApiDocumentation.call(this, response)

        return getHydraResponse(this, response, uri, apiDocumentation)
    }

    public async loadDocumentation (uri: string) {
        try {
            const response = await FetchUtil.fetchResource(uri)
            const representation = await getHydraResponse(this, response, uri, null)
            const resource = representation.root

            const resourceHasApiDocType =
                resource['@type'] === Core.Vocab('ApiDocumentation') ||
                (Array.isArray(resource['@type']) && resource['@type'].includes(Core.Vocab('ApiDocumentation')))

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

    public async invokeOperation (operation: IOperation, uri: string, body: BodyInit, mediaType?: string): Promise<any> {
        const response = await FetchUtil.invokeOperation(operation.method, uri, body, mediaType)
        const apiDocumentation = await getApiDocumentation.call(this, response)

        return getHydraResponse(this, response, uri, apiDocumentation)
    }
}

import * as FetchUtil from './FetchUtil';
import * as HydraResponse from './HydraResponse';
import {IHydraResponse} from './HydraResponse';
import {IMediaTypeProcessor} from './MediaTypeProcessors/RdfProcessor';
import {ApiDocumentation, IOperation} from './Resources';
import {IResponseWrapper} from './ResponseWrapper';
import {IRootSelector} from './RootSelectors';

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
        .find((processor) => processor.canProcess(response.mediaType));

    if (suitableProcessor) {
        const graph = await suitableProcessor.process(alcaeus, uri, response, apiDocumentation);
        return HydraResponse.create(uri, response, graph, alcaeus.rootSelectors);
    }

    return HydraResponse.create(uri, response, null, null);
};

export class Alcaeus implements IHydraClient {
    public rootSelectors: IRootSelector[];

    public mediaTypeProcessors: { [name: string]: IMediaTypeProcessor };

    constructor(rootSelectors: IRootSelector[], mediaTypeProcessors: { [name: string]: IMediaTypeProcessor }) {
        this.rootSelectors = rootSelectors;
        this.mediaTypeProcessors = mediaTypeProcessors;
    }

    public async loadResource(uri: string): Promise<IHydraResponse> {
        const response = await FetchUtil.fetchResource(uri);
        const apiDocumentation = await this.loadDocumentation(response.apiDocumentationLink);

        return getHydraResponse(this, response, uri, apiDocumentation);
    }

    public async loadDocumentation(uri: string) {
        try {
            const response = await FetchUtil.fetchResource(uri);
            const representation = await getHydraResponse(this, response, uri, null);
            return representation.root as any as ApiDocumentation;
        } catch (e) {
            return null;
        }
    }

    public async invokeOperation(operation: IOperation, uri: string, body: any, mediaType?: string): Promise<any> {
        const response = await FetchUtil.invokeOperation(operation.method, uri, body, mediaType);
        const apiDocumentation = await this.loadDocumentation(response.apiDocumentationLink);

        return await getHydraResponse(this, response, uri, apiDocumentation);
    }
}

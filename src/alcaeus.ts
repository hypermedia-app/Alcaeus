import * as FetchUtil from './FetchUtil';
import * as HydraResponse from './HydraResponse';
import {
    IApiDocumentation, IHydraClient, IHydraResponse, IMediaTypeProcessor, IOperation, IResourceFactory,
    IRootSelector,
} from './interfaces';
import {IResponseWrapper} from './ResponseWrapper';

const getHydraResponse = async (
    alcaeus: IHydraClient,
    response: IResponseWrapper,
    uri: string,
    apiDocumentation?: IApiDocumentation): Promise<IHydraResponse> => {

    const suitableProcessor = Object.values(alcaeus.mediaTypeProcessors)
        .find((processor) => processor.canProcess(response.mediaType));

    if (suitableProcessor) {
        return await suitableProcessor.process(uri, response, apiDocumentation);
    }

    return Promise.resolve(HydraResponse.create(uri, response, null, null));
};

export class Alcaeus implements IHydraClient {
    public resourceFactory: IResourceFactory;

    public rootSelectors: IRootSelector[];

    public mediaTypeProcessors: { [name: string]: IMediaTypeProcessor };

    constructor(resourceFactory: IResourceFactory, rootSelectors: IRootSelector[]) {
        this.rootSelectors = rootSelectors;
        this.resourceFactory = resourceFactory;
        this.mediaTypeProcessors = {};
    }

    public async loadResource(uri: string): Promise<IHydraResponse> {
        const response = await FetchUtil.fetchResource(uri);
        const apiDocumentation = await this.loadDocumentation(response.apiDocumentationLink);

        return getHydraResponse(this, response, uri, apiDocumentation);
    }

    public async loadDocumentation(uri: string): Promise<IApiDocumentation> {
        try {
            const response = await FetchUtil.fetchResource(uri);
            const representation = await getHydraResponse(this, response, uri, null);
            return representation.root as any as IApiDocumentation;
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

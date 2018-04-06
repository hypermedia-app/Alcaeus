import {Core, JsonLd} from './Constants';
import * as FetchUtil from './FetchUtil';
import * as GraphProcessor from './GraphProcessor';
import * as HydraResponse from './HydraResponse';
import {IApiDocumentation, IHydraClient, IHydraResponse, IOperation, IRootSelector} from './interfaces';
import {forOwn} from './LodashUtil';
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {IResponseWrapper} from './ResponseWrapper';

function isRdfFormatWeCanHandle(mediaType: string): boolean {
    return !!GraphProcessor.parserFactory.create(null).find(mediaType);
}

const getHydraResponse = async (
    alcaeus: IHydraClient,
    response: IResponseWrapper,
    uri: string,
    apiDocumentation?: IApiDocumentation,
    typeOverrides = {}): Promise<IHydraResponse> => {
    if (isRdfFormatWeCanHandle(response.mediaType)) {
        const processedGraph = await GraphProcessor.parseAndNormalizeGraph(
            await response.xhr.text(),
            uri,
            response.mediaType);

        return processResources(alcaeus, uri, response, processedGraph, apiDocumentation, typeOverrides);
    }

    return Promise.resolve(HydraResponse.create(uri, response, null, null));
};

export class Alcaeus implements IHydraClient {
    public resourceFactory = new ResourceFactoryCtor();

    public rootSelectors: IRootSelector[];

    constructor(rootSelectors) {
        this.rootSelectors = rootSelectors;
    }

    public async loadResource(uri: string): Promise<IHydraResponse> {
        const response = await FetchUtil.fetchResource(uri);
        const apiDocumentation = await this.loadDocumentation(response.apiDocumentationLink);

        return getHydraResponse(this, response, uri, apiDocumentation);
    }

    public async loadDocumentation(uri: string): Promise<IApiDocumentation> {
        try {
            const response = await FetchUtil.fetchResource(uri);
            const typeOverrides = {};
            typeOverrides[uri] = Core.Vocab('ApiDocumentation');

            const representation = await getHydraResponse(this, response, uri, null, typeOverrides);
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

function processResources(
    alcaeus: IHydraClient,
    uri,
    response,
    resources,
    apiDocumentation,
    typeOverrides = {}): IHydraResponse {
    const resourcified = {};
    resources.forEach((res) => {
        try {
            res[JsonLd.Id] = new URL(res[JsonLd.Id]).href;
        } catch (e) {}

        resourcified[res[JsonLd.Id]] = res;
    });

    resources.reduceRight((acc: object, val) => {
        const id = val[JsonLd.Id];
        acc[id] = alcaeus.resourceFactory.createResource(alcaeus, val, apiDocumentation, acc, typeOverrides[id]);
        return acc;
    }, resourcified);

    forOwn(resourcified, (resource) => resourcify(alcaeus, resource, resourcified, apiDocumentation, typeOverrides));

    return HydraResponse.create(uri, response, resourcified, alcaeus.rootSelectors);
}

function resourcify(alcaeus: IHydraClient, obj, resourcified: object, apiDoc: IApiDocumentation, typeOverrides) {
    if ((typeof obj === 'object') === false) {
        return obj;
    }

    if (obj[JsonLd.Value]) {
        return obj[JsonLd.Value];
    }

    const selfId = obj[JsonLd.Id];

    if (!selfId) {
        return obj;
    }

    let resource = resourcified[selfId];
    if (!resource || typeof resource._processed === 'undefined') {
        const id = obj[JsonLd.Id];
        resource = alcaeus.resourceFactory.createResource(alcaeus, obj, apiDoc, resourcified, id);
        resourcified[selfId] = resource;
    }

    if (resource._processed === true) {
        return resource;
    }

    resource._processed = true;
    forOwn(resource, (value, key) => {
        if (Array.isArray(value)) {
            resource[key] = value.map((el) => resourcify(alcaeus, el, resourcified, apiDoc, typeOverrides));
            return;
        }

        resource[key] = resourcify(alcaeus, value, resourcified, apiDoc, typeOverrides);
    });

    return resource;
}

import * as FetchUtil from './FetchUtil';
import {JsonLd, Core} from './Constants';
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {IHydraClient, IApiDocumentation, IOperation, IHydraResponse} from './interfaces';
import {forOwn} from "./LodashUtil";
import * as HydraResponse from './HydraResponse';
import {IResponseWrapper} from './ResponseWrapper';
import * as GraphProcessor from './GraphProcessor';

interface ResponseWrapperPattern {
    KnownRdfSerialization: (alcaeus: IHydraClient, response: IResponseWrapper, uri: string, apiDocumentation: IApiDocumentation, typeOverrides?) => Promise<IHydraResponse>,
}

function matchResponse<T>(p: ResponseWrapperPattern): (alcaeus: IHydraClient, res: IResponseWrapper, uri: string, apiDocumentation: IApiDocumentation, typeOverrides?) => Promise<IHydraResponse> {
    return (alcaeus: IHydraClient, res: IResponseWrapper, uri: string, apiDocumentation?: IApiDocumentation, typeOverrides = {}) => {
        if(isRdfFormatWeCanHandle(res.mediaType)) {
            return p.KnownRdfSerialization(alcaeus, res, uri, apiDocumentation, typeOverrides);
        }

        return Promise.resolve(HydraResponse.create(uri, res, null, null));
    };
}

function isRdfFormatWeCanHandle(mediaType: string): boolean {
    return !!GraphProcessor.parserFactory.create(null).find(mediaType);
}

const getHydraResponse = matchResponse({
    KnownRdfSerialization: async (alcaeus: IHydraClient, response: IResponseWrapper, uri: string, apiDocumentation?: IApiDocumentation, typeOverrides = {}) => {
        const processedGraph = await GraphProcessor.parseAndNormalizeGraph(await response.xhr.text(), uri, response.mediaType);

        return processResources(alcaeus, uri, response, processedGraph, apiDocumentation, typeOverrides);
    },
});

export class Alcaeus implements IHydraClient {
    public resourceFactory = new ResourceFactoryCtor();

    async loadResource(uri:string):Promise<IHydraResponse> {
        const response = await FetchUtil.fetchResource(uri);
        const apiDocumentation = await this.loadDocumentation(response.apiDocumentationLink);

        return getHydraResponse(this, response, uri, apiDocumentation);
    }

    async loadDocumentation(uri:string):Promise<IApiDocumentation> {
        try {
            const response = await FetchUtil.fetchResource(uri);
            const typeOverrides = {};
            typeOverrides[uri] = Core.Vocab('ApiDocumentation');

            const representation = await getHydraResponse(this, response, uri, null, typeOverrides);
            return <IApiDocumentation><any>representation.root;
        } catch (e) {
            return null;
        }
    }

    async invokeOperation(operation:IOperation, uri:string, body:any, mediaType?:string):Promise<any> {
        const response = await FetchUtil.invokeOperation(operation.method, uri, body, mediaType);
        const apiDocumentation = await this.loadDocumentation(response.apiDocumentationLink);

        return await getHydraResponse(this, response, uri, apiDocumentation);
    }
}

function processResources(alcaeus:IHydraClient, uri, response, resources, apiDocumentation, typeOverrides = {}): IHydraResponse {
    const resourcified = {};
    resources.forEach(res => {
        try {
            res[JsonLd.Id] = new URL(res[JsonLd.Id]).href;
        } catch(e) {}

        resourcified[res[JsonLd.Id]] = res;
    });

    resources.reduceRight((acc:Object, val) => {
        const id = val[JsonLd.Id];
        acc[id] = alcaeus.resourceFactory.createResource(alcaeus, val, apiDocumentation, acc, typeOverrides[id]);
        return acc;
    }, resourcified);

    forOwn(resourcified, resource => resourcify(alcaeus, resource, resourcified, apiDocumentation, typeOverrides));

    return HydraResponse.create(uri, response, resourcified, []);
}

function resourcify(alcaeus:IHydraClient, obj, resourcified:Object, apiDoc:IApiDocumentation, typeOverrides) {
    if ((typeof obj === 'object') === false) {
        return obj;
    }

    if (obj[JsonLd.Value]) {
        return obj[JsonLd.Value];
    }

    let selfId = obj[JsonLd.Id];

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
            resource[key] = value.map(el => resourcify(alcaeus, el, resourcified, apiDoc, typeOverrides));
            return;
        }

        resource[key] = resourcify(alcaeus, value, resourcified, apiDoc, typeOverrides);
    });

    return resource;
}

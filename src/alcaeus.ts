import {FetchUtil} from './FetchUtil';
import {JsonLd, Core} from './Constants';
import {JsonLdUtil} from "./JsonLdUtil";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {IHydraClient, IHydraResource, IApiDocumentation, IOperation} from './interfaces';
import {forOwn} from "./LodashUtil";
import {ExpandedWithDocs} from "./internals";

export class Alcaeus implements IHydraClient {
    public resourceFactory = new ResourceFactoryCtor();
    public fetchUtil = new FetchUtil();

    async loadResource(uri:string):Promise<any> {
        const expandedWithDocs = await this.fetchUtil.fetchResource(uri);
        const apiDocumentation = await this.loadDocumentation(expandedWithDocs.apiDocumentationLink);

        return getRequestedObject(this, expandedWithDocs.resourceIdentifier || uri, expandedWithDocs.resources, apiDocumentation);
    }

    async loadDocumentation(uri:string):Promise<IApiDocumentation> {
        try {
            const response = await this.fetchUtil.fetchResource(uri);
            const typeOverrides = {};
            typeOverrides[uri] = Core.Vocab.ApiDocumentation;

            return getRequestedObject(this, uri, response.resources, null, typeOverrides);
        } catch (e) {
            return null;
        }
    }

    async invokeOperation(operation:IOperation, uri:string, body:any, mediaType?:string):Promise<any> {
        const expandedWithDocs = await this.fetchUtil.invokeOperation(operation.method, uri, body, mediaType);
        const apiDocumentation = await this.loadDocumentation(expandedWithDocs.apiDocumentationLink);

        return getRequestedObject(this, expandedWithDocs.resourceIdentifier, expandedWithDocs.resources, apiDocumentation);
    }
}

function getRequestedObject(alcaeus:IHydraClient, uri, resources, apiDocumentation, typeOverrides = {}) {
    const resourcified = {};
    debugger;
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

    const rootResource = resourcified[uri] || resourcified[JsonLdUtil.trimTrailingSlash(uri)];

    if (!rootResource) {
        return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
    }

    return rootResource;
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

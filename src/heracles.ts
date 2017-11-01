import {FetchUtil} from './FetchUtil';
import {JsonLd, Core} from './Constants';
import {JsonLdUtil} from "./JsonLdUtil";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {IHeracles, IHydraResource, IApiDocumentation, IOperation} from './interfaces';
import {forOwn} from "./LodashUtil";
import {ExpandedWithDocs} from "./internals";

export class Heracles implements IHeracles {
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

function getRequestedObject(heracles:IHeracles, uri, resources, apiDocumentation, typeOverrides = {}) {
    const resourcified = {};
    resources.forEach(res => {
        resourcified[res[JsonLd.Id]] = res;
    });

    resources.reduceRight((acc:Object, val) => {
        const id = val[JsonLd.Id];
        acc[id] = heracles.resourceFactory.createResource(heracles, val, apiDocumentation, acc, typeOverrides[id]);
        return acc;
    }, resourcified);

    forOwn(resourcified, resource => resourcify(heracles, resource, resourcified, apiDocumentation, typeOverrides));

    const rootResource = resourcified[uri] || resourcified[JsonLdUtil.trimTrailingSlash(uri)];

    if (!rootResource) {
        return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
    }

    return rootResource;
}

function resourcify(heracles:IHeracles, obj, resourcified:Object, apiDoc:IApiDocumentation, typeOverrides) {
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
        resource = heracles.resourceFactory.createResource(heracles, obj, apiDoc, resourcified, id);
        resourcified[selfId] = resource;
    }

    if (resource._processed === true) {
        return resource;
    }

    resource._processed = true;
    forOwn(resource, (value, key) => {
        if (Array.isArray(value)) {
            resource[key] = value.map(el => resourcify(heracles, el, resourcified, apiDoc, typeOverrides));
            return;
        }

        resource[key] = resourcify(heracles, value, resourcified, apiDoc, typeOverrides);
    });

    return resource;
}

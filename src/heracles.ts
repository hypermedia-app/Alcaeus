/// <reference path="../typings/index.d.ts" />

'use strict';

import {FetchUtil} from './FetchUtil';
import {JsonLd, Core} from './Constants';
import {JsonLdUtil} from "./JsonLdUtil";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {HydraResource as ResourceCtor} from "./Resources";
import {IHeracles, IHydraResource, IApiDocumentation, IOperation} from './interfaces';
import {forOwn} from "./LodashUtil";
import {ExpandedWithDocs} from "./internals";

class Heracles implements IHeracles {
    public resourceFactory = new ResourceFactoryCtor();

    loadResource(uri:string):Promise<IHydraResource> {
        return FetchUtil.fetchResource(uri)
            .then(processFetchUtilResponse.call(this, uri));
    }

    loadDocumentation(uri:string):Promise<IApiDocumentation> {
        return FetchUtil.fetchResource(uri)
            .then(response => {
                const typeOverrides = {};
                typeOverrides[uri] = Core.Vocab.ApiDocumentation;

                return getRequestedObject(this, uri, response.resources, typeOverrides)(null);
            }, () => null);
    }

    invokeOperation(operation:IOperation, uri:string, body:any, mediaType?:string):Promise<IHydraResource> {
        return FetchUtil.invokeOperation(operation.method, uri, body, mediaType)
            .then(processFetchUtilResponse.call(this, uri));
    }
}

export let ResourceFactory = ResourceFactoryCtor;
export let Resource = ResourceCtor;
export let Hydra = new Heracles();

function processFetchUtilResponse(uri) {
    return (response:ExpandedWithDocs) =>
        this.loadDocumentation(response.apiDocumentationLink)
            .then(getRequestedObject(this, response.resourceIdentifier || uri, response.resources));
}

function getRequestedObject(heracles:IHeracles, uri, resources, typeOverrides = {}) {
    return apiDocumentation => {
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
    };
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
'use strict';
import * as _ from 'lodash';
import {FetchUtil} from './FetchUtil';
import {JsonLd, Core} from './Constants';
import {JsonLdUtil} from "./JsonLdUtil";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {HydraResource as ResourceCtor} from "./Resources";

class Heracles implements IHeracles {
    public resourceFactory = new ResourceFactoryCtor();

    loadResource(uri:string):Promise<IHydraResource> {
        return FetchUtil.fetchResource(uri)
            .then(response => {
                return this.loadDocumentation(response.apiDocumentationLink)
                    .then(getRequestedObject(this, uri, response.resources, this.resourceFactory));
            });
    }
    
    loadDocumentation(uri:string):Promise<IApiDocumentation> {
        return FetchUtil.fetchResource(uri)
            .then(response => {
                var typeOverrides = {};
                typeOverrides[JsonLdUtil.trimTrailingSlash(uri)] = Core.Vocab.ApiDocumentation;

                return getRequestedObject(this, uri, response.resources, this.resourceFactory, typeOverrides)(null);
            }, () => null);
    }
}

export var ResourceFactory = ResourceFactoryCtor;
export var Resource = ResourceCtor;
export var Hydra = new Heracles();

function getRequestedObject(heracles, uri, resources, resourceFactory, typeOverrides? = {}) {
    return apiDocumentation => {
        var resourcified = {};

        _.transform(resources, (acc, val) => {
            var id = JsonLdUtil.trimTrailingSlash(val[JsonLd.Id]);
            acc[id] = resourceFactory.createResource(heracles, val, apiDocumentation, acc, typeOverrides[id]);
        }, resourcified);

        _.each(resourcified, g => resourcify(g, resourcified, apiDocumentation, resourceFactory));

        uri = JsonLdUtil.trimTrailingSlash(uri);
        var resource = resourcified[uri];

        if (!resource) {
            return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
        }

        return resource;
    };
}

function resourcify(obj, resourcified, apiDoc, resourceFactory) {

    if (_.isObject(obj) === false) {
        return obj;
    }

    if (obj[JsonLd.Value]){
        return obj[JsonLd.Value];
    }

    var selfId = JsonLdUtil.trimTrailingSlash(obj[JsonLd.Id]);

    var resource = resourcified[selfId];
    if (resourcified[selfId] instanceof Resource === false) {
        resource = resourceFactory.createResource(obj, apiDoc, resourcified);
        resourcified[selfId] = resource;
    }

    if(resource._processed === true){
        return resource;
    }

    resource._processed = true;
    _.forOwn(resource, (value, key) => {
        if (_.isArray(value)) {
            resource[key] = _.map(value, el => resourcify(el, resourcified, apiDoc, resourceFactory));
            return;
        }

        resource[key] = resourcify(value, resourcified, apiDoc, resourceFactory);
    });

    return resource;
}
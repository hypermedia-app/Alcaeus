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
                    .then(getRequestedObject(this, uri, response.resources));
            });
    }
    
    loadDocumentation(uri:string):Promise<IApiDocumentation> {
        return FetchUtil.fetchResource(uri)
            .then(response => {
                var typeOverrides = {};
                typeOverrides[JsonLdUtil.trimTrailingSlash(uri)] = Core.Vocab.ApiDocumentation;

                return getRequestedObject(this, uri, response.resources, typeOverrides)(null);
            }, () => null);
    }
}

export var ResourceFactory = ResourceFactoryCtor;
export var Resource = ResourceCtor;
export var Hydra = new Heracles();

function getRequestedObject(heracles:IHeracles, uri, resources, typeOverrides? = {}) {
    return apiDocumentation => {
        var resourcified = {};
        uri = JsonLdUtil.trimTrailingSlash(uri);

        _.transform(resources, (acc, val) => {
            var id = JsonLdUtil.trimTrailingSlash(val[JsonLd.Id]);
            acc[id] = heracles.resourceFactory.createResource(heracles, val, apiDocumentation, acc, typeOverrides[id]);
        }, resourcified);

        if (!resourcified[uri]) {
            return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
        }

        _.each(resourcified, g => resourcify(heracles, g, resourcified, apiDocumentation, typeOverrides));

        return resourcified[uri];
    };
}

function resourcify(heracles, obj, resourcified, apiDoc, typeOverrides) {
    if (_.isObject(obj) === false) {
        return obj;
    }

    if (obj[JsonLd.Value]){
        return obj[JsonLd.Value];
    }

    var selfId = JsonLdUtil.trimTrailingSlash(obj[JsonLd.Id]);

    if(!selfId) {
        return obj;
    }

    var resource = resourcified[selfId];
    if (!resource || typeof resource._processed === 'undefined') {
        var id = JsonLdUtil.trimTrailingSlash(obj[JsonLd.Id]);
        resource = heracles.resourceFactory.createResource(heracles, obj, apiDoc, resourcified, id);
        resourcified[selfId] = resource;
    }

    if(resource._processed === true){
        return resource;
    }

    resource._processed = true;
    _.forOwn(resource, (value, key) => {
        if (_.isArray(value)) {
            resource[key] = _.map(value, el => resourcify(heracles, el, resourcified, apiDoc, typeOverrides));
            return;
        }

        resource[key] = resourcify(heracles, value, resourcified, apiDoc, typeOverrides);
    });

    return resource;
}
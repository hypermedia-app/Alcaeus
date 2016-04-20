'use strict';
/// <reference path="../typings/browser.d.ts" />

import * as _ from 'lodash';
import {FetchUtil} from './FetchUtil';
import {ApiDocumentation} from "./ApiDocumentation";
import {JsonLd} from './Constants';
import {JsonLdUtil} from "./JsonLdUtil";
import {ResourceFactory as ResourceFactoryCtor} from './ResourceFactory';
import {Resource as ResourceCtor} from "./Resources";

class Heracles implements IHeracles {
    public resourceFactory = new ResourceFactoryCtor();

    loadResource(uri:string):Promise<IHydraResource> {
        return FetchUtil.fetchResource(uri)
            .then(response => {
                return FetchUtil.fetchDocumentation(response.apiDocumentationLink)
                    .then(docsObject => {
                        return new ApiDocumentation(
                            this,
                            response.apiDocumentationLink,
                            docsObject
                        );
                    }, () => null).then(getRequestedObject(uri, response.resources, this.resourceFactory));
            })
    }
}

export var ResourceFactory = ResourceFactoryCtor;
export var Resource = ResourceCtor;
export var Hydra = new Heracles();

function getRequestedObject(uri, resources, resourceFactory) {
    return apiDocumentation => {
        var resourcified = {};

        _.transform(resources, (acc, val) => {
            var id = JsonLdUtil.trimTrailingSlash(val[JsonLd.Id]);
            acc[id] = resourceFactory.createResource(val, apiDocumentation, acc);
        }, resourcified);

        _.each(resourcified, g => resourcify(g, resourcified, apiDocumentation, resourceFactory));

        var resource = resourcified[JsonLdUtil.trimTrailingSlash(uri)];

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

    var selfId = JsonLdUtil.trimTrailingSlash(obj[JsonLd.Id]);

    var resource = resourcified[selfId];
    if (resourcified[selfId] instanceof Resource === false) {
        resource = resourceFactory.createResource(obj, apiDoc, resourcified);
        resourcified[selfId] = resource;
    }

    if(resource._processed() === true){
        return resource;
    }

    _.forOwn(resource, (value, key) => {
        if (_.isArray(value)) {
            resource[key] = _.map(value, el => resourcify(el, resourcified, apiDoc, resourceFactory));
            return;
        }

        resource[key] = resourcify(value, resourcified, apiDoc, resourceFactory);
    });

    resource._processed(true);
    return resource;
}
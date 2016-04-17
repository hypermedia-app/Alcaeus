'use strict';
/// <reference path="../typings/browser.d.ts" />

import * as _ from 'lodash';
import {FetchUtil} from './FetchUtil';
import {ApiDocumentation} from "./ApiDocumentation";
import {JsonLd} from './Constants';
import {JsonLdUtil} from "./JsonLdUtil";
import {ResourceFactory} from './ResourceFactory';
import {Resource} from "./Resources";

class Heracles implements IHeracles {
    public resourceFactory = new ResourceFactory();

    loadResource(uri:string) {
        return FetchUtil.fetchResource(uri)
            .then(response => {
                return FetchUtil.fetchDocumentation(response.apiDocumentationLink)
                    .then(docsObject => {
                        return new ApiDocumentation(
                            this,
                            response.apiDocumentationLink,
                            docsObject
                        );
                    }).then(getRequestedObject(uri, response.resources, this.resourceFactory));
            })
    }
}

export var Hydra = new Heracles();

function getRequestedObject(uri, resources, resourceFactory) {
    return apiDocumentation => {
        var groupedResources = _.chain(resources)
            .map(resObj => resourceFactory.createResource(resObj, apiDocumentation, resources))
            .groupBy(res => JsonLdUtil.trimTrailingSlash(res[JsonLd.Id]))
            .mapValues(arr => arr[0])
            .value();

        _.forEach(groupedResources, g => resourcifyChildren(g, groupedResources, apiDocumentation, resourceFactory));

        var resource = groupedResources[JsonLdUtil.trimTrailingSlash(uri)];

        if (!resource) {
            return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
        }

        return resource;
    };
}

function resourcifyChildren(res, resources, apiDoc, resourceFactory) {
    var self = res;

    if (!resources[res[JsonLd.Id]]) {
        if (res instanceof Resource === false) {
            res = resourceFactory.createResource(res, apiDoc, resources);
        }
        resources[res[JsonLd.Id]] = res;
    }

    resources[res[JsonLd.Id]]._isProcessed = true;
    _.forOwn(res, (value, key) => {
        if (key.startsWith('_') || key.startsWith('@') || _.isString(value) || _.isNumber(value))
            return;

        if (_.isArray(value)) {
            self[key] = _.map(value, el => resourcifyChildren(el, resources, apiDoc, resourceFactory));
            return;
        }

        if (_.isObject(value)) {
            if(resources[value['@id']]){
                value = resources[value['@id']];
            }

            if(value._isProcessed) {
                self[key] = value;
                return;
            }

            if (value instanceof Resource === false) {
                value = resourceFactory.createResource(value, apiDoc, resources);
            }

            self[key] = resourcifyChildren(value, resources, apiDoc, resourceFactory);
            return;
        }

        throw new Error('Unexpected value ' + value + ' of type ' + typeof value);
    });

    return resources[res[JsonLd.Id]];
}
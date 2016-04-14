'use strict';
/// <reference path="../typings/browser.d.ts" />

import * as _ from 'lodash';
import {FetchUtil} from './FetchUtil';
import {ApiDocumentation} from "./ApiDocumentation";
import {JsonLd} from './Constants';

export class Resource {
    private _operations;

    constructor(actualResource, operations) {
        this._operations = operations;
        Object.assign(this, actualResource);
    }

    getOperations() {
        return this._operations;
    }

    static load(uri:string):Promise<Resource> {

        return FetchUtil.fetchResource(uri).then(resWithDocs => {

            var resourcesPromised = _.chain(resWithDocs.resources)
                .map(resObj => createResource(resObj, resWithDocs.apiDocumentation))
                .value();

            return Promise.all(resourcesPromised)
                .then(resources => {
                    return _.chain(resources).groupBy(JsonLd.Id).mapValues(arr => arr[0]).value();
                })
                .then(grouped => {
                    _.forEach(grouped, g => resourcifyChildren(g, grouped));
                    return grouped;
                })
                .then(grouped => grouped[uri]);
        });
    }
}

function createResource(obj:Object, apiDocumentation:ApiDocumentation):Promise<Resource> {
    if (!apiDocumentation) {
        return Promise.resolve(new Resource(obj, []));
    }

    return apiDocumentation.getOperations(obj['@type'])
        .then(operations => {
            return new Resource(obj, operations);
        });
}

function resourcifyChildren(res:Resource, resources) {
    var self = res;

    if(!resources[res[JsonLd.Id]])
        resources[res[JsonLd.Id]] = res;

    _.forOwn(res, (value, key) => {
        if (_.isString(value) || key.startsWith('_'))
            return;

        if(_.isArray(value)) {
            self[key] = _.map(value, el => resourcifyChildren(el, resources));
            return;
        }

        if(_.isObject(value)) {
            if(value instanceof Resource === false){
                value = new Resource(value, []);
            }

            self[key] = resourcifyChildren(value, resources);
            return;
        }

        throw new Error('Unexpected value ' + value);
    });

    return resources[res[JsonLd.Id]];
}
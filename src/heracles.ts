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
                    return _.groupBy(resources, JsonLd.Id);
                })
                .then(grouped => {
                    _.forEach(grouped, g => resourcifyChildren(g[0], grouped));
                    return grouped;
                })
                .then(grouped => grouped[uri][0]);
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
        resources[res[JsonLd.Id]] = [ res ];

    _.forOwn(res, (value, key) => {
        if (_.isString(value) || key.startsWith('_'))
            return;

        if(_.isArray(value)) {
            self[key] = _.map(value, el => resourcifyChildren(res, resources));
            return;
        }

        if(_.isObject(value)) {
            self[key] = resourcifyChildren(value, resources)[0];
            return;
        }

        throw new Error('Unexpected value ' + value);
    });

    return resources[res[JsonLd.Id]];
}
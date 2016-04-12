/// <reference path="../typings/browser.d.ts" />
'use strict';

import * as _ from 'lodash';
import {FetchUtil} from './FetchUtil';
import {ApiDocumentation} from "./ApiDocumentation";

export class Resource {
    private _operations;

    constructor(operations) {
        this._operations = operations;
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
                    return _.groupBy(resources, '@id')
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
        var resource = new Resource([]);
        Object.assign(resource, obj);
        return Promise.resolve(resource);
    }

    return apiDocumentation.getOperations(obj['@type'])
        .then(operations => {
            var resource = new Resource(operations);
            Object.assign(resource, obj);
            return resource;
        });
}

function resourcifyChildren(res:Resource, resources) {
    var self = res;

    if(!resources[res['@id']])
        resources[res['@id']] = [ res ];

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

    return resources[res['@id']];
}
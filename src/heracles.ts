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

            var resources = _.groupBy(resWithDocs.resources, '@id');

            return resourcify(_.find(resWithDocs.resources, ['@id', uri]), resWithDocs.apiDocumentation);
        });
    }
}

function resourcify(obj:Object, apiDocumentation:ApiDocumentation):Promise<Resource> {
    if(!apiDocumentation){
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

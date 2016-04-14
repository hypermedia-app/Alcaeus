'use strict';
/// <reference path="../typings/browser.d.ts" />

import * as _ from 'lodash';
import {FetchUtil} from './FetchUtil';
import {ApiDocumentation} from "./ApiDocumentation";
import {JsonLd} from './Constants';
import {IHydraResource} from "../heracles";

export class Resource implements IHydraResource {
    private _apiDoc;

    constructor(actualResource, apiDoc:ApiDocumentation) {
        this._apiDoc = apiDoc;
        Object.assign(this, actualResource);
    }

    get id() {
        return this['@id'];
    }

    getOperations() {
        return this._apiDoc.getOperations(this['@type']);
    }

    static load(uri:string):Promise<Resource> {

        return FetchUtil.fetchResource(uri).then(resWithDocs => {

            var groupedResources = _.chain(resWithDocs.resources)
                .map(resObj => createResource(resObj, resWithDocs.apiDocumentation))
                .groupBy(JsonLd.Id)
                .mapValues(arr => arr[0])
                .value();

            _.forEach(groupedResources, g => resourcifyChildren(g, groupedResources, resWithDocs.apiDocumentation));

            return groupedResources[uri];
        });
    }
}

function createResource(obj:Object, apiDocumentation:ApiDocumentation):Resource {
    return new Resource(obj, apiDocumentation);
}

function resourcifyChildren(res:Resource, resources, apiDoc) {
    var self = res;

    if(!resources[res[JsonLd.Id]])
        resources[res[JsonLd.Id]] = res;

    _.forOwn(res, (value, key) => {
        if (_.isString(value) || key.startsWith('_'))
            return;

        if(_.isArray(value)) {
            self[key] = _.map(value, el => resourcifyChildren(el, resources, apiDoc));
            return;
        }

        if(_.isObject(value)) {
            if(value instanceof Resource === false){
                value = new Resource(value, apiDoc);
            }

            self[key] = resourcifyChildren(value, resources, apiDoc);
            return;
        }

        throw new Error('Unexpected value ' + value);
    });

    return resources[res[JsonLd.Id]];
}
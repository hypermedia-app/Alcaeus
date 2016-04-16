'use strict';
/// <reference path="../typings/browser.d.ts" />

import * as _ from 'lodash';
import {FetchUtil} from './FetchUtil';
import {ApiDocumentation} from "./ApiDocumentation";
import {JsonLd, Core} from './Constants';
import {JsonLdUtil} from "./JsonLdUtil";

export class Resource implements IHydraResource {
    private _apiDoc;
    protected _incomingLinks;

    constructor(actualResource, apiDoc:ApiDocumentation, incomingLinks) {
        this._apiDoc = apiDoc;
        this._incomingLinks = incomingLinks;
        Object.assign(this, actualResource);
    }

    get id() {
        return this['@id'];
    }

    getOperations() {
        var classOperations = this._apiDoc.getOperations(this['@type']);
        var propertyOperations = _.chain(this._incomingLinks)
            .map(link => this._apiDoc.getOperations(link[0], link[1]))
            .union()
            .value();

        var operationPromises = [classOperations, ...propertyOperations];

        return Promise.all(operationPromises)
            .then(results => _.flatten(results));
    }

    static load(uri:string) {

        return FetchUtil.fetchResource(uri).then(resWithDocs => {

            var groupedResources = _.chain(resWithDocs.resources)
                .map(resObj => ResourceFactory.instance.createResource(resObj, resWithDocs.apiDocumentation, resWithDocs.resources))
                .groupBy(res => JsonLdUtil.trimTrailingSlash(res[JsonLd.Id]))
                .mapValues(arr => arr[0])
                .value();

            _.forEach(groupedResources, g => resourcifyChildren(g, groupedResources, resWithDocs.apiDocumentation));

            var resource = groupedResources[JsonLdUtil.trimTrailingSlash(uri)];

            if (!resource) {
                return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
            }

            return resource;
        });
    }
}

export class ResourceFactory implements IResourceFactory {
    public static instance = new ResourceFactory();

    public createResource(obj:Object, apiDocumentation:ApiDocumentation, resources):Resource {
        var incomingLinks = findIncomingLinks(obj, resources);

        switch(obj[JsonLd.Type]){
            case Core.Vocab.PartialCollectionView:
                return new PartialCollectionView(obj, apiDocumentation, incomingLinks);
        }

        return new Resource(obj, apiDocumentation, incomingLinks);
    }
}

export class PartialCollectionView extends Resource {
    public collection;

    constructor(actualResource, apiDoc:ApiDocumentation, incomingLinks) {
        super(actualResource, apiDoc, incomingLinks);

        var collectionLink = _.find(incomingLinks, linkArray => {
            return linkArray.predicate === Core.Vocab.view
        });

        this.collection = collectionLink ? collectionLink.subject : null;
    }

    get first() { return this[Core.Vocab.first] || null; }

    get previous() { return this[Core.Vocab.previous] || null; }

    get next() { return this[Core.Vocab.next] || null; }

    get last() { return this[Core.Vocab.last] || null; }
}

function findIncomingLinks(object, resources) {
    return _.transform(resources, (acc, res, key) => {
        _.forOwn(res, (value, predicate) => {
            if (value && value[JsonLd.Id] && JsonLdUtil.idsEqual(value[JsonLd.Id], object[JsonLd.Id])) {
                acc.push({
                    subjectId: key,
                    predicate: predicate,
                    subject: resources[key]
                });
            }
        });
    }, []);
}

function resourcifyChildren(res:Resource, resources, apiDoc) {
    var self = res;

    if (!resources[res[JsonLd.Id]])
        resources[res[JsonLd.Id]] = res;

    _.forOwn(res, (value, key) => {
        if (key.startsWith('_'))
            return;

        if (_.isArray(value)) {
            self[key] = _.map(value, el => resourcifyChildren(el, resources, apiDoc));
            return;
        }

        if (_.isObject(value)) {
            if (value instanceof Resource === false) {
                value = ResourceFactory.instance.createResource(value, apiDoc, resources);
            }

            self[key] = resourcifyChildren(value, resources, apiDoc);
        }
    });

    return resources[res[JsonLd.Id]];
}
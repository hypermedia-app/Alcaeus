'use strict';
import * as _ from 'lodash';
import {JsonLd, Core} from './Constants';

export class Resource implements IHydraResource {
    private _apiDoc;
    protected _incomingLinks;

    constructor(actualResource, apiDoc:IApiDocumentation, incomingLinks) {
        this._apiDoc = apiDoc;
        this._incomingLinks = incomingLinks;
        Object.assign(this, actualResource);
    }

    get id() {
        return this[JsonLd.Id];
    }

    get apiDocumentation() {
        return this._apiDoc;
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
}

export class PartialCollectionView extends Resource {
    public collection;

    constructor(actualResource, apiDoc:IApiDocumentation, incomingLinks) {
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
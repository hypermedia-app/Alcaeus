'use strict';
import * as _ from 'lodash';
import {JsonLd, Core} from './Constants';

export class Resource implements IHydraResource {

    constructor(actualResource, apiDoc:IApiDocumentation, incomingLinks) {
        Object.assign(this, actualResource);

        Object.defineProperty(this, 'apiDocumentation', <PropertyDescriptor>{
            get: () => apiDoc
        });

        Object.defineProperty(this, 'incomingLinks', <PropertyDescriptor>{
            get: () => incomingLinks
        });

        var isProcessed;
        Object.defineProperty(this, '_processed', <PropertyDescriptor>{
            get: () => isProcessed,
            set: val => isProcessed = val
        });
    }

    get id() {
        return this[JsonLd.Id];
    }

    getOperations() {
        var classOperations = this.apiDocumentation.getOperations(this['@type']);
        var propertyOperations = _.chain(this.incomingLinks)
            .map(link => this.apiDocumentation.getOperations(link[0], link[1]))
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

        Object.defineProperty(this, 'collection', <PropertyDescriptor>{
            get: () => collectionLink ? collectionLink.subject : null
        });
    }

    get first() { return this[Core.Vocab.first] || null; }

    get previous() { return this[Core.Vocab.previous] || null; }

    get next() { return this[Core.Vocab.next] || null; }

    get last() { return this[Core.Vocab.last] || null; }
}
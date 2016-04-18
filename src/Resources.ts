'use strict';
import * as _ from 'lodash';
import {JsonLd, Core} from './Constants';

var _apiDocumentation = new WeakMap();
var _incomingLinks = new WeakMap();
var _isProcessed = new WeakMap();

export class Resource implements IHydraResource {

    constructor(actualResource, apiDoc:IApiDocumentation, incomingLinks) {
        Object.assign(this, actualResource);

        _apiDocumentation.set(this, apiDoc);
        _incomingLinks.set(this, incomingLinks);
        _isProcessed.set(this, false);
    }

    get id() {
        return this[JsonLd.Id];
    }

    get apiDocumentation() {
        return _apiDocumentation.get(this);
    }

    get incomingLinks() {
        return _incomingLinks.get(this);
    }

    get _processed() {
        return _isProcessed.get(this);
    }

    set _processed(val:boolean) {
        _isProcessed.set(this, val);
    }

    getOperations() {
        var classOperations;
        if(_.isArray(this[JsonLd.Type])) {
            classOperations = _.map(this[JsonLd.Type], type => this.apiDocumentation.getOperations(type));
        } else {
            classOperations = [ this.apiDocumentation.getOperations(this[JsonLd.Type]) ];
        }

        var propertyOperations = _.chain(this.incomingLinks)
            .map(link => this.apiDocumentation.getOperations(link[0], link[1]))
            .union()
            .value();

        var operationPromises = [...classOperations, ...propertyOperations];

        return Promise.all(operationPromises)
            .then(results => _.flatten(results));
    }
}

export class PartialCollectionView extends Resource {

    get first() { return this[Core.Vocab.first] || null; }

    get previous() { return this[Core.Vocab.previous] || null; }

    get next() { return this[Core.Vocab.next] || null; }

    get last() { return this[Core.Vocab.last] || null; }

    get collection() {
        var collectionLink = _.find(this.incomingLinks, linkArray => {
            return linkArray.predicate === Core.Vocab.view
        });

        return collectionLink ? collectionLink.subject : null
    }
}
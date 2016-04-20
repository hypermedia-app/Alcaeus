'use strict';
import * as _ from 'lodash';
import { nonenumerable } from 'core-decorators';
import {JsonLd, Core} from './Constants';
//noinspection TypeScriptCheckImport
import {default} from 'core-js/es6/weak-map';

var _apiDocumentation = new WeakMap();
var _incomingLinks = new WeakMap();
var _isProcessed = new WeakMap();

export class Resource implements IHydraResource {

    constructor(actualResource, apiDoc:IApiDocumentation, incomingLinks) {
        _.extend(this, actualResource);

        _apiDocumentation.set(this, apiDoc);
        _incomingLinks.set(this, incomingLinks);
        _isProcessed.set(this, false);
    }

    @nonenumerable
    get id() {
        return this[JsonLd.Id];
    }

    @nonenumerable
    get apiDocumentation() {
        return _apiDocumentation.get(this);
    }

    getIncomingLinks() {
        return _incomingLinks.get(this);
    }

    _processed() {
        return _isProcessed.get(this);
    }

    _processed(val:boolean) {
        _isProcessed.set(this, val);
    }

    getOperations() {
        var classOperations;
        if(_.isArray(this[JsonLd.Type])) {
            classOperations = _.map(this[JsonLd.Type], type => this.apiDocumentation.getOperations(type));
        } else {
            classOperations = [ this.apiDocumentation.getOperations(this[JsonLd.Type]) ];
        }

        var propertyOperations = _.chain(this.getIncomingLinks())
            .map(link => this.apiDocumentation.getOperations(link[0], link[1]))
            .union()
            .value();

        var operationPromises = [...classOperations, ...propertyOperations];
        
        return Promise.all(operationPromises)
            .then(results => _.flatten(results));
    }
}

export class PartialCollectionView extends Resource implements IPartialCollectionView {

    @nonenumerable
    get first() { return this[Core.Vocab.first] || null; }

    @nonenumerable
    get previous() { return this[Core.Vocab.previous] || null; }

    @nonenumerable
    get next() { return this[Core.Vocab.next] || null; }

    @nonenumerable
    get last() { return this[Core.Vocab.last] || null; }

    @nonenumerable
    get collection() {
        var collectionLink = _.find(this.getIncomingLinks(), linkArray => {
            return linkArray.predicate === Core.Vocab.view
        });

        return collectionLink ? collectionLink.subject : null
    }
}
'use strict';

import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import {rdf} from 'jasnell/linkeddata-vocabs';
import * as Types from './Resources';
import * as DocTypes from './ApiDocumentation';
import {JsonLd, Core} from './Constants';
import {JsonLdUtil} from './JsonLdUtil';

export class ResourceFactory implements IResourceFactory {

    factories = {};

    constructor() {
        setUpDefaultFactories.call(this);
    }

    public createResource(heracles:IHeracles, obj:Object, apiDocumentation:IApiDocumentation, resources, typeOverride?:string):Types.Resource {
        var incomingLinks = findIncomingLinks(obj, resources);

        var factory = this.factories[typeOverride || obj[JsonLd.Type]];
        if(!factory && Array.isArray(obj[JsonLd.Type])) {
            for (var i=0; i<obj[JsonLd.Type].length; i++) {
                factory = this.factories[obj[JsonLd.Type][i]];
                if(factory) {
                    break;
                }
            }
        }

        if (factory) {
            return factory.call(this, heracles, obj, apiDocumentation, incomingLinks);
        }

        return new Types.HydraResource(heracles, obj, apiDocumentation, incomingLinks);
    }
}

class IncomingLink {
    private _id;
    private _predicate;
    private _linkSubject;

    constructor(id, predicate, resoruces) {
        this._id = id;
        this._predicate = predicate;

        Object.defineProperty(this, 'subject', <PropertyDescriptor>{
            get: () => resoruces[id]
        });
    }

    get subjectId() {
        return this._id;
    }

    get predicate() {
        return this._predicate;
    }
}

function findIncomingLinks(object, resources) {
    return _.transform(resources, (acc, res, key) => {
        _.forOwn(res, (value, predicate) => {
            if (value && value[JsonLd.Id] && JsonLdUtil.idsEqual(value[JsonLd.Id], object[JsonLd.Id])) {
                acc.push(new IncomingLink(
                    key, predicate, resources
                ));
            }
        });
    }, []);
}

function setUpDefaultFactories() {
    this.factories[Core.Vocab.ApiDocumentation] = createApiDocumentation;
    this.factories[Core.Vocab.PartialCollectionView] = createPartialCollectionView;
    this.factories[Core.Vocab.Class] = createClass;
    this.factories[Core.Vocab.SupportedProperty] = createSupportedProperty;
    this.factories[Core.Vocab.Operation] = createOperation;
    this.factories[Core.Vocab.StatusCodeDescription] = createStatusCodeDescription;
    this.factories[rdf.ns + 'Property'] = createRdfProperty;
}

function createRdfProperty(heracles, obj) {
    return new DocTypes.RdfProperty(obj);
}

function createApiDocumentation(heracles, obj) {
    return new DocTypes.ApiDocumentation(heracles, obj);
}

function createPartialCollectionView(heracles, obj, apiDocumentation, incomingLinks) {
    return new Types.PartialCollectionView(heracles, obj, apiDocumentation, incomingLinks);
}
function createClass(heracles, obj) {
    return new DocTypes.Class(obj);
}
function createSupportedProperty(heracles, obj) {
    return new DocTypes.SupportedProperty(obj);
}
function createOperation(heracles, obj) {
    return new DocTypes.Operation(obj);
}
function createStatusCodeDescription(heracles, obj) {
    return new DocTypes.StatusCodeDescription(obj);
}
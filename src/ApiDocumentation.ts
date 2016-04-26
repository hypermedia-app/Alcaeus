'use strict';
/// <reference path="../typings/browser.d.ts" />

import {promises as jsonld} from 'jsonld';
import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import {rdfs, schema, owl} from 'jasnell/linkeddata-vocabs';
import {Core, JsonLd} from './Constants';
import {JsonLdUtil} from "./JsonLdUtil";

var flattenedDocs = new WeakMap();

export class ApiDocumentation implements IApiDocumentation {
    id:string;
    private _original;
    private _heracles:IHeracles;

    constructor(heracles:IHeracles, docId:string, apiDoc:any) {
        this.id = docId;
        this._original = apiDoc;
        this._heracles = heracles;
    }

    getOperations(classUri:string):Promise<Array<IOperation>> {
        return this._getFlattened()
            .then(graph => {
                var supportedClass = _.find(graph, obj => JsonLdUtil.idsEqual(obj[JsonLd.Id], classUri));

                if(!supportedClass) {
                    return [];
                }

                return _.chain(graph)
                    .filter(obj => JsonLdUtil.idsEqual(obj[JsonLd.Id], supportedClass.supportedOperation) || _.some(supportedClass.supportedOperation, sp => JsonLdUtil.idsEqual(sp, obj[JsonLd.Id])))
                    .map(op => {
                        op[JsonLd.Context] = Core.Context;
                        return new Operation(op, this);
                    })
                    .value();
            });
    }

    getProperties(classUri:string):Promise<Array<ISupportedProperty>> {
        return this._getFlattened()
            .then(graph => {
                var supportedClass = _.find(graph, obj => JsonLdUtil.idsEqual(obj[JsonLd.Id], classUri));

                if(!supportedClass) {
                    return [];
                }

                return _.chain(graph)
                    .filter(obj => JsonLdUtil.idsEqual(obj[JsonLd.Id], supportedClass.supportedProperty) || _.some(supportedClass.supportedProperty, sp => JsonLdUtil.idsEqual(sp, obj[JsonLd.Id])))
                    .map(prop => {
                        prop[JsonLd.Context] = Core.Context;
                        return new SupportedProperty(prop, this);
                    })
                    .value();
            });
    }

    getClasses():Promise<Array<IClass>> {
        return this._getFlattened()
            .then(graph => {
                return _.chain(graph)
                    .filter(obj => obj[JsonLd.Type] === 'Class')
                    .map(sc => new Class(sc, this))
                    .value();
            });
    }

    getClass(classId):Promise<IClass> {
        return this.getClasses().then(cs => _.find(cs, ['id', classId]) || null);
    }

    getEntrypoint():Promise<IHydraResource> {
        return this._getFlattened()
            .then(graph => {
                var doc = _.find(graph, obj => JsonLdUtil.idsEqual(obj[JsonLd.Id], this.id));

                return this._heracles.loadResource(doc.entrypoint)
            });
    }

    _getFlattened() {
        if(flattenedDocs.has(this)) {
            return Promise.resolve(flattenedDocs.get(this));
        }

        return jsonld.flatten(this._original, Core.Context)
            .then(flat => {
                flattenedDocs.set(this, flat[JsonLd.Graph]);
                return flat[JsonLd.Graph];
            });
    }
}

export class DocumentedResource implements IDocumentedResource {
    private _hydraResource:any;

    constructor(hydraResource:any) {
        this._hydraResource = hydraResource;
    }

    get id() {
        return this._hydraResource['@id'];
    }

    get description():String {
        return this._hydraResource.description ||
            this._hydraResource[rdfs.ns + 'comment'] ||
            this._hydraResource[schema.description]
    }

    get title():String {
        return this._hydraResource.title ||
            this._hydraResource[rdfs.ns + 'label'] ||
            this._hydraResource[schema.title];
    }

    compact(context:any = null) {
        return jsonld.compact(this._hydraResource, context || Core.Context);
    }
}

export class Operation extends DocumentedResource implements IOperation {
    private _hydraOperation;
    private _apiDoc;

    constructor(hydraOperation:any, apiDoc:IApiDocumentation) {
        super(hydraOperation);

        this._hydraOperation = hydraOperation;
        this._apiDoc = apiDoc;
    }

    get method():String {
        return this._hydraOperation.method;
    }

    get expects():String {
        return this._hydraOperation.expects;
    }

    get returns():String {
        return this._hydraOperation.returns;
    }

    getExpected():Promise<IClass> {
        if(this.expects === owl.ns + 'Nothing') {
            return Promise.reject(new Error('Operation expects nothing'));
        }

        return this._apiDoc.getClass(this.expects);
    }

    getReturned():Promise<IClass> {
        if(this.returns === owl.ns + 'Nothing') {
            return Promise.reject(new Error('Operation returns nothing'));
        }

        return this._apiDoc.getClass(this.returns);
    }
}

export class SupportedProperty extends DocumentedResource implements ISupportedProperty {
    private _hydraSupportedProperty:any;
    private _apiDoc:IApiDocumentation;

    constructor(hydraSupportedProperty:any, apiDoc:IApiDocumentation) {
        super(hydraSupportedProperty);

        this._hydraSupportedProperty = hydraSupportedProperty;
        this._apiDoc = apiDoc;
    }

    get readable() {
        if (typeof this._hydraSupportedProperty.readable === 'undefined') {
            return true;
        }

        return this._hydraSupportedProperty.readable;
    }

    get writable() {
        if (typeof this._hydraSupportedProperty.writable === 'undefined') {
            return true;
        }

        return this._hydraSupportedProperty.writable;
    }

    get required() {
        if (typeof this._hydraSupportedProperty.required === 'undefined') {
            return false;
        }

        return this._hydraSupportedProperty.required;
    }

    get property() {
        return this._hydraSupportedProperty.property;
    }
}

export class Class extends DocumentedResource implements IClass {
    private _hydraClass;
    private _apiDoc;

    constructor(hydraClass:Object, apiDoc:IApiDocumentation) {
        super(hydraClass);

        this._hydraClass = hydraClass;
        this._apiDoc = apiDoc;
    }

    getSupportedOperations():Promise<Array<IOperation>> {
        return this._apiDoc.getOperations(this.id);
    }

    getSupportedProperties():Promise<Array<ISupportedProperty>> {
        return this._apiDoc.getProperties(this.id);
    }
}

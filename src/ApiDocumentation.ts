'use strict';
/// <reference path="../typings/browser.d.ts" />

import {promises as jsonld} from 'jsonld';
import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import {rdfs, schema, owl} from 'jasnell/linkeddata-vocabs';
import {Core, JsonLd} from './Constants';
import {JsonLdUtil} from "./JsonLdUtil";
import {Resource} from "./Resources";

export class ApiDocumentation extends Resource implements IApiDocumentation {

    constructor(heracles:IHeracles, apiDoc:any) {
        super(heracles, apiDoc);
    }

    get classes():Array<IClass> {
        if(typeof this[Core.Vocab.supportedClass] === 'object') {
            return [ this[Core.Vocab.supportedClass] ];
        }

        return this[Core.Vocab.supportedClass];
    }

    getOperations(classUri:string):Array<IOperation> {
        return this.getClass(classUri).supportedOperations;
    }

    getProperties(classUri:string):Array<ISupportedProperty> {
        return this.getClass(classUri).supportedProperties;
    }

    getClass(classId):IClass {
        return _.find(this.classes, [ JsonLd.Id, classId ]);
    }

    getEntrypoint():Promise<IHydraResource> {
        return this._heracles.loadResource(this[Core.Vocab.entrypoint][JsonLd.Id]);
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

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
        var clas = this.getClass(classUri);
        if(!clas){
            return [];
        }
        return clas.supportedOperations;
    }

    getProperties(classUri:string):Array<ISupportedProperty> {
        var clas = this.getClass(classUri);
        if(!clas){
            return [];
        }
        return clas.supportedProperties;
    }

    getClass(classId):IClass {
        return _.find(this.classes, [ JsonLd.Id, classId ]);
    }

    getEntrypoint():Promise<IHydraResource> {
        return this._heracles.loadResource(this[Core.Vocab.entrypoint][JsonLd.Id]);
    }
}

export class DocumentedResource extends Resource implements IDocumentedResource {
    constructor(heracles, hydraResource:any) {
        super(heracles, hydraResource);
    }

    get description():String {
        return this[Core.Vocab.description] ||
            this[rdfs.ns + 'comment'] ||
            this[schema.description]
    }

    get title():String {
        return this[Core.Vocab.title] ||
            this[rdfs.ns + 'label'] ||
            this[schema.title];
    }
}

export class Operation extends DocumentedResource implements IOperation {
    constructor(heracles:IHeracles, hydraOperation:any) {
        super(heracles, hydraOperation);
    }

    get method():String {
        return this[Core.Vocab.method];
    }

    get expects():IClass {
        return this[Core.Vocab.expects];
    }

    get returns():IClass {
        return this[Core.Vocab.returns];
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

    constructor(heracles, hydraClass:Object) {
        super(heracles, hydraClass);
    }

    get supportedOperations():Array<IOperation> {
        return this[Core.Vocab.supportedOperation];
    }

    get supportedProperties():Array<ISupportedProperty> {
        return this[Core.Vocab.supportedProperty];
    }
}

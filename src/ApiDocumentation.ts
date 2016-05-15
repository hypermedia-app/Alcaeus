'use strict';
/// <reference path="../typings/browser.d.ts" />

import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import {rdfs, schema, owl} from 'jasnell/linkeddata-vocabs';
import {Core, JsonLd} from './Constants';
import {Resource} from './Resources';

export class ApiDocumentation extends Resource implements IApiDocumentation {
    private _heracles;

    constructor(heracles:IHeracles, apiDoc:any) {
        super(apiDoc);

        this._heracles = heracles;
    }

    get classes():Array<IClass> {
        if (Array.isArray(this[Core.Vocab.supportedClass])) {
            return this[Core.Vocab.supportedClass];
        }

        return [ this[Core.Vocab.supportedClass] ];
    }

    getOperations(classUri:string):Array<IOperation> {
        var clas = this.getClass(classUri);
        if (!clas) {
            return [];
        }
        return clas.supportedOperations;
    }

    getProperties(classUri:string):Array<ISupportedProperty> {
        var clas = this.getClass(classUri);
        if (!clas) {
            return [];
        }
        return clas.supportedProperties;
    }

    getClass(classId):IClass {
        return _.find(this.classes, [JsonLd.Id, classId]) || null;
    }

    getEntrypoint():Promise<IHydraResource> {
        return this._heracles.loadResource(this[Core.Vocab.entrypoint][JsonLd.Id]);
    }
}

export class DocumentedResource extends Resource implements IDocumentedResource {
    constructor(hydraResource:any) {
        super(hydraResource);
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
    constructor(hydraOperation:any) {
        super(hydraOperation);
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

    constructor(hydraSupportedProperty:any) {
        super(hydraSupportedProperty);
    }

    get readable() {
        if (typeof this[Core.Vocab.readable] === 'boolean') {
            return this[Core.Vocab.readable];
        }

        return true;
    }

    get writable() {
        if (typeof this[Core.Vocab.writable] === 'boolean') {
            return this[Core.Vocab.writable];
        }

        return true;
    }

    get required() {
        if (typeof this[Core.Vocab.required] === 'boolean') {
            return this[Core.Vocab.required];
        }

        return false;
    }

    get property() {
        return this[Core.Vocab.property];
    }
}

export class Class extends DocumentedResource implements IClass {

    constructor(hydraClass:Object) {
        super(hydraClass);
    }

    get supportedOperations():Array<IOperation> {
        var operations = this[Core.Vocab.supportedOperation];
        
        if(typeof operations ==='undefined' || operations === null) {
            return [];
        }
        
        if(Array.isArray(operations)) {
            return this[Core.Vocab.supportedOperation];
        }

        return [ operations ];
    }

    get supportedProperties():Array<ISupportedProperty> {
        var properties = this[Core.Vocab.supportedProperty];
        
        if(typeof properties === 'undefined' || properties === null ) {
            return [];
        }
        
        if(Array.isArray(properties)) {
            return properties;
        }

        return [ properties ];
    }
}

'use strict';
/// <reference path="../typings/browser.d.ts" />

//noinspection TypeScriptCheckImport
import {promises as jsonld} from 'jsonld';
import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import {rdfs, schema} from 'jasnell/linkeddata-vocabs';
import {Core, JsonLd} from './Constants';
import {FetchUtil} from "./FetchUtil";

export class ApiDocumentation implements IApiDocumentation {
    id:string;
    private _original;

    constructor(docId:string, apiDoc:any) {
        this.id = docId;
        this._original = apiDoc;
    }

    static load(uri:string):Promise<ApiDocumentation> {
        return FetchUtil.fetchResource(uri, false)
            .then(expanded => new ApiDocumentation(uri, expanded.resources));
    }

    getOperations(classUri:string):Promise<Array<IOperation>> {
        return this._getFlattened()
            .then(graph => {
                var supportedClass = _.find(graph, obj => obj[JsonLd.Id] === classUri);

                return _.chain(graph)
                    .filter(obj => obj[JsonLd.Id] === supportedClass.supportedOperation || _.some(supportedClass.supportedOperation, sp => sp === obj[JsonLd.Id]))
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
                var supportedClass = _.find(graph, obj => obj[JsonLd.Id] === classUri);

                return _.chain(graph)
                    .filter(obj => obj[JsonLd.Id] === supportedClass.supportedProperty || _.some(supportedClass.supportedProperty, sp => sp === obj[JsonLd.Id]))
                    .map(prop => {
                        prop[JsonLd.Context] = Core.Context;
                        return new SupportedProperty(prop, this);
                    })
                    .value();
            });
    }

    getClasses():Promise<Array<IClass>> {
        return this._getFlattened()
            .then(graph
                => {
                return _.chain(graph)
                    .filter(obj => obj[JsonLd.Type] === 'Class')
                    .map(sc => new Class(sc, this))
                    .value();
            });
    }

    getClass(classId):Promise<IClass> {
        return this.getClasses().then(cs => _.find(cs, ['id', classId]));
    }

    _getFlattened() {
        return jsonld.flatten(this._original, Core.Context)
            .then(flat => flat[JsonLd.Graph]);
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

    getRaw(context:any = null) {
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
        return this._hydraOperation.expects[JsonLd.Id];
    }

    get returns():String {
        return this._hydraOperation.returns[JsonLd.Id];
    }

    getExpected():Promise<IClass> {
        return this._apiDoc.getClass(this.expects);
    }

    getReturned():Promise<IClass> {
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

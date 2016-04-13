'use strict';
/// <reference path="../typings/browser.d.ts" />

//noinspection TypeScriptCheckImport
import {promises as jsonld} from 'jsonld';
import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import {rdfs, schema} from 'jasnell/linkeddata-vocabs';
import {Core, JsonLd} from './Constants';
import {FetchUtil} from "./FetchUtil";

export class ApiDocumentation implements IApiDocumentation{
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
            .then(flat => {
                var supportedClass = _.find(flat[JsonLd.Graph], obj => obj[JsonLd.Id] === classUri);

                return _.chain(flat[JsonLd.Graph])
                    .filter(obj => obj[JsonLd.Id] === supportedClass.supportedOperation || _.some(supportedClass.supportedOperation, sp => sp === obj[JsonLd.Id]))
                    .map(op => new Operation(op, this))
                    .value();
            });
    }

    getClasses():Promise<Array<IClass>> {
        return this._getFlattened()
            .then(flat => {
                return _.chain(flat[JsonLd.Graph])
                    .filter(obj => obj[JsonLd.Type] === 'SupportedClass')
                    .map(sc => new Class(sc, this))
                    .value();
            });
    }

    getClass(classId):Promise<IClass> {
        return this.getClasses().then(cs => _.find(cs, [ 'id', classId ]));
    }

    _getFlattened() {
        return jsonld.flatten(this._original, Core.Context);
    }
}

export class Operation implements IOperation {
    private _hydraOperation;
    private _apiDoc;

    constructor(hydraOperation:any, apiDoc:ApiDocumentation) {
        this._hydraOperation = hydraOperation;
        this._apiDoc = apiDoc;
        this._hydraOperation[JsonLd.Context] = Core.Context;
    }

    get id() {
        return this._hydraOperation['@id'];
    }

    get description():String {
        return this._hydraOperation.description ||
            this._hydraOperation[rdfs.ns + 'comment'] ||
            this._hydraOperation[schema.description]
    }

    get method():String {
        return this._hydraOperation.method;
    }

    get title():String {
        return this._hydraOperation.title ||
            this._hydraOperation[rdfs.ns + 'label'] ||
            this._hydraOperation[schema.title];
    }

    get expects():String {
        return this._hydraOperation.expects[JsonLd.Id];
    }

    get returns():String {
        return this._hydraOperation.returns[JsonLd.Id];
    }

    getRaw(context:any = null) {
        return jsonld.compact(this._hydraOperation, context || Core.Context);
    }

    getExpected():Promise<IClass> {
        return this._apiDoc.getClass(this.expects);
    }

    getReturned():Promise<IClass> {
        return this._apiDoc.getClass(this.returns);
    }
}

export class Class implements IClass {
    private _hydraClass;
    private _apiDoc;

    constructor(hydraClass:Object, apiDoc:ApiDocumentation) {
        this._hydraClass = hydraClass;
        this._apiDoc = apiDoc;
    }

    get id() {
        return this._hydraClass['@id'];
    }

    getSupportedOperations() {
        return this._apiDoc.getOperations(this.id);
    }
}

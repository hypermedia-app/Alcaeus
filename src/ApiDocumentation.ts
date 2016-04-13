'use strict';
/// <reference path="../typings/browser.d.ts" />

//noinspection TypeScriptCheckImport
import {promises as jsonld} from 'jsonld';
import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import {rdfs, schema} from 'jasnell/linkeddata-vocabs';
import {Core, JsonLd} from './Constants';
import {FetchUtil} from "./FetchUtil";

export class ApiDocumentation {
    private _original;

    constructor(apiDoc:any) {
        this._original = apiDoc;
    }

    static load(uri:string):Promise<ApiDocumentation> {
        return FetchUtil.fetchResource(uri, false)
            .then(expanded => new ApiDocumentation(expanded.resources));
    }

    getOperations(classUri:string):Promise<Array<Operation>> {
        return jsonld.flatten(this._original, Core.Context)
            .then(flat => {
                var supportedClass = _.find(flat[JsonLd.Graph], obj => obj[JsonLd.Id] === classUri);

                return _.chain(flat[JsonLd.Graph])
                    .filter(obj => obj[JsonLd.Id] === supportedClass.supportedOperation || _.some(supportedClass.supportedOperation, sp => sp === obj[JsonLd.Id]))
                    .map(op => new Operation(op))
                    .value();
            });
    }
}

export class Operation {
    private _hydraOperation;

    constructor(hydraOperation:any) {
        this._hydraOperation = hydraOperation;
        this._hydraOperation[JsonLd.Context] = Core.Context;
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

    getRaw(context:any = null) {
        return jsonld.compact(this._hydraOperation, context || Core.Context);
    }
}

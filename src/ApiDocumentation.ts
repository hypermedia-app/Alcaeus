/// <reference path="../typings/browser.d.ts" />
'use strict';

//noinspection TypeScriptCheckImport
import {promises as jsonld} from 'jsonld';
import * as _ from 'lodash';
import {Core, JsonLd} from './Constants';

export class ApiDocumentation {
    private _original;

    constructor(apiDoc:any) {
        this._original = apiDoc;
    }

    static load(uri:string):Promise<ApiDocumentation> {
        return null;
    }

    getOperations(classUri:string):Promise<Array<Operation>> {
        return jsonld.flatten(this._original, Core.Context)
            .then(flat => {
                var supportedClass = _.find(flat[JsonLd.Graph], obj => obj._id === classUri);

                return _.chain(flat[JsonLd.Graph])
                    .filter(obj => obj._id === supportedClass.supportedOperation || _.some(supportedClass.supportedOperation, sp => sp === obj._id))
                    .map(op => new Operation(op))
                    .value();
            });
    }
}

export class Operation {
    constructor(hydraOperation:any) {
    }

    get description() {
        return 'Gets the api#Class';
    }

    get method() {
        return 'GET';
    }
}

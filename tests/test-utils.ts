import * as _ from 'lodash';
import {JsonLd, Core} from "../src/Constants";

export function fakeHeraclesResources(obj: Object) {
    if(!obj || !Object.isObject(obj)) {
        return;
    }

    var addGetter = addPredicateGetter.bind(obj);

    addGetter('id', JsonLd.Id, false);
    addGetter('types', JsonLd.Type, false);
    addGetter('supportedProperties', Core.Vocab.supportedProperty);
    addGetter('supportedOperations', Core.Vocab.supportedOperation);
    addGetter('property', Core.Vocab.property, false);

    _.forOwn(obj, fakeHeraclesResources);

    return obj;
}

function addPredicateGetter(prop:string, pred:string, wrapArray:boolean = true) {
    Object.defineProperty(this, prop, {
        get: () => {
            var ret = this[pred];
            if(Array.isArray(ret) === false && wrapArray) {
                return [ ret ];
            }

            return ret;
        }
    });
}
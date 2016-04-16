'use strict';

import * as _ from 'lodash';
import {Resource} from "./heracles";
import {ApiDocumentation} from "./ApiDocumentation";
import {JsonLdUtil} from "./JsonLdUtil";
import {JsonLd, Core} from './Constants';
import * as specialized from "./SpecializedResources";

export class ResourceFactory implements IResourceFactory {
    public static instance = new ResourceFactory();

    public createResource(obj:Object, apiDocumentation:ApiDocumentation, resources):Resource {
        var incomingLinks = findIncomingLinks(obj, resources);
        
        switch(obj[JsonLd.Type]){
            case Core.Vocab.PartialCollectionView:
                var collection = findParentCollection(incomingLinks);
                return new specialized.PartialCollectionView(obj, apiDocumentation, incomingLinks, collection);
        }
        
        return new Resource(obj, apiDocumentation, incomingLinks);
    }
}

function findParentCollection(incomingLinks){
    
}

function findIncomingLinks(object, resources) {
    return _.transform(resources, (acc, res, key) => {
        _.forOwn(res, (value, predicate) => {
            if (value && value[JsonLd.Id] && JsonLdUtil.idsEqual(value[JsonLd.Id], object[JsonLd.Id])) {
                acc.push([key, predicate])
            }
        });
    }, []);
}
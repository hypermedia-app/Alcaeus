'use strict';

import * as _ from 'lodash';
import * as Types from './Resources';
import {JsonLd, Core} from './Constants';
import {JsonLdUtil} from './JsonLdUtil';

export class ResourceFactory implements IResourceFactory {
    public createResource(obj:Object, apiDocumentation:IApiDocumentation, resources):Types.Resource {
        var incomingLinks = findIncomingLinks(obj, resources);

        switch(obj[JsonLd.Type]){
            case Core.Vocab.PartialCollectionView:
                return new Types.PartialCollectionView(obj, apiDocumentation, incomingLinks);
        }

        return new Types.Resource(obj, apiDocumentation, incomingLinks);
    }
}

function findIncomingLinks(object, resources) {
    return _.transform(resources, (acc, res, key) => {
        _.forOwn(res, (value, predicate) => {
            if (value && value[JsonLd.Id] && JsonLdUtil.idsEqual(value[JsonLd.Id], object[JsonLd.Id])) {
                acc.push({
                    subjectId: key,
                    predicate: predicate,
                    subject: resources[key]
                });
            }
        });
    }, []);
}
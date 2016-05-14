'use strict';

import * as _ from 'lodash';
import * as Types from './Resources';
import * as DocTypes from './ApiDocumentation';
import {JsonLd, Core} from './Constants';
import {JsonLdUtil} from './JsonLdUtil';

export class ResourceFactory implements IResourceFactory {

    factories = {};

    constructor() {
        this.factories[Core.Vocab.ApiDocumentation] =
            (heracles, obj, apiDocumentation, incomingLinks)
                => new DocTypes.ApiDocumentation(heracles, obj);
        this.factories[Core.Vocab.PartialCollectionView] =
            (heracles, obj, apiDocumentation, incomingLinks)
                => new Types.PartialCollectionView(heracles, obj, apiDocumentation, incomingLinks);
        this.factories[Core.Vocab.Class] =
            (heracles, obj, apiDocumentation, incomingLinks)
                => new DocTypes.Class(heracles, obj);
        this.factories[Core.Vocab.SupportedProperty] =
            (heracles, obj, apiDocumentation, incomingLinks)
                => new DocTypes.SupportedProperty(heracles, obj);
        this.factories[Core.Vocab.Operation] =
            (heracles, obj, apiDocumentation, incomingLinks)
                => new DocTypes.Operation(heracles, obj);
    }

    public createResource(heracles:IHeracles, obj:Object, apiDocumentation:IApiDocumentation, resources, typeOverride?:string):Types.Resource {
        var incomingLinks = findIncomingLinks(obj, resources);

        var factory = this.factories[typeOverride || obj[JsonLd.Type]];
        if(factory) {
            return factory.apply(this, arguments);
        }

        return new Types.HydraResource(heracles, obj, apiDocumentation, incomingLinks);
    }
}

class IncomingLink {
    private _id;
    private _predicate;
    private _linkSubject;

    constructor(id, predicate, resoruces) {
        this._id = id;
        this._predicate = predicate;

        Object.defineProperty(this, 'subject', <PropertyDescriptor>{
            get: () => resoruces[id]
        });
    }

    get subjectId() {
        return this._id;
    }

    get predicate() {
        return this._predicate;
    }
}

function findIncomingLinks(object, resources) {
    return _.transform(resources, (acc, res, key) => {
        _.forOwn(res, (value, predicate) => {
            if (value && value[JsonLd.Id] && JsonLdUtil.idsEqual(value[JsonLd.Id], object[JsonLd.Id])) {
                acc.push(new IncomingLink(
                    key, predicate, resources
                ));
            }
        });
    }, []);
}
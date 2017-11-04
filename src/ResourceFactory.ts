import {rdf} from './Vocabs';
import * as Types from './Resources';
import * as DocTypes from './ApiDocumentation';
import {JsonLd, Core} from './Constants';
import {IResourceFactory, IHydraClient, IApiDocumentation} from "./interfaces";
import {forOwn, values} from "./LodashUtil";

export class ResourceFactory implements IResourceFactory {

    factories = {};

    constructor() {
        setUpDefaultFactories.call(this);
    }

    public createResource(alcaeus:IHydraClient, obj:Object, apiDocumentation:IApiDocumentation, resources:Object, typeOverride?:string):Types.Resource {
        const incomingLinks = findIncomingLinks(obj, resources);

        let factory = this.factories[typeOverride || obj[JsonLd.Type]];
        if(!factory && Array.isArray(obj[JsonLd.Type])) {
            for (let i=0; i<obj[JsonLd.Type].length; i++) {
                factory = this.factories[obj[JsonLd.Type][i]];
                if(factory) {
                    break;
                }
            }
        }

        if (factory) {
            return factory.call(this, alcaeus, obj, apiDocumentation, incomingLinks);
        }

        return new Types.HydraResource(alcaeus, obj, apiDocumentation, incomingLinks);
    }
}

class IncomingLink {
    private _id;
    private _predicate;

    constructor(id, predicate, resources) {
        this._id = id;
        this._predicate = predicate;

        Object.defineProperty(this, 'subject', <PropertyDescriptor>{
            get: () => resources[id]
        });
    }

    get subjectId() {
        return this._id;
    }

    get predicate() {
        return this._predicate;
    }
}

function findIncomingLinks(object, resources:Object) {
    const instances = values(resources);

    return instances.reduceRight((acc:Array<IncomingLink>, res, index) => {
        forOwn(res, (value, predicate) => {
            if (value && value[JsonLd.Id] && value[JsonLd.Id] === object[JsonLd.Id]) {
                acc.push(new IncomingLink(
                    instances[index][JsonLd.Id], predicate, resources
                ));
            }
        });

        return acc;
    }, []);
}

function setUpDefaultFactories() {
    this.factories[Core.Vocab.ApiDocumentation] = createApiDocumentation;
    this.factories[Core.Vocab.PartialCollectionView] = createPartialCollectionView;
    this.factories[Core.Vocab.Collection] = createCollection;
    this.factories[Core.Vocab.Class] = createClass;
    this.factories[Core.Vocab.SupportedProperty] = createSupportedProperty;
    this.factories[Core.Vocab.Operation] = createOperation;
    this.factories[Core.Vocab.StatusCodeDescription] = createStatusCodeDescription;
    this.factories[rdf.Property] = createRdfProperty;
}

function createRdfProperty(alcaeus, obj) {
    return new DocTypes.RdfProperty(obj);
}

function createApiDocumentation(alcaeus, obj) {
    return new DocTypes.ApiDocumentation(alcaeus, obj);
}

function createPartialCollectionView(alcaeus, obj, apiDocumentation, incomingLinks) {
    return new Types.PartialCollectionView(alcaeus, obj, apiDocumentation, incomingLinks);
}
function createClass(alcaeus, obj) {
    return new DocTypes.Class(obj);
}
function createSupportedProperty(alcaeus, obj) {
    return new DocTypes.SupportedProperty(obj);
}
function createOperation(alcaeus, obj) {
    return new DocTypes.SupportedOperation(obj, alcaeus);
}
function createStatusCodeDescription(alcaeus, obj) {
    return new DocTypes.StatusCodeDescription(obj);
}

function createCollection(alcaeus, obj, apiDocumentation, incomingLinks) {
    return new Types.Collection(alcaeus, obj, apiDocumentation, incomingLinks);
}

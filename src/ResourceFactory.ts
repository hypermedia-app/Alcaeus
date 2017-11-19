import {JsonLd} from './Constants';
import {IResourceFactory, IHydraClient, IApiDocumentation, IResource} from "./interfaces";
import {forOwn, values} from "./LodashUtil";
import HydraResource from "./Resources/HydraResource";

export class ResourceFactory implements IResourceFactory {

    factories = {};

    public createResource(alcaeus:IHydraClient, obj:Object, apiDocumentation:IApiDocumentation, resources:Object, typeOverride?:string):IResource {
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

        return new HydraResource(alcaeus, obj, apiDocumentation, incomingLinks);
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

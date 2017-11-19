import {JsonLd} from './Constants';
import {IResourceFactory, IHydraClient, IApiDocumentation, IResource} from "./interfaces";
import {forOwn, values} from "./LodashUtil";
import HydraResource from "./Resources/HydraResource";

export class ResourceFactory implements IResourceFactory {

    mixins = [];

    public createResource(alcaeus:IHydraClient, obj:Object, apiDocumentation:IApiDocumentation, resources:Object):IResource {
        const incomingLinks = findIncomingLinks(obj, resources);

        const mixins = this.mixins
            .filter(mc => mc.shouldApplyMixin(obj))
            .map(mc => mc.mixinFunction);

        const AlcaeusGenerated = mixins.reduce((c, mixin) => mixin(c), HydraResource);

        return new AlcaeusGenerated(obj, alcaeus, apiDocumentation, incomingLinks);
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

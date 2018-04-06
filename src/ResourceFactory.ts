import {JsonLd} from './Constants';
import {IApiDocumentation, IHydraClient, IResource, IResourceFactory} from './interfaces';
import {forOwn, values} from './LodashUtil';
import DefaultMixins from './ResourceFactoryDefaults';
import HydraResource from './Resources/HydraResource';

export class ResourceFactory implements IResourceFactory {

    private mixins = DefaultMixins;

    public createResource(
        alcaeus: IHydraClient,
        obj: object,
        apiDocumentation: IApiDocumentation,
        resources: object): IResource {
        const incomingLinks = findIncomingLinks(obj, resources);

        const mixins = this.mixins
            .filter((mc: any) => {
                if (!mc.shouldApply) {
                    return false;
                }

                return mc.shouldApply(obj);
            });

        const AlcaeusGenerated = mixins.reduce((c, mixin: any) => mixin.Mixin(c), HydraResource);

        return new AlcaeusGenerated(obj, alcaeus, apiDocumentation, incomingLinks);
    }
}

// tslint:disable:max-classes-per-file
class IncomingLink {
    constructor(id, predicate, resources) {
        Object.defineProperty(this, 'subject', {
            get: () => resources[id],
        });

        Object.defineProperty(this, 'subjectId', {
            get: () => id,
        });

        Object.defineProperty(this, 'predicate', {
            get: () => predicate,
        });
    }
}

function findIncomingLinks(object, resources: object) {
    const instances = values(resources);

    return instances.reduceRight((acc: IncomingLink[], res, index) => {
        forOwn(res, (value, predicate) => {
            if (value && value[JsonLd.Id] && value[JsonLd.Id] === object[JsonLd.Id]) {
                acc.push(new IncomingLink(
                    instances[index][JsonLd.Id], predicate, resources,
                ));
            }
        });

        return acc;
    }, []);
}

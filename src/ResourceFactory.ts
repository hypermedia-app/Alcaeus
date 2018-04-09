import {JsonLd} from './Constants';
import {IApiDocumentation, IResource, IResourceFactory} from './interfaces';
import {forOwn, values} from './LodashUtil';
import HydraResource from './Resources/HydraResource';

type Constructor<T = {}> = new (...args: any[]) => T;
interface IMixin {
    Mixin: Constructor;
    shouldApply(obj: object): boolean;
}

export class ResourceFactory implements IResourceFactory {
    public readonly mixins: IMixin[];

    constructor(mixins) {
        this.mixins = mixins;
    }

    public createResource(
        obj: object,
        apiDocumentation: IApiDocumentation,
        resources: object,
        clientAccessorMixin?): IResource {
        const incomingLinks = findIncomingLinks(obj, resources);

        const mixins = this.mixins
            .filter((mc) => {
                if (!mc.shouldApply) {
                    return false;
                }

                return mc.shouldApply(obj);
            })
            .map((mc) => mc.Mixin);

        if (clientAccessorMixin) {
            mixins.push(clientAccessorMixin);
        }

        const AlcaeusGenerated = mixins.reduce((c, mixin: any) => mixin(c), HydraResource);

        return new AlcaeusGenerated(obj, apiDocumentation, incomingLinks);
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

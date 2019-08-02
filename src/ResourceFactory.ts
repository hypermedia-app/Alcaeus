import { IHydraClient } from './alcaeus'
import { JsonLd } from './Constants'
import { IIncomingLink } from './internals'
import { forOwn, values } from './LodashUtil'
import { ApiDocumentation } from './Resources'
import createBase from './Resources/HydraResource'
import { IResource } from './Resources/Resource'

export interface IResourceFactory {
    createResource(
        obj: object,
        apiDocumentation: ApiDocumentation,
        resources,
        clientAccessorMixin?): IResource;
}

export type Constructor<T = {}> = new (...args: any[]) => T;
export interface IMixin {
    Mixin: Constructor;
    shouldApply(obj: object): boolean;
}

export class ResourceFactory implements IResourceFactory {
    public readonly mixins: IMixin[];

    public constructor (mixins) {
        this.mixins = mixins
    }

    public createResource (
        obj: object,
        apiDocumentation: ApiDocumentation,
        resources: object,
        alcaeus: IHydraClient): IResource {
        const incomingLinks = () => findIncomingLinks(obj, resources)
        const HydraResource = createBase(alcaeus, incomingLinks)

        const resource = new HydraResource(obj, apiDocumentation)

        const mixins = this.mixins
            .filter((mc) => {
                if (!mc.shouldApply) {
                    return false
                }

                return mc.shouldApply(resource)
            })
            .map((mc) => mc.Mixin)

        const AlcaeusGenerated = mixins.reduce((c, mixin: any) => mixin(c), HydraResource)

        return new AlcaeusGenerated(obj, apiDocumentation)
    }
}

// tslint:disable:max-classes-per-file
class IncomingLink {
    public constructor (id, predicate, resources) {
        Object.defineProperty(this, 'subject', {
            get: () => resources[id],
        })

        Object.defineProperty(this, 'subjectId', {
            get: () => id,
        })

        Object.defineProperty(this, 'predicate', {
            get: () => predicate,
        })
    }
}

function findIncomingLinks (object, resources: object): IIncomingLink[] {
    const instances = values(resources)

    return instances.reduceRight((acc: IncomingLink[], res, index) => {
        forOwn(res, (values, predicate) => {
            if (Array.isArray(values) === false) {
                values = [values]
            }

            values.forEach(value => {
                if (value && value[JsonLd.Id] && value[JsonLd.Id] === object[JsonLd.Id]) {
                    acc.push(new IncomingLink(
                        instances[index][JsonLd.Id], predicate, resources
                    ))
                }
            })
        })

        return acc
    }, [])
}

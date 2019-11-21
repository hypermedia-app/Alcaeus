import { nonenumerable } from 'core-decorators'
import { Maybe } from 'tsmonad'
import { IHydraClient } from '../alcaeus'
import { Core } from '../Constants'
import { IAsObject, IIncomingLink } from '../internals'
import ClientAccessor from './CoreMixins/ClientAccessor'
import LinkAccessor from './CoreMixins/LinkAccessor'
import { OperationFinder } from './CoreMixins/OperationFinder'
import {
    ApiDocumentation,
    Collection,
    HydraResource as IHydraResource,
    IOperation,
    ManagesBlockPattern,
    SupportedOperation,
    SupportedProperty,
} from './index'
import { Operation } from './Operation'
import Resource, { IResource } from './Resource'

const apiDocumentation = new WeakMap<IResource, ApiDocumentation>()

interface MappedLink {
    type: string;
    predicate: string;
}

class HydraResource extends Resource implements IHydraResource {
    public constructor (actualResource, apiDoc?: ApiDocumentation | null) {
        super(actualResource)

        if (apiDoc) {
            apiDocumentation.set(this, apiDoc)
        }
    }

    @nonenumerable
    public get apiDocumentation (): Maybe<ApiDocumentation> {
        return Maybe.maybe(apiDocumentation.get(this))
    }

    @nonenumerable
    public get operations () {
        const alcaeus = (this as any)._alcaeus

        const getClassOperations = (getOperations: (c: string, p?: string) => SupportedOperation[]) => {
            const classOperations = this.types.map((type: string) => getOperations(type))

            const mappedLinks = (this as any as IAsObject)._reverseLinks
                .map((link) => link.subject.types.map((type) => ({ type, predicate: link.predicate })))
            const flattened = ([] as MappedLink[]).concat.apply([], mappedLinks)
            const propertyOperations = flattened.map(
                (link: any) => getOperations(link.type, link.predicate))

            const supportedOperations: SupportedOperation[] = Array.prototype.concat.apply([], [...classOperations, ...propertyOperations])
            const operations = supportedOperations.reduce((map, supportedOperation) => {
                if (!map.has(supportedOperation.id)) {
                    map.set(supportedOperation.id, new Operation(supportedOperation, alcaeus, this))
                }

                return map
            }, new Map<string, Operation>())

            return [...operations.values()]
        }

        return this.apiDocumentation
            .map((apiDocumentation) => ({
                apiDocumentation,
                getOperations: apiDocumentation.getOperations,
            }))
            .map((arg) => arg.getOperations.bind(arg.apiDocumentation))
            .map(getClassOperations)
            .valueOr([])
    }

    @nonenumerable
    public getLinks (includeMissing: boolean = false) {
        return this.getProperties()
            .filter((tuple) => tuple.supportedProperty.property.isLink)
            .filter((tuple) => tuple.objects.length > 0 || includeMissing)
            .map((tuple) => ({
                resources: tuple.objects,
                supportedProperty: tuple.supportedProperty,
            }))
    }

    @nonenumerable
    public getProperties (): { supportedProperty: SupportedProperty; objects: any[] }[] {
        const getProperties = (propertiesForType: (classUri: string) => SupportedProperty[]) =>
            this.types.map(propertiesForType)
                .reduce((current, supportedProperties) => {
                    const next = supportedProperties
                        .filter((sp) => {
                            return !current.find((tuple) => tuple.supportedProperty.property.id === sp.property.id)
                        })
                        .map((supportedProperty) => ({
                            objects: this.getArray(supportedProperty.property.id),
                            supportedProperty,
                        }))

                    return [...current, ...next]
                }, [] as { supportedProperty: SupportedProperty; objects: any[] }[])

        return this.apiDocumentation
            .map((apiDocumentation) => ({
                apiDocumentation,
                getProperties: apiDocumentation.getProperties,
            }))
            .map((arg) => arg.getProperties.bind(arg.apiDocumentation))
            .map(getProperties)
            .valueOr([])
    }

    @nonenumerable
    public getCollections (filter?: ManagesBlockPattern) {
        let collections = this.getArray(Core.Vocab('collection')) as Collection[]

        if (filter) {
            collections = collections.filter((c) => c.manages &&
                c.manages.find((managesBlock) => managesBlock.matches(filter)))
        }

        return collections
    }

    public load () {
        if (this.isAnonymous) {
            throw new Error('Cannot load an anonymous resource (blank node)')
        }

        return (this as any)._alcaeus.loadResource(this.id)
    }

    public findOperations (): IOperation[] { throw new Error('Not implemented') }
    public findOperationsDeep (): IOperation[] { throw new Error('Not implemented') }
    public getOperationsDeep (): IOperation[] { throw new Error('Not implemented') }
}

export default function generateClass (alcaeus: IHydraClient, getIncomingLinks: () => IIncomingLink[]) {
    const clientAccessorMixin = ClientAccessor(alcaeus)
    const linkAccessorMixin = LinkAccessor(getIncomingLinks)

    return OperationFinder(clientAccessorMixin(linkAccessorMixin(HydraResource)))
}

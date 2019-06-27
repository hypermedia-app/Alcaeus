import { nonenumerable } from 'core-decorators'
import { Maybe } from 'tsmonad'
import { IHydraClient } from '../alcaeus'
import { Core } from '../Constants'
import { IAsObject, IIncomingLink } from '../internals'
import ClientAccessor from './CoreMixins/ClientAccessor'
import LinkAccessor from './CoreMixins/LinkAccessor'
import {
    ApiDocumentation,
    Collection,
    IHydraResource,
    ManagesBlockPattern,
    SupportedOperation,
    SupportedProperty,
} from './index'
import { Operation } from './Operation'
import Resource, { IResource } from './Resource'

const apiDocumentation = new WeakMap<IResource, ApiDocumentation>()

class HydraResource extends Resource implements IHydraResource, IResource {
    public constructor (actualResource, apiDoc: ApiDocumentation) {
        super(actualResource)

        apiDocumentation.set(this, apiDoc)
    }

    @nonenumerable
    public get apiDocumentation (): Maybe<ApiDocumentation> {
        return Maybe.maybe(apiDocumentation.get(this))
    }

    @nonenumerable
    public get operations () {
        const alcaeus = (this as any)._alcaeus

        const getClassOperations = (getOperations: (c: string, p?: string) => SupportedOperation[]): Operation[] => {
            const classOperations = this.types.map((type: string) => getOperations(type))

            const mappedLinks = (this as any as IAsObject)._reverseLinks
                .map((link) => link.subject.types.map((type) => ({ type, predicate: link.predicate })))
            const flattened = [].concat.apply([], mappedLinks)
            const propertyOperations = flattened.map(
                (link: any) => getOperations(link.type, link.predicate))

            const operations = Array.prototype.concat.apply([], [...classOperations, ...propertyOperations])
            return operations.map((supportedOperation) => {
                return new Operation(supportedOperation, alcaeus, this)
            })
        }

        return this.apiDocumentation
            .map((apiDoc) => apiDoc.getOperations ? apiDoc.getOperations.bind(apiDoc) : null)
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
                            objects: this._getArray(supportedProperty.property.id),
                            supportedProperty,
                        }))

                    return [...current, ...next]
                }, [] as { supportedProperty: SupportedProperty; objects: any[] }[])

        return this.apiDocumentation
            .map((apiDoc) => apiDoc.getProperties ? apiDoc.getProperties.bind(apiDoc) : null)
            .map(getProperties)
            .valueOr([])
    }

    @nonenumerable
    public getCollections (filter?: ManagesBlockPattern) {
        let collections = this._getArray(Core.Vocab('collection')) as Collection[]

        if (filter) {
            collections = collections.filter((c) => c.manages &&
                c.manages.find((managesBlock) => managesBlock.matches(filter)))
        }

        return collections
    }
}

export default function generateClass (alcaeus: IHydraClient, getIncomingLinks: () => IIncomingLink[]) {
    const clientAccessorMixin = ClientAccessor(alcaeus)
    const linkAccessorMixin = LinkAccessor(getIncomingLinks)

    return clientAccessorMixin(linkAccessorMixin(HydraResource))
}

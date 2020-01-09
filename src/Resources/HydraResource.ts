import { Constructor, property, RdfResource } from '@tpluscode/rdfine'
import { IHydraClient } from '../alcaeus'
import { hydra } from '../Vocabs'
import {
    Collection,
    ManagesBlockPattern,
    SupportedOperation,
    SupportedProperty,
    Class,
    ISupportedProperty,
    HydraResource,
} from './index'
import { CollectionMixin } from './Mixins/Collection'
import { Operation } from './Operation'
import { IResource } from './Resource'

export function createHydraResourceMixin (alcaeus: IHydraClient) {
    return function HydraResourceMixin<Base extends Constructor<RdfResource & IResource>> (base: Base) {
        class HR extends base {
            public get operations () {
                const classOperations = [...this.types.values()].reduce((operations, clas: RdfResource | Class) => {
                    if ('supportedOperations' in clas) {
                        return [...operations, ...clas.supportedOperations]
                    }

                    return operations
                }, [] as SupportedOperation[])

                const propertyOperations = [...this._node.dataset.match(null, null, this._node.term)]
                    .reduce((operations, quad) => {
                        if (quad.subject.termType !== 'NamedNode') {
                            return operations
                        }

                        const subject = this._create(this._node.namedNode(quad.subject))
                        return [...subject.types.values()].reduce((operations, clas: RdfResource | Class) => {
                            if ('supportedProperties' in clas) {
                                const supportedProperty = clas.supportedProperties.find((prop: ISupportedProperty) => {
                                    return prop.property && quad.predicate.equals(prop.property.id)
                                })

                                if (supportedProperty) {
                                    return [...operations, ...supportedProperty.property.supportedOperations]
                                }
                            }

                            return operations
                        }, operations)
                    }, [] as SupportedOperation[])

                const supportedOperations: SupportedOperation[] = Array.prototype.concat.apply([], [...classOperations, ...propertyOperations])
                const operations = supportedOperations.reduce((map, supportedOperation) => {
                    if (!map.has(supportedOperation.id.value)) {
                        map.set(supportedOperation.id.value, new Operation(supportedOperation, alcaeus, this as any as HydraResource))
                    }

                    return map
                }, new Map<string, Operation>())

                return [...operations.values()]
            }

            public getLinks (includeMissing: boolean = false) {
                return this.getProperties()
                    .filter((tuple) => tuple.supportedProperty.property.isLink)
                    .filter((tuple) => tuple.objects.length > 0 || includeMissing)
                    .map((tuple) => ({
                        resources: tuple.objects,
                        supportedProperty: tuple.supportedProperty,
                    }))
            }

            public getProperties (): { supportedProperty: SupportedProperty; objects: any[] }[] {
                const classProperties = [...this.types.values()].reduce((properties, clas: RdfResource | Class) => {
                    if ('supportedProperties' in clas) {
                        return [...properties, clas.supportedProperties]
                    }

                    return properties
                }, [] as SupportedProperty[][])

                return classProperties.reduce((current, supportedProperties) => {
                    const next = supportedProperties
                        .filter((sp) => {
                            return !current.find((tuple) => tuple.supportedProperty.property.id.equals(sp.property.id))
                        })
                        .map((supportedProperty) => ({
                            objects: this.getArray(supportedProperty.property.id.value),
                            supportedProperty,
                        }))

                    return [...current, ...next]
                }, [] as { supportedProperty: SupportedProperty; objects: any[] }[])
            }

            @property.resource({ path: hydra.collection, array: true, as: [CollectionMixin] })
            public collections!: Collection[]

            public getCollections (filter?: ManagesBlockPattern) {
                if (filter) {
                    return this.collections.filter((c) => c.manages &&
                        c.manages.find((managesBlock) => managesBlock.matches(filter)))
                }

                return this.collections
            }
        }

        return HR
    }
}

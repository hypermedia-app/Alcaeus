import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { Resource, Class, SupportedProperty, Operation } from '@rdfine/hydra'
import type { DatasetCore } from 'rdf-js'
import type { HydraClient } from '../../alcaeus'
import type { ManagesBlockPattern } from '../Mixins/ManagesBlock'
import RuntimeOperation from '../Operation'

declare module '@tpluscode/rdfine' {
    export interface RdfResource<D extends DatasetCore = DatasetCore>{
        /**
         * Gets the operations which can be performed on this resource
         */
        readonly operations: RuntimeOperation[]

        /**
         * Gathers all properties from current resource's classes
         */
        getProperties(): { supportedProperty: SupportedProperty; objects: any[] }[]

        /**
         * Get all property/value pairs for hydra:Link properties
         *
         * @param includeMissing if true, will include properties not present in resource representation
         */
        getLinks(includeMissing?: boolean): { supportedProperty: SupportedProperty; resources: RdfResource<D>[] }[]

        /**
         * Gets objects of hydra:collection property
         */
        getCollections(filter?: ManagesBlockPattern): RdfResource<D>[]
    }
}

export function createHydraResourceMixin(alcaeus: () => HydraClient<any>) {
    function getSupportedClasses(resource: RdfResource) {
        return alcaeus().apiDocumentations
            .reduce<Class[]>((classes, representation) => {
            const docs = representation.root
            if (!docs || !('supportedClass' in docs)) return classes

            return [...classes, ...docs.supportedClass.filter(c => resource.types.has(c))]
        }, [])
    }

    function HydraResourceMixin<Base extends Constructor<Resource>>(base: Base) {
        return class extends base implements Resource {
            public get operations() {
                const classOperations = getSupportedClasses(this)
                    .reduce<Operation[]>((operations, clas: Class) => [...operations, ...clas.supportedOperation], [])

                const propertyOperations = [...this.pointer.dataset.match(null, null, this.pointer.term)]
                    .reduce((operations, quad) => {
                        if (quad.subject.termType !== 'NamedNode') {
                            return operations
                        }

                        const subject = this._create(this.pointer.namedNode(quad.subject))
                        return getSupportedClasses(subject)
                            .reduce((operations, clas: Class) => {
                                const supportedProperty = clas.supportedProperty.find((prop: SupportedProperty) => {
                                    return prop.property && quad.predicate.equals(prop.property.id)
                                })

                                if (supportedProperty?.property && 'supportedOperations' in supportedProperty.property) {
                                    return [...operations, ...supportedProperty.property.supportedOperations]
                                }

                                return operations
                            }, operations)
                    }, [] as Operation[])

                const supportedOperations: Operation[] = Array.prototype.concat.apply([], [...classOperations, ...propertyOperations])
                const operations = supportedOperations.reduce((map, supportedOperation) => {
                    if (!map.has(supportedOperation.id.value)) {
                        map.set(supportedOperation.id.value, new RuntimeOperation(supportedOperation, alcaeus(), this as any))
                    }

                    return map
                }, new Map<string, RuntimeOperation>())

                return [...operations.values()]
            }

            public getLinks(includeMissing = false) {
                return this.getProperties()
                    .filter((tuple) => tuple.supportedProperty.property?.isLink)
                    .filter((tuple) => tuple.objects.length > 0 || includeMissing)
                    .map((tuple) => ({
                        resources: tuple.objects,
                        supportedProperty: tuple.supportedProperty,
                    }))
            }

            public getProperties(): { supportedProperty: SupportedProperty; objects: any[] }[] {
                const classProperties = getSupportedClasses(this)
                    .reduce<SupportedProperty[][]>((operations, clas: Class) => [...operations, clas.supportedProperty], [])

                return classProperties.reduce((current, supportedProperties) => {
                    const next = supportedProperties
                        .filter((sp) => {
                            return !current.find((tuple) => tuple.supportedProperty.property?.equals(sp.property))
                        })
                        .map((supportedProperty) => ({
                            objects: this.getArray(supportedProperty.property!.id.value),
                            supportedProperty,
                        }))

                    return [...current, ...next]
                }, [] as { supportedProperty: SupportedProperty; objects: any[] }[])
            }

            public getCollections(filter?: ManagesBlockPattern) {
                if (filter) {
                    return this.collection.filter((c) => c.manages &&
                        c.manages.find((managesBlock) => managesBlock.matches(filter)))
                }

                return this.collection
            }
        }
    }

    HydraResourceMixin.shouldApply = true

    return HydraResourceMixin
}

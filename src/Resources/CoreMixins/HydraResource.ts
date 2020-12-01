import { hydra, rdf } from '@tpluscode/rdf-ns-builders'
import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { Term } from 'rdf-js'
import TermMap from '@rdf-esm/term-map'
import { GraphPointer } from 'clownface'
import type { Resource, SupportedProperty } from '@rdfine/hydra'
import { ResourceNode } from '@tpluscode/rdfine/RdfResource'
import type { HydraClient } from '../../alcaeus'
import type { ManagesBlockPattern } from '../Mixins/ManagesBlock'
import { RuntimeOperation, createMixin } from '../Operation'

declare module '@tpluscode/rdfine' {
    export interface RdfResource<ID extends ResourceNode = ResourceNode> {
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
        getLinks(includeMissing?: boolean): { supportedProperty: SupportedProperty; resources: RdfResource<ID>[] }[]

        /**
         * Gets objects of hydra:collection property
         */
        getCollections(filter?: ManagesBlockPattern): RdfResource<ID>[]
    }
}

export function createHydraResourceMixin(alcaeus: () => HydraClient<any>) {
    function * getSupportedClasses(resource: GraphPointer): Iterable<GraphPointer> {
        for (const { root: docs } of alcaeus().apiDocumentations) {
            if (!docs) {
                continue
            }
            const classes = docs.pointer.node(resource.out(rdf.type))
            for (const clas of classes.toArray()) {
                yield clas
            }
        }
    }

    function HydraResourceMixin<Base extends Constructor<Resource>>(base: Base) {
        return class extends base implements Resource {
            public get operations(): RuntimeOperation[] {
                const classOperations = [...getSupportedClasses(this.pointer)]
                    .reduce<GraphPointer[]>((operations, clas) => [...operations, ...clas.out(hydra.supportedOperation).toArray()], [])

                const propertyOperations = [...this.pointer.dataset.match(null, null, this.pointer.term)]
                    .reduce((operations, quad) => {
                        if (quad.subject.termType !== 'NamedNode') {
                            return operations
                        }

                        return [...getSupportedClasses(this.pointer.namedNode(quad.subject))]
                            .reduce((operations, clas) => {
                                return [...operations, ...clas
                                    .out(hydra.supportedProperty)
                                    .has(hydra.property, quad.predicate)
                                    .out(hydra.property)
                                    .out(hydra.supportedOperation).toArray()]
                            }, operations)
                    }, [] as GraphPointer[])

                const supportedOperations: GraphPointer[] = Array.prototype.concat.apply([], [...classOperations, ...propertyOperations])
                const operations = supportedOperations.reduce((map, pointer) => {
                    if (!map.has(pointer.term)) {
                        map.set(pointer.term, this._create<RuntimeOperation>(pointer, [createMixin(alcaeus(), this)]))
                    }

                    return map
                }, new TermMap<Term, RuntimeOperation>())

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
                const classProperties = [...getSupportedClasses(this.pointer)]
                    .reduce<GraphPointer[]>((operations, clas) => [...operations, ...clas.out(hydra.supportedProperty).toArray()], [])

                const map = classProperties.reduce((current, supportedProperty) => {
                    const predicate = supportedProperty.out(hydra.property).toArray()[0]
                    if (predicate.term.termType !== 'NamedNode' || current.has(predicate.term)) {
                        return current
                    }

                    const objects = this.getArray(predicate.term)
                    return current.set(predicate.term, {
                        objects,
                        supportedProperty: this._create<SupportedProperty>(supportedProperty),
                    })
                }, new TermMap<Term, { supportedProperty: SupportedProperty; objects: any[] }>())

                return [...map.values()]
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

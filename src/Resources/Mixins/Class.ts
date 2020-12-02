import { SupportedPropertyMixin, OperationMixin, Resource } from '@rdfine/hydra'
import type { Class, Operation, SupportedProperty } from '@rdfine/hydra'
import type { Class as RdfsClass } from '@rdfine/rdfs'
import { property } from '@tpluscode/rdfine'
import type { Constructor } from '@tpluscode/rdfine'
import TypeCollection from '@tpluscode/rdfine/lib/TypeCollection'
import { hydra, rdfs } from '@tpluscode/rdf-ns-builders'

declare module '@rdfine/hydra' {
    export interface Class {
        getTypeHierarchy(): Generator<this>
    }
}

export type { Class } from '@rdfine/hydra'

export function ClassMixin<TBase extends Constructor<Resource>>(Base: TBase) {
    class ClassClass extends Base {
        @property.resource({
            path: rdfs.subClassOf,
            values: 'array',
            as: [ClassMixin],
            implicitTypes: [rdfs.Class, hydra.Class],
        })
        public __subClassOf!: Array<RdfsClass & Class>

        @property.resource({
            path: hydra.supportedOperation,
            values: 'array',
            as: [OperationMixin],
            subjectFromAllGraphs: true,
        })
        public __allSupportedOperations!: Operation[]

        @property.resource({
            path: hydra.supportedProperty,
            values: 'array',
            as: [SupportedPropertyMixin],
            subjectFromAllGraphs: true,
        })
        public __allSupportedProperties!: SupportedProperty[]

        public get types() {
            return new TypeCollection(this, true)
        }

        public get supportedOperation(): Operation[] {
            return [...this.getTypeHierarchy()].reduce((operations, type) => {
                return type.__allSupportedOperations.reduce((operations, operation) => {
                    if (operations.find(current => current.equals(operation))) {
                        return operations
                    }

                    return [...operations, operation]
                }, operations)
            }, [] as Operation[])
        }

        public get supportedProperty(): SupportedProperty[] {
            return [...this.getTypeHierarchy()].reduce((properties, type) => {
                return type.__allSupportedProperties.reduce((properties, property) => {
                    if (properties.find(current => current.property?.equals(property.property))) {
                        return properties
                    }

                    return [...properties, property]
                }, properties)
            }, [] as SupportedProperty[])
        }

        public * getTypeHierarchy(): Generator<this> {
            yield this

            for (const superclass of this.__subClassOf) {
                for (const type of superclass.getTypeHierarchy()) {
                    yield type as any
                }
            }
        }
    }

    return ClassClass
}

ClassMixin.appliesTo = hydra.Class

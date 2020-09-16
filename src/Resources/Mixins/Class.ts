import { property } from '@tpluscode/rdfine'
import type { Constructor } from '@tpluscode/rdfine'
import TypeCollection from '@tpluscode/rdfine/lib/TypeCollection'
import { hydra, rdfs } from '@tpluscode/rdf-ns-builders'
import type { HydraResource, SupportedOperation, SupportedProperty } from '../index'
import { SupportedOperationMixin } from './SupportedOperation'
import { SupportedPropertyMixin } from './SupportedProperty'

export interface Class extends HydraResource {
    /**
     * Gets the operations supported by this class
     */
    supportedOperations: SupportedOperation[]

    /**
     * Gets the properties supported by this class
     */
    supportedProperties: SupportedProperty[]
}

export interface RuntimeClass extends Class {
    subClassOf: this[]
    getTypeHierarchy(): Generator<this>
}

export function ClassMixin<TBase extends Constructor<HydraResource>>(Base: TBase): Constructor<RuntimeClass> {
    class ClassClass extends Base implements RuntimeClass {
        @property.resource({
            path: rdfs.subClassOf,
            values: 'array',
            as: [ClassMixin],
        })
        public subClassOf!: this[]

        @property.resource({
            path: hydra.supportedOperation,
            values: 'array',
            as: [SupportedOperationMixin],
            subjectFromAllGraphs: true,
        })
        public __supportedOperations!: SupportedOperation[]

        @property.resource({
            path: hydra.supportedProperty,
            values: 'array',
            as: [SupportedPropertyMixin],
            subjectFromAllGraphs: true,
        })
        public __supportedProperties!: SupportedProperty[]

        public get types() {
            return new TypeCollection(this, true)
        }

        public get supportedOperations(): SupportedOperation[] {
            return [...this.getTypeHierarchy()].reduce((operations, type) => {
                return type.__supportedOperations.reduce((operations, operation) => {
                    if (operations.find(current => current.id.equals(operation.id))) {
                        return operations
                    }

                    return [...operations, operation]
                }, operations)
            }, [] as SupportedOperation[])
        }

        public get supportedProperties(): SupportedProperty[] {
            return [...this.getTypeHierarchy()].reduce((properties, type) => {
                return type.__supportedProperties.reduce((properties, property) => {
                    if (properties.find(current => current.property.id.equals(property.property.id))) {
                        return properties
                    }

                    return [...properties, property]
                }, properties)
            }, [] as SupportedProperty[])
        }

        public * getTypeHierarchy(): Generator<this> {
            yield this

            for (const superclass of this.subClassOf) {
                for (const type of superclass.getTypeHierarchy()) {
                    yield type
                }
            }
        }
    }

    return ClassClass
}

ClassMixin.appliesTo = hydra.Class

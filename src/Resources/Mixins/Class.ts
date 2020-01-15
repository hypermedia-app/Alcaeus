import { Constructor, property } from '@tpluscode/rdfine'
import { hydra, rdfs } from '../../Vocabs'
import { IClass, SupportedOperation, SupportedProperty } from '../index'
import { IResource } from '../Resource'
import { SupportedOperationMixin } from './SupportedOperation'
import { SupportedPropertyMixin } from './SupportedProperty'

export function ClassMixin<TBase extends Constructor> (Base: TBase) {
    class Class extends Base implements IClass {
        @property.resource({
            path: rdfs.subClassOf,
            array: true,
            as: [ClassMixin],
        })
        public subClassOf!: Class[]

        @property.resource({
            path: hydra.supportedOperation,
            array: true,
            as: [SupportedOperationMixin],
        })
        public __supportedOperations!: SupportedOperation[]

        @property.resource({
            path: hydra.supportedProperty,
            array: true,
            as: [SupportedPropertyMixin],
        })
        public __supportedProperties!: SupportedProperty[]

        public get supportedOperations (): SupportedOperation[] {
            return [...this.getTypeHierarchy()].reduce((operations, type) => {
                return type.__supportedOperations.reduce((operations, operation) => {
                    if (operations.find(current => current.id.equals(operation.id))) {
                        return operations
                    }

                    return [...operations, operation]
                }, operations)
            }, [] as SupportedOperation[])
        }

        public get supportedProperties (): SupportedProperty[] {
            return [...this.getTypeHierarchy()].reduce((properties, type) => {
                return type.__supportedProperties.reduce((properties, property) => {
                    if (properties.find(current => current.property.id.equals(property.property.id))) {
                        return properties
                    }

                    return [...properties, property]
                }, properties)
            }, [] as SupportedProperty[])
        }

        public * getTypeHierarchy (): Generator<Class> {
            yield this

            for (const superclass of this.subClassOf) {
                for (const type of superclass.getTypeHierarchy()) {
                    yield type
                }
            }
        }
    }

    return Class
}

ClassMixin.shouldApply = (res: IResource) => res.hasType(hydra.Class)

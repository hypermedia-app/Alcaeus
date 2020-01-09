import { Constructor, property, namespace } from '@tpluscode/rdfine'
import { hydra } from '../../Vocabs'
import { IClass, SupportedOperation, SupportedProperty } from '../index'
import { IResource } from '../Resource'
import { SupportedOperationMixin } from './SupportedOperation'
import { SupportedPropertyMixin } from './SupportedProperty'

export function ClassMixin<TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class Class extends Base implements IClass {
        @property.resource({
            path: 'supportedOperation',
            array: true,
            as: [SupportedOperationMixin],
        })
        public supportedOperations!: SupportedOperation[]

        @property.resource({
            path: 'supportedProperty',
            array: true,
            as: [SupportedPropertyMixin],
        })
        public supportedProperties!: SupportedProperty[]
    }

    return Class
}

ClassMixin.shouldApply = (res: IResource) => res.hasType(hydra.Class)

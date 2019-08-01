import { Core } from '../../Constants'
import { IClass, SupportedOperation, SupportedProperty } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    abstract class Class extends Base implements IClass {
        public get supportedOperations () {
            return this.getArray<SupportedOperation>(Core.Vocab('supportedOperation'))
        }

        public get supportedProperties () {
            return this.getArray<SupportedProperty>(Core.Vocab('supportedProperty'))
        }
    }

    return Class
}

export const shouldApply = (res: IResource) => res.types.contains((Core.Vocab('Class')))

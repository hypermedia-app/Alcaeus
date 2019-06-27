import { Core } from '../../Constants'
import { ISupportedProperty } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    return class SupportedProperty extends Base implements ISupportedProperty {
        public get readable () {
            const readable = this._get(Core.Vocab('readable'))
            if (typeof readable === 'boolean') {
                return readable
            }

            return true
        }

        public get writable () {
            const writable = this._get(Core.Vocab('writable'))
            if (typeof writable === 'boolean') {
                return writable
            }

            return true
        }

        public get required () {
            const required = this._get(Core.Vocab('required'))
            if (typeof required === 'boolean') {
                return required
            }

            return false
        }

        public get property () {
            return this._get(Core.Vocab('property'))
        }
    }
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('SupportedProperty'))

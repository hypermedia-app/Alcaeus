import { Core } from '../../Constants'
import { ISupportedProperty, RdfProperty } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    return class SupportedProperty extends Base implements ISupportedProperty {
        public get readable () {
            const readable = this.get(Core.Vocab('readable'))
            if (typeof readable === 'boolean') {
                return readable
            }

            return true
        }

        public get writable () {
            const writable = this.get(Core.Vocab('writable'))
            if (typeof writable === 'boolean') {
                return writable
            }

            return true
        }

        public get required () {
            const required = this.get(Core.Vocab('required'))
            if (typeof required === 'boolean') {
                return required
            }

            return false
        }

        public get property () {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.get<RdfProperty>(Core.Vocab('property'), { strict: true })!
        }
    }
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('SupportedProperty'))

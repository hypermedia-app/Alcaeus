import { Core } from '../../Constants'
import { IStatusCodeDescription } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin <TBase extends Constructor> (Base: TBase) {
    return class StatusCodeDescription extends Base implements IStatusCodeDescription {
        public get code (): number {
            return this[Core.Vocab('code')]
        }

        public get description (): string {
            return this[Core.Vocab('description')] || ''
        }
    }
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('StatusCodeDescription'))

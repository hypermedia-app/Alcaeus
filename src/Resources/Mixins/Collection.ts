import { nonenumerable } from 'core-decorators'
import { Core } from '../../Constants'
import { HydraResource, ICollection, View, IManagesBlock } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin <TBase extends Constructor> (Base: TBase) {
    abstract class Collection extends Base implements ICollection {
        @nonenumerable
        public get totalItems () {
            return this.getNumber(Core.Vocab('totalItems')) || 0
        }

        @nonenumerable
        public get members () {
            return this.getArray<HydraResource>(Core.Vocab('member'))
        }

        @nonenumerable
        public get views () {
            return this.getArray<View>(Core.Vocab('view'))
        }

        public get manages () {
            return this.getArray<IManagesBlock>(Core.Vocab('manages'))
        }
    }

    return Collection
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('Collection'))

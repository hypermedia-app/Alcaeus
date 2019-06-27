import { nonenumerable } from 'core-decorators'
import { Core } from '../../Constants'
import { IIriTemplateMapping } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    class IriTemplateMapping extends Base implements IIriTemplateMapping {
        @nonenumerable
        public get variable () {
            return this[Core.Vocab('variable')]
        }

        @nonenumerable
        public get property () {
            return this[Core.Vocab('property')]
        }

        @nonenumerable
        public get required () {
            return this[Core.Vocab('required')] || false
        }
    }

    return IriTemplateMapping
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('IriTemplateMapping'))

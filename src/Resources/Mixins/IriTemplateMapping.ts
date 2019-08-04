import { nonenumerable } from 'core-decorators'
import { Core } from '../../Constants'
import { IIriTemplateMapping, RdfProperty } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    class IriTemplateMapping extends Base implements IIriTemplateMapping {
        @nonenumerable
        public get variable () {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.getString(Core.Vocab('variable'), { strict: true })!
        }

        @nonenumerable
        public get property () {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this.get<RdfProperty>(Core.Vocab('property'), { strict: true })!
        }

        @nonenumerable
        public get required () {
            return this.getBoolean(Core.Vocab('required'))
        }
    }

    return IriTemplateMapping
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('IriTemplateMapping'))

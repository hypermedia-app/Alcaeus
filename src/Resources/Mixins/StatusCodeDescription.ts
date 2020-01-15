import { Constructor, namespace, property } from '@tpluscode/rdfine'
import { hydra } from '../../Vocabs'
import { IStatusCodeDescription } from '../index'
import { IResource } from '../Resource'

export function StatusCodeDescriptionMixin <TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class StatusCodeDescription extends Base implements IStatusCodeDescription {
        @property.literal({
            type: Number,
        })
        public code!: number

        @property.literal({ initial: '' })
        public description!: string
    }

    return StatusCodeDescription
}

StatusCodeDescriptionMixin.shouldApply = (res: IResource) => res.hasType(hydra.StatusCodeDescription)

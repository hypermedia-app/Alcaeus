import { Constructor, namespace, property, RdfResource } from '@tpluscode/rdfine'
import { hydra } from '@tpluscode/rdf-ns-builders'

export interface StatusCodeDescription {
    code: number | null;
    description: string;
}

export function StatusCodeDescriptionMixin <TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class StatusCodeDescriptionClass extends Base implements StatusCodeDescription {
        @property.literal({
            type: Number,
        })
        public code!: number

        @property.literal({ initial: '' })
        public description!: string
    }

    return StatusCodeDescriptionClass
}

StatusCodeDescriptionMixin.shouldApply = (res: RdfResource) => res.hasType(hydra.StatusCodeDescription)

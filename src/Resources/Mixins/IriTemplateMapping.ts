import { Constructor, namespace, property, RdfResource } from '@tpluscode/rdfine'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { HydraResource } from '../index'
import { RdfProperty, RdfPropertyMixin } from './RdfProperty'

export interface IriTemplateMapping extends RdfResource {
    property: RdfProperty;
    variable: string;
    required: boolean;
}

export function IriTemplateMappingMixin<TBase extends Constructor<HydraResource>> (Base: TBase) {
    @namespace(hydra)
    class IriTemplateMappingClass extends Base implements IriTemplateMapping {
        @property.literal({
            strict: true,
        })
        public variable!: string

        @property.resource({
            strict: true,
            as: [RdfPropertyMixin],
        })
        public property!: RdfProperty

        @property.literal({
            strict: true,
            type: Boolean,
            initial: false,
        })
        public required!: boolean
    }

    return IriTemplateMappingClass
}

IriTemplateMappingMixin.shouldApply = (res: RdfResource) => res.hasType(hydra.IriTemplateMapping)

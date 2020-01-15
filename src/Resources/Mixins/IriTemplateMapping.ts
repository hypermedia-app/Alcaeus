import { Constructor, namespace, property } from '@tpluscode/rdfine'
import { hydra } from '../../Vocabs'
import { IIriTemplateMapping, RdfProperty } from '../index'
import { IResource } from '../Resource'
import { RdfPropertyMixin } from './RdfProperty'

export function IriTemplateMappingMixin<TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class IriTemplateMapping extends Base implements IIriTemplateMapping {
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

    return IriTemplateMapping
}

IriTemplateMappingMixin.shouldApply = (res: IResource) => res.hasType(hydra.IriTemplateMapping)

import { Constructor, namespace, property } from '@tpluscode/rdfine'
import { hydra } from '../../Vocabs'
import { HydraResource, IIriTemplate, IIriTemplateMapping } from '../index'
import { IResource } from '../Resource'
import { IriTemplateMappingMixin } from './IriTemplateMapping'

export function IriTemplateMixin<TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class IriTemplate extends Base implements Partial<IIriTemplate> {
        @property.literal()
        public template!: string

        @property.resource({
            path: hydra.mapping,
            values: 'array',
            as: [IriTemplateMappingMixin],
        })
        public mappings!: IIriTemplateMapping[]

        @property({
            initial: hydra.BasicRepresentation,
        })
        public variableRepresentation!: HydraResource
    }

    return IriTemplate
}

IriTemplateMixin.shouldApply = (res: IResource) => res.hasType(hydra.IriTemplate)

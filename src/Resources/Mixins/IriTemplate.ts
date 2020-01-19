import { Constructor, namespace, property, RdfResource } from '@tpluscode/rdfine'
import { hydra } from '../../Vocabs'
import { HydraResource } from '../index'
import { IriTemplateMapping, IriTemplateMappingMixin } from './IriTemplateMapping'

export interface IriTemplate extends HydraResource {
    template: string;
    mappings: IriTemplateMapping[];
    variableRepresentation: HydraResource;
    expand(mode: any): string;
}

export function IriTemplateMixin<TBase extends Constructor<HydraResource>> (Base: TBase) {
    @namespace(hydra)
    class IriTemplateClass extends Base implements IriTemplate {
        @property.literal()
        public template!: string

        @property.resource({
            path: hydra.mapping,
            values: 'array',
            as: [IriTemplateMappingMixin],
        })
        public mappings!: IriTemplateMapping[]

        @property({
            initial: hydra.BasicRepresentation,
        })
        public variableRepresentation!: HydraResource

        public expand (): string {
            throw new Error('Not implemented')
        }
    }

    return IriTemplateClass
}

IriTemplateMixin.shouldApply = (res: RdfResource) => res.hasType(hydra.IriTemplate)

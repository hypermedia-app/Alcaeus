import { Constructor, namespace, property } from '@tpluscode/rdfine'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { HydraResource } from '../index'
import { IriTemplateMapping, IriTemplateMappingMixin } from './IriTemplateMapping'

export interface IriTemplate extends HydraResource {
    template: string
    mappings: IriTemplateMapping[]
    variableRepresentation: HydraResource
    expand(model: any): string
}

// temporary fix to avoid combining abstract classes with decorators
// see babel/babel#10514
function AbstractExpander<TBase extends Constructor<HydraResource>>(Base: TBase) {
    abstract class AbstractExpanderClass extends Base {
        public abstract expand (model: any): string
    }

    return AbstractExpanderClass
}

export function IriTemplateMixin<TBase extends Constructor<HydraResource>>(Base: TBase) {
    @namespace(hydra)
    abstract class IriTemplateClass extends AbstractExpander(Base) implements IriTemplate {
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
    }

    return IriTemplateClass
}

IriTemplateMixin.appliesTo = hydra.IriTemplate

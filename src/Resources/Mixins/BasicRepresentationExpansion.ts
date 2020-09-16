import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import { hydra } from '@tpluscode/rdf-ns-builders'
import ExpansionModelBuilder from './ExpansionModelBuilder'
import type { ExpandedValue } from './ExpansionModelBuilder'
import type { IriTemplate } from './IriTemplate'

export function BasicRepresentationExpansionMixin<TBase extends Constructor<IriTemplate>>(Base: TBase) {
    class BasicRepresentationExpansion extends Base {
        public mapShorthandValue(value: any) {
            return value
        }

        public mapExpandedValue(value: ExpandedValue) {
            return value['@value'] || value['@id']
        }
    }

    return ExpansionModelBuilder(BasicRepresentationExpansion)
}

BasicRepresentationExpansionMixin.shouldApply = function (resource: RdfResource) {
    const isTemplate = resource.hasType(hydra.IriTemplate)

    const variableRepresentation = resource.pointer.out(hydra.variableRepresentation)
    const isUndefined = variableRepresentation.terms.length === 0

    const isExactMatch = variableRepresentation.values.includes(hydra.BasicRepresentation.value)

    return isTemplate && (isUndefined || isExactMatch)
}

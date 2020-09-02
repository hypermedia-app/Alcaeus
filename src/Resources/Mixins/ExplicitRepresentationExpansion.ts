import { Constructor, RdfResource } from '@tpluscode/rdfine'
import ExpansionModelBuilder, { ExpandedValue } from './ExpansionModelBuilder'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { IriTemplate } from './IriTemplate'

export function ExplicitRepresentationExpansionMixin<TBase extends Constructor<IriTemplate>>(Base: TBase) {
    class ExplicitRepresentationExpansion extends Base {
        public mapShorthandValue(value: string) {
            return `"${value}"`
        }

        public mapExpandedValue(value: ExpandedValue) {
            if (value['@id']) {
                return value['@id']
            }

            if (value['@language']) {
                return `"${value['@value']}"@${value['@language']}`
            }

            if (value['@type']) {
                return `"${value['@value']}"^^${value['@type']}`
            }

            return `"${value['@value']}"`
        }
    }

    return ExpansionModelBuilder(ExplicitRepresentationExpansion)
}

ExplicitRepresentationExpansionMixin.shouldApply = function (resource: RdfResource) {
    const isTemplate = resource.hasType(hydra.IriTemplate)

    const isExplicitRepresentation = resource.pointer.out(hydra.variableRepresentation)
        .values.includes(hydra.ExplicitRepresentation.value)

    return isTemplate && isExplicitRepresentation
}

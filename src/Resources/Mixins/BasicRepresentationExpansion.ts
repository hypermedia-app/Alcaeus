import { Constructor, RdfResource } from '@tpluscode/rdfine'
import { hydra } from '../../Vocabs'
import { IIriTemplate } from '../index'
import ExpansionModelBuilder, { IExpandedValue } from './ExpansionModelBuilder'

export function BasicRepresentationExpansionMixin<TBase extends Constructor<RdfResource & IIriTemplate>> (Base: TBase) {
    class BasicRepresentationExpansion extends Base {
        public mapShorthandValue (value: any) {
            return value
        }

        public mapExpandedValue (value: IExpandedValue) {
            return value['@value'] || value['@id']
        }
    }

    return ExpansionModelBuilder(BasicRepresentationExpansion)
}

BasicRepresentationExpansionMixin.shouldApply = function (resource: RdfResource) {
    const isTemplate = resource.hasType(hydra.IriTemplate)

    const variableRepresentation = resource._node.out(hydra.variableRepresentation)
    const isUndefined = variableRepresentation.terms.length === 0

    const isExactMatch = variableRepresentation.values.includes(hydra.BasicRepresentation.value)

    return isTemplate && (isUndefined || isExactMatch)
}

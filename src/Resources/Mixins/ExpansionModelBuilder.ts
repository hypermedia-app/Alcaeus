import { Constructor, RdfResource } from '@tpluscode/rdfine'
import URITemplate from 'es6-url-template'
import { IIriTemplate, IIriTemplateMapping } from '../index'

export interface IExpandedValue {
    ['@value']: string;
    ['@language']: string;
    ['@id']: string;
    ['@type']: string;
}

export default function <TBase extends Constructor<RdfResource & IIriTemplate>> (Base: TBase) {
    abstract class Builder extends Base {
        public expand (model): string {
            const uriTemplate = new URITemplate(this.template)

            const variables = this.buildExpansionModel(this.mappings, model)

            return uriTemplate.expand(variables)
        }

        public buildExpansionModel (mappings: IIriTemplateMapping[], model: object) {
            return mappings.map((mapping: IIriTemplateMapping) => {
                return {
                    value: model[mapping.property.id.value],
                    variable: mapping.variable,
                }
            }).reduce((result, mapping) => {
                if (mapping.variable) {
                    if (typeof mapping.value === 'object') {
                        result[mapping.variable] = this.mapExpandedValue(mapping.value)
                    } else {
                        result[mapping.variable] = this.mapShorthandValue(mapping.value)
                    }
                }

                return result
            }, {})
        }

        public abstract mapShorthandValue(value: string);

        public abstract mapExpandedValue(value: IExpandedValue);
    }

    return Builder
}

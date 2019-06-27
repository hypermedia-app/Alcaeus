import URITemplate from 'es6-url-template'
import { IIriTemplate, IIriTemplateMapping } from '../index'
import { Constructor } from '../Mixin'

export interface IExpandedValue {
    ['@value']: string;
    ['@language']: string;
    ['@id']: string;
    ['@type']: string;
}

export default function <TBase extends Constructor> (Base: TBase) {
    abstract class Builder extends Base {
        public expand (model): string {
            const thisTemplate = this as any as IIriTemplate
            const uriTemplate = new URITemplate(thisTemplate.template)

            const variables = this.buildExpansionModel(thisTemplate.mappings, model)

            return uriTemplate.expand(variables)
        }

        public buildExpansionModel (mappings: IIriTemplateMapping[], model: object) {
            return mappings.map((mapping: IIriTemplateMapping) => {
                return {
                    value: model[mapping.property.id],
                    variable: mapping.variable,
                }
            }).reduce((result, mapping) => {
                if (typeof mapping.value === 'object') {
                    result[mapping.variable] = this.mapExpandedValue(mapping.value)
                } else {
                    result[mapping.variable] = this.mapShorthandValue(mapping.value)
                }

                return result
            }, {})
        }

        public abstract mapShorthandValue(value: string);

        public abstract mapExpandedValue(value: IExpandedValue);
    }

    return Builder
}

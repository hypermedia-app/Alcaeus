import { Constructor } from '@tpluscode/rdfine'
import URITemplate from 'es6-url-template'
import url from 'url'
import { IriTemplate } from './IriTemplate'
import { IriTemplateMapping } from './IriTemplateMapping'

export interface ExpandedValue {
    ['@value']: string;
    ['@language']: string;
    ['@id']: string;
    ['@type']: string;
}

export default function <TBase extends Constructor<IriTemplate>> (Base: TBase) {
    abstract class Builder extends Base {
        public expand (model): string {
            const uriTemplate = new URITemplate(this.template)

            const variables = this.buildExpansionModel(this.mappings, model)
            const expanded = uriTemplate.expand(variables)

            if (this._parent && this._parent.id.termType === 'NamedNode') {
                return url.resolve(this._parent.id.value, expanded)
            }

            return expanded
        }

        public buildExpansionModel (mappings: IriTemplateMapping[], model: object) {
            return mappings.map((mapping: IriTemplateMapping) => {
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

        public abstract mapExpandedValue(value: ExpandedValue);
    }

    return Builder
}

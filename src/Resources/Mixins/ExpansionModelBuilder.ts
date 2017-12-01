import {JsonLd} from "../../Constants";
import {Constructor} from "../Mixin";
import URITemplate from 'es6-url-template';
import {IIriTemplate, IIriTemplateMapping} from "../../interfaces";

export interface ExpandedValue {
    ["@value"]: string
    ["@language"]: string,
    ["@id"]: string,
    ["@type"]: string
}

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    abstract class Mixin extends Base {
        expand(model): string {
            const thisTemplate = <IIriTemplate><any>this;
            const uriTemplate = new URITemplate(thisTemplate.template);

            const variables = this.buildExpansionModel(thisTemplate.mappings, model);

            return uriTemplate.expand(variables);
        }

        buildExpansionModel(mappings: IIriTemplateMapping[], model: Object) {
            return mappings.map((mapping:IIriTemplateMapping) => {
                return {
                    variable: mapping.variable,
                    value: model[mapping.property.id]
                }
            }).reduce((result, mapping) => {
                if (typeof mapping.value === 'object') {
                    result[mapping.variable] = this.mapExpandedValue(mapping.value);
                } else{
                    result[mapping.variable] = this.mapShorthandValue(mapping.value);
                }

                return result;
            }, {});
        }

        abstract mapShorthandValue(value: string);

        abstract mapExpandedValue(value: ExpandedValue);
    }

    return Mixin;
};

export default Mixin;

import {Core} from "../../Constants";
import {isA} from "../../ResourceHelper";
import {Constructor} from "../Mixin";
import URITemplate from 'es6-url-template';
import {IIriTemplate, IIriTemplateMapping} from "../../interfaces";

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    class BasicRepresentationExpansion extends Base {
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
                result[mapping.variable] = mapping.value['@value'] || mapping.value;
                return result;
            }, {});
        }
    }

    return BasicRepresentationExpansion;
};

Mixin['shouldApply'] = resource => {
    const isTemplate = isA(Core.Vocab.IriTemplate)(resource);

    const isUndefined = typeof resource[Core.Vocab.variableRepresentation] === 'undefined'
        || resource[Core.Vocab.variableRepresentation] === null;

    const isExactMatch = resource[Core.Vocab.variableRepresentation] === Core.Vocab.BasicRepresentation;

    return isTemplate && (isUndefined || isExactMatch);
};

export default Mixin;

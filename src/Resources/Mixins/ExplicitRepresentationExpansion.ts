import {Core, JsonLd} from "../../Constants";
import {isA} from "../../ResourceHelper";
import {Constructor} from "../Mixin";
import ExpansionModelBuilder, {ExpandedValue} from "./ExpansionModelBuilder";

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    class ExplicitRepresentationExpansion extends Base {
        mapShorthandValue(value: string) {
            return `"${value}"`;
        }

        mapExpandedValue(value: ExpandedValue) {
            if (value["@id"]) {
                return value["@id"];
            }

            if (value["@language"]) {
               return `"${value["@value"]}"@${value["@language"]}`;
            }

            if (value["@type"]) {
                return `"${value["@value"]}"^^${value["@type"]}`;
            }

            return `"${value["@value"]}"`;
        }
    }

    return ExpansionModelBuilder(ExplicitRepresentationExpansion);
};

Mixin['shouldApply'] = resource => {
    const isTemplate = isA(Core.Vocab('IriTemplate'))(resource);

    const isUndefined = typeof resource[Core.Vocab('variableRepresentation')] === 'undefined'
        || resource[Core.Vocab('variableRepresentation')] === null;

    const isExactMatch = resource[Core.Vocab('variableRepresentation')]
        && resource[Core.Vocab('variableRepresentation')][JsonLd.Id] === Core.Vocab('ExplicitRepresentation');

    return isTemplate && (!isUndefined && isExactMatch);
};

export default Mixin;

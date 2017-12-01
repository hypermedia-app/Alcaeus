import {Core} from "../../Constants";
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
    const isTemplate = isA(Core.Vocab.IriTemplate)(resource);

    const isExactMatch = resource[Core.Vocab.variableRepresentation] === Core.Vocab.ExplicitRepresentation;

    return isTemplate && isExactMatch;
};

export default Mixin;

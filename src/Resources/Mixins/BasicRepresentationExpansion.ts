import {Core} from "../../Constants";
import {isA} from "../../ResourceHelper";
import {Constructor} from "../Mixin";
import ExpansionModelBuilder, {ExpandedValue} from './ExpansionModelBuilder';

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    class BasicRepresentationExpansion extends Base {
        mapShorthandValue(value: any) {
            return value;
        }

        mapExpandedValue(value: ExpandedValue) {
            return value["@value"] || value["@id"];
        }
    }

    return ExpansionModelBuilder(BasicRepresentationExpansion);
};

Mixin['shouldApply'] = resource => {
    const isTemplate = isA(Core.Vocab('IriTemplate'))(resource);

    const isUndefined = typeof resource[Core.Vocab('variableRepresentation')] === 'undefined'
        || resource[Core.Vocab('variableRepresentation')] === null;

    const isExactMatch = resource[Core.Vocab('variableRepresentation')] === Core.Vocab('BasicRepresentation');

    return isTemplate && (isUndefined || isExactMatch);
};

export default Mixin;

import {Core} from "../../Constants";
import {isA} from "../../ResourceHelper";
import {Constructor} from "../Mixin";

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    class BasicRepresentationExpansion extends Base {
        expand(): string {
            throw new Error("Method not implemented.");
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

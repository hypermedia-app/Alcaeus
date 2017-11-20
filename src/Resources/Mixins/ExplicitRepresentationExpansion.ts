import {Core} from "../../Constants";
import {isA} from "../../ResourceHelper";
import {Constructor} from "../Mixin";

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    class ExplicitRepresentationExpansion extends Base {
        expand(): string {
            throw new Error("Method not implemented.");
        }
    }

    return ExplicitRepresentationExpansion;
};

Mixin['shouldApply'] = resource => {
    const isTemplate = isA(Core.Vocab.IriTemplate)(resource);

    const isExactMatch = resource[Core.Vocab.variableRepresentation] === Core.Vocab.ExplicitRepresentation;

    return isTemplate && isExactMatch;
};

export default Mixin;

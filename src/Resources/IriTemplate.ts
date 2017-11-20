import {nonenumerable} from "core-decorators";
import {Core} from "../Constants";
import ensureArray, {isA} from "../ResourceHelper";
import {Constructor} from "./Mixin";

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    class IriTemplate extends Base {
        @nonenumerable
        get mappings() {
            return ensureArray(this, Core.Vocab.mapping);
        }

        @nonenumerable
        get variableRepresentation() {
            return this[Core.Vocab.variableRepresentation] || 'BasicRepresentation';
        }
    }

    return IriTemplate;
};

Mixin.shouldApply = isA(Core.Vocab.IriTemplate);

export default Mixin;

import {nonenumerable} from "core-decorators";
import {Core} from "../Constants";
import ensureArray from "../ResourceHelper";
import {Constructor} from "./Mixin";

export default <TBase extends Constructor>(Base: TBase) => {
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

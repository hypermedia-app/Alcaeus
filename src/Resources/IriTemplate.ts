import {nonenumerable} from "core-decorators";
import {Core} from "../Constants";
import ensureArray, {isA} from "../ResourceHelper";
import {Constructor} from "./Mixin";
import {IIriTemplate} from "../interfaces";

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    class IriTemplate extends Base implements IIriTemplate {
        @nonenumerable
        get template(): string {
            return this[Core.Vocab('template')];
        }

        @nonenumerable
        get mappings() {
            return ensureArray(this, Core.Vocab('mapping'));
        }

        @nonenumerable
        get variableRepresentation() {
            return this[Core.Vocab('variableRepresentation')] || Core.Vocab('BasicRepresentation');
        }

        expand(): string {
            throw new Error("Method not implemented.");
        }
    }

    return IriTemplate;
};

Mixin['shouldApply'] = isA(Core.Vocab('IriTemplate'));

export default Mixin;

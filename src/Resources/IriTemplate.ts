import {nonenumerable} from "core-decorators";
import {Core} from "../Constants";
import ensureArray, {isA} from "../ResourceHelper";
import {Constructor} from "./Mixin";
import {IIriTemplate} from "../interfaces";

export function Mixin<TBase extends Constructor>(Base: TBase) {
    abstract class IriTemplate extends Base implements IIriTemplate {
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

        abstract expand(): string;
    }

    return IriTemplate;
}

export const shouldApply = isA(Core.Vocab('IriTemplate'));

import {Core} from "../Constants";
import {IStatusCodeDescription} from "../interfaces";
import {Constructor} from "./Mixin";
import {isA} from "../ResourceHelper";

export function Mixin <TBase extends Constructor>(Base: TBase) {
    const StatusCodeDescription = class extends Base implements IStatusCodeDescription {

        get code(): number {
            return this[Core.Vocab('code')];
        }

        get description(): string {
            return this[Core.Vocab('description')] || '';
        }
    };

    return StatusCodeDescription;
}

export const shouldApply = isA(Core.Vocab('StatusCodeDescription'));

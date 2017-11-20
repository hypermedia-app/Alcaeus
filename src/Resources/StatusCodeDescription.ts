import {Core} from "../Constants";
import {IStatusCodeDescription} from "../interfaces";
import {Constructor} from "./Mixin";
import {isA} from "../ResourceHelper";

const Mixin = <TBase extends Constructor>(Base: TBase) => {
    const StatusCodeDescription = class extends Base implements IStatusCodeDescription {

        get code(): number {
            return this[Core.Vocab.code];
        }

        get description(): string {
            return this[Core.Vocab.description] || '';
        }
    };

    return StatusCodeDescription;
};

Mixin['shouldApply'] = isA(Core.Vocab.StatusCodeDescription);

export default Mixin;

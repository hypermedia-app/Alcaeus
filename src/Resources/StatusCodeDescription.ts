import {Core} from "../Constants";
import {IStatusCodeDescription} from "../interfaces";
import {Constructor} from "./Mixin";

export default <TBase extends Constructor>(Base: TBase) => {
    return class extends Base implements IStatusCodeDescription {

        get code(): number {
            return this[Core.Vocab.code];
        }

        get description(): string {
            return this[Core.Vocab.description] || '';
        }
    };
};

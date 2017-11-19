import {Core} from "../Constants";
import {Constructor} from "./Mixin";

export default <TBase extends Constructor>(Base: TBase) => {
    return class extends Base {

        get readable() {
            if (typeof this[Core.Vocab.readable] === 'boolean') {
                return this[Core.Vocab.readable];
            }

            return true;
        }

        get writable() {
            if (typeof this[Core.Vocab.writable] === 'boolean') {
                return this[Core.Vocab.writable];
            }

            return true;
        }

        get required() {
            if (typeof this[Core.Vocab.required] === 'boolean') {
                return this[Core.Vocab.required];
            }

            return false;
        }

        get property() {
            return this[Core.Vocab.property];
        }
    };
};

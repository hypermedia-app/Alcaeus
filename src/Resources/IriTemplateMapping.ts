import {nonenumerable} from "core-decorators";
import {Core} from "../Constants";
import {IIriTemplateMapping} from "../interfaces";
import {Constructor} from "./Mixin";

export default <TBase extends Constructor>(Base: TBase) => {
    class IriTemplateMapping extends Base implements IIriTemplateMapping {
        @nonenumerable
        get variable() {
            return this[Core.Vocab.variable];
        }

        @nonenumerable
        get property() {
            return this[Core.Vocab.property];
        }

        @nonenumerable
        get required() {
            return this[Core.Vocab.required] || false;
        }
    }

    return IriTemplateMapping;
};

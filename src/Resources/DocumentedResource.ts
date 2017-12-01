import {Core} from "../Constants";
import {rdfs, Schema} from "../Vocabs";
import {Constructor} from "./Mixin";

export default <TBase extends Constructor>(Base: TBase) => {
    return class extends Base {
        get description(): string {
            return this[Core.Vocab('description')] ||
                this[rdfs('comment')] ||
                this[Schema('description')]
        }

        get title(): string {
            return this[Core.Vocab('title')] ||
                this[rdfs('label')] ||
                this[Schema('title')];
        }
    };
};

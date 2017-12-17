import {ISupportedOperation, ISupportedProperty} from "../interfaces";
import {Core} from "../Constants";
import ensureArray, {isA} from "../ResourceHelper";
import {Constructor} from "./Mixin";

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class Class extends Base {

        get supportedOperations(): Array<ISupportedOperation> {
            return ensureArray(this, Core.Vocab('supportedOperation'));
        }

        get supportedProperties(): Array<ISupportedProperty> {
            return ensureArray(this, Core.Vocab('supportedProperty'));
        }
    }

    return Class;
}

export const shouldApply = isA(Core.Vocab('Class'));

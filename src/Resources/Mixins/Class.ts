import {Core} from '../../Constants';
import {ISupportedOperation, ISupportedProperty} from '../../interfaces';
import ensureArray, {isA} from '../../ResourceHelper';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class Class extends Base {

        get supportedOperations(): ISupportedOperation[] {
            return ensureArray(this, Core.Vocab('supportedOperation'));
        }

        get supportedProperties(): ISupportedProperty[] {
            return ensureArray(this, Core.Vocab('supportedProperty'));
        }
    }

    return Class;
}

export const shouldApply = isA(Core.Vocab('Class'));

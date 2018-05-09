import {Core} from '../../Constants';
import {IClass} from '../../interfaces';
import ensureArray, {isA} from '../../ResourceHelper';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class Class extends Base implements IClass {

        get supportedOperations() {
            return ensureArray(this, Core.Vocab('supportedOperation'));
        }

        get supportedProperties() {
            return ensureArray(this, Core.Vocab('supportedProperty'));
        }
    }

    return Class;
}

export const shouldApply = isA(Core.Vocab('Class'));

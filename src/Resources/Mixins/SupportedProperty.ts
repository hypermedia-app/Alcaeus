import {Core} from '../../Constants';
import {ISupportedProperty} from '../../interfaces';
import {isA} from '../../ResourceHelper';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements ISupportedProperty {

        get readable() {
            if (typeof this[Core.Vocab('readable')] === 'boolean') {
                return this[Core.Vocab('readable')];
            }

            return true;
        }

        get writable() {
            if (typeof this[Core.Vocab('writable')] === 'boolean') {
                return this[Core.Vocab('writable')];
            }

            return true;
        }

        get required() {
            if (typeof this[Core.Vocab('required')] === 'boolean') {
                return this[Core.Vocab('required')];
            }

            return false;
        }

        get property() {
            return this[Core.Vocab('property')];
        }
    };
}

export const shouldApply = isA(Core.Vocab('SupportedProperty'));

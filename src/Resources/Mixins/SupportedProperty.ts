import {Core} from '../../Constants';
import {IResource, ISupportedProperty} from '../../interfaces';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    return class SupportedProperty extends Base implements ISupportedProperty {

        get readable() {
            const readable = this._get(Core.Vocab('readable'));
            if (typeof readable === 'boolean') {
                return readable;
            }

            return true;
        }

        get writable() {
            const writable = this._get(Core.Vocab('writable'));
            if (typeof writable === 'boolean') {
                return writable;
            }

            return true;
        }

        get required() {
            const required = this._get(Core.Vocab('required'));
            if (typeof required === 'boolean') {
                return required;
            }

            return false;
        }

        get property() {
            return this._get(Core.Vocab('property'));
        }
    };
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('SupportedProperty'));

import {Core} from '../../Constants';
import {IClass, IResource} from '../../interfaces';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    abstract class Class extends Base implements IClass {

        get supportedOperations() {
            return this._getArray(Core.Vocab('supportedOperation'));
        }

        get supportedProperties() {
            return this._getArray(Core.Vocab('supportedProperty'));
        }
    }

    return Class;
}

export const shouldApply = (res: IResource) => res.types.contains((Core.Vocab('Class')));

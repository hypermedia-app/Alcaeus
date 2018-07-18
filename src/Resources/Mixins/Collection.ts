import {nonenumerable} from 'core-decorators';
import {Core} from '../../Constants';
import {ICollection} from '../index';
import {Constructor} from '../Mixin';
import {IResource} from '../Resource';

export function Mixin <TBase extends Constructor>(Base: TBase) {
    abstract class Collection extends Base implements ICollection {
        @nonenumerable
        public get totalItems() {
            return this[Core.Vocab('totalItems')];
        }

        @nonenumerable
        get members() {
            return this._getArray(Core.Vocab('member'));
        }

        @nonenumerable
        get views() {
            return this._getArray(Core.Vocab('view'));
        }
    }

    return Collection;
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('Collection'));

import {nonenumerable} from 'core-decorators';
import {Core} from '../../Constants';
import {ICollection, IResource} from '../../interfaces';
import {Constructor} from '../Mixin';

export function Mixin <TBase extends Constructor>(Base: TBase) {
    abstract class Collection extends Base implements ICollection {
        @nonenumerable
        public get totalItems() {
            return this[Core.Vocab('totalItems')];
        }

        @nonenumerable
        get members() {
            return this._ensureArray(Core.Vocab('member'));
        }

        @nonenumerable
        get views() {
            return this._ensureArray(Core.Vocab('view'));
        }

        protected abstract _ensureArray(prop: string);
    }

    return Collection;
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('Collection'));

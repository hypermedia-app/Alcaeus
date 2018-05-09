import {nonenumerable} from 'core-decorators';
import {Core} from '../../Constants';
import {ICollection} from '../../interfaces';
import ensureArray, {isA} from '../../ResourceHelper';
import {Constructor} from '../Mixin';

export function Mixin <TBase extends Constructor>(Base: TBase) {
    class Collection extends Base implements ICollection {
        @nonenumerable
        get members() {
            return ensureArray(this, Core.Vocab('member'));
        }

        @nonenumerable
        get views() {
            return ensureArray(this, Core.Vocab('view'));
        }
    }

    return Collection;
}

export const shouldApply = isA(Core.Vocab('Collection'));

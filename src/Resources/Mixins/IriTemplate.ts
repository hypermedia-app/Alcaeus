import {nonenumerable} from 'core-decorators';
import {Core} from '../../Constants';
import {IIriTemplate, IResource} from '../../interfaces';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    abstract class IriTemplate extends Base implements IIriTemplate {
        @nonenumerable
        get template(): string {
            return this[Core.Vocab('template')];
        }

        @nonenumerable
        get mappings() {
            return this._getArray(Core.Vocab('mapping'));
        }

        @nonenumerable
        get variableRepresentation() {
            return this[Core.Vocab('variableRepresentation')] || Core.Vocab('BasicRepresentation');
        }

        public abstract expand(): string;
    }

    return IriTemplate;
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('IriTemplate'));

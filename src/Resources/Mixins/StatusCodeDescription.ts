import {Core} from '../../Constants';
import {IStatusCodeDescription} from '../../interfaces';
import {isA} from '../../ResourceHelper';
import {Constructor} from '../Mixin';

export function Mixin <TBase extends Constructor>(Base: TBase) {
    return class extends Base implements IStatusCodeDescription {

        get code(): number {
            return this[Core.Vocab('code')];
        }

        get description(): string {
            return this[Core.Vocab('description')] || '';
        }
    };
}

export const shouldApply = isA(Core.Vocab('StatusCodeDescription'));

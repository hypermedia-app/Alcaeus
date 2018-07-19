import {Core} from '../../Constants';
import {IStatusCodeDescription} from '../index';
import {Constructor} from '../Mixin';
import {IResource} from '../Resource';

export function Mixin <TBase extends Constructor>(Base: TBase) {
    return class StatusCodeDescription extends Base implements IStatusCodeDescription {

        get code(): number {
            return this[Core.Vocab('code')];
        }

        get description(): string {
            return this[Core.Vocab('description')] || '';
        }
    };
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('StatusCodeDescription'));

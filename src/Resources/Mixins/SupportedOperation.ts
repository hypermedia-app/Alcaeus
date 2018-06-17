import {Core} from '../../Constants';
import {IClass, ISupportedOperation} from '../../interfaces';
import {owl} from '../../Vocabs';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class SupportedOperation extends Base implements ISupportedOperation {

        get method(): string {
            return this[Core.Vocab('method')];
        }

        get expects() {
            return this._get(Core.Vocab('expects'));
        }

        get returns() {
            return this._get(Core.Vocab('returns'));
        }

        get requiresInput(): boolean {
            const method = this.method || '';
            const methodExpectsBody = method.toUpperCase() !== 'GET' && this.method.toUpperCase() !== 'DELETE';

            const operationExpectsBody = !!this.expects && this.expects.id !== owl.Nothing;

            return methodExpectsBody || operationExpectsBody;
        }
    }

    return SupportedOperation;
}

import {nonenumerable} from 'core-decorators';
import IHydraClient from '../../interfaces';
import {Constructor} from '../Mixin';

export default function(alcaeus: IHydraClient) {
    return <TBase extends Constructor>(Base: TBase) => {
        class ClientAccessor extends Base {
            @nonenumerable
            private get _alcaeus() {
                return alcaeus;
            }
        }

        return ClientAccessor;
    };
}

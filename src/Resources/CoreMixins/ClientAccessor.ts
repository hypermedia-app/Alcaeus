import {nonenumerable} from 'core-decorators';
import {IHydraClient} from '../../alcaeus';
import {Constructor} from '../Mixin';

export default function(alcaeus: IHydraClient) {
    return <TBase extends Constructor>(Base: TBase) => {
        class HydraResource extends Base {
            @nonenumerable
            public get _alcaeus() {
                return alcaeus;
            }
        }

        return HydraResource;
    };
}

import {nonenumerable} from 'core-decorators';
import {IAsObject, IIncomingLink} from '../../internals';
import {Constructor} from '../Mixin';

export default function(getIncomingLinks: () => IIncomingLink[]) {
    return <TBase extends Constructor>(Base: TBase) => {
        class HydraResource extends Base implements IAsObject {
            @nonenumerable
            public get _links(): IIncomingLink[] {
                return getIncomingLinks();
            }
        }

        return HydraResource;
    };
}

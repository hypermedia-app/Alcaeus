import {nonenumerable} from 'core-decorators';
import {Core} from '../../Constants';
import {IHydraResource} from '../../interfaces';
import {IAsObject, IIncomingLink} from '../../internals';
import {isA} from '../../ResourceHelper';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class PartialCollectionView extends Base {
        @nonenumerable
        get first() {
            return this[Core.Vocab('first')] || null;
        }

        @nonenumerable
        get previous() {
            return this[Core.Vocab('previous')] || null;
        }

        @nonenumerable
        get next() {
            return this[Core.Vocab('next')] || null;
        }

        @nonenumerable
        get last() {
            return this[Core.Vocab('last')] || null;
        }

        @nonenumerable
        get collection(): IHydraResource {
            const reverseLinks = (this as any as IAsObject)._links;
            const collectionLink = reverseLinks.find((linkArray: IIncomingLink) => {
                return linkArray.predicate === Core.Vocab('view');
            });

            return collectionLink ? collectionLink.subject : null;
        }
    }

    return PartialCollectionView;
}

export const shouldApply = isA(Core.Vocab('PartialCollectionView'));

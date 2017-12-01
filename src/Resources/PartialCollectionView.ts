import {nonenumerable} from "core-decorators";
import {Core} from "../Constants";
import {IHydraResource} from "../interfaces";
import {IIncomingLink} from "../internals";
import {Constructor} from "./Mixin";
import {ReverseLinks} from "./Maps";
import {isA} from "../ResourceHelper";

const Mixin = <TBase extends Constructor>(Base: TBase) => {
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
            const collectionLink = ReverseLinks.get(this).find((linkArray: IIncomingLink) => {
                return linkArray.predicate === Core.Vocab('view')
            });

            return collectionLink ? collectionLink.subject : null
        }
    }

    return PartialCollectionView;
};


Mixin['shouldApply'] = isA(Core.Vocab('PartialCollectionView'));

export default Mixin;

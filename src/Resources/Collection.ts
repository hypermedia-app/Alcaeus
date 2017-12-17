import {nonenumerable} from "core-decorators";
import {Core} from "../Constants";
import ensureArray, {isA} from "../ResourceHelper";
import {IHydraResource, IPartialCollectionView} from "../interfaces";
import {Constructor} from "./Mixin";

export function Mixin <TBase extends Constructor>(Base: TBase) {
    class Collection extends Base {
        @nonenumerable
        get members(): IHydraResource[] {
            return ensureArray(this, Core.Vocab('member'));
        }

        @nonenumerable
        get views(): IPartialCollectionView[] {
            return ensureArray(this, Core.Vocab('view'));
        }
    }

    return Collection;
}

export const shouldApply = isA(Core.Vocab('Collection'));

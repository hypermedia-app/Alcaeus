import CanonicalLinkSelector from './CanonicalLinkSelector';
import ExactIdMatchSelector from './ExactIdMatchSelector';
import PartialCollectionViewSelector from './PartialCollectionViewSelector';
import RedirectTargetSelector from './RedirectTargetSelector';
import TrailingSlashSelector from './TrailingSlashSelector';

export const AllDefault = {
    1: PartialCollectionViewSelector(CanonicalLinkSelector),
    2: PartialCollectionViewSelector(ExactIdMatchSelector),
    3: PartialCollectionViewSelector(TrailingSlashSelector),
    4: PartialCollectionViewSelector(RedirectTargetSelector),
};

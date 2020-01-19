import { HydraResponse } from '../HydraResponse'
import { ResourceGraph } from '../ResourceGraph'
import { HydraResource } from '../Resources'
import { ResponseWrapper } from '../ResponseWrapper'
import CanonicalLinkSelector from './CanonicalLinkSelector'
import ExactIdMatchSelector from './ExactIdMatchSelector'
import LocationSelector from './201LocationSelector'
import PartialCollectionViewSelector from './PartialCollectionViewSelector'
import RedirectTargetSelector from './RedirectTargetSelector'
import TrailingSlashSelector from './TrailingSlashSelector'

export interface RootSelector {
    selectRoot(resources: ResourceGraph, response: ResponseWrapper & HydraResponse): HydraResource | undefined;
}

export const AllDefault = {
    1: PartialCollectionViewSelector(CanonicalLinkSelector),
    2: PartialCollectionViewSelector(LocationSelector),
    3: PartialCollectionViewSelector(ExactIdMatchSelector),
    4: PartialCollectionViewSelector(TrailingSlashSelector),
    5: PartialCollectionViewSelector(RedirectTargetSelector),
}

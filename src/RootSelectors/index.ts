import { IHydraResponse } from '../HydraResponse'
import { IResourceGraph } from '../ResourceGraph'
import { HydraResource } from '../Resources'
import { IResponseWrapper } from '../ResponseWrapper'
import CanonicalLinkSelector from './CanonicalLinkSelector'
import ExactIdMatchSelector from './ExactIdMatchSelector'
import LocationSelector from './201LocationSelector'
import PartialCollectionViewSelector from './PartialCollectionViewSelector'
import RedirectTargetSelector from './RedirectTargetSelector'
import TrailingSlashSelector from './TrailingSlashSelector'

export interface IRootSelector {
    selectRoot(resources: IResourceGraph, response: IResponseWrapper & IHydraResponse): HydraResource;
}

export const AllDefault = {
    1: PartialCollectionViewSelector(CanonicalLinkSelector),
    2: PartialCollectionViewSelector(LocationSelector),
    3: PartialCollectionViewSelector(ExactIdMatchSelector),
    4: PartialCollectionViewSelector(TrailingSlashSelector),
    5: PartialCollectionViewSelector(RedirectTargetSelector),
}

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

export const defaultSelectors = {
    'CanonicalLink': PartialCollectionViewSelector(CanonicalLinkSelector),
    'LocationHeader': PartialCollectionViewSelector(LocationSelector),
    'ExactId': PartialCollectionViewSelector(ExactIdMatchSelector),
    'TrailingSlash': PartialCollectionViewSelector(TrailingSlashSelector),
    'Redirect': PartialCollectionViewSelector(RedirectTargetSelector),
}

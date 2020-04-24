import { HydraResponse } from '../HydraResponse'
import { ResourceGraph } from '../ResourceGraph'
import { HydraResource } from '../Resources'
import { ResponseWrapper } from '../ResponseWrapper'
import { canonicalLink } from './canonicalLink'
import { exactId } from './exactId'
import { locationHeader201 } from './locationHeader201'
import { redirectTarget } from './redirectTarget'
import { trailingSlash } from './trailingSlash'

export interface RootSelector {
    (resources: ResourceGraph, response: ResponseWrapper & HydraResponse): HydraResource | undefined
}

export { wrappedViewSelector } from './view'

export const defaultSelectors = {
    canonicalLink,
    locationHeader201,
    exactId,
    trailingSlash,
    redirectTarget,
}

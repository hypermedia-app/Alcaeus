import { HydraResponse } from '../HydraResponse'
import { ResourceGraph } from '../ResourceGraph'

export function exactId(resources: ResourceGraph, response: HydraResponse) {
    return resources.get(response.requestedUri)
}

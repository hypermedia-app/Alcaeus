import { HydraResponse } from '../HydraResponse'
import { ResourceGraph } from '../ResourceGraph'

export default {
    selectRoot (resources: ResourceGraph, response: HydraResponse) {
        return resources.get(response.requestedUri)
    },
}

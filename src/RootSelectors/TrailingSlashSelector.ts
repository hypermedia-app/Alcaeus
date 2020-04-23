import { HydraResponse } from '../HydraResponse'
import { ResourceGraph } from '../ResourceGraph'

export default {
    selectRoot(resources: ResourceGraph, response: HydraResponse) {
        let id

        if (response.requestedUri.endsWith('/')) {
            id = response.requestedUri.substr(0, response.requestedUri.length - 1)
        } else {
            id = response.requestedUri + '/'
        }

        return resources.get(id)
    },
}

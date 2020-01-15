import { IHydraResponse } from '../HydraResponse'
import { IResourceGraph } from '../ResourceGraph'

export default {
    selectRoot (resources: IResourceGraph, response: IHydraResponse) {
        let id

        if (response.requestedUri.endsWith('/')) {
            id = response.requestedUri.substr(0, response.requestedUri.length - 1)
        } else {
            id = response.requestedUri + '/'
        }

        return resources.get(id)
    },
}

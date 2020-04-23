import * as Constants from '../Constants'
import { ResourceGraph } from '../ResourceGraph'
import { ResponseWrapper } from '../ResponseWrapper'

export default {
    selectRoot (resources: ResourceGraph, response: ResponseWrapper) {
        const location = response.xhr.headers.get(Constants.Headers.Location)

        if (response.xhr.status === 201 && location !== null) {
            return resources.get(response.resolveUri(location))
        }

        return undefined
    },
}

import * as Constants from '../Constants'
import { IResourceGraph } from '../ResourceGraph'
import { IResponseWrapper } from '../ResponseWrapper'

export default {
    selectRoot (resources: IResourceGraph, response: IResponseWrapper) {
        const location = response.xhr.headers.get(Constants.Headers.Location)

        if (response.xhr.status === 201 && location !== null) {
            return resources.get(response.resolveUri(location))
        }

        return undefined
    },
}

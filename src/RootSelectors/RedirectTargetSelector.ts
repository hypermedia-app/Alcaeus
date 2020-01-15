import { IResourceGraph } from '../ResourceGraph'
import { IResponseWrapper } from '../ResponseWrapper'

export default {
    selectRoot (resources: IResourceGraph, response: IResponseWrapper) {
        return resources.get(response.xhr.url)
    },
}

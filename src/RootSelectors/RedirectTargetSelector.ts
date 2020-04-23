import { ResourceGraph } from '../ResourceGraph'
import { ResponseWrapper } from '../ResponseWrapper'

export default {
    selectRoot(resources: ResourceGraph, response: ResponseWrapper) {
        return resources.get(response.xhr.url)
    },
}

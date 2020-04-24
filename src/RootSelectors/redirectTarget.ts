import { ResourceGraph } from '../ResourceGraph'
import { ResponseWrapper } from '../ResponseWrapper'

export function redirectTarget(resources: ResourceGraph, response: ResponseWrapper) {
    return resources.get(response.xhr.url)
}

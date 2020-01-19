import li from 'parse-link-header'
import * as Constants from '../Constants'
import { ResourceGraph } from '../ResourceGraph'
import { ResponseWrapper } from '../ResponseWrapper'

const CanonicalLinkRel = 'canonical'

export default {
    selectRoot (resources: ResourceGraph, response: ResponseWrapper) {
        const linkHeaders = response.xhr.headers.get(Constants.Headers.Link)
        const links = li(linkHeaders)

        if (links && links[CanonicalLinkRel]) {
            const linkUrl = links[CanonicalLinkRel].url
            return resources.get(response.resolveUri(linkUrl))
        }

        return undefined
    },
}

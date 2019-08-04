import li from 'parse-link-header'
import * as Constants from '../Constants'
import { IResourceGraph } from '../ResourceGraph'
import { IResponseWrapper } from '../ResponseWrapper'

const CanonicalLinkRel = 'canonical'

export default {
    selectRoot (resources: IResourceGraph, response: IResponseWrapper) {
        const linkHeaders = response.xhr.headers.get(Constants.Headers.Link)
        const links = li(linkHeaders)

        if (links && links[CanonicalLinkRel]) {
            const linkUrl = links[CanonicalLinkRel].url
            return resources[response.resolveUri(linkUrl)]
        }

        return null
    },
}

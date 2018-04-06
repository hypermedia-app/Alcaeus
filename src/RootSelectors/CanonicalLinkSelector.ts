import {IHydraResource, ResourceGraph} from '../interfaces';
import {IResponseWrapper} from '../ResponseWrapper';
import * as li from 'parse-link-header';
import * as Constants from '../Constants';

const CanonicalLinkRel = 'canonical';

export default {
    selectRoot(resources: ResourceGraph, response: IResponseWrapper): IHydraResource {
        const linkHeaders = response.xhr.headers.get(Constants.Headers.Link);
        const links = li(linkHeaders);

        if (links && links[CanonicalLinkRel]) {
            return resources[links[CanonicalLinkRel].url];
        }

        return null;
    }
}

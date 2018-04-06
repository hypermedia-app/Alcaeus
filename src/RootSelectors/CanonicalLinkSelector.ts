import * as li from 'parse-link-header';
import * as Constants from '../Constants';
import {IHydraResource, IResourceGraph} from '../interfaces';
import {IResponseWrapper} from '../ResponseWrapper';

const CanonicalLinkRel = 'canonical';

export default {
    selectRoot(resources: IResourceGraph, response: IResponseWrapper): IHydraResource {
        const linkHeaders = response.xhr.headers.get(Constants.Headers.Link);
        const links = li(linkHeaders);

        if (links && links[CanonicalLinkRel]) {
            return resources[links[CanonicalLinkRel].url];
        }

        return null;
    },
};

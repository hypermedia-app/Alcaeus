import {IHydraResource, IResourceGraph} from '../interfaces';
import {IResponseWrapper} from '../ResponseWrapper';

export default {
    selectRoot(resources: IResourceGraph, response: IResponseWrapper): IHydraResource {
        return resources[response.xhr.url] || null;
    },
};

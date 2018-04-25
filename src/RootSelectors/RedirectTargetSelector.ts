import {IHydraResource, IResourceGraph, IResponseWrapper} from '../interfaces';

export default {
    selectRoot(resources: IResourceGraph, response: IResponseWrapper): IHydraResource {
        return resources[response.xhr.url] || null;
    },
};

import {IResourceGraph, IResponseWrapper} from '../interfaces';

export default {
    selectRoot(resources: IResourceGraph, response: IResponseWrapper) {
        return resources[response.xhr.url] || null;
    },
};

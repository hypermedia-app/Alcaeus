import {IHydraResource, ResourceGraph} from '../interfaces';
import {IResponseWrapper} from '../ResponseWrapper';

export default {
    selectRoot(resources: ResourceGraph, response: IResponseWrapper): IHydraResource {
        return resources[response.xhr.url] || null;
    }
}

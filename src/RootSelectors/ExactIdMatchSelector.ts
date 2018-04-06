import {IHydraResource, IHydraResponse, ResourceGraph} from '../interfaces';

export default {
    selectRoot(resources: ResourceGraph, response: IHydraResponse): IHydraResource {
        return resources[response.requestedUri];
    }
}

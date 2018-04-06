import {IHydraResource, IHydraResponse, IResourceGraph} from '../interfaces';

export default {
    selectRoot(resources: IResourceGraph, response: IHydraResponse): IHydraResource {
        return resources[response.requestedUri];
    },
};

import {IHydraResponse, IResourceGraph} from '../HydraResponse';

export default {
    selectRoot(resources: IResourceGraph, response: IHydraResponse) {
        return resources[response.requestedUri];
    },
};

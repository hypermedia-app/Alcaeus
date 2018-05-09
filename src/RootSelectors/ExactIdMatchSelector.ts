import {IHydraResponse, IResourceGraph} from '../interfaces';

export default {
    selectRoot(resources: IResourceGraph, response: IHydraResponse) {
        return resources[response.requestedUri];
    },
};

import {IHydraResponse} from '../HydraResponse';
import {IResourceGraph} from '../ResourceGraph';

export default {
    selectRoot(resources: IResourceGraph, response: IHydraResponse) {
        return resources[response.requestedUri];
    },
};

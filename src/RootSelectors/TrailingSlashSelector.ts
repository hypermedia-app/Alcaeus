import {IHydraResource, IHydraResponse, IResourceGraph} from '../interfaces';

export default {
    selectRoot(resources: IResourceGraph, response: IHydraResponse): IHydraResource {
        let id;

        if (response.requestedUri.endsWith('/')) {
            id = response.requestedUri.substr(0, response.requestedUri.length - 1);
        } else {
            id = response.requestedUri + '/';
        }

        return resources[id];
    },
};

import {IHydraResource, IHydraResponse } from './interfaces';
import {IResponseWrapper, ResponseWrapper} from './ResponseWrapper';

interface IResourceGraph {
    [uri: string]: IHydraResource;
}

export interface IRootSelector {
    selectRoot(resources: IResourceGraph): IHydraResource;
}

export function create(uri: string, response: IResponseWrapper, resources: IResourceGraph, rootSelectors: Array<IRootSelector>): IHydraResponse {

    class HydraResponse extends ResponseWrapper implements IHydraResponse {
        constructor(uri: string) {
            super(response.xhr);

            this.requestedUri = uri;
            Object.assign(this, resources);
        }

        readonly requestedUri: string;

        get root(): IHydraResource {
            const selectedRoot = rootSelectors.reduce((resource, selector) => {
                if (!resource) {
                   resource = selector.selectRoot(resources);
                }

                return resource;
            }, <IHydraResource>null);

            if (selectedRoot) {
                return selectedRoot;
            }

            if(this.xhr.redirected && resources[this.xhr.url]) {
                return resources[this.xhr.url];
            }

            return resources[this.requestedUri];
        }

        ofType(classId: string): Array<IHydraResource> {
            return undefined;
        }

    }

    return new HydraResponse(uri);

}

import {IHydraResource, IHydraResponse} from './interfaces';
import {IResponseWrapper, ResponseWrapper} from './ResponseWrapper';

export interface IResourceGraph {
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
        }

        readonly requestedUri: string;

        get(uri: string): IHydraResource {
            return resources[uri];
        }

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

            if (this.xhr.redirected && resources[this.xhr.url]) {
                return resources[this.xhr.url];
            }

            return resources[this.requestedUri];
        }

        get length(): number {
            return Object.keys(resources).length;
        }

        ofType(classId: string): Array<IHydraResource> {
            return Object.values(resources).filter(res => res.types.contains(classId));
        }

        [Symbol.iterator](): Iterator<IHydraResource> {
            return Object.values(resources)[Symbol.iterator]();
        }
    }

    return new HydraResponse(uri);

}

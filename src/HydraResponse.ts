import {IHydraResource, IHydraResponse, IResponseWrapper, IRootSelector} from './interfaces';
import {ResponseWrapper} from './ResponseWrapper';

interface IResourceGraph {
    [uri: string]: IHydraResource;
}

export function create(
    uri: string,
    response: IResponseWrapper,
    resources: IResourceGraph,
    rootSelectors: IRootSelector[]): IHydraResponse {
    const safeResources = resources || {};
    const safeSelectors = rootSelectors || [];

    class HydraResponse extends ResponseWrapper implements IHydraResponse {
        public readonly requestedUri: string;

        constructor(requestedUri: string) {
            super(requestedUri, response.xhr);
        }

        public get(identifier: string): IHydraResource {
            return safeResources[identifier];
        }

        get root(): IHydraResource {
            return safeSelectors.reduce((resource, selector) => {
                if (!resource) {
                    resource = selector.selectRoot(safeResources, this);
                }

                return resource;
            }, null as IHydraResource);
        }

        get length(): number {
            return Object.keys(safeResources).length;
        }

        public ofType(classId: string): IHydraResource[] {
            return Object.values(safeResources).filter((res) => res.types.contains(classId));
        }

        public [Symbol.iterator](): Iterator<IHydraResource> {
            return Object.values(safeResources)[Symbol.iterator]();
        }
    }

    return new HydraResponse(uri);

}

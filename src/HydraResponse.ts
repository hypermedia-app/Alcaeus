import {IHydraResource, IHydraResponse, IRootSelector} from './interfaces';
import {IResponseWrapper, ResponseWrapper} from './ResponseWrapper';

interface IResourceGraph {
    [uri: string]: IHydraResource;
}

export function create(
    uri: string,
    response: IResponseWrapper,
    resources: IResourceGraph,
    rootSelectors: IRootSelector[]): IHydraResponse {

    class HydraResponse extends ResponseWrapper implements IHydraResponse {
        public readonly requestedUri: string;

        constructor(requestedUri: string) {
            super(response.xhr);

            this.requestedUri = requestedUri;
        }

        public get(identifier: string): IHydraResource {
            return resources[identifier];
        }

        get root(): IHydraResource {
            return rootSelectors.reduce((resource, selector) => {
                if (!resource) {
                    resource = selector.selectRoot(resources, this);
                }

                return resource;
            }, null as IHydraResource);
        }

        get length(): number {
            return Object.keys(resources).length;
        }

        public ofType(classId: string): IHydraResource[] {
            return Object.values(resources).filter((res) => res.types.contains(classId));
        }

        public [Symbol.iterator](): Iterator<IHydraResource> {
            return Object.values(resources)[Symbol.iterator]();
        }
    }

    return new HydraResponse(uri);

}

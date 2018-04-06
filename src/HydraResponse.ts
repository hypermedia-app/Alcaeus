import {IHydraResource, IHydraResponse, IRootSelector} from './interfaces';
import {IResponseWrapper, ResponseWrapper} from './ResponseWrapper';

type ResourceGraph = {
    [uri: string]: IHydraResource
}

export function create(
    uri: string,
    response: IResponseWrapper,
    resources: ResourceGraph,
    rootSelectors: Array<IRootSelector>): IHydraResponse {

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
            return rootSelectors.reduce((resource, selector) => {
                if (!resource) {
                    resource = selector.selectRoot(resources, this);
                }

                return resource;
            }, <IHydraResource>null);
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

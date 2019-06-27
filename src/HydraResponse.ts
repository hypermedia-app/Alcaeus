import { IResourceGraph, ResourceGraph } from './ResourceGraph'
import { HydraResource } from './Resources'
import { IResource } from './Resources/Resource'
import { IResponseWrapper, ResponseWrapper } from './ResponseWrapper'
import { IRootSelector } from './RootSelectors'

export interface IHydraResponse extends Iterable<HydraResource>, IResponseWrapper {

    /**
     * Gets the root of the representation or undefined if it cannot be determined
     */
    root: HydraResource;

    /**
     * Gets the number of resource within this representation
     */
    length: number;

    /**
     * Indexer to look up any arbitrary resource by its id within the representation
     */
    get(uri: string): HydraResource;

    /**
     * Gets all resources of given RDF type from the representation
     * @param {string} classId RDF class identifier
     * @returns {Array<HydraResource>}
     */
    ofType(classId: string): IResource[];
}

export function create (
    uri: string,
    response: IResponseWrapper,
    resources: IResourceGraph,
    rootSelectors: IRootSelector[]): IHydraResponse {
    const safeResources = resources || new ResourceGraph()
    const safeSelectors = rootSelectors || []

    class HydraResponse extends ResponseWrapper implements IHydraResponse {
        public readonly requestedUri: string;

        public constructor (requestedUri: string) {
            super(requestedUri, response.xhr)
        }

        public get (identifier: string) {
            return safeResources.get(identifier)
        }

        public get root () {
            return safeSelectors.reduce((resource, selector) => {
                if (!resource) {
                    resource = selector.selectRoot(safeResources, this)
                }

                return resource
            }, null as HydraResource)
        }

        public get length (): number {
            return Object.keys(safeResources).length
        }

        public ofType (classId: string) {
            return Object.values(safeResources).filter((res) => res.types.contains(classId))
        }

        public [Symbol.iterator] () {
            return Object.values(safeResources)[Symbol.iterator]()
        }
    }

    return new HydraResponse(uri)
}

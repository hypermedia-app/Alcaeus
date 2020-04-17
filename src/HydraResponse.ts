import { RdfResource, ResourceFactory } from '@tpluscode/rdfine'
import { DatasetCore, NamedNode } from 'rdf-js'
import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { HydraClient } from './alcaeus'
import ResourceGraph from './ResourceGraph'
import { HydraResource } from './Resources'
import ResponseWrapperImpl, { ResponseWrapper } from './ResponseWrapper'
import { rdf } from '@tpluscode/rdf-ns-builders'

export interface HydraResponse<T extends RdfResource = HydraResource> extends Iterable<HydraResource>, ResponseWrapper {

    /**
     * Gets the root of the representation or undefined if it cannot be determined
     */
    root: HydraResource | (HydraResource & T) | null;

    /**
     * Gets the number of resource within this representation
     */
    length: number;

    /**
     * Indexer to look up any arbitrary resource by its id within the representation
     */
    get(uri: string): HydraResource | undefined;

    /**
     * Gets all resources of given RDF type from the representation
     * @param {string} classId RDF class identifier
     * @returns {Array<HydraResource>}
     */
    ofType(classId: string | NamedNode): HydraResource[];
}

export function create (
    uri: string,
    response: ResponseWrapper,
    dataset: DatasetCore,
    factory: ResourceFactory,
    alcaeus: Pick<HydraClient, 'rootSelectors'>): HydraResponse {
    const representationGraph = cf({ dataset, graph: $rdf.namedNode(uri) })
    const resources = new ResourceGraph(representationGraph, factory)

    function createEntity (node: SingleContextClownface) {
        return factory.createEntity<HydraResource>(cf({
            dataset,
            term: node.term,
        }))
    }

    function byInProperties (left: HydraResource, right: HydraResource) {
        return left._selfGraph.in().terms.length - right._selfGraph.in().terms.length
    }

    class HydraResponseWrapper extends ResponseWrapperImpl implements HydraResponse {
        public constructor (requestedUri: string) {
            super(requestedUri, response.xhr)
        }

        public get (identifier: string) {
            return resources.get(identifier)
        }

        public get root () {
            const potentialRoots = alcaeus.rootSelectors.reduceRight<HydraResource[]>((candidates, selector) => {
                const candidate = selector.selectRoot(resources, this)
                if (candidate) {
                    return [...candidates, candidate]
                }

                return candidates
            }, [])

            // selects the resource which is object of least relations in graph
            return potentialRoots.sort(byInProperties)[0]
        }

        public get length (): number {
            return representationGraph.in().terms.length
        }

        public ofType (classId: string | NamedNode) {
            const type = typeof classId === 'string' ? $rdf.namedNode(classId) : classId

            return representationGraph.has(rdf.type, type)
                .map(createEntity)
        }

        public [Symbol.iterator] () {
            return representationGraph.in()
                .map(createEntity)[Symbol.iterator]()
        }
    }

    return new HydraResponseWrapper(uri)
}

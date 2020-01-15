import { ResourceFactory } from '@tpluscode/rdfine'
import { DatasetCore, NamedNode, Quad } from 'rdf-js'
import cf from 'clownface'
import $rdf from 'rdf-ext'
import { IHydraClient } from './alcaeus'
import { ResourceGraph } from './ResourceGraph'
import { HydraResource } from './Resources'
import { IResource } from './Resources/Resource'
import { IResponseWrapper, ResponseWrapper } from './ResponseWrapper'
import { rdf } from './Vocabs'

export interface IHydraResponse extends Iterable<HydraResource>, IResponseWrapper {

    /**
     * Gets the root of the representation or undefined if it cannot be determined
     */
    root: HydraResource | null;

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
    ofType(classId: string | NamedNode): IResource[];
}

function quadReducer (dataset: DatasetCore, factory: ResourceFactory) {
    return function (resources: HydraResource[], q: Quad) {
        if (q.subject.termType === 'NamedNode' || q.subject.termType === 'BlankNode') {
            resources.push(factory.createEntity<HydraResource>(cf({
                dataset,
                term: q.subject,
            })))
        }

        return resources
    }
}

export function create (
    uri: string,
    response: IResponseWrapper,
    alcaeus: Pick<IHydraClient, 'dataset' | 'rootSelectors' | 'factory'>): IHydraResponse {
    const resources = new ResourceGraph(alcaeus)
    const atomicGraph = cf({ dataset: alcaeus.dataset, graph: $rdf.namedNode(uri) })

    class HydraResponse extends ResponseWrapper implements IHydraResponse {
        public constructor (requestedUri: string) {
            super(requestedUri, response.xhr)
        }

        public get (identifier: string) {
            return resources.get(identifier)
        }

        public get root () {
            return alcaeus.rootSelectors.reduce((resource: HydraResource | undefined, selector) => {
                if (!resource) {
                    resource = selector.selectRoot(resources, this)
                }

                return resource
            }, undefined) || null
        }

        public get length (): number {
            return atomicGraph.terms.length
        }

        public ofType (classId: string | NamedNode) {
            const type = typeof classId === 'string' ? $rdf.namedNode(classId) : classId

            return [...alcaeus.dataset.match(null, rdf.type, type)]
                .reduce(quadReducer(alcaeus.dataset, alcaeus.factory), [])
        }

        public [Symbol.iterator] () {
            return [...alcaeus.dataset].reduce(quadReducer(alcaeus.dataset, alcaeus.factory), [])[Symbol.iterator]()
        }
    }

    return new HydraResponse(uri)
}

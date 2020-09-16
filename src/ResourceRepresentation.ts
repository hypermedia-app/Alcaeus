import * as $rdf from '@rdf-esm/data-model'
import { rdf, hydra } from '@tpluscode/rdf-ns-builders'
import type { RdfResource, ResourceFactory, ResourceIdentifier } from '@tpluscode/rdfine'
import type { AnyPointer, GraphPointer } from 'clownface'
import type { NamedNode } from 'rdf-js'
import type { HydraResource } from './Resources'

type MaybeExtendedResource<T extends RdfResource> = HydraResource | (HydraResource & T) | null

export interface ResourceRepresentation<T extends RdfResource = HydraResource> extends Iterable<HydraResource> {
    /**
     * Gets the root of the representation or undefined if it cannot be determined
     */
    root: MaybeExtendedResource<T>

    /**
     * Gets the number of resource within this representation
     */
    length: number

    /**
     * Indexer to look up any arbitrary resource by its id within the representation
     */
    get(uri: string): HydraResource | undefined

    /**
     * Gets all resources of given RDF type from the representation
     * @param {string} classId RDF class identifier
     * @returns {Array<HydraResource>}
     */
    ofType(classId: string | NamedNode): HydraResource[]
}

export default class <T extends RdfResource> implements ResourceRepresentation<T> {
    private __graph: AnyPointer
    private __factory: ResourceFactory
    private readonly rootNode: GraphPointer<ResourceIdentifier>

    public constructor(graph: AnyPointer, factory: ResourceFactory, rootResource: NamedNode) {
        this.__graph = graph
        this.__factory = factory
        this.rootNode = graph.node(rootResource)
    }

    public get(uri: string): HydraResource | undefined {
        const nodes = this.__graph.dataset.match(this.__graph.namedNode(decodeURI(uri)).term)

        if (nodes.size === 0) {
            return undefined
        }

        return this.__factory.createEntity<HydraResource>(this.__graph.namedNode(decodeURI(uri)))
    }

    public get root() {
        const collectionNode = this.rootNode.in(hydra.view)
        if (collectionNode.term) {
            return this.__factory.createEntity<MaybeExtendedResource<T>>(collectionNode as GraphPointer<ResourceIdentifier>)
        }

        return this.__factory.createEntity<MaybeExtendedResource<T>>(this.rootNode)
    }

    public get length(): number {
        return this.__graph.in().terms.length
    }

    public ofType(classId: string | NamedNode) {
        const type = typeof classId === 'string' ? $rdf.namedNode(classId) : classId

        return this.__graph.has(rdf.type, type).map(this._createEntity.bind(this))
    }

    public [Symbol.iterator]() {
        return this.__graph.in()
            .map(this._createEntity.bind(this))[Symbol.iterator]()
    }

    private _createEntity(node: GraphPointer<ResourceIdentifier>) {
        return this.__factory.createEntity<HydraResource>(node)
    }
}

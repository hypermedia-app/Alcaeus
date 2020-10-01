import * as $rdf from '@rdf-esm/data-model'
import { rdf, hydra } from '@tpluscode/rdf-ns-builders'
import type { RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import type { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import type { AnyContext, AnyPointer, GraphPointer } from 'clownface'
import type { DatasetCore, NamedNode } from 'rdf-js'
import type { HydraResource } from './Resources'

type MaybeExtendedResource<D extends DatasetCore, T extends RdfResource<D>> = HydraResource<D> | (HydraResource<D> & T) | null

export interface ResourceRepresentation<D extends DatasetCore = DatasetCore, T extends RdfResource<D> = HydraResource<D>> extends Iterable<HydraResource<D>> {
    /**
     * Gets the root of the representation or undefined if it cannot be determined
     */
    root: MaybeExtendedResource<D, T>

    /**
     * Gets the number of resource within this representation
     */
    length: number

    /**
     * Indexer to look up any arbitrary resource by its id within the representation
     */
    get<T>(uri: string): (T & HydraResource<D>) | undefined

    /**
     * Gets all resources of given RDF type from the representation
     * @param {string} classId RDF class identifier
     * @returns {Array<HydraResource>}
     */
    ofType(classId: string | NamedNode): HydraResource<D>[]
}

export default class <D extends DatasetCore, T extends RdfResource<D>> implements ResourceRepresentation<D, T> {
    private __graph: AnyPointer<AnyContext, D>
    private __factory: ResourceFactory
    private readonly rootNode: GraphPointer<ResourceIdentifier>

    public constructor(graph: AnyPointer<AnyContext, D>, factory: ResourceFactory, rootResource: NamedNode) {
        this.__graph = graph
        this.__factory = factory
        this.rootNode = graph.node(rootResource)
    }

    public get<T>(uri: string): (T & HydraResource<D>) | undefined {
        const nodes = this.__graph.dataset.match(this.__graph.namedNode(decodeURI(uri)).term)

        if (nodes.size === 0) {
            return undefined
        }

        return this.__factory.createEntity<T & HydraResource<D>>(this.__graph.namedNode(decodeURI(uri)))
    }

    public get root() {
        const collectionNode = this.rootNode.in(hydra.view)
        if (collectionNode.term) {
            return this.__factory.createEntity<MaybeExtendedResource<D, T>>(collectionNode as GraphPointer<ResourceIdentifier>)
        }

        return this.__factory.createEntity<MaybeExtendedResource<D, T>>(this.rootNode)
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
        return this.__factory.createEntity<HydraResource<D>>(node)
    }
}

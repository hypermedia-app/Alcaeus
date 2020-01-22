import { ResourceFactory } from '@tpluscode/rdfine'
import cf, { Clownface } from 'clownface'
import { DatasetCore } from 'rdf-js'
import { HydraResource } from './Resources'

export interface ResourceGraph {
    get(uri: string): HydraResource | undefined;
}

export default class implements ResourceGraph {
    private __graph: Clownface
    private __factory: ResourceFactory

    public constructor (dataset: DatasetCore, factory: ResourceFactory) {
        this.__graph = cf({
            dataset,
        })
        this.__factory = factory
    }

    public get (uri: string): HydraResource | undefined {
        const nodes = this.__graph.dataset.match(this.__graph.namedNode(decodeURI(uri)).term)

        if (nodes.size === 0) {
            return undefined
        }

        return this.__factory.createEntity<HydraResource>(this.__graph.namedNode(decodeURI(uri)))
    }
}

import { ResourceFactory } from '@tpluscode/rdfine'
import cf, { Clownface } from 'clownface'
import { IHydraClient } from './alcaeus'
import { HydraResource } from './Resources'

export interface IResourceGraph {
    get(uri: string): HydraResource | undefined;
}

export class ResourceGraph implements IResourceGraph {
    private __graph: Clownface
    private __factory: ResourceFactory

    public constructor (alcaeus: Pick<IHydraClient, 'dataset' | 'factory'>) {
        this.__graph = cf({
            dataset: alcaeus.dataset,
        })
        this.__factory = alcaeus.factory
    }

    public get (uri: string): HydraResource | undefined {
        const nodes = this.__graph.dataset.match(this.__graph.namedNode(decodeURI(uri)).term)

        if (nodes.size === 0) {
            return undefined
        }

        return this.__factory.createEntity<HydraResource>(this.__graph.namedNode(decodeURI(uri)))
    }
}

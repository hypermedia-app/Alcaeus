import { defaultGraphInstance } from '@rdf-esm/data-model'
import TermMap from '@rdf-esm/term-map'
import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { AnyFunction, Mixin, ResourceCreationOptions, ResourceIndexer, ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import { RdfResourceCore, ResourceNode } from '@tpluscode/rdfine/RdfResource'
import type { GraphPointer } from 'clownface'
import type { Term, NamedNode } from 'rdf-js'

export interface CachedResourceFactory extends ResourceFactory {
    clone(): CachedResourceFactory
    removeCache(graph: NamedNode): void
}

export default class CachedResourceFactoryImpl implements CachedResourceFactory {
    readonly __cache: Map<Term, Map<Term, any>>
    readonly __inner: ResourceFactory

    constructor(inner: ResourceFactory) {
        this.__cache = new TermMap()
        this.__inner = inner
    }

    removeCache(graph: NamedNode): void {
        this.__cache.delete(graph)
    }

    clone(): CachedResourceFactory {
        return new CachedResourceFactoryImpl(this.__inner)
    }

    createEntity<S, ID extends ResourceNode = ResourceNode>(pointer: GraphPointer, typeAndMixins?: Mixin<AnyFunction>[] | [Constructor, ...Mixin<AnyFunction>[]], options?: ResourceCreationOptions<RdfResourceCore<ID> & S>): RdfResourceCore<ID> & S & ResourceIndexer<RdfResource<ID>> {
        const graph = pointer._context[0].graph || defaultGraphInstance
        if (!this.__cache.has(graph)) {
            this.__cache.set(graph, new TermMap())
        }

        const graphCache = this.__cache.get(graph)!

        if (!graphCache.has(pointer.term)) {
            const resource = this.__inner.createEntity<S>(pointer, typeAndMixins, options)
            graphCache.set(pointer.term, resource)
        }

        return graphCache.get(pointer.term)!
    }

    addMixin(...mixins: any[]): void {
        this.__inner.addMixin(...mixins)
    }
}

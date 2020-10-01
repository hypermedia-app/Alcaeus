import { defaultGraphInstance } from '@rdf-esm/data-model'
import TermMap from '@rdf-esm/term-map'
import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { AnyFunction, Mixin, ResourceCreationOptions, ResourceIndexer, ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import type { GraphPointer } from 'clownface'
import type { DatasetCore, Term, NamedNode } from 'rdf-js'

export interface CachedResourceFactory<D extends DatasetCore, R extends RdfResource<D>> extends ResourceFactory<D, R> {
    clone(): CachedResourceFactory<D, R>
    removeCache(graph: NamedNode): void
}

export default class CachedResourceFactoryImpl<D extends DatasetCore, R extends RdfResource<D>> implements CachedResourceFactory<D, R> {
    readonly __cache: Map<Term, Map<NamedNode, any>>
    readonly __inner: ResourceFactory<D, R>

    constructor(inner: ResourceFactory<D, R>) {
        this.__cache = new TermMap()
        this.__inner = inner
    }

    removeCache(graph: NamedNode): void {
        this.__cache.delete(graph)
    }

    clone(): CachedResourceFactory<D, R> {
        return new CachedResourceFactoryImpl(this.__inner)
    }

    createEntity<S>(pointer: GraphPointer<NamedNode, D>, typeAndMixins?: Mixin<AnyFunction>[] | [Constructor, ...Mixin<AnyFunction>[]], options?: ResourceCreationOptions<D, R & S>): R & S & ResourceIndexer<D, R> {
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

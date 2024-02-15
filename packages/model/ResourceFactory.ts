import type { DatasetCore, Term, NamedNode } from '@rdfjs/types'
import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { AnyFunction, Mixin, ResourceCreationOptions, ResourceIndexer, ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import type { GraphPointer } from 'clownface'
import type { HydraEnvironment } from 'alcaeus-core'

export interface CachedResourceFactory<D extends DatasetCore, R extends RdfResource<D>> extends ResourceFactory<D, R> {
  clone(): CachedResourceFactory<D, R>
  removeCache(graph: NamedNode): void
}

export default class CachedResourceFactoryImpl<D extends DatasetCore, R extends RdfResource<D>> implements CachedResourceFactory<D, R> {
  readonly __cache: Map<Term, Map<NamedNode, any>>
  readonly __inner: ResourceFactory<D, R>

  constructor(inner: ResourceFactory<D, R>, private env: HydraEnvironment<D>) {
    this.__cache = env.termMap()
    this.__inner = inner
  }

  // get BaseClass() {
  //  return this.__inner.BaseClass
  // }

  removeCache(graph: NamedNode): void {
    this.__cache.delete(graph)
  }

  clone(): CachedResourceFactory<D, R> {
    return new CachedResourceFactoryImpl(this.__inner, this.env)
  }

  createEntity<S>(pointer: GraphPointer<NamedNode, D>, typeAndMixins?: Mixin<AnyFunction>[] | [Constructor, ...Mixin<AnyFunction>[]], options?: ResourceCreationOptions<D, R & S>): R & S & ResourceIndexer<R> {
    const graph = pointer._context[0].graph || this.env.defaultGraph()
    if (!this.__cache.has(graph)) {
      this.__cache.set(graph, this.env.termMap())
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

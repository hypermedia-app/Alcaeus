import type { BaseQuad, DatasetCore, NamedNode, Quad } from '@rdfjs/types'
import type { RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import type { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import type { RdfResourceCore } from '@tpluscode/rdfine/RdfResource'
import type { AnyContext, AnyPointer, GraphPointer } from 'clownface'
import deleteMatch from 'rdf-dataset-ext/deleteMatch.js'
import addAll from 'rdf-dataset-ext/addAll.js'
import type { CachedResourceFactory } from 'alcaeus-model/ResourceFactory.js'
import CachedResourceFactoryImpl from 'alcaeus-model/ResourceFactory.js'
import type { HydraEnvironment, HydraResponse, ResourceStore, ResourceStoreEntry, ResponseWrapper } from './alcaeus.js'
import ResourceRepresentationImpl from './ResourceRepresentation.js'

export interface RepresentationInference {
  (dataset: DatasetCore, env: HydraEnvironment): Iterable<BaseQuad>
}

interface ResourceStoreInit<D extends DatasetCore> {
  dataset: D
  environment: HydraEnvironment<D>
  inferences: RepresentationInference[]
  factory?: ResourceFactory<D, RdfResource<D>>
}

export default class ResourceStoreImpl<D extends DatasetCore> implements ResourceStore<D> {
  private readonly dataset: D
  private readonly inferences: RepresentationInference[]
  public readonly factory: CachedResourceFactory<D, RdfResource<D>>
  private readonly rootNodes
  private readonly responses
  private readonly environment: HydraEnvironment<D>

  public constructor({ dataset, inferences, factory, environment }: ResourceStoreInit<D>) {
    this.dataset = dataset
    this.inferences = inferences
    if (!factory) {
      factory = environment.rdfine().factory
    }
    this.factory = factory instanceof CachedResourceFactoryImpl ? factory : new CachedResourceFactoryImpl(factory, environment)
    this.environment = environment
    this.rootNodes = environment.termMap<NamedNode, ResourceIdentifier>()
    this.responses = environment.termMap<NamedNode, ResponseWrapper>()
  }

  public clone(): ResourceStore<D> {
    return new ResourceStoreImpl({
      inferences: this.inferences,
      dataset: this.environment.dataset([...this.dataset]),
      factory: this.factory.clone(),
      environment: this.environment,
    })
  }

  public get<T extends RdfResourceCore<D>>(idOrPointer: NamedNode | GraphPointer<ResourceIdentifier, D>): Required<HydraResponse<D, T>> | undefined {
    let graph: NamedNode
    let node: AnyPointer<AnyContext, D>
    if ('termType' in idOrPointer) {
      graph = idOrPointer
      node = this.environment.clownface({ dataset: this.dataset, graph })
    } else {
      graph = idOrPointer._context[0].graph as any
      node = idOrPointer
    }

    const response = this.responses.get(graph)

    if (!response) {
      return undefined
    }

    const rootNode = this.rootNodes.get(graph) || graph
    return {
      response,
      representation: new ResourceRepresentationImpl<D, T>(node, this.environment, rootNode),
    }
  }

  public async set(graph: NamedNode, { response, dataset, rootResource }: ResourceStoreEntry<D>): Promise<void> {
    this.factory.removeCache(graph)

    const inferredQuads = this.environment.dataset()

    this.inferences.forEach(inferenceOver => addAll(inferredQuads, [...inferenceOver(dataset, this.environment)]))

    addAll(
      deleteMatch(this.dataset, undefined, undefined, undefined, graph),
      [...dataset].map(this.tripleToQuad(graph)),
    )
    addAll(this.dataset, [...inferredQuads].map(this.tripleToQuad(graph)))

    this.responses.set(graph, response)

    if (rootResource) {
      this.rootNodes.set(graph, rootResource)
    }
  }

  private tripleToQuad(graph: NamedNode) {
    return (triple: Quad): Quad => {
      return this.environment.quad(triple.subject, triple.predicate, triple.object, graph)
    }
  }
}

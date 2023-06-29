import type { DatasetCore, NamedNode, BaseQuad } from '@rdfjs/types'
import type { Resource } from '@rdfine/hydra'
import type { RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import type { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import type { RdfResourceCore } from '@tpluscode/rdfine/RdfResource'
import cf, { AnyContext, AnyPointer, GraphPointer } from 'clownface'
import deleteMatch from 'rdf-dataset-ext/deleteMatch.js'
import addAll from 'rdf-dataset-ext/addAll.js'
import { HydraEnvironment } from './environment.js'
import type { HydraResponse } from './alcaeus.js'
import ResourceRepresentationImpl from './ResourceRepresentation.js'
import CachedResourceFactoryImpl from './Resources/ResourceFactory.js'
import type { CachedResourceFactory } from './Resources/ResourceFactory.js'
import type { ResponseWrapper } from './ResponseWrapper.js'
import { tripleToQuad } from './helpers/dataModel.js'

interface ResourceStoreEntry<D extends DatasetCore> {
  response: ResponseWrapper
  dataset: D
  rootResource?: ResourceIdentifier
}

export interface ResourceStore<D extends DatasetCore> {
  factory: ResourceFactory<D, RdfResource<D>>
  get<T extends RdfResourceCore<any> = Resource<D>>(idOrPointer: NamedNode | GraphPointer): Required<HydraResponse<D, T>> | undefined
  set(uri: NamedNode, entry: ResourceStoreEntry<D>): void
  clone(): ResourceStore<D>
}

export interface RepresentationInference {
  (dataset: DatasetCore): Iterable<BaseQuad>
}

interface ResourceStoreInit<D extends DatasetCore> {
  dataset: D
  environment: HydraEnvironment<D>
  inferences: RepresentationInference[]
  factory: ResourceFactory<D, RdfResource<D>>
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
    this.factory = factory instanceof CachedResourceFactoryImpl ? factory : new CachedResourceFactoryImpl(factory)
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
      node = cf({ dataset: this.dataset, graph })
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
      representation: new ResourceRepresentationImpl<D, T>(node, this.factory, rootNode),
    }
  }

  public async set(graph: NamedNode, { response, dataset, rootResource }: ResourceStoreEntry<D>): Promise<void> {
    this.factory.removeCache(graph)

    const inferredQuads = this.environment.dataset()

    this.inferences.forEach(inferenceOver => addAll(inferredQuads, [...inferenceOver(dataset)]))

    addAll(
      deleteMatch(this.dataset, undefined, undefined, undefined, graph),
      [...dataset].map(tripleToQuad(graph)),
    )
    addAll(this.dataset, [...inferredQuads].map(tripleToQuad(graph)))

    this.responses.set(graph, response)

    if (rootResource) {
      this.rootNodes.set(graph, rootResource)
    }
  }
}

import type { DatasetCore, NamedNode, BaseQuad, DatasetCoreFactory, Quad } from '@rdfjs/types'
import type { Resource } from '@rdfine/hydra'
import type { RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import type { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import type { RdfResourceCore } from '@tpluscode/rdfine/RdfResource'
import cf, { AnyContext, AnyPointer, GraphPointer } from 'clownface'
import deleteMatch from 'rdf-dataset-ext/deleteMatch'
import addAll from 'rdf-dataset-ext/addAll'
import TermMap from '@rdf-esm/term-map'
import type { HydraResponse } from './alcaeus'
import ResourceRepresentationImpl from './ResourceRepresentation'
import CachedResourceFactoryImpl from './Resources/ResourceFactory'
import type { CachedResourceFactory } from './Resources/ResourceFactory'
import type { ResponseWrapper } from './ResponseWrapper'
import { tripleToQuad } from './helpers/dataModel'

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
    datasetFactory: DatasetCoreFactory<Quad, Quad, D>['dataset']
    inferences: RepresentationInference[]
    factory: ResourceFactory<D, RdfResource<D>>
}

export default class ResourceStoreImpl<D extends DatasetCore> implements ResourceStore<D> {
    private readonly dataset: D;
    private readonly inferences: RepresentationInference[];
    public readonly factory: CachedResourceFactory<D, RdfResource<D>>
    private readonly rootNodes = new TermMap<NamedNode, ResourceIdentifier>()
    private readonly responses = new TermMap<NamedNode, ResponseWrapper>()
    private readonly datasetFactory: DatasetCoreFactory<Quad, Quad, D>['dataset'];

    public constructor({ dataset, inferences, factory, datasetFactory }: ResourceStoreInit<D>) {
        this.dataset = dataset
        this.inferences = inferences
        this.factory = factory instanceof CachedResourceFactoryImpl ? factory : new CachedResourceFactoryImpl(factory)
        this.datasetFactory = datasetFactory
    }

    public clone(): ResourceStore<D> {
        return new ResourceStoreImpl({
            inferences: this.inferences,
            dataset: this.datasetFactory([...this.dataset]),
            factory: this.factory.clone(),
            datasetFactory: this.datasetFactory,
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

        const inferredQuads = this.datasetFactory()

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

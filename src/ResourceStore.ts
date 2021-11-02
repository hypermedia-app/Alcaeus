import type { DatasetCore, NamedNode, BaseQuad } from 'rdf-js'
import type { Resource } from '@rdfine/hydra'
import type { RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import type { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import type { RdfResourceCore } from '@tpluscode/rdfine/RdfResource'
import cf, { AnyContext, AnyPointer, GraphPointer } from 'clownface'
import TripleToQuadTransform from 'rdf-transform-triple-to-quad'
import type { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import TermMap from '@rdf-esm/term-map'
import type { HydraResponse } from './alcaeus'
import ResourceRepresentationImpl from './ResourceRepresentation'
import CachedResourceFactoryImpl from './Resources/ResourceFactory'
import type { CachedResourceFactory } from './Resources/ResourceFactory'
import type { ResponseWrapper } from './ResponseWrapper'

interface ResourceStoreEntry<D extends DatasetCore> {
    response: ResponseWrapper
    dataset: D
    rootResource?: ResourceIdentifier
}

export interface ResourceStore<D extends DatasetIndexed> {
    factory: ResourceFactory<D, RdfResource<D>>
    get<T extends RdfResourceCore<any> = Resource<D>>(idOrPointer: NamedNode | GraphPointer): Required<HydraResponse<D, T>> | undefined
    set(uri: NamedNode, entry: ResourceStoreEntry<D>): Promise<void>
    clone(): ResourceStore<D>
}

export interface RepresentationInference {
    (dataset: DatasetCore): Iterable<BaseQuad>
}

interface ResourceStoreInit<D extends DatasetIndexed> {
    dataset: D
    datasetFactory: () => D
    inferences: RepresentationInference[]
    factory: ResourceFactory<D, RdfResource<D>>
}

export default class ResourceStoreImpl<D extends DatasetIndexed> implements ResourceStore<D> {
    private readonly dataset: D;
    private readonly inferences: RepresentationInference[];
    public readonly factory: CachedResourceFactory<D, RdfResource<D>>
    private readonly rootNodes = new TermMap<NamedNode, ResourceIdentifier>()
    private readonly responses = new TermMap<NamedNode, ResponseWrapper>()
    private readonly datasetFactory: () => D;

    public constructor({ dataset, inferences, factory, datasetFactory }: ResourceStoreInit<D>) {
        this.dataset = dataset
        this.inferences = inferences
        this.factory = factory instanceof CachedResourceFactoryImpl ? factory : new CachedResourceFactoryImpl(factory)
        this.datasetFactory = datasetFactory
    }

    public clone(): ResourceStore<D> {
        return new ResourceStoreImpl({
            inferences: this.inferences,
            dataset: this.dataset.clone(),
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

        this.inferences.forEach(inferenceOver => inferredQuads.addAll([...inferenceOver(dataset)]))

        await this.dataset
            .removeMatches(undefined, undefined, undefined, graph)
            .import(dataset.toStream().pipe(new TripleToQuadTransform(graph)))
        await this.dataset.import(inferredQuads.toStream().pipe(new TripleToQuadTransform(graph)))

        this.responses.set(graph, response)

        if (rootResource) {
            this.rootNodes.set(graph, rootResource)
        }
    }
}

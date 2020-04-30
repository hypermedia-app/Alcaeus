import { RdfResource, ResourceFactory } from '@tpluscode/rdfine'
import cf from 'clownface'
import TripleToQuadTransform from 'rdf-transform-triple-to-quad'
import { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import { DatasetCore, NamedNode, BaseQuad } from 'rdf-js'
import $rdf from '@rdfjs/data-model'
import ResourceRepresentationImpl, { ResourceRepresentation } from './ResourceRepresentation'
import { HydraResource } from './Resources'

export interface ResourceStore<D extends DatasetIndexed> {
    factory: ResourceFactory<D, HydraResource<D>>
    get<T extends RdfResource = RdfResource>(uri: string | NamedNode): ResourceRepresentation<T> | undefined
    set(uri: string | NamedNode, dataset: D, rootResource?: NamedNode): Promise<void>
    clone(): ResourceStore<D>
}

export interface RepresentationInference {
    (dataset: DatasetCore): Iterable<BaseQuad>
}

interface ResourceStoreInit<D extends DatasetIndexed = DatasetIndexed> {
    dataset: D
    datasetFactory: () => D
    inferences: RepresentationInference[]
    factory: ResourceFactory<D, HydraResource<D>>
}

export default class ResourceStoreImpl<D extends DatasetIndexed = DatasetIndexed> implements ResourceStore<D> {
    private readonly dataset: D;
    private readonly inferences: RepresentationInference[];
    public readonly factory: ResourceFactory<D, HydraResource<D>>
    private readonly rootNodes: Map<string, NamedNode> = new Map<string, NamedNode>()
    private readonly datasetFactory: () => D;

    public constructor({ dataset, inferences, factory, datasetFactory }: ResourceStoreInit<D>) {
        this.dataset = dataset
        this.inferences = inferences
        this.factory = factory
        this.datasetFactory = datasetFactory
    }

    public clone(): ResourceStore<D> {
        return new ResourceStoreImpl({
            inferences: this.inferences,
            dataset: this.dataset.clone(),
            factory: this.factory,
            datasetFactory: this.datasetFactory,
        })
    }

    public get<T extends RdfResource>(uri: string | NamedNode): ResourceRepresentation<T> | undefined {
        const graph = typeof uri === 'string' ? $rdf.namedNode(uri) : uri
        const node = cf({ dataset: this.dataset, graph })

        if (!node.out().values.length) {
            return undefined
        }

        return new ResourceRepresentationImpl<T>(node, this.factory, this.rootNodes.get(graph.value) || graph)
    }

    public async set(uri: string | NamedNode, dataset: D, rootResource?: NamedNode): Promise<void> {
        const graph = typeof uri === 'string' ? $rdf.namedNode(uri) : uri
        const inferredQuads = this.datasetFactory()

        this.inferences.forEach(inferenceOver => inferredQuads.addAll([...inferenceOver(dataset)]))

        await this.dataset
            .removeMatches(undefined, undefined, undefined, graph)
            .import(dataset.toStream().pipe(new TripleToQuadTransform(graph)))
        await this.dataset.import(inferredQuads.toStream().pipe(new TripleToQuadTransform(graph)))

        if (rootResource) {
            this.rootNodes.set(graph.value, rootResource)
        }
    }
}

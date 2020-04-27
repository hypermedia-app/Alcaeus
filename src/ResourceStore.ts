import { RdfResource, ResourceFactory } from '@tpluscode/rdfine'
import cf from 'clownface'
import TripleToQuadTransform from 'rdf-transform-triple-to-quad'
import { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import { DatasetCore, NamedNode } from 'rdf-js'
import $rdf from '@rdfjs/data-model'
import ResourceRepresentationImpl, { ResourceRepresentation } from './ResourceRepresentation'

export interface ResourceStore<D extends DatasetIndexed> {
    get<T extends RdfResource = RdfResource>(uri: string | NamedNode): ResourceRepresentation<T>
    set(uri: string | NamedNode, dataset: D, rootResource?: NamedNode): Promise<void>
    clone(): ResourceStore<D>
}

interface RepresentationInference {
    (dataset: DatasetCore): void
}

interface ResourceStoreInit<D extends DatasetIndexed = DatasetIndexed> {
    dataset: D
    inferences: RepresentationInference[]
    factory: ResourceFactory
}

export default class ResourceStoreImpl<D extends DatasetIndexed = DatasetIndexed> implements ResourceStore<D> {
    private readonly dataset: D;
    private readonly inferences: RepresentationInference[];
    private readonly factory: ResourceFactory
    private readonly rootNodes: Map<string, NamedNode> = new Map<string, NamedNode>()

    public constructor({ dataset, inferences, factory }: ResourceStoreInit<D>) {
        this.dataset = dataset
        this.inferences = inferences
        this.factory = factory
    }

    public clone(): ResourceStore<D> {
        return new ResourceStoreImpl({
            inferences: this.inferences,
            dataset: this.dataset.clone(),
            factory: this.factory,
        })
    }

    public get<T extends RdfResource>(uri: string | NamedNode): ResourceRepresentation<T> {
        const graph = typeof uri === 'string' ? $rdf.namedNode(uri) : uri
        const node = cf({ dataset: this.dataset, graph })

        return new ResourceRepresentationImpl<T>(node, this.factory, this.rootNodes.get(graph.value) || graph)
    }

    public async set(uri: string | NamedNode, dataset: D, rootResource?: NamedNode): Promise<void> {
        const graph = typeof uri === 'string' ? $rdf.namedNode(uri) : uri
        this.inferences.map(inferenceOver => inferenceOver(dataset))

        await this.dataset
            .removeMatches(undefined, undefined, undefined, graph)
            .import(dataset.toStream().pipe(new TripleToQuadTransform(graph)))

        if (rootResource) {
            this.rootNodes.set(graph.value, rootResource)
        }
    }
}

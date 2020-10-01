import { rdf } from '@tpluscode/rdf-ns-builders'
import { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import clownface from 'clownface'
import DatasetExt from 'rdf-ext/lib/Dataset'
import $rdf from 'rdf-ext'
import RDF from '@rdfjs/data-model'
import namespace from '@rdfjs/namespace'
import CachedResourceFactoryImpl from '../src/Resources/ResourceFactory'
import ResourceStore, { RepresentationInference } from '../src/ResourceStore'
import ResponseWrapper from '../src/ResponseWrapper'

const ex = namespace('http://example.com/')

describe('ResourceStore', () => {
    const factory: ResourceFactory<any, any> = {
        addMixin: jest.fn(),
        createEntity: jest.fn(),
    }
    const datasetFactory = $rdf.dataset
    let dataset: DatasetExt
    let inferences: RepresentationInference[]

    beforeEach(() => {
        dataset = $rdf.dataset()
        inferences = []
    })

    describe('constructor', () => {
        it('wraps resource factory in cached instance', () => {
            // when
            const store = new ResourceStore({
                dataset,
                inferences,
                factory,
                datasetFactory,
            })

            // then
            expect(store.factory).toBeInstanceOf(CachedResourceFactoryImpl)
        })

        it('does not wrap existing instance of cached factory', () => {
            // given
            const cachedFactory = new CachedResourceFactoryImpl(factory)

            // when
            const store = new ResourceStore({
                dataset,
                inferences,
                factory: cachedFactory,
                datasetFactory,
            })

            // then
            expect(store.factory).toBe(cachedFactory)
        })
    })

    describe('clone', () => {
        it('creates a new instance of cached resource store', () => {
            // given
            const cachedFactory = new CachedResourceFactoryImpl(factory)
            const store = new ResourceStore({
                dataset,
                inferences,
                factory: cachedFactory,
                datasetFactory,
            })

            // when
            const clone = store.clone()

            // then
            expect(clone.factory).toBeInstanceOf(CachedResourceFactoryImpl)
            expect(clone.factory).not.toBe(store.factory)
        })
    })

    describe('get', () => {
        it('returns undefined when resource is not stored', () => {
            // given
            const store = new ResourceStore({
                dataset,
                inferences,
                factory,
                datasetFactory,
            })

            // when
            const resource = store.get(ex.foo)

            // then
            expect(resource).toBeUndefined()
        })
    })

    describe('set', () => {
        const response: ResponseWrapper = <any> {}

        it('add inferred triples to same graph', async () => {
            // given
            const addTypeInference = () => {
                return [
                    RDF.quad(ex.foo, rdf.type, ex.baz, ex.graphShouldBeDiscareded),
                ]
            }
            const store = new ResourceStore({
                dataset,
                inferences: [addTypeInference],
                factory,
                datasetFactory,
            })
            const resourceDataset = $rdf.dataset([
                RDF.quad(ex.foo, rdf.type, ex.bar, ex.foo),
            ])

            // when
            await store.set(ex.foo, {
                dataset: resourceDataset,
                response,
            })

            // then
            expect(dataset.toCanonical()).toMatchSnapshot()
        })

        it('add resource triples to graph as subject', async () => {
            // given
            const store = new ResourceStore({
                dataset,
                inferences,
                factory,
                datasetFactory,
            })
            const resourceDataset = $rdf.dataset([
                RDF.quad(ex.foo, rdf.type, ex.bar, ex.whatever),
            ])

            // when
            await store.set(ex.foo, {
                dataset: resourceDataset,
                response,
            })

            // then
            expect(dataset.toCanonical()).toMatchSnapshot()
        })

        it('removes cached instances for graph', async () => {
            // given
            const cachedFactory = new CachedResourceFactoryImpl(factory)
            cachedFactory.createEntity(clownface({ dataset: $rdf.dataset(), graph: ex.foo }).node(ex.foo))
            const store = new ResourceStore({
                dataset,
                inferences,
                factory: cachedFactory,
                datasetFactory,
            })

            // when
            await store.set(ex.foo, {
                dataset: $rdf.dataset(),
                response,
            })

            // then
            expect(cachedFactory.__cache.size).toEqual(0)
        })
    })
})

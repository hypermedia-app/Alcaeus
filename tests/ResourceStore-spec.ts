import { rdf } from '@tpluscode/rdf-ns-builders'
import RdfResource from '@tpluscode/rdfine'
import DatasetExt from 'rdf-ext/lib/Dataset'
import $rdf from 'rdf-ext'
import * as RDF from '@rdf-esm/data-model'
import namespace from '@rdfjs/namespace'
import ResourceStore, { RepresentationInference } from '../src/ResourceStore'

const ex = namespace('http://example.com/')

describe('ResourceStore', () => {
    const factory = RdfResource.factory
    const datasetFactory = $rdf.dataset
    let dataset: DatasetExt
    let inferences: RepresentationInference[]

    beforeEach(() => {
        dataset = $rdf.dataset()
        inferences = []
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
            await store.set(ex.foo, resourceDataset)

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
            await store.set(ex.foo, resourceDataset)

            // then
            expect(dataset.toCanonical()).toMatchSnapshot()
        })
    })
})

import { foaf, rdf } from '@tpluscode/rdf-ns-builders'
import { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import clownface from 'clownface'
import type { DatasetExt } from 'rdf-ext/lib/Dataset.js'
import $rdf from 'rdf-ext'
import chai, { expect } from 'chai'
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot'
import sinon from 'sinon'
import CachedResourceFactoryImpl from '../src/Resources/ResourceFactory.js'
import ResourceStore, { RepresentationInference } from '../src/ResourceStore.js'
import ResponseWrapper from '../src/ResponseWrapper.js'

const ex = $rdf.namespace('http://example.com/')

describe('ResourceStore', () => {
  const factory: ResourceFactory<any, any> = {
    addMixin: sinon.stub(),
    createEntity: sinon.stub(),
  }
  let dataset: DatasetExt
  let inferences: RepresentationInference[]

  chai.use(jestSnapshotPlugin())

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
        environment: $rdf,
      })

      // then
      expect(store.factory).to.be.instanceof(CachedResourceFactoryImpl)
    })

    it('does not wrap existing instance of cached factory', () => {
      // given
      const cachedFactory = new CachedResourceFactoryImpl(factory)

      // when
      const store = new ResourceStore({
        dataset,
        inferences,
        factory: cachedFactory,
        environment: $rdf,
      })

      // then
      expect(store.factory).to.eq(cachedFactory)
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
        environment: $rdf,
      })

      // when
      const clone = store.clone()

      // then
      expect(clone.factory).to.to.be.instanceof(CachedResourceFactoryImpl)
      expect(clone.factory).not.to.eq(store.factory)
    })
  })

  describe('get', () => {
    it('returns undefined when resource is not stored', () => {
      // given
      const store = new ResourceStore({
        dataset,
        inferences,
        factory,
        environment: $rdf,
      })

      // when
      const resource = store.get(ex.foo)

      // then
      expect(resource).to.be.undefined
    })

    it('returns resource for graph id', async () => {
      // given
      const response: ResponseWrapper = <any> {}
      const john = clownface({ dataset: $rdf.dataset(), graph: ex.John })
        .node(ex.John)
        .addOut(foaf.knows, ex.Jane)
      const store = new ResourceStore({
        dataset,
        inferences,
        factory,
        environment: $rdf,
      })
      await store.set(ex.John, {
        response,
        dataset: john.dataset,
        rootResource: ex.John,
      })

      // when
      const resource = store.get(ex.John)

      // then
      expect(resource?.response).to.eq(response)
    })

    it('returns resource for matching pointer graph', async () => {
      // given
      const response: ResponseWrapper = <any> {}
      const john = clownface({ dataset: $rdf.dataset(), graph: ex.John })
        .node(ex.John)
        .addOut(foaf.knows, ex.Jane)
      const store = new ResourceStore({
        dataset,
        inferences,
        factory,
        environment: $rdf,
      })
      await store.set(ex.John, {
        response,
        dataset: john.dataset,
        rootResource: ex.John,
      })

      // when
      const jane = john.node(ex.Jane)
      const resource = store.get(jane)

      // then
      expect(resource?.response).to.eq(response)
    })
  })

  describe('set', () => {
    const response: ResponseWrapper = <any> {}

    it('add inferred triples to same graph', async () => {
      // given
      const addTypeInference = () => {
        return [
          $rdf.quad(ex.foo, rdf.type, ex.baz, ex.graphShouldBeDiscareded),
        ]
      }
      const store = new ResourceStore({
        dataset,
        inferences: [addTypeInference],
        factory,
        environment: $rdf,
      })
      const resourceDataset = $rdf.dataset([
        $rdf.quad(ex.foo, rdf.type, ex.bar, ex.foo),
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
        environment: $rdf,
      })
      const resourceDataset = $rdf.dataset([
        $rdf.quad(ex.foo, rdf.type, ex.bar, ex.whatever),
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
        environment: $rdf,
      })

      // when
      await store.set(ex.foo, {
        dataset: $rdf.dataset(),
        response,
      })

      // then
      expect(cachedFactory.__cache.size).to.eq(0)
    })
  })
})

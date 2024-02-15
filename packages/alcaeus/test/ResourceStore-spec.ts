import { foaf, rdf } from '@tpluscode/rdf-ns-builders'
import { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import chai, { expect } from 'chai'
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot'
import sinon from 'sinon'
import type { Dataset } from '@zazuko/env/lib/Dataset.js'
import CachedResourceFactoryImpl from 'alcaeus-model/ResourceFactory.js'
import ResourceStore, { RepresentationInference } from '../ResourceStore.js'
import ResponseWrapper from '../ResponseWrapper.js'
import environment from './env.js'

const ex = environment.namespace('http://example.com/')

describe('ResourceStore', () => {
  const factory: ResourceFactory<any, any> = {
    addMixin: sinon.stub(),
    createEntity: sinon.stub(),
  }
  let dataset: Dataset
  let inferences: RepresentationInference[]

  chai.use(jestSnapshotPlugin())

  beforeEach(() => {
    dataset = environment.dataset()
    inferences = []
  })

  describe('constructor', () => {
    it('wraps resource factory in cached instance', () => {
      // when
      const store = new ResourceStore({
        dataset,
        inferences,
        factory,
        environment,
      })

      // then
      expect(store.factory).to.be.instanceof(CachedResourceFactoryImpl)
    })

    it('does not wrap existing instance of cached factory', () => {
      // given
      const cachedFactory = new CachedResourceFactoryImpl(factory, environment)

      // when
      const store = new ResourceStore({
        dataset,
        inferences,
        factory: cachedFactory,
        environment,
      })

      // then
      expect(store.factory).to.eq(cachedFactory)
    })
  })

  describe('clone', () => {
    it('creates a new instance of cached resource store', () => {
      // given
      const cachedFactory = new CachedResourceFactoryImpl(factory, environment)
      const store = new ResourceStore({
        dataset,
        inferences,
        factory: cachedFactory,
        environment,
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
        environment,
      })

      // when
      const resource = store.get(ex.foo)

      // then
      expect(resource).to.be.undefined
    })

    it('returns resource for graph id', async () => {
      // given
      const response: ResponseWrapper = <any> {}
      const john = environment.clownface({ dataset: environment.dataset(), graph: ex.John })
        .node(ex.John)
        .addOut(foaf.knows, ex.Jane)
      const store = new ResourceStore({
        dataset,
        inferences,
        factory,
        environment,
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
      const john = environment.clownface({ dataset: environment.dataset(), graph: ex.John })
        .node(ex.John)
        .addOut(foaf.knows, ex.Jane)
      const store = new ResourceStore({
        dataset,
        inferences,
        factory,
        environment,
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
          environment.quad(ex.foo, rdf.type, ex.baz, ex.graphShouldBeDiscareded),
        ]
      }
      const store = new ResourceStore({
        dataset,
        inferences: [addTypeInference],
        factory,
        environment,
      })
      const resourceDataset = environment.dataset([
        environment.quad(ex.foo, rdf.type, ex.bar, ex.foo),
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
        environment,
      })
      const resourceDataset = environment.dataset([
        environment.quad(ex.foo, rdf.type, ex.bar, ex.whatever),
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
      const cachedFactory = new CachedResourceFactoryImpl(factory, environment)
      cachedFactory.createEntity(environment.clownface({ dataset: environment.dataset(), graph: ex.foo }).node(ex.foo))
      const store = new ResourceStore({
        dataset,
        inferences,
        factory: cachedFactory,
        environment,
      })

      // when
      await store.set(ex.foo, {
        dataset: environment.dataset(),
        response,
      })

      // then
      expect(cachedFactory.__cache.size).to.eq(0)
    })
  })
})

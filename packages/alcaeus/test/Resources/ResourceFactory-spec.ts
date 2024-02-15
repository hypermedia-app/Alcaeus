import namespace from '@rdfjs/namespace'
import { ResourceFactory } from '@tpluscode/rdfine/lib/ResourceFactory'
import { expect } from 'chai'
import sinon from 'sinon'
import { NothingMixin } from 'alcaeus-model/Nothing.js'
import CachedResourceFactoryImpl from 'alcaeus-model/ResourceFactory.js'
import $rdf from '../env.js'

const ex = namespace('http://example.com/')

describe('CachedResourceFactory', () => {
  let fakeFactory: ResourceFactory

  beforeEach(() => {
    fakeFactory = {
      addMixin: sinon.stub(),
      createEntity: sinon.stub().callsFake(() => ({})),
    }
  })

  describe('createEntity', () => {
    it('returns cached instance', () => {
      // given
      const factory = new CachedResourceFactoryImpl(fakeFactory, $rdf)
      const pointer = $rdf.clownface().namedNode('foo')

      // when
      const first = factory.createEntity(pointer)
      const second = factory.createEntity(pointer)

      // then
      expect(first).to.eq(second)
    })

    it('stores instances in per-graph cache', () => {
      // given
      const factory = new CachedResourceFactoryImpl(fakeFactory, $rdf)
      const foobarPtr = $rdf.clownface({ graph: ex.bar }).namedNode(ex.foo)
      const foobazPtr = $rdf.clownface({ graph: ex.baz }).namedNode(ex.foo)

      // when
      const foobar = factory.createEntity(foobarPtr)
      const foobaz = factory.createEntity(foobazPtr)

      // then
      expect(foobar).not.to.eq(foobaz)
      expect(factory.__cache.get(ex.bar)?.get(ex.foo)).to.eq(foobar)
      expect(factory.__cache.get(ex.baz)?.get(ex.foo)).to.eq(foobaz)
    })
  })

  describe('addMixin', () => {
    it('forwards to inner instance', () => {
      // given
      const factory = new CachedResourceFactoryImpl(fakeFactory, $rdf)

      // when
      factory.addMixin(NothingMixin)

      // then
      expect(fakeFactory.addMixin).to.have.been.calledWith(NothingMixin)
    })
  })

  describe('clone', () => {
    it('returns instance with new cache', () => {
      // given
      const factory = new CachedResourceFactoryImpl(fakeFactory, $rdf)

      // when
      const clone = factory.clone() as CachedResourceFactoryImpl<any, any>

      // then
      expect(clone.__cache).not.to.eq(factory.__cache)
    })
  })
})

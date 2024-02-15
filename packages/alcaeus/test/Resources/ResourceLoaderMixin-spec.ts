import sinon from 'sinon'
import Resource from '@tpluscode/rdfine'
import { expect } from 'chai'
import { createResourceLoaderMixin } from 'alcaeus-model/CoreMixins/index.js'
import { ResourceNode } from '@tpluscode/rdfine/RdfResource'
import $rdf, { mockEnv } from '../env.js'

describe('ResourceLoaderMixin', () => {
  describe('shouldApply', () => {
    it('not to blank node resource', () => {
      const mixin = createResourceLoaderMixin($rdf)
      const node = $rdf.clownface()
        .blankNode()
      const self = new Resource(node, $rdf)

      // when
      const result = mixin.shouldApply(self)

      // then
      expect(result).not.to.be.ok
    })
  })

  describe('load', () => {
    let alcaeus: any
    let HydraResource: ReturnType<ReturnType<typeof createResourceLoaderMixin>>

    beforeEach(() => {
      alcaeus = {
        loadResource: sinon.spy(),
      }
      HydraResource = class extends createResourceLoaderMixin(mockEnv(alcaeus))(Resource) {
        constructor(id: ResourceNode) {
          super(id, $rdf)
        }
      }
    })

    it('uses client to dereference self', () => {
      // given
      const node = $rdf.clownface()
        .namedNode('http://example.com/resource')
      const resource = new HydraResource(node)

      // when
      resource.load()

      // then
      expect(alcaeus.loadResource.calledWithMatch('http://example.com/resource')).to.be.ok
    })

    it('passes additional headers', () => {
      // given
      const node = $rdf.clownface()
        .namedNode('http://example.com/resource')
      const resource = new HydraResource(node)

      // when
      resource.load({
        Prefer: 'foo-bar: baz',
      })

      // then
      expect(alcaeus.loadResource.calledWithMatch('http://example.com/resource', {
        Prefer: 'foo-bar: baz',
      })).to.be.ok
    })
  })
})

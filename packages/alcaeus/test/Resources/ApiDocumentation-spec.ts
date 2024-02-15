import { BlankNode } from '@rdfjs/types'
import { Constructor } from '@tpluscode/rdfine'
import * as Hydra from '@rdfine/hydra'
import cf, { GraphPointer } from 'clownface'
import $rdf from '@zazuko/env'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import sinon from 'sinon'
import { ApiDocumentationMixin } from 'alcaeus-model/Mixins/ApiDocumentation.js'
import env, { testEnv } from '../env.js'
import { Resource } from './_TestResource.js'

class ApiDocumentation extends ApiDocumentationMixin(Hydra.ApiDocumentationMixin(Resource)) {}
function MockLoad(loadFunc: any) {
  function Mixin<Base extends Constructor>(base: Base) {
    return class extends base {
      public get load() {
        return loadFunc
      }
    }
  }
  Mixin.shouldApply = true

  return Mixin
}

describe('ApiDocumentation', () => {
  let node: GraphPointer<BlankNode>
  let load: sinon.SinonStub

  beforeEach(() => {
    node = cf({ dataset: $rdf.dataset() }).blankNode()
    load = sinon.stub()
  })

  describe('getting entrypoint', () => {
    it('should reject if entrypoint missing', async () => {
      // given
      const docs = new ApiDocumentation(node, env)

      // when
      const promise = docs.loadEntrypoint()

      // when
      await expect(promise).to.have.been.rejected
    })

    it('should reject if entrypoint is not loadable', async () => {
      // given
      node.addOut(hydra.entrypoint, node.blankNode())
      const docs = new ApiDocumentation(node, env)

      // when
      const promise = docs.loadEntrypoint()

      // then
      await expect(promise).to.have.been.rejected
    })

    it('should load the entrypoint resource', async () => {
      // given
      node.addOut(hydra.entrypoint, node.namedNode('http://example.com/'))
      const env = testEnv()
      env.rdfine().factory.addMixin(MockLoad(load))
      const docs = new ApiDocumentation(node, env)

      // when
      await docs.loadEntrypoint()

      // then
      expect(load).to.have.been.called
    })
  })
})

import type { NamedNode } from '@rdfjs/types'
import * as Hydra from '@rdfine/hydra'
import { GraphPointer } from 'clownface'
import { hydra, owl } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import { OperationMixin } from 'alcaeus-model/Mixins/index.js'
import $rdf from '../env.js'
import { Resource } from './_TestResource.js'

class SupportedOperation extends OperationMixin(Hydra.OperationMixin(Resource)) {}

describe('SupportedOperation', () => {
  let node: GraphPointer<NamedNode>
  let operation: SupportedOperation

  beforeEach(() => {
    node = $rdf.clownface()
      .namedNode('http://example.com/vocab#SupportedOperation')

    node
      .addOut(hydra.description, 'The operation description')
      .addOut(hydra.expects, owl.Nothing)
      .addOut(hydra.method, 'TRACE')
      .addOut(hydra.returns, node.namedNode('http://example.com/Something'))
      .addOut(hydra.title, 'The operation')

    operation = new SupportedOperation(node, $rdf)
  })

  it('should expose operation method', async () => {
    // then
    expect(operation.method).to.eq('TRACE')
  })

  it('should expose expected class id', async () => {
    // then
    expect(operation.expects?.map(e => e.id)).to.deep.eq([owl.Nothing])
  })

  it('should expose returned class id', async () => {
    // then
    expect(operation.returns!.id.value).to.eq('http://example.com/Something')
  })

  describe('requiresInput', () => {
    it('should return false for GET operation', async () => {
      // given
      node.deleteOut(hydra.method).addOut(hydra.method, 'GET')

      // then
      expect(operation.requiresInput).to.eq(false)
    })

    it('should return false for DELETE operation', async () => {
      // given
      node.deleteOut(hydra.method).addOut(hydra.method, 'DELETE')

      // then
      expect(operation.requiresInput).to.eq(false)
    })

    it('should return true if operation expects a body', async () => {
      // given
      node.deleteOut(hydra.method).addOut(hydra.method, 'POST')

      // then
      expect(operation.requiresInput).to.eq(true)
    })

    it('should return true if operation expects nothing', async () => {
      // given
      node.deleteOut(hydra.method).addOut(hydra.method, 'POST')

      // then
      expect(operation.requiresInput).to.eq(true)
    })
  })
})

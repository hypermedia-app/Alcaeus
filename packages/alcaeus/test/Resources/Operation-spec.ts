import { RdfResource } from '@tpluscode/rdfine'
import * as Hydra from '@rdfine/hydra'
import $rdf from '@zazuko/env'
import { GraphPointer } from 'clownface'
import sinon from 'sinon'
import namespace from '@rdfjs/namespace'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import { createMixin, RuntimeOperation } from 'alcaeus-model/Operation.js'
import { HydraClient } from '../../alcaeus.js'
import env from '../env.js'

const ex = namespace('http://example.com/')

describe('Operation', () => {
  let node: GraphPointer

  function operation({ client, resource }: { client?: sinon.SinonSpiedInstance<HydraClient>; resource?: RdfResource } = {}): RuntimeOperation {
    return env.rdfine().createEntity(
      node, [
        createMixin(client || {} as any, resource || {} as any),
        Hydra.OperationMixin,
      ])
  }
  beforeEach(() => {
    node = env.clownface({ dataset: $rdf.dataset() })
      .namedNode(ex.SupportedOperation)
  })

  describe('property', () => {
    beforeEach(() => {
      node.addOut(hydra.description, 'the description')
        .addOut(hydra.title, 'the title')
        .addOut(hydra.method, 'POST')
        .addOut(hydra.expects, ex.Expected)
        .addOut(hydra.returns, ex.Returned)
    })

    it('method should delegate to operation', () => {
      expect(operation().method).to.eq('POST')
    })

    it('expects should delegate to operation', () => {
      expect(operation().expects[0].id.value).to.eq(ex.Expected.value)
    })

    it('returns should delegate to operation', () => {
      expect(operation().returns?.id.value).to.eq(ex.Returned.value)
    })

    it('description should delegate to operation', () => {
      expect(operation().description).to.eq('the description')
    })
  })

  describe('invoke', () => {
    let client: sinon.SinonSpiedInstance<HydraClient>
    const resource = {
      id: $rdf.namedNode('http://target/resource'),
    } as any as RdfResource

    beforeEach(() => {
      client = {
        invokeOperation: sinon.spy(),
      } as any
    })

    it('should execute through alcaeus with provided headers', () => {
      operation({ client, resource }).invoke('', {
        'content-type': 'text/turtle',
        'x-foo': 'bar',
      })

      expect(client.invokeOperation.firstCall.args[1])
        .to.deep.eq({
          'content-type': 'text/turtle',
          'x-foo': 'bar',
        })
      expect(client.invokeOperation.firstCall.args[2]).to.deep.eq('')
    })

    it('should pass body to client', () => {
      operation({ client, resource }).invoke('body')

      expect(client.invokeOperation.firstCall.args[2]).to.deep.eq('body')
    })
  })

  describe('target', () => {
    it('returns the underlying resource', () => {
      // given
      const resource = {} as RdfResource

      // when
      const target = operation({ resource }).target

      // then
      expect(target).to.eq(resource)
    })
  })
})

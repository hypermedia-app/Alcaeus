import { NamedNode } from '@rdfjs/types'
import cf, { GraphPointer } from 'clownface'
import $rdf from '@zazuko/env'
import { hydra, rdfs, schema } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import { DocumentedResourceMixin } from 'alcaeus-model/Mixins/DocumentedResource.js'
import env from '../env.js'
import { Resource } from './_TestResource.js'

class DocumentedResource extends DocumentedResourceMixin(Resource) {}

describe('DocumentedResource', () => {
  let node: GraphPointer<NamedNode>

  beforeEach(() => {
    node = cf({ dataset: $rdf.dataset() })
      .namedNode('http://example.com/vocab#Resource')
    node.addOut(node.namedNode('http://some/custom/property'), 'The value')
  })

  it('should use hydra:title for title property', () => {
    // given
    node.addOut(hydra.title, 'The title')

    // when
    const op = new DocumentedResource(node, env)

    // then
    expect(op.title).to.eq('The title')
  })

  it('should use hydra:description for title property', async () => {
    // given
    node.addOut(hydra.description, 'The longer description')

    // when
    const op = new DocumentedResource(node, env)

    // then
    expect(op.description).to.eq('The longer description')
  })

  it('should use rdfs:label for title property as fallback', () => {
    // given
    node.addOut(rdfs.label, 'The title with rdfs')

    // when
    const op = new DocumentedResource(node, env)

    // then
    expect(op.title).to.eq('The title with rdfs')
  })

  it('should use schema:title for title property as fallback', () => {
    // given
    node.addOut(schema.title, 'The title with schema')

    // when
    const op = new DocumentedResource(node, env)

    // then
    expect(op.title).to.eq('The title with schema')
  })

  it('should use rdfs:comment for description property as fallback', () => {
    // given
    node.addOut(rdfs.comment, 'The title descr with rdfs')

    // when
    const op = new DocumentedResource(node, env)

    // then
    expect(op.description).to.eq('The title descr with rdfs')
  })

  it('should use schema:label for title property as fallback', () => {
    // given
    node.addOut(schema.description, 'The title descr with schema')

    // when
    const op = new DocumentedResource(node, env)

    // then
    expect(op.description).to.eq('The title descr with schema')
  })
})

/* eslint-disable no-prototype-builtins */
import { NamedNode } from '@rdfjs/types'
import cf, { GraphPointer } from 'clownface'
import * as Hydra from '@rdfine/hydra'
import $rdf from 'rdf-ext'
import Parser from '@rdfjs/parser-jsonld'
import stringToStream from 'string-to-stream'
import { expect } from 'chai'
import { PartialCollectionViewMixin } from '../../src/Resources/Mixins/PartialCollectionView.js'
import { Bodies } from '../test-objects/index.js'
import { Resource } from './_TestResource.js'

const parser = new Parser()

class PartialCollectionView extends PartialCollectionViewMixin(Hydra.PartialCollectionViewMixin(Resource)) {}

describe('PartialCollectionView', () => {
  let node: GraphPointer<NamedNode>

  beforeEach(async () => {
    const dataset = $rdf.dataset()
    const jsonldStream = stringToStream(JSON.stringify(Bodies.hydraCollectionWithView))
    await dataset.import(parser.import(jsonldStream))

    node = cf({ dataset })
      .namedNode('http://example.com/resource?page=3')
  })

  it('should link to the collection', async () => {
    const pcv = new PartialCollectionView(node)

    expect(pcv.parent?.id.value).to.eq('http://example.com/resource')
  })

  it('should contain no links to other pages if missing', () => {
    // given
    const noLinks = cf({ dataset: $rdf.dataset() })
      .namedNode('http://example.com/resource?page=3')

    // when
    const pcv = new PartialCollectionView(noLinks)

    // then
    expect(pcv.next).to.be.undefined
    expect(pcv.previous).to.be.undefined
    expect(pcv.first).to.be.undefined
    expect(pcv.last).to.be.undefined
  })

  it('should contain links to other pages', () => {
    // when
    const pcv = new PartialCollectionView(node)

    // then
    expect(pcv.next?.id.value).to.eq('http://example.com/resource?page=4')
    expect(pcv.previous?.id.value).to.eq('http://example.com/resource?page=2')
    expect(pcv.first?.id.value).to.eq('http://example.com/resource?page=1')
    expect(pcv.last?.id.value).to.eq('http://example.com/resource?page=58')
  })

  it('first should be nonenumerable', () => {
    expect(PartialCollectionView.prototype.propertyIsEnumerable('first'))
      .to.eq(false)
  })

  it('last should be nonenumerable', () => {
    expect(PartialCollectionView.prototype.propertyIsEnumerable('last'))
      .to.eq(false)
  })

  it('next should be nonenumerable', () => {
    expect(PartialCollectionView.prototype.propertyIsEnumerable('next'))
      .to.eq(false)
  })

  it('previous should be nonenumerable', () => {
    expect(PartialCollectionView.prototype.propertyIsEnumerable('previous'))
      .to.eq(false)
  })

  it('collection should be nonenumerable', () => {
    expect(PartialCollectionView.prototype.propertyIsEnumerable('collection'))
      .to.eq(false)
  })
})

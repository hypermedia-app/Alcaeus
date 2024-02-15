import { NamedNode } from '@rdfjs/types'
import { GraphPointer } from 'clownface'
import * as Rdf from '@rdfine/rdf'
import { hydra, owl, rdf, rdfs, xsd } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import { RdfPropertyMixin } from 'alcaeus-model/Mixins/RdfProperty.js'
import { ResourceNode } from '@tpluscode/rdfine/RdfResource'
import $rdf from '../env.js'
import { Resource } from './_TestResource.js'

class RdfProperty extends RdfPropertyMixin(Rdf.PropertyMixin(Resource)) {
  constructor(id: ResourceNode) {
    super(id, $rdf)
  }
}

describe('RdfProperty', () => {
  let node: GraphPointer<NamedNode>
  let property: RdfProperty

  beforeEach(() => {
    node = $rdf.clownface()
      .namedNode('http://purl.org/dc/elements/1.1/partOf')

    node.addOut(rdf.type, rdf.Property)
      .addOut(rdfs.domain, xsd.integer)
      .addOut(rdfs.range, xsd.string)
      .addOut(hydra.supportedOperation, op => {
        op.addOut(hydra.description, 'Update this property')
        op.addOut(hydra.expects, xsd.string)
        op.addOut(hydra.method, 'POST')
        op.addOut(hydra.returns, owl.Nothing)
      })

    property = new RdfProperty(node)
  })

  it('should link to domain', async () => {
    // then
    expect(property.domain[0].id).to.deep.eq(xsd.integer)
  })

  it('should link to range', async () => {
    // them
    expect(property.range[0].id).to.deep.eq(xsd.string)
  })

  describe('link', () => {
    it('should not be a link by default', async () => {
      // then
      expect(property.isLink).to.eq(false)
    })

    it('should be a link when typed accordingly', async () => {
      // given
      node.addOut(rdf.type, hydra.Link)

      // then
      expect(property.isLink).to.eq(true)
    })
  })

  describe('supportedOperations', () => {
    it('should return single operation as array', async () => {
      // then
      expect(property.supportedOperations.length).to.eq(1)
    })

    it('should return empty array when property is missing', () => {
      // given
      node.deleteOut(hydra.supportedOperation)

      // thne
      expect(Array.isArray(property.supportedOperations)).to.be.ok
      expect(property.supportedOperations.length).to.eq(0)
    })
  })
})

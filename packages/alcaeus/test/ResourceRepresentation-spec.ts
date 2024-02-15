import ResourceFactory from '@tpluscode/rdfine/lib/ResourceFactory'
import { hydra, rdf, schema, rdfs } from '@tpluscode/rdf-ns-builders/loose'
import { expect } from 'chai'
import Environment from '@zazuko/env/Environment.js'
import { RdfineFactory } from '@tpluscode/rdfine'
import ResourceRepresentation from '../ResourceRepresentation.js'
import parent from './env.js'

const $rdf = new Environment([RdfineFactory], { parent })

const ex = $rdf.namespace('http://example.com/')

const factory = new ResourceFactory($rdf)

describe('ResourceRepresentation', () => {
  it('should be iterable', () => {
    // given
    const dataset = $rdf.dataset()
    $rdf.clownface({ dataset, graph: ex.a })
      .namedNode(ex.a).addOut(rdf.type, ex.Res)
      .namedNode(ex.b).addOut(rdf.type, ex.Res)
      .namedNode(ex.c).addOut(rdf.type, ex.Res)
      .namedNode(ex.d).addOut(rdf.type, ex.Res)
    const r12n = new ResourceRepresentation($rdf.clownface({ dataset, graph: ex.a }), $rdf, ex.a)

    // when
    const array = Array.from(r12n)

    // then
    expect(array.map(r => r.id.value).join()).to.eq('http://example.com/a,http://example.com/b,http://example.com/c,http://example.com/d')
  })

  it('should iterate unique resources', () => {
    // given
    const dataset = $rdf.dataset()
    $rdf.clownface({ dataset, graph: ex.a })
      .namedNode(ex.a).addOut(rdf.type, ex.Res).addOut(schema.knows, [ex.b, ex.c, ex.d])
      .namedNode(ex.c).addOut(schema.knows, [ex.a, ex.d])
      .namedNode(ex.d).addIn(schema.knows, ex.a)
    const r12n = new ResourceRepresentation($rdf.clownface({ dataset, graph: ex.a }), $rdf, ex.a)

    // when
    const array = Array.from(r12n).map(r => r.id)

    // then
    expect(array).to.have.length(2)
    expect(array).to.deep.contain.all.members([
      ex.a, ex.c,
    ],
    )
  })

  describe('length', () => {
    it('should count unique resources', () => {
      // given
      const dataset = $rdf.dataset()
      $rdf.clownface({ dataset, graph: ex.a })
        .namedNode(ex.a).addOut(rdf.type, ex.Res).addOut(schema.knows, [ex.b, ex.c, ex.d])
        .namedNode(ex.c).addOut(schema.knows, [ex.a, ex.d])
        .namedNode(ex.d).addIn(schema.knows, ex.a)
      const r12n = new ResourceRepresentation($rdf.clownface({ dataset, graph: ex.a }), $rdf, ex.a)

      // then
      expect(r12n.length).to.eq(2)
    })
  })

  describe('root', () => {
    it('should use selection root resource as specified by parameter', () => {
      // given
      const rootNode = $rdf.namedNode('urn:other:resource')
      const dataset = $rdf.dataset()

      // when
      const response = new ResourceRepresentation($rdf.clownface({ dataset, graph: ex.a }), $rdf, rootNode)
      const root = response.root

      // then
      expect(root!.id.value).to.eq('urn:other:resource')
    })

    it('should return the collection if resource is its hydra:view', () => {
      // given
      const view = $rdf.namedNode('view')
      const dataset = $rdf.dataset()
      $rdf.clownface({ dataset })
        .namedNode('collection').addOut(hydra.view, view)

      // when
      const response = new ResourceRepresentation($rdf.clownface({ dataset }), $rdf, view)
      const root = response.root

      // then
      expect(root!.id.value).to.eq('collection')
    })
  })

  describe('get', () => {
    it('returns objects from the resource graph', async () => {
      // given
      const dataset = $rdf.dataset()
      const rootNode = $rdf.namedNode('urn:other:resource')

      $rdf.clownface({ dataset })
        .namedNode('urn:child:resource').addOut(rdf.type, ex.Type)
      const response = new ResourceRepresentation($rdf.clownface({ dataset }), $rdf, rootNode)

      // when
      const actualIndexed = response.get('urn:child:resource')

      // then
      expect(actualIndexed!.id.value).to.eq('urn:child:resource')
    })

    it('should return resource for matching URI', () => {
      // given
      const rootNode = $rdf.namedNode('urn:other:resource')
      const dataset = $rdf.dataset()
      const graph = $rdf.clownface({ dataset })
        .namedNode('http://example.com/biała gęś')
        .addOut(rdf.type, schema.Document)
      const response = new ResourceRepresentation(graph, $rdf, rootNode)

      // when
      const actual = response.get('http://example.com/biała gęś')

      // then
      expect(actual!.id.value).to.eq('http://example.com/biała gęś')
    })

    it('should return undefined for resource not found', () => {
      // given
      const rootNode = $rdf.namedNode('urn:other:resource')
      const dataset = $rdf.dataset()
      const graph = $rdf.clownface({ dataset })
        .namedNode('http://example.com/foo')
        .addOut(rdf.type, schema.Document)
      const response = new ResourceRepresentation(graph, $rdf, rootNode)

      // when
      const actual = response.get('http://example.com/bar')

      // then
      expect(actual).to.be.undefined
    })

    it('should not return resource which is only a subject', () => {
      // given
      const rootNode = $rdf.namedNode('urn:other:resource')
      const dataset = $rdf.dataset()
      const graph = $rdf.clownface({ dataset })
        .namedNode('http://example.com/foo')
        .addOut(rdfs.seeAlso, $rdf.namedNode('http://example.com/bar'))
      const response = new ResourceRepresentation(graph, $rdf, rootNode)

      // when
      const actual = response.get('http://example.com/bar')

      // then
      expect(actual).to.be.undefined
    })

    it('should resource which is only a subject if flagged', () => {
      // given
      const rootNode = $rdf.namedNode('urn:other:resource')
      const dataset = $rdf.dataset()
      const graph = $rdf.clownface({ dataset })
        .namedNode('http://example.com/foo')
        .addOut(rdfs.seeAlso, $rdf.namedNode('http://example.com/bar'))
      const response = new ResourceRepresentation(graph, $rdf, rootNode)

      // when
      const actual = response.get('http://example.com/bar', { allObjects: true })

      // then
      expect(actual).not.to.be.undefined
    })

    it('should return resource for encoded URI', () => {
      // given
      const rootNode = $rdf.namedNode('urn:other:resource')
      const dataset = $rdf.dataset()
      const graph = $rdf.clownface({ dataset })
        .namedNode('http://example.com/biała gęś')
        .addOut(rdf.type, schema.Document)
      const response = new ResourceRepresentation(graph, $rdf, rootNode)

      // when
      const actual = response.get('http://example.com/bia%C5%82a%20g%C4%99%C5%9B')

      // then
      expect(actual!.id.value).to.eq('http://example.com/biała gęś')
    })
  })

  describe('ofType', () => {
    it('should return all matching resources', () => {
      // given
      const dataset = $rdf.dataset()
      const rootNode = $rdf.namedNode('urn:some:res')
      $rdf.clownface({ dataset })
        .namedNode('urn:res:1').addOut(rdf.type, ex.Type1)
        .namedNode('urn:res:2').addOut(rdf.type, ex.Type1)
        .namedNode('urn:res:3').addOut(rdf.type, ex.Type2)
        .namedNode('urn:res:4').addOut(rdf.type, ex.Type3)
      const r12n = new ResourceRepresentation($rdf.clownface({ dataset }), $rdf, rootNode)

      // when
      const ofType = r12n.ofType(ex.Type1)

      // then
      expect(ofType.length).to.eq(2)
    })

    it('should return all matching resources by string', () => {
      // given
      const dataset = $rdf.dataset()
      const rootNode = $rdf.namedNode('urn:some:res')
      $rdf.clownface({ dataset })
        .namedNode('urn:res:1').addOut(rdf.type, ex.Type1)
        .namedNode('urn:res:2').addOut(rdf.type, ex.Type1)
        .namedNode('urn:res:3').addOut(rdf.type, ex.Type2)
        .namedNode('urn:res:4').addOut(rdf.type, ex.Type3)
      const r12n = new ResourceRepresentation($rdf.clownface({ dataset }), $rdf, rootNode)

      // when
      const ofType = r12n.ofType(ex.Type1.value)

      // then
      expect(ofType.length).to.eq(2)
    })
  })

  describe('when resources are not given', () => {
    it('should have 0 length', () => {
      // given
      const dataset = $rdf.dataset()
      const rootNode = $rdf.namedNode('urn:some:res')

      // when
      const r12n = new ResourceRepresentation($rdf.clownface({ dataset }), $rdf, rootNode)

      // then
      expect(r12n.length).to.eq(0)
    })

    it('ofType should return empty array', () => {
      // given
      const dataset = $rdf.dataset()
      const rootNode = $rdf.namedNode('urn:some:res')

      // when
      const r12n = new ResourceRepresentation($rdf.clownface({ dataset }), $rdf, rootNode)

      // then
      expect(r12n.ofType('whatever').length).to.eq(0)
    })
  })
})

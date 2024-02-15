import { DatasetCore, Stream } from '@rdfjs/types'
import Parser from '@rdfjs/parser-n3'
import * as Hydra from '@rdfine/hydra'
import { turtle, TurtleTemplateResult } from '@tpluscode/rdf-string'
import RdfResourceImpl from '@tpluscode/rdfine'
import stringToStream from 'string-to-stream'
import { hydra, rdf, schema } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import sinon from 'sinon'
import { createHydraResourceMixin } from 'alcaeus-model/CoreMixins/index.js'
import { ResourceRepresentation } from 'alcaeus-core'
import { ResourceNode } from '@tpluscode/rdfine/RdfResource'
import { mockEnv } from '../env.js'

const apiDocumentations: ResourceRepresentation<DatasetCore, Hydra.ApiDocumentation>[] = []
const resources = {
  get: sinon.stub(),
}

const client = {
  apiDocumentations,
  resources,
} as any
const $rdf = mockEnv(client)

const parser = new Parser()
const ex = $rdf.namespace('http://example.com/vocab#')

const HydraResource = class extends createHydraResourceMixin($rdf)(Hydra.ResourceMixin(RdfResourceImpl)) {
  constructor(id: ResourceNode) {
    super(id, $rdf)
  }
}

;($rdf.rdfine().factory as any).BaseClass = HydraResource

function parse(triples: TurtleTemplateResult): Stream {
  return parser.import(stringToStream(triples.toString()))
}

async function pushApiDocumentation(apiGraph: Stream, term = ex.api) {
  const root: Hydra.ApiDocumentation = $rdf.rdfine().createEntity<Hydra.ApiDocumentation>($rdf.clownface({
    dataset: await $rdf.dataset().import(apiGraph),
    term,
  }))
  apiDocumentations.push({
    root,
  } as ResourceRepresentation<DatasetCore, Hydra.ApiDocumentation>)
}

describe('HydraResource', () => {
  beforeEach(() => {
    apiDocumentations.splice(0, apiDocumentations.length)
  })

  describe('get operations', () => {
    it('should combine operations from class and property', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.Resource} .
                       
                    ${ex.Resource} a ${hydra.Class} ;
                        ${hydra.supportedOperation} [
                            a ${hydra.Operation}
                        ] ;
                        ${hydra.supportedProperty} [
                            a ${hydra.SupportedProperty} ;
                            ${hydra.property} ${ex.knows}
                        ] .
                    
                    ${ex.knows} ${hydra.supportedOperation} [
                        a ${hydra.Operation}
                    ] ;
                    a ${rdf.Property} .
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/A> a ${ex.Resource} .
                    <http://example.com/B> a ${ex.Resource} .
                    
                    <http://example.com/A> ${ex.knows} <http://example.com/B> .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/B'),
      }))

      // when
      const ops = resource.operations

      // then
      expect(ops.length).to.eq(2)
    })

    it('should combine operations for multiple @types', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.ResourceA}, ${ex.ResourceB} .
                       
                    ${ex.ResourceA} a ${hydra.Class} ;
                        ${hydra.supportedOperation} [
                            a ${hydra.Operation}
                        ] .
                    ${ex.ResourceB} a ${hydra.Class} ;
                        ${hydra.supportedOperation} [
                            a ${hydra.Operation}
                        ] .
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const ops = resource.operations

      // then
      expect(ops.length).to.eq(2)
    })

    it('returns empty array when api documentation is unavailable', async () => {
      // given
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const ops = resource.operations

      // then
      expect(ops.length).to.eq(0)
    })

    it('should return operations with unique supported operation ids', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.ResourceA}, ${ex.ResourceB} .
                       
                    ${ex.ResourceA} a ${hydra.Class} ;
                        ${hydra.supportedOperation} ${ex.DeleteOperation} .
                    ${ex.ResourceB} a ${hydra.Class} ;
                        ${hydra.supportedOperation} ${ex.DeleteOperation}.
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const ops = resource.operations

      // then
      expect(ops).to.have.length(1)
    })
  })

  describe('getProperties', () => {
    it('returns empty array when ApiDocumentation is missing', async () => {
      // given
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const ops = resource.getProperties()

      // then
      expect(ops.length).to.eq(0)
    })

    it('deduplicates multiple usage same rdf:property in supported properties', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.ResourceA}, ${ex.ResourceB} .
                       
                    ${ex.ResourceA} a ${hydra.Class} ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.knows} ] .
                    ${ex.ResourceB} a ${hydra.Class} ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.knows} ] .
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const links = resource.getProperties()

      // then
      expect(links.length).to.eq(1)
    })

    it('returns all objects as their JS counterparts', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.Person} .
                       
                    ${ex.Person} a ${hydra.Class} ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.knows} ] ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.age} ] ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.sallary} ] ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.isAdmin} ] ;
                    .
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/John> 
                        a ${ex.Person} ;
                        ${ex.knows} <http://example.com/Jane> ;
                        ${ex.age} 10 ;
                        ${ex.sallary} 15.5 ;
                        ${ex.isAdmin} true ;
                    .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/John'),
      }))

      // when
      const map = $rdf.termMap(resource.getProperties().map((pair) => [
        pair.supportedProperty.property!.id,
        pair.objects,
      ]))

      // then
      expect(map.get(ex.knows)![0]).to.to.be.instanceof(RdfResourceImpl)
      expect(map.get(ex.age)![0]).to.eq(10)
      expect(map.get(ex.sallary)![0]).to.eq(15.5)
      expect(map.get(ex.isAdmin)![0]).to.eq(true)
    })
  })

  describe('getLinks', () => {
    it('should return empty array when no property is link', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.Resource} .
                       
                    ${ex.Resource} a ${hydra.Class} ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.knows} ] .
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.Resource} .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const links = resource.getLinks()

      // then
      expect(links.length).to.eq(0)
    })

    it('should return ids and values for hydra:Link properties', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.Resource} .
                       
                    ${ex.Resource} a ${hydra.Class} ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.knows} ] .
                        
                    ${ex.knows} a ${hydra.Link}, ${rdf.Property} .
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.Resource} ;
                        ${ex.knows} <http://example.com/linked>.
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const links = resource.getLinks()

      // then
      expect(links.length).to.eq(1)
      expect(links[0].resources[0].id.value).to.eq('http://example.com/linked')
    })

    it('should return empty result if a Link property is not used in a resource', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.Resource} .
                       
                    ${ex.Resource} a ${hydra.Class} ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.knows} ] .
                        
                    ${ex.knows} a ${hydra.Link} .
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.Resource} .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const links = resource.getLinks()

      // then
      expect(links.length).to.eq(0)
    })

    it('should return all Link properties if requested explicitly', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.Resource} .
                       
                    ${ex.Resource} a ${hydra.Class} ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.knows} ] .
                        
                    ${ex.knows} a ${hydra.Link}, ${rdf.Property} .
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.Resource} .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const links = resource.getLinks(true)

      // then
      expect(links.length).to.eq(1)
    })

    it('does not return literals or blank nodes', async () => {
      // given
      const apiGraph = parse(
        turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.Resource} .
                       
                    ${ex.Resource} a ${hydra.Class} ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.knows} ] .
                        
                    ${ex.knows} a ${hydra.Link}, ${rdf.Property} .
                `)
      await pushApiDocumentation(apiGraph)
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> a ${ex.Resource} ;
                        ${ex.knows} <http://example.com/linked>, [], 1000.
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const links = resource.getLinks()

      // then
      expect(links).to.have.length(1)
      expect(links[0].resources).to.have.length(1)
      expect(links[0].resources[0].id.value).to.eq('http://example.com/linked')
    })
  })

  describe('getCollections', () => {
    it('returns all hydra:collections', async () => {
      // given
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> ${hydra.collection} 
                        <http://example.com/collection1> ,
                        <http://example.com/collection2> ,
                        <http://example.com/collection3> ,
                        <http://example.com/collection4> .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const collections = resource.getCollections()

      // then
      expect(collections.length).to.eq(4)
    })

    it('returns collections matching manages block Class given by id', async () => {
      // given
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> ${hydra.collection} 
                        <http://example.com/collection1> ,
                        <http://example.com/collection2> ,
                        <http://example.com/collection3> ,
                        <http://example.com/collection4> .
                        
                    <http://example.com/collection1> a ${hydra.Collection} ; ${hydra.manages} [
                        ${hydra.object} <http://example.org/Class> ;
                        ${hydra.property} ${rdf.type}
                    ] .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const collections = resource.getCollections({
        object: 'http://example.org/Class',
      })

      // then
      expect(collections.length).to.eq(1)
      expect(collections[0].id.value).to.eq('http://example.com/collection1')
    })

    it('returns collections matching member assertion Class given by id', async () => {
      // given
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> ${hydra.collection} 
                        <http://example.com/collection1> ,
                        <http://example.com/collection2> ,
                        <http://example.com/collection3> ,
                        <http://example.com/collection4> .
                        
                    <http://example.com/collection1> a ${hydra.Collection} ; ${hydra.memberAssertion} [
                        ${hydra.object} <http://example.org/Class> ;
                        ${hydra.property} ${rdf.type}
                    ] .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const collections = resource.getCollections({
        object: 'http://example.org/Class',
      })

      // then
      expect(collections.length).to.eq(1)
      expect(collections[0].id.value).to.eq('http://example.com/collection1')
    })
  })

  describe('apiDocumentation', () => {
    beforeEach(async () => {
      const apiGraph = parse(turtle`${ex.api1} a ${hydra.ApiDocumentation} . `)
      await pushApiDocumentation(apiGraph, ex.api1)

      const api2Graph = parse(turtle`${ex.api2} a ${hydra.ApiDocumentation} . `)
      await pushApiDocumentation(api2Graph, ex.api2)
    })

    it('returns apiDoc identified by link within representation', async () => {
      // given
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> ${hydra.apiDocumentation} ${ex.api2} .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const { apiDocumentation } = resource

      // then
      expect(apiDocumentation?.id).to.deep.eq(ex.api2)
    })

    it('returns apiDoc identified by HTTP Link header', async () => {
      // given
      resources.get.returns({
        response: {
          apiDocumentationLink: ex.api1.value,
        },
      })
      const resourceGraph = parse(
        turtle`
                    <http://example.com/> ${schema.name} "foobar" .
                `)
      const resource = new HydraResource($rdf.clownface({
        dataset: await $rdf.dataset().import(resourceGraph),
        term: $rdf.namedNode('http://example.com/'),
      }))

      // when
      const { apiDocumentation } = resource

      // then
      expect(apiDocumentation?.id).to.deep.eq(ex.api1)
    })
  })
})

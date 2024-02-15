import { DatasetCore, Literal, Stream } from '@rdfjs/types'
import * as Hydra from '@rdfine/hydra'
import Parser from '@rdfjs/parser-n3'
import { turtle, TurtleTemplateResult } from '@tpluscode/rdf-string'
import type { RdfResource } from '@tpluscode/rdfine'
import type { AnyContext, AnyPointer } from 'clownface'
import stringToStream from 'string-to-stream'
import { hydra, owl } from '@tpluscode/rdf-ns-builders'
import { expect } from 'chai'
import sinon from 'sinon'
import { createHydraResourceMixin, OperationFinderMixin } from 'alcaeus-model/CoreMixins/index.js'
import { ResourceRepresentation } from 'alcaeus-core'
import { Dataset } from '@zazuko/env/lib/Dataset.js'
import { ResourceNode } from '@tpluscode/rdfine/RdfResource'
import { mockEnv } from '../../env.js'
import { Resource } from '../_TestResource.js'
import { Alcaeus } from '../../../alcaeus.js'

const parser = new Parser()
function parse(triples: TurtleTemplateResult): Stream {
  return parser.import(stringToStream(triples.toString()))
}

const apiDocumentations: ResourceRepresentation<DatasetCore, Hydra.ApiDocumentation>[] = []
const client = {
  apiDocumentations,
} as Alcaeus<any>

const environment = mockEnv(client)

const ex = environment.namespace('http://example.com/vocab#')
class TestOperationFinder extends OperationFinderMixin(createHydraResourceMixin(environment)(Resource)) {
  constructor(id: ResourceNode) {
    super(id, environment)
  }
}

function pushApiDocumentation(root: Hydra.ApiDocumentation) {
  apiDocumentations.push({
    root,
  } as ResourceRepresentation<DatasetCore, Hydra.ApiDocumentation>)
}

;(environment.rdfine().factory as any).BaseClass = TestOperationFinder

describe('OperationFinder', () => {
  let graph: AnyPointer<AnyContext, Dataset>

  beforeEach(() => {
    apiDocumentations.splice(0, apiDocumentations.length)
    graph = environment.clownface({ dataset: environment.dataset() })
  })

  describe('getOperationsDeep', () => {
    it('finds operations from children', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [ a ${hydra.Operation} ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class}; ${ex.hasChild} <http://example.com/child> .
                <http://example.com/child> a ${ex.Class} ; ${ex.hasChild} <http://example.com/child/child> .
                <http://example.com/child/child> a ${ex.Class} .
            `))
      const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = topLevel.getOperationsDeep({
        namespaces: [ex],
      })

      // then
      expect(operations).to.have.length(3)
    })

    it('handles cycled resource graphs', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [ a ${hydra.Operation} ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class}; ${ex.hasChild} <http://example.com/child> .
                <http://example.com/child> a ${ex.Class} ; ${ex.hasChild} <http://example.com/child/child> .
                <http://example.com/child/child> a ${ex.Class} ; ${ex.hasChild} <http://example.com/>.
            `))
      const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = topLevel.getOperationsDeep({
        namespaces: [ex],
      })

      // then
      expect(operations).to.have.length(3)
    })

    it('does not descend properties from namespaces not included', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [ a ${hydra.Operation} ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> ${hydra.member} <http://example.com/child> .
                <http://example.com/child> a ${ex.Class} ; ${ex.hasChild} <http://example.com/child/child> .
                <http://example.com/child/child> a ${ex.Class} .
            `))
      const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = topLevel.getOperationsDeep()

      // then
      expect(operations).to.have.length(0)
    })

    it('excludes nothing when excludedProperties is empty', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [ a ${hydra.Operation} ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> ${hydra.member} <http://example.com/child> .
                <http://example.com/child> a ${ex.Class} ; ${ex.hasChild} <http://example.com/child/child> .
                <http://example.com/child/child> a ${ex.Class} .
            `))
      const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = topLevel.getOperationsDeep({
        excludedProperties: [],
        namespaces: [ex, hydra],
      })

      // then
      expect(operations).to.have.length(2)
    })

    it('excludes provided properties', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [ a ${hydra.Operation} ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/>
                    ${ex.hasChild} <http://example.com/child> ;
                    ${ex.hasSibling} <http://example.com/sibling> .
                <http://example.com/child> a ${ex.Class} .
                <http://example.com/sibling> a ${ex.Class} .
            `))
      const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = topLevel.getOperationsDeep({
        excludedProperties: ['http://example.com/vocab#hasChild', ex.hasSibling],
        namespaces: [ex],
      })

      // then
      expect(operations).to.have.length(0)
    })
  })

  describe('findOperations', () => {
    it('returns all non-GET operations if no method criteria are given', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [
                        a ${hydra.Operation} ;
                        ${hydra.method} "DELETE"
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.method} "GET"
                    ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations()

      // then
      expect(operations).to.have.length(1)
      expect(operations[0].method).to.eq('DELETE')
    })

    it('includes by case-insensitive method name', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [
                        a ${hydra.Operation} ;
                        ${hydra.method} "DELETE"
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.method} "GET"
                    ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        byMethod: 'delete',
      })

      // then
      expect(operations).to.have.length(1)
      expect(operations[0].method).to.eq('DELETE')
    })

    it('includes by OR-ing multiple criteria', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [
                        a ${hydra.Operation} ;
                        ${hydra.method} "DELETE"
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.method} "GET"
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.method} "POST"
                    ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        byMethod: 'delete',
      }, {
        byMethod: 'POST',
      })

      // then
      expect(operations).to.have.length(2)
      expect(operations.map(o => o.method)).to.contain.all.members([
        'POST', 'DELETE',
      ])
    })

    it('includes by expected class id', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [
                        a ${hydra.Operation} ;
                        ${hydra.method} "DELETE" ;
                        ${hydra.expects} ${owl.Nothing}
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.method} "GET" ;
                        ${hydra.expects} ${owl.Nothing}
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.method} "POST" ;
                        ${hydra.expects} ${ex.Person}
                    ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`                   
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        expecting: ex.Person,
      })

      // then
      expect(operations).to.have.length(1)
      expect(operations[0].method).to.eq('POST')
    })

    it('excludes GET operations if not otherwise filtered explicitly', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} ${ex.Action} .
                    
                ${ex.Action}
                    a ${hydra.Operation} ;
                    ${hydra.expects} ${ex.Foo} ;
                    ${hydra.returns} ${ex.Bar} ;
                    ${hydra.method} "GET" .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`                   
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        expecting: 'http://example.com/Foo',
      }, {
        returning: 'http://example.com/Bar',
      }, {
        bySupportedOperation: 'http://example.com/Action',
      })

      // then
      expect(operations).to.have.length(0)
    })

    it('includes by expected class instance', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [
                        a ${hydra.Operation} ;
                        ${hydra.expects} ${owl.Nothing}
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.expects} ${owl.Nothing}
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.expects} ${ex.Person}
                    ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        expecting: resource._create<Hydra.Class>(graph.node(owl.Nothing)),
      })

      // then
      expect(operations).to.have.length(2)
      expect(operations.map(o => o.expects[0].id.value)).to.deep.contain.all.members(
        [owl.Nothing.value],
      )
    })

    it('includes by custom match function', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [
                        a ${hydra.Operation} ;
                        ${hydra.method} "DELETE" ;
                        ${hydra.expects} ${owl.Nothing}
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.method} "PUT" ;
                        ${hydra.expects} ${ex.NewPerson}
                    ] , [
                        a ${hydra.Operation} ;
                        ${hydra.method} "POST" ;
                        ${hydra.expects} ${ex.Person}
                    ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        expecting: (clas: RdfResource) => {
          return clas.id.value.startsWith('http://example.com/')
        },
      })

      // then
      expect(operations).to.have.length(2)
      expect(operations.map(o => o.method)).to.contain.all.members(
        ['POST', 'PUT'],
      )
    })

    it('includes by exact id of supported operation', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ; ${hydra.supportedOperation} ${ex.DeleteOp} , ${ex.PostOp} , ${ex.PutOp} .
                    
                ${ex.DeleteOp} a ${hydra.Operation} ; ${hydra.method} "DELETE" .
                ${ex.PostOp} a ${hydra.Operation} ; ${hydra.method} "DELETE" .
                ${ex.PutOp} a ${hydra.Operation} ; ${hydra.method} "DELETE" .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        bySupportedOperation: ex.DeleteOp,
      })

      // then
      expect(operations).to.have.length(1)
      expect(operations[0].id.value).to.eq(ex.DeleteOp.value)
    })

    it('includes by exact type of supported operation', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ; ${hydra.supportedOperation} 
                    [ a ${hydra.Operation} , ${ex.DeleteOp} ; ${hydra.method} "DELETE" ] ,
                    [ a ${hydra.Operation} , ${ex.PostOp} ; ${hydra.method} "DELETE" ] ,
                    [ a ${hydra.Operation} , ${ex.PutOp} ; ${hydra.method} "DELETE" ] .
                ${ex.PutOp} a ${hydra.Operation} ; ${hydra.method} "DELETE" .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        bySupportedOperation: 'http://example.com/vocab#DeleteOp',
      })

      // then
      expect(operations).to.have.length(1)
      expect(operations[0].types.has(ex.DeleteOp)).to.eq(true)
    })

    it('includes by exact type of supported operation using named node', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ; ${hydra.supportedOperation} 
                    [ a ${hydra.Operation} , ${ex.DeleteOp} ; ${hydra.method} "DELETE" ] ,
                    [ a ${hydra.Operation} , ${ex.PostOp} ; ${hydra.method} "DELETE" ] ,
                    [ a ${hydra.Operation} , ${ex.PutOp} ; ${hydra.method} "DELETE" ] .
                ${ex.PutOp} a ${hydra.Operation} ; ${hydra.method} "DELETE" .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        bySupportedOperation: environment.namedNode('http://example.com/vocab#DeleteOp'),
      })

      // then
      expect(operations).to.have.length(1)
      expect(operations[0].types.has(ex.DeleteOp)).to.eq(true)
    })

    it('includes callback with ISupportedOperation', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ; ${hydra.supportedOperation} ${ex.OperationA} , ${ex.OperationB} , ${ex.OperationC} .
                ${ex.OperationA} a ${hydra.Operation} ; ${ex.custom} 'A' . 
                ${ex.OperationB} a ${hydra.Operation} ; ${ex.custom} 'B' .
                ${ex.OperationC} a ${hydra.Operation} ; ${ex.custom} 'C' .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} .
            `))
      const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = resource.findOperations({
        bySupportedOperation: (supportedOperation: any) => {
          const customMeta = supportedOperation['http://example.com/vocab#custom'] as Literal

          return customMeta.value === 'A' || customMeta.value === 'C'
        },
      })

      // then
      expect(operations).to.have.length(2)
      expect([...operations.values()].map(o => o.id)).to.deep.contain.all.members(
        [ex.OperationA, ex.OperationC],
      )
    })
  })

  describe('findOperationsDeep', () => {
    it('called without parameters finds non-get operations from children', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.ClassWithGet}, ${ex.ClassWithPut}, ${ex.ClassWithPost} .
                    
                ${ex.ClassWithGet} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [ a ${hydra.Operation} ; ${hydra.method} "GET" ] .
                ${ex.ClassWithPut} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [ a ${hydra.Operation} ; ${hydra.method} "PUT" ] .
                ${ex.ClassWithPost} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [ a ${hydra.Operation} ; ${hydra.method} "POST" ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.ClassWithGet}; ${ex.hasChild} <http://example.com/child> .
                <http://example.com/child> a ${ex.ClassWithPost} ; ${ex.hasChild} <http://example.com/child/child> .
                <http://example.com/child/child> a ${ex.ClassWithPost} .
            `))
      const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = topLevel.findOperationsDeep({
        namespaces: [ex],
      })

      // then
      expect(operations).to.have.length(2)
      expect(operations.map(o => o.method)).not.to.eq(
        sinon.match.array.contains(['GET']),
      )
    })

    it('uses first parameter to stop optionally drilling down', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} [ a ${hydra.Operation} ] .
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class}; ${ex.hasChild} <http://example.com/child> .
                <http://example.com/child> a ${ex.Class} ; ${ex.hasChild} <http://example.com/child/child> .
                <http://example.com/child/child> a ${ex.Class} .
            `))
      const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = topLevel.findOperationsDeep({
        excludedProperties: [ex.hasChild],
        namespaces: [ex],
      })

      // then
      expect(operations).to.have.length(1)
      expect(operations.map(o => o.target.id.value)).to.contain('http://example.com/')
    })

    it('filters operations by criteria', async () => {
      // given
      const apiGraph = parse(turtle`
                ${ex.api} a ${hydra.ApiDocumentation} ;
                    ${hydra.supportedClass} ${ex.Class} .
                    
                ${ex.Class} a ${hydra.Class} ;
                    ${hydra.supportedOperation} 
                        [ a ${hydra.Operation} ; ${hydra.method} "GET" ] ,
                        [ a ${hydra.Operation} ; ${hydra.method} "POST" ].
            `)
      pushApiDocumentation(environment.rdfine().factory.createEntity(environment.clownface({
        dataset: await environment.dataset().import(apiGraph),
        term: ex.api,
      })))
      await graph.dataset.import(parse(turtle`
                <http://example.com/> a ${ex.Class} ; ${ex.hasChild} <http://example.com/child> .
                <http://example.com/child> a ${ex.Class} ; ${ex.hasChild} <http://example.com/child/child> .
                <http://example.com/child/child> a ${ex.Class} .
            `))
      const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

      // when
      const operations = topLevel.findOperationsDeep({
        namespaces: [ex],
        byMethod: 'get',
      })

      // then
      expect(operations).to.have.length(3)
      expect(operations.map(o => o.method)).to.contain('GET')
    })
  })
})

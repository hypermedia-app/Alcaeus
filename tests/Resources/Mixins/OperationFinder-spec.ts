import namespace from '@rdfjs/namespace'
import Parser from '@rdfjs/parser-n3'
import ResourceFactory from '@tpluscode/rdfine/lib/ResourceFactory'
import cf, { Clownface } from 'clownface'
import $rdf from 'rdf-ext'
import DatasetExt from 'rdf-ext/lib/Dataset'
import { Literal, Stream } from 'rdf-js'
import stringToStream from 'string-to-stream'
import * as mixins from '../../../src/ResourceFactoryDefaults'
import { Class } from '../../../src/Resources'
import { createHydraResourceMixin, OperationFinderMixin } from '../../../src/Resources/CoreMixins'
import { hydra, owl } from '../../../src/Vocabs'
import { Resource } from '../_TestResource'

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

const ex = namespace('http://example.com/vocab#')
const parser = new Parser()
function parse (triples: string): Stream {
    const data = `
    @prefix hydra: <${hydra().value}> .
    @prefix ex: <${ex().value}> .
    @prefix owl: <${owl().value}> .
    
    ${triples}`

    return parser.import(stringToStream(data) as any as Stream)
}

class TestOperationFinder extends OperationFinderMixin(createHydraResourceMixin({} as any)(Resource)) {
}

TestOperationFinder.factory = new ResourceFactory(TestOperationFinder)
TestOperationFinder.factory.addMixin(mixins.ClassMixin)

describe('OperationFinder', () => {
    let graph: Clownface<any, DatasetExt>

    beforeEach(() => {
        graph = cf({ dataset: $rdf.dataset() })
    })

    describe('getOperationsDeep', () => {
        it('finds operations from children', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [ a hydra:SupportedOperation ] .
                    
                <http://example.com/> a ex:Class; ex:hasChild <http://example.com/child> .
                <http://example.com/child> a ex:Class ; ex:hasChild <http://example.com/child/child> .
                <http://example.com/child/child> a ex:Class .
            `))
            const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = topLevel.getOperationsDeep()

            // then
            expect(operations).toHaveLength(3)
        })

        it('handles cycled resource graphs', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [ a hydra:SupportedOperation ] .
                    
                <http://example.com/> a ex:Class; ex:hasChild <http://example.com/child> .
                <http://example.com/child> a ex:Class ; ex:hasChild <http://example.com/child/child> .
                <http://example.com/child/child> a ex:Class ; ex:hasChild <http://example.com/>.
            `))
            const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = topLevel.getOperationsDeep()

            // then
            expect(operations).toHaveLength(3)
        })

        it('excludes objects of hydra:member property by default', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [ a hydra:SupportedOperation ] .
                    
                <http://example.com/> hydra:member <http://example.com/child> .
                <http://example.com/child> a ex:Class ; ex:hasChild <http://example.com/child/child> .
                <http://example.com/child/child> a ex:Class .
            `))
            const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = topLevel.getOperationsDeep()

            // then
            expect(operations).toHaveLength(0)
        })

        it('excludes nothing when excludedProperties is empty', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [ a hydra:SupportedOperation ] .
                    
                <http://example.com/> hydra:member <http://example.com/child> .
                <http://example.com/child> a ex:Class ; ex:hasChild <http://example.com/child/child> .
                <http://example.com/child/child> a ex:Class .
            `))
            const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = topLevel.getOperationsDeep({
                excludedProperties: [],
            })

            // then
            expect(operations).toHaveLength(2)
        })

        it('excludes provided properties', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [ a hydra:SupportedOperation ] .
                    
                <http://example.com/>
                    ex:hasChild <http://example.com/child> ;
                    ex:hasSibling <http://example.com/sibling> .
                <http://example.com/child> a ex:Class .
                <http://example.com/sibling> a ex:Class .
            `))
            const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = topLevel.getOperationsDeep({
                excludedProperties: ['http://example.com/vocab#hasChild', ex.hasSibling],
            })

            // then
            expect(operations).toHaveLength(0)
        })
    })

    describe('findOperations', () => {
        it('returns all non-GET operations if no method criteria are given', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [
                        a hydra:SupportedOperation ;
                        hydra:method "DELETE"
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:method "GET"
                    ] .
                    
                <http://example.com/> a ex:Class .
            `))
            const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = resource.findOperations()

            // then
            expect(operations).toHaveLength(1)
            expect(operations[0].method).toBe('DELETE')
        })

        it('includes by case-insensitive method name', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [
                        a hydra:SupportedOperation ;
                        hydra:method "DELETE"
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:method "GET"
                    ] .
                    
                <http://example.com/> a ex:Class .
            `))
            const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = resource.findOperations({
                byMethod: 'delete',
            })

            // then
            expect(operations).toHaveLength(1)
            expect(operations[0].method).toBe('DELETE')
        })

        it('includes by OR-ing multiple criteria', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [
                        a hydra:SupportedOperation ;
                        hydra:method "DELETE"
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:method "GET"
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:method "POST"
                    ] .
                    
                <http://example.com/> a ex:Class .
            `))
            const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = resource.findOperations({
                byMethod: 'delete',
            }, {
                byMethod: 'POST',
            })

            // then
            expect(operations).toHaveLength(2)
            expect(operations.map(o => o.method)).toEqual(expect.arrayContaining([
                'POST', 'DELETE',
            ]))
        })

        it('includes by expected class id', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [
                        a hydra:SupportedOperation ;
                        hydra:method "DELETE" ;
                        hydra:expects owl:Nothing
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:method "GET" ;
                        hydra:expects owl:Nothing
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:method "POST" ;
                        hydra:expects ex:Person
                    ] .
                    
                <http://example.com/> a ex:Class .
            `))
            const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = resource.findOperations({
                expecting: ex.Person,
            })

            // then
            expect(operations).toHaveLength(1)
            expect(operations[0].method).toBe('POST')
        })

        it('excludes GET operations if not otherwise filtered explicitly', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation ex:Action .
                    
                ex:Action
                    a hydra:SupportedOperation ;
                    hydra:expects ex:Foo ;
                    hydra:returns ex:Bar ;
                    hydra:method "GET" .
                    
                <http://example.com/> a ex:Class .
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
            expect(operations).toHaveLength(0)
        })

        it('includes by expected class instance', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [
                        a hydra:SupportedOperation ;
                        hydra:expects owl:Nothing
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:expects owl:Nothing
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:expects ex:Person
                    ] .
                    
                <http://example.com/> a ex:Class .
            `))
            const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = resource.findOperations({
                expecting: resource._create<Class>(graph.node(owl.Nothing)),
            })

            // then
            expect(operations).toHaveLength(2)
            expect(operations.map(o => o.expects.id.value)).toEqual(
                expect.arrayContaining([owl.Nothing.value])
            )
        })

        it('includes by custom match function', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [
                        a hydra:SupportedOperation ;
                        hydra:method "DELETE" ;
                        hydra:expects owl:Nothing
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:method "PUT" ;
                        hydra:expects ex:NewPerson
                    ] , [
                        a hydra:SupportedOperation ;
                        hydra:method "POST" ;
                        hydra:expects ex:Person
                    ] .
                    
                <http://example.com/> a ex:Class .
            `))
            const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = resource.findOperations({
                expecting: (clas: Class) => {
                    return clas.id.value.startsWith('http://example.com/')
                },
            })

            // then
            expect(operations).toHaveLength(2)
            expect(operations.map(o => o.method)).toEqual(
                expect.arrayContaining(['POST', 'PUT'])
            )
        })

        it('includes by exact id of supported operation', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ; hydra:supportedOperation ex:DeleteOp , ex:PostOp , ex:PutOp .
                    
                ex:DeleteOp a hydra:SupportedOperation ; hydra:method "DELETE" .
                ex:PostOp a hydra:SupportedOperation ; hydra:method "DELETE" .
                ex:PutOp a hydra:SupportedOperation ; hydra:method "DELETE" .
                    
                <http://example.com/> a ex:Class .
            `))
            const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = resource.findOperations({
                bySupportedOperation: ex.DeleteOp,
            })

            // then
            expect(operations).toHaveLength(1)
            expect(operations[0].supportedOperation.id.value).toEqual(ex.DeleteOp.value)
        })

        it('includes by exact type of supported operation', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ; hydra:supportedOperation 
                    [ a hydra:SupportedOperation , ex:DeleteOp ; hydra:method "DELETE" ] ,
                    [ a hydra:SupportedOperation , ex:PostOp ; hydra:method "DELETE" ] ,
                    [ a hydra:SupportedOperation , ex:PutOp ; hydra:method "DELETE" ] .
                    
                <http://example.com/> a ex:Class .
            `))
            const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = resource.findOperations({
                bySupportedOperation: 'http://example.com/vocab#DeleteOp',
            })

            // then
            expect(operations).toHaveLength(1)
            expect(operations[0].supportedOperation.types.has(ex.DeleteOp)).toBe(true)
        })

        it('includes callback with ISupportedOperation', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ; hydra:supportedOperation ex:OperationA , ex:OperationB , ex:OperationC .
                ex:OperationA a hydra:SupportedOperation ; ex:custom 'A' . 
                ex:OperationB a hydra:SupportedOperation ; ex:custom 'B' .
                ex:OperationC a hydra:SupportedOperation ; ex:custom 'C' .
                    
                <http://example.com/> a ex:Class .
            `))
            const resource = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = resource.findOperations({
                bySupportedOperation: (supportedOperation) => {
                    const customMeta = supportedOperation['http://example.com/vocab#custom'] as Literal

                    return customMeta.value === 'A' || customMeta.value === 'C'
                },
            })

            // then
            expect(operations).toHaveLength(2)
            expect(operations.map(o => o.supportedOperation.id.value)).toEqual(
                expect.arrayContaining([ex.OperationA.value, ex.OperationC.value])
            )
        })
    })

    describe('findOperationsDeep', () => {
        it('called without parameters finds non-get operations from children', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:ClassWithGet, ex:ClassWithPut, ex:ClassWithPost .
                    
                ex:ClassWithGet a hydra:Class ;
                    hydra:supportedOperation [ a hydra:SupportedOperation ; hydra:method "GET" ] .
                ex:ClassWithPut a hydra:Class ;
                    hydra:supportedOperation [ a hydra:SupportedOperation ; hydra:method "PUT" ] .
                ex:ClassWithPost a hydra:Class ;
                    hydra:supportedOperation [ a hydra:SupportedOperation ; hydra:method "POST" ] .
                    
                <http://example.com/> a ex:ClassWithGet; ex:hasChild <http://example.com/child> .
                <http://example.com/child> a ex:ClassWithPost ; ex:hasChild <http://example.com/child/child> .
                <http://example.com/child/child> a ex:ClassWithPost .
            `))
            const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = topLevel.findOperationsDeep()

            // then
            expect(operations).toHaveLength(2)
            expect(operations.map(o => o.method)).not.toEqual(
                expect.arrayContaining(['GET'])
            )
        })

        it('uses first parameter to stop optionally drilling down', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation [ a hydra:SupportedOperation ] .
                    
                <http://example.com/> a ex:Class; ex:hasChild <http://example.com/child> .
                <http://example.com/child> a ex:Class ; ex:hasChild <http://example.com/child/child> .
                <http://example.com/child/child> a ex:Class .
            `))
            const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = topLevel.findOperationsDeep({
                excludedProperties: [ex.hasChild],
            })

            // then
            expect(operations).toHaveLength(1)
            expect(operations.map(o => o.target.id.value)).toEqual(
                expect.arrayContaining(['http://example.com/'])
            )
        })

        it('filters operations by criteria', async () => {
            // given
            await graph.dataset.import(parse(`
                ex:api a hydra:ApiDocumentation ;
                    hydra:supportedClass ex:Class .
                    
                ex:Class a hydra:Class ;
                    hydra:supportedOperation 
                        [ a hydra:SupportedOperation ; hydra:method "GET" ] ,
                        [ a hydra:SupportedOperation ; hydra:method "POST" ].
                    
                <http://example.com/> a ex:Class ; ex:hasChild <http://example.com/child> .
                <http://example.com/child> a ex:Class ; ex:hasChild <http://example.com/child/child> .
                <http://example.com/child/child> a ex:Class .
            `))
            const topLevel = new TestOperationFinder(graph.namedNode('http://example.com/'))

            // when
            const operations = topLevel.findOperationsDeep({
                byMethod: 'get',
            })

            // then
            expect(operations).toHaveLength(3)
            expect(operations.map(o => o.method)).toEqual(
                expect.arrayContaining(['GET'])
            )
        })
    })
})

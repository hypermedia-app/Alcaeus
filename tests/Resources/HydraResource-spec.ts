import namespace from '@rdfjs/namespace'
import Parser from '@rdfjs/parser-n3'
import { ResourceFactoryImpl } from '@tpluscode/rdfine'
import cf, { Clownface } from 'clownface'
import $rdf from 'rdf-ext'
import DatasetExt from 'rdf-ext/lib/Dataset'
import { NamedNode, Stream } from 'rdf-js'
import stringToStream from 'string-to-stream'
import { HydraClient } from '../../src/alcaeus'
import * as mixins from '../../src/ResourceFactoryDefaults'
import { createHydraResourceMixin } from '../../src/Resources/CoreMixins'
import { hydra, rdf } from '../../src/Vocabs'
import { Resource } from './_TestResource'

const parser = new Parser()
const ex = namespace('http://example.com/vocab#')

let client = {} as HydraClient
const HydraResource = createHydraResourceMixin(client)(Resource)

HydraResource.factory = new ResourceFactoryImpl(HydraResource)
HydraResource.factory.addMixin(mixins.ClassMixin)
HydraResource.factory.addMixin(mixins.SupportedPropertyMixin)
HydraResource.factory.addMixin(mixins.SupportedOperationMixin)

function parse (triples: string, baseIRI?: NamedNode): Stream {
    const { value } = baseIRI || {}
    const data = `
    @prefix hydra: <${hydra().value}> .
    @prefix ex: <${ex().value}> .
    @prefix rdf: <${rdf().value}> .
    
    ${triples}`

    return parser.import(stringToStream(data) as any as Stream, {
        baseIRI: value,
    })
}

describe('HydraResource', () => {
    let dataset: DatasetExt
    let node: Clownface

    beforeEach(() => {
        dataset = $rdf.dataset()
        node = cf({ dataset })
    })

    describe('get operations', () => {
        it('should combine operations from class and property', async () => {
            // given
            const apiGraph = parse(
                `
                    <> a hydra:ApiDocumentation ;
                        hydra:supportedClass ex:Resource .
                       
                    ex:Resource a hydra:Class ;
                        hydra:supportedOperation [
                            a hydra:SupportedOperation
                        ] ;
                        hydra:supportedProperty [
                            a hydra:SupportedProperty ;
                            hydra:property ex:knows
                        ] .
                    
                    ex:knows hydra:supportedOperation [
                        a hydra:SupportedOperation
                    ] .
                `, ex.api)
            const resourceGraph = parse(
                `
                    <http://example.com/A> a ex:Resource .
                    <http://example.com/B> a ex:Resource .
                    
                    <http://example.com/A> ex:knows <http://example.com/B> .
                `)
            await dataset.import(apiGraph).then(ds => ds.import(resourceGraph))
            const resource = new HydraResource(node.namedNode('http://example.com/B'))

            // when
            const ops = resource.operations

            // then
            expect(ops.length).toEqual(2)
        })

        it('should combine operations for multiple @types', async () => {
            // given
            const apiGraph = parse(
                `
                    <> a hydra:ApiDocumentation ;
                        hydra:supportedClass ex:ResourceA, ex:ResourceB .
                       
                    ex:ResourceA a hydra:Class ;
                        hydra:supportedOperation [
                            a hydra:SupportedOperation
                        ] .
                    ex:ResourceB a hydra:Class ;
                        hydra:supportedOperation [
                            a hydra:SupportedOperation
                        ] .
                `, ex.api)
            const resourceGraph = parse(
                `
                    <http://example.com/> a ex:ResourceA, ex:ResourceB .
                `)
            await dataset.import(apiGraph).then(ds => ds.import(resourceGraph))
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const ops = resource.operations

            // then
            expect(ops.length).toEqual(2)
        })

        it('returns empty array when api documentation is unavailable', async () => {
            // given
            const resourceGraph = parse(
                `
                    <http://example.com/> a ex:ResourceA, ex:ResourceB .
                `)
            await dataset.import(resourceGraph)
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const ops = resource.operations

            // then
            expect(ops.length).toBe(0)
        })

        it('should return operations with unique supported operation ids', async () => {
            // given
            const apiGraph = parse(
                `
                    <> a hydra:ApiDocumentation ;
                        hydra:supportedClass ex:ResourceA, ex:ResourceB .
                       
                    ex:ResourceA a hydra:Class ;
                        hydra:supportedOperation ex:DeleteOperation .
                    ex:ResourceB a hydra:Class ;
                        hydra:supportedOperation ex:DeleteOperation.
                `, ex.api)
            const resourceGraph = parse(
                `
                    <http://example.com/> a ex:ResourceA, ex:ResourceB .
                `)
            await dataset.import(apiGraph).then(ds => ds.import(resourceGraph))
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const ops = resource.operations

            // then
            expect(ops).toHaveLength(1)
        })
    })

    describe('getProperties', () => {
        it('returns empty array when ApiDocumentation is missing', async () => {
            // given
            const resourceGraph = parse(
                `
                    <http://example.com/> a ex:ResourceA, ex:ResourceB .
                `)
            await dataset.import(resourceGraph)
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const ops = resource.getProperties()

            // then
            expect(ops.length).toBe(0)
        })

        it('deduplicates multiple usage same rdf:property in supported properties', async () => {
            // given
            const apiGraph = parse(
                `
                    <> a hydra:ApiDocumentation ;
                        hydra:supportedClass ex:ResourceA, ex:ResourceB .
                       
                    ex:ResourceA a hydra:Class ;
                        hydra:supportedProperty [ a hydra:SupportedProperty; hydra:property ex:knows ] .
                    ex:ResourceB a hydra:Class ;
                        hydra:supportedProperty [ a hydra:SupportedProperty; hydra:property ex:knows ] .
                `, ex.api)
            const resourceGraph = parse(
                `
                    <http://example.com/> a ex:ResourceA, ex:ResourceB .
                `)
            await dataset.import(apiGraph).then(ds => ds.import(resourceGraph))
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const links = resource.getProperties()

            // then
            expect(links.length).toBe(1)
        })
    })

    describe('getLinks', () => {
        it('should return empty array when no property is link', async () => {
            // given
            const apiGraph = parse(
                `
                    <> a hydra:ApiDocumentation ;
                        hydra:supportedClass ex:Resource .
                       
                    ex:Resource a hydra:Class ;
                        hydra:supportedProperty [ a hydra:SupportedProperty; hydra:property ex:knows ] .
                `, ex.api)
            const resourceGraph = parse(
                `
                    <http://example.com/> a ex:Resource .
                `)
            await dataset.import(apiGraph).then(ds => ds.import(resourceGraph))
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const links = resource.getLinks()

            // then
            expect(links.length).toBe(0)
        })

        it('should return ids and values for hydra:Link properties', async () => {
            // given
            const apiGraph = parse(
                `
                    <> a hydra:ApiDocumentation ;
                        hydra:supportedClass ex:Resource .
                       
                    ex:Resource a hydra:Class ;
                        hydra:supportedProperty [ a hydra:SupportedProperty; hydra:property ex:knows ] .
                        
                    ex:knows a hydra:Link .
                `, ex.api)
            const resourceGraph = parse(
                `
                    <http://example.com/> a ex:Resource ;
                        ex:knows <http://example.com/linked>.
                `)
            await dataset.import(apiGraph).then(ds => ds.import(resourceGraph))
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const links = resource.getLinks()

            // then
            expect(links.length).toBe(1)
            expect(links[0].resources[0].id.value).toBe('http://example.com/linked')
        })

        it('should return empty result if a Link property is not used in a resource', async () => {
            // given
            const apiGraph = parse(
                `
                    <> a hydra:ApiDocumentation ;
                        hydra:supportedClass ex:Resource .
                       
                    ex:Resource a hydra:Class ;
                        hydra:supportedProperty [ a hydra:SupportedProperty; hydra:property ex:knows ] .
                        
                    ex:knows a hydra:Link .
                `, ex.api)
            const resourceGraph = parse(
                `
                    <http://example.com/> a ex:Resource .
                `)
            await dataset.import(apiGraph).then(ds => ds.import(resourceGraph))
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const links = resource.getLinks()

            // then
            expect(links.length).toBe(0)
        })

        it('should return all Link properties if requested explicitly', async () => {
            // given
            const apiGraph = parse(
                `
                    <> a hydra:ApiDocumentation ;
                        hydra:supportedClass ex:Resource .
                       
                    ex:Resource a hydra:Class ;
                        hydra:supportedProperty [ a hydra:SupportedProperty; hydra:property ex:knows ] .
                        
                    ex:knows a hydra:Link .
                `, ex.api)
            const resourceGraph = parse(
                `
                    <http://example.com/> a ex:Resource .
                `)
            await dataset.import(apiGraph).then(ds => ds.import(resourceGraph))
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const links = resource.getLinks(true)

            // then
            expect(links.length).toBe(1)
        })
    })

    describe('getCollections', () => {
        it('returns all hydra:collections', async () => {
            // given
            const resourceGraph = parse(
                `
                    <http://example.com/> hydra:collection 
                        <http://example.com/collection1> ,
                        <http://example.com/collection2> ,
                        <http://example.com/collection3> ,
                        <http://example.com/collection4> .
                `)
            await dataset.import(resourceGraph)
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const collections = resource.getCollections()

            // then
            expect(collections.length).toBe(4)
        })

        it('returns collections matching manages block Class given by id', async () => {
            // given
            const resourceGraph = parse(
                `
                    <http://example.com/> hydra:collection 
                        <http://example.com/collection1> ,
                        <http://example.com/collection2> ,
                        <http://example.com/collection3> ,
                        <http://example.com/collection4> .
                        
                    <http://example.com/collection1> hydra:manages [
                        hydra:object <http://example.org/Class> ;
                        hydra:property rdf:type
                    ] .
                `)
            await dataset.import(resourceGraph)
            const resource = new HydraResource(node.namedNode('http://example.com/'))

            // when
            const collections = resource.getCollections({
                object: 'http://example.org/Class',
            })

            // then
            expect(collections.length).toBe(1)
            expect(collections[0].id.value).toBe('http://example.com/collection1')
        })
    })
})

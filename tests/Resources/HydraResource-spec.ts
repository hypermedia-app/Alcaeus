import { Resource } from '@rdfine/hydra'
import { namedNode } from '@rdfjs/data-model'
import namespace from '@rdfjs/namespace'
import Parser from '@rdfjs/parser-n3'
import * as Hydra from '@rdfine/hydra'
import { turtle, TurtleTemplateResult } from '@tpluscode/rdf-string'
import RdfResourceImpl, { Constructor } from '@tpluscode/rdfine'
import ResourceFactory from '@tpluscode/rdfine/lib/ResourceFactory'
import cf from 'clownface'
import $rdf from 'rdf-ext'
import { DatasetCore, Stream } from 'rdf-js'
import stringToStream from 'string-to-stream'
import { HydraClient } from '../../src/alcaeus'
import * as mixins from '../../src/Resources/Mixins'
import { ResourceRepresentation } from '../../src/ResourceRepresentation'
import { createHydraResourceMixin } from '../../src/Resources/CoreMixins'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'

const parser = new Parser()
const ex = namespace('http://example.com/vocab#')

const apiDocumentations: ResourceRepresentation<DatasetCore, Hydra.ApiDocumentation>[] = []
const client = () => ({
    apiDocumentations,
} as HydraClient)
const HydraResource: Constructor<Resource> = createHydraResourceMixin(client)(Hydra.ResourceMixin(RdfResourceImpl as any))

HydraResource.factory = new ResourceFactory(HydraResource)
HydraResource.factory.addMixin(...Object.values(mixins))
HydraResource.factory.addMixin(...Object.values(Hydra))

function parse(triples: TurtleTemplateResult): Stream {
    return parser.import(stringToStream(triples.toString()))
}

function pushApiDocumentation(root: Hydra.ApiDocumentation) {
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
            pushApiDocumentation(HydraResource.factory.createEntity<Hydra.ApiDocumentation>(cf({
                dataset: await $rdf.dataset().import(apiGraph),
                term: ex.api,
            })))
            const resourceGraph = parse(
                turtle`
                    <http://example.com/A> a ${ex.Resource} .
                    <http://example.com/B> a ${ex.Resource} .
                    
                    <http://example.com/A> ${ex.knows} <http://example.com/B> .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/B'),
            }))

            // when
            const ops = resource.operations

            // then
            expect(ops.length).toEqual(2)
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
            pushApiDocumentation(HydraResource.factory.createEntity<Hydra.ApiDocumentation>(cf({
                dataset: await $rdf.dataset().import(apiGraph),
                term: ex.api,
            })))
            const resourceGraph = parse(
                turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

            // when
            const ops = resource.operations

            // then
            expect(ops.length).toEqual(2)
        })

        it('returns empty array when api documentation is unavailable', async () => {
            // given
            const resourceGraph = parse(
                turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

            // when
            const ops = resource.operations

            // then
            expect(ops.length).toBe(0)
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
            pushApiDocumentation(HydraResource.factory.createEntity<Hydra.ApiDocumentation>(cf({
                dataset: await $rdf.dataset().import(apiGraph),
                term: ex.api,
            })))
            const resourceGraph = parse(
                turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

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
                turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

            // when
            const ops = resource.getProperties()

            // then
            expect(ops.length).toBe(0)
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
            pushApiDocumentation(HydraResource.factory.createEntity<Hydra.ApiDocumentation>(cf({
                dataset: await $rdf.dataset().import(apiGraph),
                term: ex.api,
            })))
            const resourceGraph = parse(
                turtle`
                    <http://example.com/> a ${ex.ResourceA}, ${ex.ResourceB} .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

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
                turtle`
                    ${ex.api} a ${hydra.ApiDocumentation} ;
                        ${hydra.supportedClass} ${ex.Resource} .
                       
                    ${ex.Resource} a ${hydra.Class} ;
                        ${hydra.supportedProperty} [ a ${hydra.SupportedProperty}; ${hydra.property} ${ex.knows} ] .
                `)
            pushApiDocumentation(HydraResource.factory.createEntity<Hydra.ApiDocumentation>(cf({
                dataset: await $rdf.dataset().import(apiGraph),
                term: ex.api,
            })))
            const resourceGraph = parse(
                turtle`
                    <http://example.com/> a ${ex.Resource} .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

            // when
            const links = resource.getLinks()

            // then
            expect(links.length).toBe(0)
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
            pushApiDocumentation(HydraResource.factory.createEntity<Hydra.ApiDocumentation>(cf({
                dataset: await $rdf.dataset().import(apiGraph),
                term: ex.api,
            })))
            const resourceGraph = parse(
                turtle`
                    <http://example.com/> a ${ex.Resource} ;
                        ${ex.knows} <http://example.com/linked>.
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

            // when
            const links = resource.getLinks()

            // then
            expect(links.length).toBe(1)
            expect(links[0].resources[0].id.value).toBe('http://example.com/linked')
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
            pushApiDocumentation(HydraResource.factory.createEntity<Hydra.ApiDocumentation>(cf({
                dataset: await $rdf.dataset().import(apiGraph),
                term: ex.api,
            })))
            const resourceGraph = parse(
                turtle`
                    <http://example.com/> a ${ex.Resource} .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

            // when
            const links = resource.getLinks()

            // then
            expect(links.length).toBe(0)
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
            pushApiDocumentation(HydraResource.factory.createEntity<Hydra.ApiDocumentation>(cf({
                dataset: await $rdf.dataset().import(apiGraph),
                term: ex.api,
            })))
            const resourceGraph = parse(
                turtle`
                    <http://example.com/> a ${ex.Resource} .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

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
                turtle`
                    <http://example.com/> ${hydra.collection} 
                        <http://example.com/collection1> ,
                        <http://example.com/collection2> ,
                        <http://example.com/collection3> ,
                        <http://example.com/collection4> .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

            // when
            const collections = resource.getCollections()

            // then
            expect(collections.length).toBe(4)
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
                        
                    <http://example.com/collection1> ${hydra.manages} [
                        ${hydra.object} <http://example.org/Class> ;
                        ${hydra.property} ${rdf.type}
                    ] .
                `)
            const resource = new HydraResource(cf({
                dataset: await $rdf.dataset().import(resourceGraph),
                term: namedNode('http://example.com/'),
            }))

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

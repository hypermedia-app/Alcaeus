import $rdf from 'rdf-ext'
import n3parser from '@rdfjs/parser-n3'
import { NamedNode } from 'rdf-js'
import { MediaTypes } from '../../src/Constants'
import RdfProcessor from '../../src/MediaTypeProcessors/RdfProcessor'
import { hydra, rdf } from '../../src/Vocabs'
import { Bodies } from '../test-objects'
import { mockedResponse, responseBuilder } from '../test-utils'

describe('RdfProcessor', () => {
    let processor: RdfProcessor

    beforeEach(() => {
        processor = new RdfProcessor()
        processor.addParsers({
            [MediaTypes.ntriples]: n3parser,
        })
    })

    describe('process', () => {
        it('should parse non-json-ld response', async () => {
            // given
            const response = await mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.ntriples, MediaTypes.ntriples),
            })

            // when
            const dataset = await processor.process('http://example.com/resource', response)

            // then
            expect(dataset.size).toBeGreaterThan(0)
        })

        it('should parse json-ld response when media type has additional parameters', async () => {
            // given
            const response = await mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.someJsonLd, 'application/ld+json; charset=utf-8'),
            })

            // when
            const dataset = await processor.process('http://example.com/resource', response)

            // then
            expect(dataset.size).toBeGreaterThan(0)
        })

        describe('processing api documentation', () => {
            const inferredTypes: [NamedNode, NamedNode][] = [
                [hydra.supportedClass, hydra.Class],
                [hydra.expects, hydra.Class],
                [hydra.returns, hydra.Class],
                [hydra.supportedOperation, hydra.SupportedOperation],
                [hydra.operation, hydra.Operation],
                [hydra.supportedProperty, hydra.SupportedProperty],
                [hydra.statusCodes, hydra.StatusCodeDescription],
                [hydra.property, rdf.Property],
                [hydra.mapping, hydra.IriTemplateMapping],
            ]

            inferredTypes.forEach(([prop, type]) => {
                it('should add inferences for property ' + prop.value, async () => {
                    // given
                    const body = $rdf.dataset([
                        $rdf.quad(
                            $rdf.namedNode('http://example.com/resource'),
                            prop,
                            $rdf.namedNode('http://example.com/child')
                        ),
                    ])
                    const response = await mockedResponse({
                        xhrBuilder: responseBuilder().body(body.toString(), MediaTypes.ntriples),
                    })

                    // when
                    const dataset = await processor.process('http://example.com/resource', response)

                    // then
                    const expectedTypeQuad = $rdf.quad(
                        $rdf.namedNode('http://example.com/child'),
                        rdf.type as any,
                        type as any)

                    expect(dataset.has(expectedTypeQuad)).toBe(true)
                })
            })
        })
    })

    describe('canProcess', () => {
        it('should return true for json-ld', () => {
            // when
            const canProcess = processor.canProcess(MediaTypes.jsonLd)

            // then
            expect(canProcess).toBe(true)
        })

        it('should return true for json-ld with parameters', () => {
            // when
            const canProcess = processor.canProcess('application/ld+json; charset=utf-8')

            // then
            expect(canProcess).toBe(true)
        })
    })
})

import $rdf from 'rdf-ext'
import { NamedNode } from 'rdf-js'
import processor from '../../src/RdfProcessor'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'

describe('RdfProcessor', () => {
    describe('process', () => {
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

                    // when
                    const dataset = await $rdf.dataset().import(await processor.process(body.toStream()))

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
})

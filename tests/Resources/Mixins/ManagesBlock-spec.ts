import { RdfResource } from '@tpluscode/rdfine'
import cf, { Clownface, SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { BlankNode, DatasetCore } from 'rdf-js'
import { RdfProperty } from '../../../src/Resources/Mixins/RdfProperty'
import Resource from '../../../src/Resources/Resource'
import { ManagesBlockMixin } from '../../../src/Resources/Mixins/ManagesBlock'
import { foaf, hydra, rdf } from '../../../src/Vocabs'

class ManagesBlock extends ManagesBlockMixin(Resource) {}

describe('ManagesBlock', () => {
    let dataset: DatasetCore
    let apiDocsGraph: Clownface
    let node: SingleContextClownface<DatasetCore, BlankNode>
    let managesBlock: ManagesBlock

    beforeEach(() => {
        dataset = $rdf.dataset()
        node = cf({ dataset }).blankNode()
        apiDocsGraph = cf({ dataset, graph: $rdf.namedNode('http://example.com/docs') })

        managesBlock = new ManagesBlock(node)
    })

    describe('shouldApply', () => {
        it('should return true if resource is object of hydra:manages property', () => {
            // given
            node.addIn(hydra.manages, node.blankNode())

            // when
            const result = ManagesBlockMixin.shouldApply(managesBlock)

            // then
            expect(result).toBeTruthy()
        })
    })

    describe('Mixin', () => {
        describe('object', () => {
            it('returns class from ApiDocumentation', () => {
                // given
                apiDocsGraph.namedNode('http://vocab/class').addOut(rdf.type, hydra.Class)
                node.addOut(hydra.object, node.namedNode('http://vocab/class'))

                // when
                const obj = managesBlock.object

                // then
                expect(obj.hasType(hydra.Class)).toBe(true)
            })

            it('returns class from representation if missing in ApiDocumentation', () => {
                // given
                node.addOut(hydra.object, node.namedNode('http://vocab/class'))

                // when
                const obj = managesBlock.object

                // then
                expect(obj.id.value).toBe('http://vocab/class')
            })
        })

        describe('subject', () => {
            it('returns rdf:subject', () => {
                // given
                node.addOut(hydra.subject, node.namedNode('http://example.org/term'))

                // when
                const obj = managesBlock.subject

                // then
                expect(obj.id.value).toBe('http://example.org/term')
            })
        })

        describe('predicate', () => {
            it('returns rdf:subject', () => {
                // given
                node.addOut(hydra.property, node.namedNode('http://example.org/predicate'))

                // when
                const obj = managesBlock.property

                // then
                expect(obj.id.value).toBe('http://example.org/predicate')
            })
        })

        describe('matches', () => {
            describe('by class type', () => {
                it('returns true when object is string found of the rdf:object resource', () => {
                    // given
                    node
                        .addOut(hydra.object, node.namedNode('http://example.com/vocab#class'))
                        .addOut(hydra.property, rdf.type)

                    // when
                    const isMatch = managesBlock.matches({
                        object: 'http://example.com/vocab#class',
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns true when object is resource with id of rdf:object resource', () => {
                    // given
                    node
                        .addOut(hydra.object, node.namedNode('http://example.com/vocab#class'))
                        .addOut(hydra.property, rdf.type)

                    // when
                    const isMatch = managesBlock.matches({
                        object: $rdf.namedNode('http://example.com/vocab#class'),
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns false when predicate is not rdf:type', () => {
                    // given
                    node
                        .addOut(hydra.object, node.namedNode('http://example.com/vocab#class'))
                        .addOut(hydra.property, rdf.type)

                    // when
                    const isMatch = managesBlock.matches({
                        object: $rdf.namedNode('http://example.com/vocab#class'),
                        predicate: 'http://some.other/property',
                    })

                    // then
                    expect(isMatch).toBeFalsy()
                })

                it('returns false when it is incomplete', () => {
                    // given
                    node
                        .addOut(hydra.property, rdf.type)

                    // when
                    const isMatch = managesBlock.matches({
                        object: $rdf.namedNode('http://example.com/vocab#class'),
                        predicate: 'http://some.other/property',
                    })

                    // then
                    expect(isMatch).toBeFalsy()
                })
            })

            describe('by subject and predicate type', () => {
                it('returns true if pattern is matching string object and string property', () => {
                    // given
                    node
                        .addOut(hydra.subject, node.namedNode('http://example.com/person/Tomasz'))
                        .addOut(hydra.property, foaf.knows)

                    // when
                    const isMatch = managesBlock.matches({
                        predicate: 'http://xmlns.com/foaf/0.1/knows',
                        subject: 'http://example.com/person/Tomasz',
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns true if pattern is matching string object and resource property', () => {
                    // given
                    node
                        .addOut(hydra.subject, node.namedNode('http://example.com/person/Tomasz'))
                        .addOut(hydra.property, foaf.knows)

                    // when
                    const isMatch = managesBlock.matches({
                        predicate: foaf.knows,
                        subject: 'http://example.com/person/Tomasz',
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns true if pattern is matching resource object and string property', () => {
                    // given
                    node
                        .addOut(hydra.subject, node.namedNode('http://example.com/person/Tomasz'))
                        .addOut(hydra.property, foaf.knows)

                    // when
                    const isMatch = managesBlock.matches({
                        predicate: 'http://xmlns.com/foaf/0.1/knows',
                        subject: $rdf.namedNode('http://example.com/person/Tomasz'),
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })

                it('returns true if pattern is matching resource object and resource property', () => {
                    // given
                    node
                        .addOut(hydra.subject, node.namedNode('http://example.com/person/Tomasz'))
                        .addOut(hydra.property, foaf.knows)

                    // when
                    const isMatch = managesBlock.matches({
                        predicate: {
                            id: foaf.knows,
                        } as any as RdfProperty,
                        subject: {
                            id: $rdf.namedNode('http://example.com/person/Tomasz'),
                        } as any as RdfResource,
                    })

                    // then
                    expect(isMatch).toBeTruthy()
                })
            })
        })
    })
})

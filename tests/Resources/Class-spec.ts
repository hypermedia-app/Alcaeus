import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { NamedNode } from 'rdf-js'
import namespace from '@rdfjs/namespace'
import { ClassMixin } from '../../src/Resources/Mixins/Class'
import { hydra } from '../../src/Vocabs'
import { Resource } from './_TestResource'
import * as graphs from './Class-spec-graphs'

const vocab = namespace('http://example.com/vocab#')

class Class extends ClassMixin(Resource) {}

describe('Class', () => {
    let hydraClassNode: SingleContextClownface<NamedNode>

    beforeEach(() => {
        hydraClassNode = cf({ dataset: $rdf.dataset() })
            .namedNode('http://example.com/vocab#SomeClass')
    })

    describe('getting operations', () => {
        it('should return operations', async () => {
            // then
            hydraClassNode.addOut(hydra.supportedOperation, hydraClassNode.blankNode())

            // when
            const clas = new Class(hydraClassNode)

            // then
            expect(clas.supportedOperations.length).toBe(1)
        })

        it('should return empty array if property is missing', () => {
            // when
            const clas = new Class(hydraClassNode)

            // then
            expect(clas.supportedOperations.length).toBe(0)
        })

        it('should combine own operations with inherited operations', async () => {
            // given
            const dataset = await graphs.multiLevelSupportedOperations()
            const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

            // when
            const properties = clas.supportedOperations

            // then
            expect(properties).toHaveLength(3)
        })

        it('should deduplicate supported operations by operation id', async () => {
            // given
            const dataset = await graphs.duplicateInheritedOperationsSameId()
            const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

            // when
            const operations = clas.supportedOperations

            // then
            expect(operations).toHaveLength(1)
        })
    })

    describe('getting properties', () => {
        it('should return properties', () => {
            // given
            hydraClassNode.addOut(hydra.supportedProperty, hydraClassNode.blankNode())

            // when
            const clas = new Class(hydraClassNode)

            // then
            expect(clas.supportedProperties.length).toBe(1)
        })

        it('should return empty array if property is missing', () => {
            const clas = new Class(hydraClassNode)

            expect(clas.supportedProperties.length).toBe(0)
        })

        it('should combine own properties with inherited properties', async () => {
            // given
            const dataset = await graphs.multiLevelSupportedProperties()
            const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

            // when
            const properties = clas.supportedProperties

            // then
            expect(properties).toHaveLength(4)
        })

        it('should deduplicate supported properties by rdf property', async () => {
            // given
            const dataset = await graphs.duplicateInheritedProperties()
            const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

            // when
            const properties = clas.supportedProperties

            // then
            expect(properties).toHaveLength(1)
            expect(properties[0].title).toEqual('Overridden title')
        })
    })

    describe('getTypeHierarchy', () => {
        it('retrieves own types and superclasses', async () => {
            // given
            const dataset = await graphs.multiLevelSupportedOperations()
            const clas = new Class(cf({ dataset }).namedNode(vocab.DraftIssue))

            // when
            const types = [...clas.getTypeHierarchy()]

            // then
            expect(types.map(t => t.id.value)).toStrictEqual(
                expect.arrayContaining([
                    vocab.DraftIssue.value,
                    vocab.Issue.value,
                    vocab.BaseClass.value,
                ])
            )
        })
    })
})

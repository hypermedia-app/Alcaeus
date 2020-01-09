import cf, { SingleContextClownface } from 'clownface'
import $rdf from 'rdf-ext'
import { DatasetCore, NamedNode } from 'rdf-js'
import { ClassMixin } from '../../src/Resources/Mixins/Class'
import Resource from '../../src/Resources/Resource'
import { hydra } from '../../src/Vocabs'

class Class extends ClassMixin(Resource) {}

describe('Class', () => {
    let hydraClassNode: SingleContextClownface<DatasetCore, NamedNode>

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
    })
})

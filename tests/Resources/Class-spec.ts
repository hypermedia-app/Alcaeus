import { promises as jsonld } from 'jsonld'
import { Mixin } from '../../src/Resources/Mixins/Class'
import Resource from '../../src/Resources/Resource'
import Context from '../test-objects/Context'

class Class extends Mixin(Resource) {}

describe('Class', () => {
    const hydraClass = {
        '@context': Context,
        '@id': 'http://example.com/vocab#SomeClass',
        'supportedOperation': [{}],
        'supportedProperty': [{}],
    }

    describe('getting operations', () => {
        it('should return operations', async () => {
            // then
            const compacted = await jsonld.compact(hydraClass, {})

            // when
            const clas = new Class(compacted)

            // then
            expect(clas.supportedOperations.length).toBe(1)
        })

        it('should return empty array if property is missing', () => {
            const clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass',
            })

            expect(clas.supportedOperations.length).toBe(0)
        })

        it('should return empty array if property is null', () => {
            const clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass',
                'http://www.w3.org/ns/hydra/core#supportedOperation': null,
            })

            expect(clas.supportedOperations.length).toBe(0)
        })
    })

    describe('getting properties', () => {
        it('should return properties', async () => {
            // given
            const compacted = await jsonld.compact(hydraClass, {})

            // when
            const clas = new Class(compacted)

            // then
            expect(clas.supportedProperties.length).toBe(1)
        })

        it('should return empty array if property is missing', () => {
            const clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass',
            })

            expect(clas.supportedProperties.length).toBe(0)
        })

        it('should return empty array if property is null', () => {
            const clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass',
                'http://www.w3.org/ns/hydra/core#supportedProperty': null,
            })

            expect(clas.supportedProperties.length).toBe(0)
        })
    })
})

import Resource from '../../src/Resources/Resource'
import { Bodies } from '../test-objects'

describe('Resource', () => {
    describe('id', () => {
        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'id').enumerable)
                .toBe(false)
        })

        it('throws when identifier is not string', () => {
            // when
            const resource = new Resource({
                '@id': 666,
            })

            // then
            expect(() => resource.id).toThrow()
        })
    })

    describe('isAnonymous', () => {
        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'isAnonymous').enumerable)
                .toBe(false)
        })

        it('returns true when id in an URL', () => {
            // given
            const resource = new Resource({
                '@id': 'https://example.com/res',
            })

            // then
            expect(resource.isAnonymous).toBeFalsy()
        })

        it('returns true when id in an URN', () => {
            // given
            const resource = new Resource({
                '@id': 'urn:not:uri',
            })

            // then
            expect(resource.isAnonymous).toBeFalsy()
        })

        it('returns true when id in an blank identifier', () => {
            // given
            const resource = new Resource({
                '@id': '_:blank',
            })

            // then
            expect(resource.isAnonymous).toBeTruthy()
        })
    })

    describe('types', () => {
        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'types').enumerable)
                .toBe(false)
        })

        it('should return array for single @type', () => {
            const resource = new Resource(Bodies.someJsonLdExpanded)

            expect(resource.types.length).toBe(1)
        })

        it('should return all @types', () => {
            const resource = new Resource(Bodies.multipleTypesExpanded)

            expect(resource.types.length).toBe(2)
        })

        it('should return empty array when undefined', () => {
            const resource = new Resource({})

            expect(resource.types.length).toBe(0)
        })
    })

    describe('getBoolean', () => {
        it('throws when value is not boolean', () => {
            const resource = new Resource({
                'foo': 'https://example.com/res',
            })

            // then
            expect(() => resource.getBoolean('foo')).toThrow()
        })

        it('return false when value is undefined', () => {
            const resource = new Resource({
            })

            // then
            expect(resource.getBoolean('foo')).toBeFalsy()
        })

        it('return false when value is null', () => {
            const resource = new Resource({
                'foo': null,
            })

            // then
            expect(resource.getBoolean('foo')).toBeFalsy()
        })

        it('return the value when it is set', () => {
            const resource = new Resource({
                'foo': true,
            })

            // then
            expect(resource.getBoolean('foo')).toBeTruthy()
        })
    })

    describe('getNumber', () => {
        it('throws when value is not number', () => {
            const resource = new Resource({
                'foo': 'https://example.com/res',
            })

            // then
            expect(() => resource.getNumber('foo')).toThrow()
        })

        it('return null when value is undefined', () => {
            const resource = new Resource({
            })

            // then
            expect(resource.getNumber('foo')).toBeNull()
        })
    })

    describe('getString', () => {
        it('throws when value is not string', () => {
            const resource = new Resource({
                'foo': 134,
            })

            // then
            expect(() => resource.getString('foo')).toThrow()
        })

        it('return null when value is undefined', () => {
            const resource = new Resource({
            })

            // then
            expect(resource.getString('foo')).toBeNull()
        })
    })
})

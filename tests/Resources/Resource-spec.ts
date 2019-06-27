import Resource from '../../src/Resources/Resource'
import { Bodies } from '../test-objects'

describe('Resource', () => {
    describe('id', () => {
        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'id').enumerable)
                .toBe(false)
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

            expect(resource['@type'].length).toBe(2)
        })

        it('should return empty array when undefined', () => {
            const resource = new Resource({})

            expect(resource.types.length).toBe(0)
        })
    })
})

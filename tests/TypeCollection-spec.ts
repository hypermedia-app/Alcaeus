import TypeCollection from '../src/TypeCollection'

describe('TypeCollection', () => {
    describe('constructor', () => {
        it('should accept a single iri', () => {
            // given
            const types = TypeCollection.create('urn:ex:class')

            // then
            expect(types.length).toBe(1)
        })

        it('should accept an array of iris', () => {
            // given
            const types = TypeCollection.create(['urn:ex:class', 'urn:ex:class-another'])

            // then
            expect(types.length).toBe(2)
        })

        it('should be empty when undefined is passed', () => {
            // given
            const types = TypeCollection.create(undefined)

            // then
            expect(types.length).toBe(0)
        })
    })
})

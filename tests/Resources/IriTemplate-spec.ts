import { Core } from '../../src/Constants'
import { Mixin } from '../../src/Resources/Mixins/IriTemplate'
import Resource from '../../src/Resources/Resource'

class IriTemplate extends Mixin(Resource) {
    public expand (): string {
        return undefined
    }
}

describe('IriTemplate', () => {
    describe('mappings', () => {
        it('should return empty array even for one mapping', () => {
            // given
            const body = {}
            body[Core.Vocab('mapping')] = {}
            const iriTemplate = new IriTemplate(body)

            // then
            expect(Array.isArray(iriTemplate.mappings)).toBe(true)
            expect(iriTemplate.mappings.length).toBe(1)
        })

        it('should be non-enumerable', () => {
            expect(IriTemplate.prototype.propertyIsEnumerable('mappings'))
                .toBe(false)
        })
    })

    describe('variableRepresentation', () => {
        it('should return BasicRepresentation if missing', () => {
            // given
            const body = {}
            const iriTemplate = new IriTemplate(body)

            // then
            expect(iriTemplate.variableRepresentation).toBe(Core.Vocab('BasicRepresentation'))
        })

        it('should be non-enumerable', () => {
            expect(IriTemplate.prototype.propertyIsEnumerable('variableRepresentation'))
                .toBe(false)
        })
    })

    describe('template', () => {
        it('should return underlying value', () => {
            // given
            const body = {}
            body[Core.Vocab('template')] = 'http://example.com/{name}/friends{?friendName}'
            const iriTemplate = new IriTemplate(body)

            // then
            expect(iriTemplate.template).toBe('http://example.com/{name}/friends{?friendName}')
        })
    })
})

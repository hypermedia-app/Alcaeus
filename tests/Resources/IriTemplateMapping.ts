import { Core } from '../../src/Constants'
import { Mixin } from '../../src/Resources/Mixins/IriTemplateMapping'
import Resource from '../../src/Resources/Resource'

class IriTemplateMapping extends Mixin(Resource) {}

describe('IriTemplateMapping', () => {
    describe('required', () => {
        it('should return true if missing', () => {
            // given
            const body = {}
            const iriTemplate = new IriTemplateMapping(body)

            // then
            expect(iriTemplate.required).toBe(false)
        })

        it('should be non-enumerable', () => {
            expect(IriTemplateMapping.prototype.propertyIsEnumerable('required'))
                .toBe(false)
        })
    })

    describe('title', () => {
        it('returns the correct value of hydra term', () => {
            // given
            const body = {
                [Core.Vocab('title')]: 'test',
            }
            const iriTemplate = new IriTemplateMapping(body)

            // then
            expect(iriTemplate.title).toBe('test')
        })
    })

    describe('property', () => {
        it('returns the correct value of hydra term', () => {
            // given
            const body = {
                [Core.Vocab('property')]: {
                    id: 'test',
                },
            }
            const iriTemplate = new IriTemplateMapping(body)

            // then
            expect(iriTemplate.property.id).toBe('test')
        })
    })
})

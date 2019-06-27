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
})

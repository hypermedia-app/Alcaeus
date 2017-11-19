import IriTemplateMappingMixin from '../../src/Resources/IriTemplateMapping';

class IriTemplateMapping extends IriTemplateMappingMixin(Object) {}

describe('IriTemplateMapping', () => {

    describe('required', () => {
        it('should return true if missing', () => {
            // given
            const body = {};
            const iriTemplate = new IriTemplateMapping(body);

            // then
            expect(iriTemplate.required).toBe(false);
        });

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(IriTemplateMappingMixin.prototype, 'required').enumerable)
                .toBe(false);
        });
    });
});

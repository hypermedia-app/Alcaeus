import IriTemplateMixin from '../../src/Resources/IriTemplate';
import {Core} from "../../src/Constants";

class IriTemplate extends IriTemplateMixin(Object) {}

describe('IriTemplate', () => {
    describe('mappings', () => {
        it('should return empty array even for one mapping', () => {
            // given
            const body = {};
            body[Core.Vocab.mapping] = {};
            const iriTemplate = new IriTemplate(body);

            // then
            expect(Array.isArray(iriTemplate.mappings)).toBe(true);
            expect(iriTemplate.mappings.length).toBe(0);
        });

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(IriTemplateMixin.prototype, 'mappings').enumerable)
                .toBe(false);
        });
    });

    describe('variableRepresentation', () => {
        it('should return BasicRepresentation if missing', () => {
            // given
            const body = {};
            const iriTemplate = new IriTemplate(body);

            // then
            expect(iriTemplate.variableRepresentation).toBe('BasicRepresentation');
        });

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(IriTemplateMixin.prototype, 'variableRepresentation').enumerable)
                .toBe(false);
        });
    });
});

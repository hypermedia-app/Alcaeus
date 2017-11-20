import Resource from "../../../src/Resources/Resource";
import ExplicitRepresentationExpansionMixin from "../../../src/Resources/Mixins/ExplicitRepresentationExpansion";
import {Core, JsonLd} from "../../../src/Constants";

class ExplicitRepresentationExpansion extends ExplicitRepresentationExpansionMixin(Resource) {}

describe('ExplicitRepresentationExpansion', () => {
    describe('shouldApply', () => {
        let body;

        beforeEach(() => {
            body = {};
            body[JsonLd.Type] = Core.Vocab.IriTemplate;
        });

        it('is false when variableRepresentation is not defined', () => {
            // when
            const shouldApply = ExplicitRepresentationExpansionMixin['shouldApply'](body);

            // then
            expect(shouldApply).toBe(false);
        });

        it('is false when variableRepresentation is null', () => {
            // given
            body[Core.Vocab.variableRepresentation] = null;

            // when
            const shouldApply = ExplicitRepresentationExpansionMixin['shouldApply'](body);

            // then
            expect(shouldApply).toBe(false);
        });

        it('is true when variableRepresentation is ExplicitRepresentation', () => {
            // given
            body[Core.Vocab.variableRepresentation] = Core.Vocab.ExplicitRepresentation;

            // when
            const shouldApply = ExplicitRepresentationExpansionMixin['shouldApply'](body);

            // then
            expect(shouldApply).toBe(true);
        });
    });

    xdescribe('expand', () => {
        let iriTemplate;

        describe('uses ExplicitRepresentation rules when', () => {
            beforeEach(() => {
                const body = {};
                body[Core.Vocab.template] = 'http://example.com/find/{value}';
                iriTemplate = new ExplicitRepresentationExpansion(body);
            });

            it('expands IRI', () => {
                // when
                const expanded = iriTemplate.expand({
                    value: 'http://www.hydra-cg.com/',
                });

                // then
                expect(expanded).toBe('http://example.com/find/http%3A%2F%2Fwww.hydra-cg.com%2F');
            });

            it('expands string', () => {
                // when
                const expanded = iriTemplate.expand({
                    value: 'A simple string',
                });

                // then
                expect(expanded).toBe('http://example.com/find/%22A%20simple%20string%22');
            });

            it('expands string with quote', () => {
                // when
                const expanded = iriTemplate.expand({
                    value: 'A string " with a quote',
                });

                // then
                expect(expanded).toBe('http://example.com/find/%22A%20string%20%22%20with%20a%20quote%22');
            });

            it('expands decimal value', () => {
                // when
                const expanded = iriTemplate.expand({
                    value: { '@value': `5.5`, '@type': 'http://www.w3.org/2001/XMLSchema#decimal' },
                });

                // then
                expect(expanded).toBe('http://example.com/find/%225.5%22%5E%5Ehttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23decimal');
            });

            it('expands language tagged string', () => {
                // when
                const expanded = iriTemplate.expand({
                    value: { '@value': `A simple string`, '@language': 'en' },
                });

                // then
                expect(expanded).toBe('http://example.com/find/%22A%20simple%20string%22%40en');
            });
        })
    });
});

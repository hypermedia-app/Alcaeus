import Resource from "../../../src/Resources/Resource";
import BasicRepresentationExpansionMixin from "../../../src/Resources/Mixins/BasicRepresentationExpansion";
import IriTemplate from "../../../src/Resources/IriTemplate";
import {Core, JsonLd} from "../../../src/Constants";

class BasicRepresentationExpansion extends BasicRepresentationExpansionMixin(IriTemplate(Resource)) {}

describe('BasicRepresentationExpansion', () => {
    describe('shouldApply', () => {
        let body;

        beforeEach(() => {
            body = {};
            body[JsonLd.Type] = Core.Vocab.IriTemplate;
        });

        it('is true when variableRepresentation is not defined', () => {
            // when
            const shouldApply = BasicRepresentationExpansionMixin['shouldApply'](body);

            // then
            expect(shouldApply).toBe(true);
        });

        it('is true when variableRepresentation is null', () => {
            // given
            body[Core.Vocab.variableRepresentation] = null;

            // when
            const shouldApply = BasicRepresentationExpansionMixin['shouldApply'](body);

            // then
            expect(shouldApply).toBe(true);
        });

        it('is true when variableRepresentation is BasicRepresentation', () => {
            // given
            body[Core.Vocab.variableRepresentation] = Core.Vocab.BasicRepresentation;

            // when
            const shouldApply = BasicRepresentationExpansionMixin['shouldApply'](body);

            // then
            expect(shouldApply).toBe(true);
        });
    });

    describe('expand', () => {
        let iriTemplate;

        describe('uses BasicRepresentation rules when', () => {
            const valueProperty = 'http://example.com/someProp';

            beforeEach(() => {
                const body = {
                    [Core.Vocab.mapping]: [
                        {
                            variable: 'value',
                            property: {
                                id: 'http://example.com/someProp'
                            }
                        },
                    ],
                    [Core.Vocab.template]: 'http://example.com/find/{value}'
                };

                iriTemplate = new BasicRepresentationExpansion(body);
            });

            it('expands IRI', () => {
                // when
                const expanded = iriTemplate.expand({
                    [valueProperty]: 'http://www.hydra-cg.com/',
                });

                // then
                expect(expanded).toBe('http://example.com/find/http%3A%2F%2Fwww.hydra-cg.com%2F');
            });

            it('expands string', () => {
                // when
                const expanded = iriTemplate.expand({
                    [valueProperty]: 'A simple string',
                });

                // then
                expect(expanded).toBe('http://example.com/find/A%20simple%20string');
            });

            it('expands string with quote', () => {
                // when
                const expanded = iriTemplate.expand({
                    [valueProperty]: 'A string " with a quote',
                });

                // then
                expect(expanded).toBe('http://example.com/find/A%20string%20%22%20with%20a%20quote');
            });

            it('expands decimal value', () => {
                // when
                const expanded = iriTemplate.expand({
                    [valueProperty]: { '@value': `5.5`, '@type': 'http://www.w3.org/2001/XMLSchema#decimal' },
                });

                // then
                expect(expanded).toBe('http://example.com/find/5.5');
            });

            it('expands language tagged string', () => {
                // when
                const expanded = iriTemplate.expand({
                    [valueProperty]: { '@value': `A simple string`, '@language': 'en' },
                });

                // then
                expect(expanded).toBe('http://example.com/find/A%20simple%20string');
            });
        })
    });
});

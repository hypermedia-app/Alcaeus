import {Core} from '../../../src/Constants';
import {ApiDocumentation} from '../../../src/Resources';
import Resource from '../../../src/Resources/HydraResource';
import {Mixin, shouldApply} from '../../../src/Resources/Mixins/ManagesBlock';
import {rdf} from '../../../src/Vocabs';

class ManagesBlock extends Mixin(Resource(null, () => [])) {}

describe('ManagesBlock', () => {
    describe('shouldApply', () => {
        it('should return true if resource is object of hydra:manages property', () => {
            // given
            const res = {
                _reverseLinks: [{
                    predicate: Core.Vocab('manages'),
                    subject: null,
                    subjectId: null,
                }],
            };

            // when
            const result = shouldApply(res);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe('Mixin', () => {
        describe('object', () => {
            it('returns class from ApiDocumentation', () => {
                // given
                const clas = {};
                const apiDoc = {
                    getClass: () => clas,
                } as any as ApiDocumentation;
                const resource = {
                    [rdf.object]: {
                        id: 'http://vocab/class',
                    },
                };
                const mb = new ManagesBlock(resource, apiDoc);

                // when
                const obj = mb.object;

                // then
                expect(obj).toBe(clas);
            });

            it('returns class from representation if missing in ApiDocumentation', () => {
                // given
                const clas = {
                    id: 'http://vocab/class',
                };
                const apiDoc = {
                    getClass: () => null,
                } as any as ApiDocumentation;
                const resource = {
                    [rdf.object]: clas,
                };
                const mb = new ManagesBlock(resource, apiDoc);

                // when
                const obj = mb.object;

                // then
                expect(obj).toBe(clas);
            });

            it('returns null if not on object', () => {
                // given
                const apiDoc = {
                    getClass: () => null,
                } as any as ApiDocumentation;
                const resource = {
                    [rdf.object]: null,
                };
                const mb = new ManagesBlock(resource, apiDoc);

                // when
                const obj = mb.object;

                // then
                expect(obj).toBeNull();
            });
        });

        describe('subject', () => {
            it('returns rdf:subject', () => {
                // given
                const value = {
                    id: 'http://example.org/term',
                };
                const resource = {
                    [rdf.subject]: value,
                };
                const mb = new ManagesBlock(resource, {} as any as ApiDocumentation);

                // when
                const obj = mb.subject;

                // then
                expect(obj).toBe(value);
            });
        });

        describe('predicate', () => {
            it('returns rdf:subject', () => {
                // given
                const value = {
                    id: 'http://example.org/predicate',
                };
                const resource = {
                    [rdf.predicate]: value,
                };
                const mb = new ManagesBlock(resource, {} as any as ApiDocumentation);

                // when
                const obj = mb.predicate;

                // then
                expect(obj).toBe(value);
            });
        });
    });
});

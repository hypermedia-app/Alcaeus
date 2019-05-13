import * as sinon from 'sinon';
import createClass from '../../src/Resources/HydraResource';
import {Bodies} from '../test-objects';

let reverseLinks;
const HydraResource = createClass(null, () => reverseLinks);

describe('HydraResource', () => {
    describe('apiDocumentation', () => {
        it('should be non-enumerable', () => {
            expect(HydraResource.prototype.propertyIsEnumerable('apiDocumentation'))
                .toBe(false);
        });
    });

    describe('get operations', () => {
        beforeEach(() => reverseLinks = []);

        it('should combine operations from class and property', () => {
            const getOperations = sinon.stub();
            const apiDoc = {
                getOperations,
            } as any;
            getOperations.returns([]);
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc);
            reverseLinks = [
                {
                    predicate: 'http://example.com/vocab#other',
                    subject: {types: ['http://example.com/vocab#Resource2', 'http://example.com/vocab#Resource3']},
                },
            ];

            const ops = resource.operations;
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
            expect(getOperations.calledWithExactly(
                'http://example.com/vocab#Resource2',
                'http://example.com/vocab#other')).toBe(true);
            expect(getOperations.calledWithExactly(
                'http://example.com/vocab#Resource3',
                'http://example.com/vocab#other')).toBe(true);
        });

        it('should combine operations for multiple @types', () => {
            const getOperations = sinon.stub();
            const apiDoc = {
                getOperations,
            } as any;
            getOperations.returns(Promise.resolve([]));
            const resource = new HydraResource(Bodies.multipleTypesExpanded, apiDoc);

            const ops = resource.operations;
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
            expect(getOperations.calledWithExactly('http://example.com/vocab#AnotherType')).toBe(true);
        });
    });

    describe('getLinks', () => {
        it('should return empty array when no property is link', () => {
            // given
            const apiDoc = {
                getProperties: sinon.stub().returns([]),
            } as any;
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc);

            // when
            const links = resource.getLinks();

            // then
            expect(Object.keys(links).length).toBe(0);
        });

        it('should return ids and values for hydra:Link properties', () => {
            // given
            const getProperties = sinon.stub()
                .returns([{
                    property: {
                        id: 'http://example.com/vocab#other',
                        isLink: true,
                    },
                }, {
                    property: {
                        id: 'http://example.com/vocab#prop',
                        isLink: false,
                    },
                }]);
            const apiDoc = {
                getProperties,
            } as any;
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc);

            // when
            const links = resource.getLinks();

            // then
            expect(Object.keys(links).length).toBe(1);
            expect(links['http://example.com/vocab#other'][0]['@id']).toBe('http://example.com/linked');
        });

        it('should return empty result if a Link property is not used in a resource', () => {
            // given
            const getProperties = sinon.stub()
                .returns([{
                    property: {
                        id: 'http://example.com/vocab#unused',
                        isLink: true,
                    },
                }]);
            const apiDoc = {
                getProperties,
            } as any;
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc);

            // when
            const links = resource.getLinks();

            // then
            expect(Object.keys(links).length).toBe(0);
        });

        it('should all Link properties if requested explicitly', () => {
            // given
            const getProperties = sinon.stub()
                .returns([{
                    property: {
                        id: 'http://example.com/vocab#unused',
                        isLink: true,
                    },
                }]);
            const apiDoc = {
                getProperties,
            } as any;
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc);

            // when
            const links = resource.getLinks(true);

            // then
            expect(Object.keys(links).length).toBe(1);
        });
    });

    describe('getCollections', () => {
       it('returns all hydra:collections', () => {
           // given
           const resource = new HydraResource(Bodies.withHydraCollections, {} as any);

           // when
           const collections = resource.getCollections();

           // then
           expect(collections.length).toBe(4);
       });
    });
});

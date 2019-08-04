import * as sinon from 'sinon'
import { IHydraClient } from '../../src/alcaeus'
import { Core } from '../../src/Constants'
import createClass from '../../src/Resources/HydraResource'
import { Bodies } from '../test-objects'

let reverseLinks
let client = {} as IHydraClient
const HydraResource = createClass(client, () => reverseLinks)

describe('HydraResource', () => {
    describe('apiDocumentation', () => {
        it('should be non-enumerable', () => {
            expect(HydraResource.prototype.propertyIsEnumerable('apiDocumentation'))
                .toBe(false)
        })
    })

    describe('get operations', () => {
        beforeEach(() => { reverseLinks = [] })

        it('should combine operations from class and property', () => {
            const getOperations = sinon.stub()
            const apiDoc = {
                getOperations,
            } as any
            getOperations.returns([])
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc)
            reverseLinks = [
                {
                    predicate: 'http://example.com/vocab#other',
                    subject: { types: ['http://example.com/vocab#Resource2', 'http://example.com/vocab#Resource3'] },
                },
            ]

            // eslint-disable-next-line no-unused-vars
            const ops = resource.operations

            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true)
            expect(getOperations.calledWithExactly(
                'http://example.com/vocab#Resource2',
                'http://example.com/vocab#other')).toBe(true)
            expect(getOperations.calledWithExactly(
                'http://example.com/vocab#Resource3',
                'http://example.com/vocab#other')).toBe(true)
        })

        it('should combine operations for multiple @types', () => {
            const getOperations = sinon.stub()
            const apiDoc = {
                getOperations,
            } as any
            getOperations.returns(Promise.resolve([]))
            const resource = new HydraResource(Bodies.multipleTypesExpanded, apiDoc)

            // eslint-disable-next-line no-unused-vars
            const ops = resource.operations

            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true)
            expect(getOperations.calledWithExactly('http://example.com/vocab#AnotherType')).toBe(true)
        })

        it('returns empty array when api documentation is unavailable', () => {
            // given
            const resource = new HydraResource(Bodies.multipleTypesExpanded, null)

            // when
            const ops = resource.operations

            // then
            expect(ops.length).toBe(0)
        })

        it('returns empty array when api documentation does not implement the necessary method', () => {
            // given
            const resource = new HydraResource(Bodies.multipleTypesExpanded, {
                getOperations: () => [],
            } as any)

            // when
            const ops = resource.operations

            // then
            expect(ops.length).toBe(0)
        })
    })

    describe('getProperties', () => {
        it('returns empty array when ApiDocumentation is missing', () => {
            // given
            const resource = new HydraResource(Bodies.multipleTypesExpanded, null)

            // when
            const ops = resource.getProperties()

            // then
            expect(ops.length).toBe(0)
        })

        it('returns empty array when ApiDocumentation does not implement the interface', () => {
            // given
            const resource = new HydraResource(Bodies.multipleTypesExpanded, {
                getProperties: () => [],
            } as any)

            // when
            const ops = resource.getProperties()

            // then
            expect(ops.length).toBe(0)
        })

        it('deduplicates multiple usage same rdf:property in supported properties', () => {
            // given
            const getProperties = sinon.stub()
                .returns([ {
                    property: {
                        id: 'http://example.com/vocab#prop',
                    },
                }])
            const apiDoc = {
                getProperties,
            } as any
            const resource = new HydraResource(Bodies.multipleTypesExpanded, apiDoc)

            // when
            const links = resource.getProperties()

            // then
            expect(links.length).toBe(1)
        })
    })

    describe('getLinks', () => {
        it('should return empty array when no property is link', () => {
            // given
            const apiDoc = {
                getProperties: sinon.stub().returns([]),
            } as any
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc)

            // when
            const links = resource.getLinks()

            // then
            expect(links.length).toBe(0)
        })

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
                }])
            const apiDoc = {
                getProperties,
            } as any
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc)

            // when
            const links = resource.getLinks()

            // then
            expect(links.length).toBe(1)
            expect(links[0].resources[0]['@id']).toBe('http://example.com/linked')
        })

        it('should return empty result if a Link property is not used in a resource', () => {
            // given
            const getProperties = sinon.stub()
                .returns([{
                    property: {
                        id: 'http://example.com/vocab#unused',
                        isLink: true,
                    },
                }])
            const apiDoc = {
                getProperties,
            } as any
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc)

            // when
            const links = resource.getLinks()

            // then
            expect(links.length).toBe(0)
        })

        it('should return all Link properties if requested explicitly', () => {
            // given
            const getProperties = sinon.stub()
                .returns([{
                    property: {
                        id: 'http://example.com/vocab#unused',
                        isLink: true,
                    },
                }])
            const apiDoc = {
                getProperties,
            } as any
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc)

            // when
            const links = resource.getLinks(true)

            // then
            expect(links.length).toBe(1)
        })
    })

    describe('getCollections', () => {
        it('returns all hydra:collections', () => {
            // given
            const resource = new HydraResource(Bodies.withHydraCollections, {} as any)

            // when
            const collections = resource.getCollections()

            // then
            expect(collections.length).toBe(4)
        })

        it('returns collections matching manages block Class given by id', () => {
            // given
            const resource = new HydraResource(Bodies.withHydraCollections, {} as any) as any
            resource[Core.Vocab('collection')][0].manages = [{
                matches: () => true,
            }]

            // when
            const collections = resource.getCollections({
                object: 'http://example.org/Class',
            })

            // then
            expect(collections.length).toBe(1)
            expect(collections[0]['@id']).toBe('http://example.com/collection1')
        })
    })

    describe('load', () => {
        let alcaeus
        let HydraResource

        beforeEach(() => {
            alcaeus = {
                loadResource: sinon.spy(),
            }
            HydraResource = createClass(alcaeus as any, () => reverseLinks)
        })

        it('uses client to dereference self', () => {
            // given
            const resource = new HydraResource({
                '@id': 'http://example.com/resource',
            })

            // when
            resource.load()

            // then
            expect(alcaeus.loadResource.calledWithExactly('http://example.com/resource')).toBeTruthy()
        })

        it('throws when resource is a blank node', () => {
            // given
            const resource = new HydraResource({
                '@id': '_:foo',
            })

            // then
            expect(() => resource.load()).toThrow()
            expect(alcaeus.loadResource.never).toBeTruthy()
        })
    })
})

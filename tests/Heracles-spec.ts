import 'core-js/es6/array'
import 'core-js/es6/object'
import { Hydra } from '../src'
import { Alcaeus } from '../src/alcaeus'
import * as FetchUtil from '../src/FetchUtil'
import { PartialCollectionView } from '../src/Resources'
import { hydra } from '../src/Vocabs'
import { Bodies } from './test-objects'
import { mockedResponse, responseBuilder } from './test-utils'

jest.mock('../src/FetchUtil')

const fetchResource = (FetchUtil.fetchResource as jest.Mock).mockResolvedValue({})
const invokeOperation = (FetchUtil.invokeOperation as jest.Mock).mockResolvedValue({})

describe('Hydra loadDocumentation', () => {
    let client: Alcaeus

    beforeEach(() => {
        client = Hydra()
    })

    it('should store its representation in the dataset', async () => {
        // given
        const body = {
            '@id': 'http://api.example.com/doc/',
            '@type': hydra.ApiDocumentation.value,
        }
        fetchResource.mockResolvedValueOnce(mockedResponse({
            xhrBuilder: responseBuilder().body(body),
        }))

        // when
        client.loadDocumentation('http://api.example.com/doc/')
        await client.documentationLoaded

        // then
        expect(client.dataset.toCanonical()).toMatchSnapshot()
    })

    it('should replace its representation in the dataset when loading twice', async () => {
        // given
        const body = (suffix = '') => ({
            '@id': 'http://api.example.com/doc/' + suffix,
            '@type': hydra.ApiDocumentation.value,
        })
        fetchResource.mockResolvedValueOnce(mockedResponse({
            xhrBuilder: responseBuilder().body(body('1')),
        }))
        fetchResource.mockResolvedValueOnce(mockedResponse({
            xhrBuilder: responseBuilder().body(body('2')),
        }))

        // when
        client.loadDocumentation('http://api.example.com/doc/')
        await client.documentationLoaded
        client.loadDocumentation('http://api.example.com/doc/')
        await client.documentationLoaded

        // then
        expect(client.dataset.toCanonical()).toMatchSnapshot()
    })
})

describe('Hydra', () => {
    let loadDocumentation: jest.Mock
    let client: Alcaeus

    beforeEach(() => {
        client = Hydra()
        loadDocumentation = (client.loadDocumentation = jest.fn().mockResolvedValue({}))
    })

    describe('loadResource', () => {
        it('should return object with matching @id when it is unescaped in response', async () => {
            // given
            const unescaped = 'http://example.com/biała gęś'
            const id = 'http://example.com/bia%C5%82a%20g%C4%99%C5%9B'
            fetchResource.mockResolvedValueOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.unescapedDiacritics),
            }))

            // when
            const hydraRes = await client.loadResource(id)
            const res = hydraRes.get(id)

            // then
            expect(res!.id.value).toBe(unescaped)
        })

        it('should return object with matching @id when selected with unescaped uri', async () => {
            // given
            const id = 'http://example.com/biała gęś'
            fetchResource.mockResolvedValueOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.unescapedDiacritics),
            }))

            // when
            const hydraRes = await client.loadResource(id)
            const res = hydraRes.get(id)

            // then
            expect(res!.id.value).toBe(id)
        })

        it('should load documentation', async () => {
            // given
            fetchResource.mockResolvedValueOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
            }))

            // when
            await client.loadResource('http://example.com/resource')

            // then
            expect(loadDocumentation).toHaveBeenCalledWith('http://api.example.com/doc/', {})
        })

        it('should not load documentation in absence of Link header', async () => {
            // given
            fetchResource.mockResolvedValueOnce(mockedResponse({
                includeDocsLink: false,
                xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
            }))

            // when
            await client.loadResource('http://example.com/resource')

            // then
            expect(fetchResource).toHaveBeenCalledTimes(1)
        })

        it('should load parent of collection view as Resource', async () => {
            // given
            fetchResource.mockResolvedValueOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.hydraCollectionWithView),
            }))

            // when
            const hydraRes = await client.loadResource('http://example.com/resource?page=3')
            const res = hydraRes.get('http://example.com/resource?page=3') as PartialCollectionView

            // then
            expect(res.collection).toBeDefined()
            expect(res.collection).not.toBeNull()
        })

        it('should load resource with deep blank node structure', async () => {
            // given
            fetchResource.mockResolvedValueOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.deepBlankNodes),
            }))

            // when
            const hydraRes = await client.loadResource('http://example.com/root')
            const res = hydraRes.get('http://example.com/root') as any

            // then
            const p = 'http://example.com/prop'
            const t = 'http://example.com/text'

            expect(res[p][p][p][p][t].value).toBe('I\'m nested way deep')
        })

        it('should return typed string literals as their values', async () => {
            // given
            fetchResource.mockResolvedValueOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
            }))

            // when
            const hydraRes = await client.loadResource('http://example.com/resource')
            const res = hydraRes.get('http://example.com/resource') as any

            // then
            expect(res['http://schema.org/image']['http://schema.org/contentUrl'].value)
                .toBe('http://wikibus-test.gear.host/book/1936/image')
        })

        it.skip('should return typed numeric literals as their values', async () => {
            // given
            fetchResource.mockResolvedValueOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.typedNumericLiteral),
            }))

            // when
            const hydraRes = await client.loadResource('http://example.com/resource')
            const res = hydraRes.get('http://example.com/resource')

            // then
            expect(res!['http://schema.org/age']).toBe(21)
        })

        afterEach(() => {
            loadDocumentation.mockRestore()
            fetchResource.mockReset()
        })
    })

    describe('default root selectors', () => {
        it('should select by exact id if exists', async () => {
            // given
            fetchResource.mockResolvedValueOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
            }))

            // when
            const res = await client.loadResource('http://example.com/resource')

            // then
            expect(res.root!.id.value).toBe('http://example.com/resource')
        })

        it.skip('should select resource with redirected id if original is not present', async () => {
            // given
            const redirectUri = 'http://example.com/resource'

            const xhrBuilder = responseBuilder().body(Bodies.someJsonLd).redirect(redirectUri)
            fetchResource.mockResolvedValueOnce(mockedResponse({ xhrBuilder }))

            // when
            const res = await client.loadResource('http://example.com/not-there')

            // then
            expect(res.root!.id).toBe('http://example.com/resource')
        })

        it('should select resource with canonical id if original is not present', async () => {
            // given
            const redirectUri = 'http://example.com/resource'

            const xhrBuilder = responseBuilder().body(Bodies.someJsonLd).canonical(redirectUri)
            fetchResource.mockResolvedValueOnce(mockedResponse({ xhrBuilder }))

            // when
            const res = await client.loadResource('http://example.com/not-there')

            // then
            expect(res.root!.id.value).toBe('http://example.com/resource')
        })
    })

    describe('invokeOperation', () => {
        it('should wrap string as content-type header for 4th parameter', () => {
            // given
            const operation = {
                method: 'post',
            } as any

            // when
            client.invokeOperation(operation, 'uri', 'XYZ', 'application/rdf+xml')

            // then
            expect(invokeOperation)
                .toHaveBeenCalledWith(
                    'post',
                    'uri',
                    'XYZ',
                    new Headers({
                        'content-type': 'application/rdf+xml',
                    }))
        })
    })

    describe('customizing default headers', () => {
        let client: Alcaeus

        beforeEach(() => {
            client = Hydra()
            fetchResource.mockResolvedValue({})
        })

        describe('as HeadersInit object', () => {
            it('passes them to loadResource', () => {
                // given
                client.defaultHeaders = {
                    Authorization: 'Bearer foobar',
                }

                // when
                client.loadResource('uri')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'uri', new Headers({
                        'authorization': 'Bearer foobar',
                    }))
            })

            it('passes them to invokeOperation', () => {
                // given
                client.defaultHeaders = {
                    Authorization: 'Bearer foobar',
                }
                const operation = {
                    method: 'post',
                } as any

                // when
                client.invokeOperation(operation, 'uri')

                // then
                expect(invokeOperation)
                    .toHaveBeenCalledWith(
                        'post',
                        'uri',
                        undefined,
                        new Headers({
                            'authorization': 'Bearer foobar',
                        }))
            })

            it('passes them to loadDocumentation', () => {
                // given
                client.defaultHeaders = {
                    Authorization: 'Bearer foobar',
                }

                // when
                client.loadDocumentation('doc')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'doc', new Headers({
                        'authorization': 'Bearer foobar',
                    }))
            })
        })

        describe('as HeadersInit function', () => {
            it('passes them to loadResource', () => {
                // given
                client.defaultHeaders = () => ({
                    Authorization: 'Token xyz',
                })

                // when
                client.loadResource('uri')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'uri', new Headers({
                        'authorization': 'Token xyz',
                    }))
            })

            it('passes them to loadDocumentation', () => {
                // given
                client.defaultHeaders = () => ({
                    Authorization: 'Token xyz',
                })

                // when
                client.loadDocumentation('doc')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'doc', new Headers({
                        'authorization': 'Token xyz',
                    }))
            })

            it('passes them to invokeOperation', () => {
                // given
                client.defaultHeaders = () => ({
                    Authorization: 'Token xyz',
                })
                const operation = {
                    method: 'post',
                } as any

                // when
                client.invokeOperation(operation, 'uri')

                // then
                expect(invokeOperation)
                    .toHaveBeenCalledWith(
                        'post',
                        'uri',
                        undefined,
                        new Headers({
                            'authorization': 'Token xyz',
                        }))
            })
        })
    })
})

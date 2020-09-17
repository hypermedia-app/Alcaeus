import 'core-js/es6/array'
import 'core-js/es6/object'
import namespace from '@rdfjs/namespace'
import JsonLdParser from '@rdfjs/parser-jsonld'
import SinkMap from '@rdfjs/sink-map'
import fetchPony from 'fetch-ponyfill'
import DatasetExt from 'rdf-ext/lib/Dataset'
import $rdf from 'rdf-ext'
import * as Constants from './Constants'
import { create } from '../src/node'
import { HydraClient } from '../src/alcaeus'
import FetchUtil from '../src/FetchUtil'
import { PartialCollectionView } from '../src/Resources'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { Bodies } from './test-objects'
import { mockedResponse, responseBuilder } from './test-utils'

jest.mock('../src/FetchUtil')
const { Headers } = fetchPony()

const ex = namespace('http://example.com/')

const fetchResource = jest.fn().mockResolvedValue({})
const invokeOperation = jest.fn().mockResolvedValue({})

;(FetchUtil as jest.Mock).mockReturnValue({
    resource: fetchResource,
    operation: invokeOperation,
})

const parsers = new SinkMap([
    [Constants.MediaTypes.jsonLd, new JsonLdParser()],
])

describe('Hydra loadDocumentation', () => {
    let client: HydraClient<DatasetExt>
    let dataset: DatasetExt

    beforeEach(() => {
        dataset = $rdf.dataset()
        client = create({
            parsers,
            dataset,
        })

        fetchResource.mockReset()
        invokeOperation.mockReset()
    })

    it('should store its representation in the dataset', async () => {
        // given
        const body = {
            '@id': 'http://api.example.com/doc/',
            '@type': hydra.ApiDocumentation.value,
        }
        fetchResource.mockImplementationOnce(mockedResponse({
            xhrBuilder: responseBuilder().body(body),
        }))

        // when
        await client.loadDocumentation('http://api.example.com/doc/')

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })

    it('should replace its representation in the dataset when loading twice', async () => {
        // given
        const body = (suffix = '') => ({
            '@id': 'http://api.example.com/doc/' + suffix,
            '@type': hydra.ApiDocumentation.value,
        })
        fetchResource.mockImplementationOnce(mockedResponse({
            xhrBuilder: responseBuilder().body(body('1')),
        }))
        fetchResource.mockImplementationOnce(mockedResponse({
            xhrBuilder: responseBuilder().body(body('2')),
        }))

        // when
        await client.loadDocumentation('http://api.example.com/doc/')
        await client.loadDocumentation('http://api.example.com/doc/')

        // then
        expect(dataset.toCanonical()).toMatchSnapshot()
    })

    it('passes base URI to fetch', async () => {
        // given
        fetchResource.mockImplementationOnce(mockedResponse({
            xhrBuilder: responseBuilder().body(''),
        }))
        client.baseUri = 'http://example.com/foo/'

        // when
        await client.loadDocumentation('bar/docs')

        // then
        expect(fetchResource)
            .toHaveBeenCalledWith(
                'bar/docs',
                expect.objectContaining({
                    baseUri: 'http://example.com/foo/',
                }))
    })
})

describe('Hydra', () => {
    let loadDocumentation: jest.Mock
    let client: HydraClient
    let dataset: DatasetExt

    beforeEach(() => {
        dataset = $rdf.dataset()
        client = create({
            parsers,
            dataset,
        })
        loadDocumentation = (client.loadDocumentation = jest.fn().mockResolvedValue({}))
        fetchResource.mockReset()
        invokeOperation.mockReset()
    })

    describe('loadResource', () => {
        it('should return object with matching @id when it is unescaped in response', async () => {
            // given
            const unescaped = 'http://example.com/biała gęś'
            const id = 'http://example.com/bia%C5%82a%20g%C4%99%C5%9B'
            fetchResource.mockImplementationOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.unescapedDiacritics),
            }))

            // when
            const hydraRes = await client.loadResource(id)
            const res = hydraRes.representation?.get(id)

            // then
            expect(res!.id.value).toBe(unescaped)
        })

        it('should return object with matching @id when selected with unescaped uri', async () => {
            // given
            const id = 'http://example.com/biała gęś'
            fetchResource.mockImplementationOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.unescapedDiacritics),
            }))

            // when
            const hydraRes = await client.loadResource(id)
            const res = hydraRes.representation?.get(id)

            // then
            expect(res!.id.value).toBe(id)
        })

        it('should load documentation', async () => {
            // given
            fetchResource.mockImplementationOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
            }))

            // when
            await client.loadResource('http://example.com/resource')

            // then
            expect(loadDocumentation).toHaveBeenCalledWith('http://api.example.com/doc/', {})
        })

        it('should not load documentation in absence of Link header', async () => {
            // given
            fetchResource.mockImplementationOnce(mockedResponse({
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
            fetchResource.mockImplementationOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.hydraCollectionWithView),
            }))

            // when
            const hydraRes = await client.loadResource('http://example.com/resource?page=3')
            const res = hydraRes.representation?.get('http://example.com/resource?page=3') as PartialCollectionView

            // then
            expect(res.collection).toBeDefined()
            expect(res.collection).not.toBeNull()
        })

        it('should load resource with deep blank node structure', async () => {
            // given
            fetchResource.mockImplementationOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.deepBlankNodes),
            }))

            // when
            const hydraRes = await client.loadResource('http://example.com/root')
            const res = hydraRes.representation?.get('http://example.com/root') as any

            // then
            const p = 'http://example.com/prop'
            const t = 'http://example.com/text'

            expect(res[p][p][p][p][t].value).toBe('I\'m nested way deep')
        })

        it('should return typed string literals as their values', async () => {
            // given
            fetchResource.mockImplementationOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
            }))

            // when
            const hydraRes = await client.loadResource('http://example.com/resource')
            const res = hydraRes.representation?.get('http://example.com/resource') as any

            // then
            expect(res['http://schema.org/image']['http://schema.org/contentUrl'].value)
                .toBe('http://wikibus-test.gear.host/book/1936/image')
        })

        it.skip('should return typed numeric literals as their values', async () => {
            // given
            fetchResource.mockImplementationOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.typedNumericLiteral),
            }))

            // when
            const hydraRes = await client.loadResource('http://example.com/resource')
            const res = hydraRes.representation?.get('http://example.com/resource')

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
            fetchResource.mockImplementationOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
            }))

            // when
            const { representation } = await client.loadResource('http://example.com/resource')

            // then
            expect(representation?.root!.id.value).toBe('http://example.com/resource')
        })

        it.skip('should select resource with redirected id if original is not present', async () => {
            // given
            const redirectUri = 'http://example.com/resource'

            const xhrBuilder = responseBuilder().body(Bodies.someJsonLd).redirect(redirectUri)
            fetchResource.mockImplementationOnce(mockedResponse({ xhrBuilder }))

            // when
            const { representation } = await client.loadResource('http://example.com/not-there')

            // then
            expect(representation?.root!.id).toBe('http://example.com/resource')
        })
    })

    describe('invokeOperation', () => {
        describe('POST method', () => {
            it('does not store response in dataset', async () => {
                // given
                invokeOperation.mockImplementationOnce(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
                }))
                const operation = {
                    method: 'POST',
                    target: {
                        id: ex.resource,
                    },
                }

                // when
                await client.invokeOperation(operation)

                // then
                expect(dataset).toHaveLength(0)
            })

            it('returns data from the response', async () => {
                // given
                invokeOperation.mockImplementationOnce(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
                }))
                const operation = {
                    method: 'POST',
                    target: {
                        id: ex.resource,
                    },
                }

                // when
                const { representation } = await client.invokeOperation(operation)

                // then
                expect(representation?.length).toBeGreaterThan(0)
            })
        })

        describe('GET method', () => {
            it('stores response in dataset', async () => {
                // given
                invokeOperation.mockImplementationOnce(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
                }))
                const operation = {
                    method: 'GET',
                    target: {
                        id: ex.resource,
                    },
                }

                // when
                await client.invokeOperation(operation)

                // then
                expect(dataset.length).toBeGreaterThan(0)
            })
        })
    })

    describe('customizing default headers', () => {
        let client: HydraClient

        beforeEach(() => {
            client = create({ parsers })
            fetchResource.mockImplementation(mockedResponse({
                xhrBuilder: responseBuilder().body(''),
            }))
            invokeOperation.mockImplementationOnce(mockedResponse({
                xhrBuilder: responseBuilder().body(''),
            }))
        })

        describe('as HeadersInit object', () => {
            it('passes them to loadResource', async () => {
                // given
                client.defaultHeaders = {
                    Authorization: 'Bearer foobar',
                }

                // when
                await client.loadResource('uri')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'uri',
                    expect.objectContaining({
                        headers: new Headers({
                            Authorization: 'Bearer foobar',
                        }),
                    }))
            })

            it('passes them to invokeOperation', async () => {
                // given
                client.defaultHeaders = {
                    Authorization: 'Bearer foobar',
                }
                const operation = {
                    method: 'post',
                    target: {
                        id: ex.uri,
                    },
                }

                // when
                await client.invokeOperation(operation)

                // then
                expect(invokeOperation)
                    .toHaveBeenCalledWith(
                        'post',
                        ex.uri.value,
                        expect.objectContaining({
                            headers: new Headers({
                                Authorization: 'Bearer foobar',
                            }),
                        }))
            })

            it('passes them to loadDocumentation', async () => {
                // given
                client.defaultHeaders = {
                    Authorization: 'Bearer foobar',
                }

                // when
                await client.loadDocumentation('doc')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'doc', expect.objectContaining({
                        headers: new Headers({
                            Authorization: 'Bearer foobar',
                        }),
                    }))
            })
        })

        describe('as HeadersInit function', () => {
            it('passes them to loadResource', async () => {
                // given
                client.defaultHeaders = () => ({
                    Authorization: 'Token xyz',
                })

                // when
                await client.loadResource('uri')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'uri', expect.objectContaining({
                        headers: new Headers({
                            Authorization: 'Token xyz',
                        }),
                    }))
            })

            it('passes them to loadDocumentation', async () => {
                // given
                client.defaultHeaders = () => ({
                    Authorization: 'Token xyz',
                })

                // when
                await client.loadDocumentation('doc')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'doc', expect.objectContaining({
                        headers: new Headers({
                            Authorization: 'Token xyz',
                        }),
                    }))
            })

            it('passes them to invokeOperation', async () => {
                // given
                client.defaultHeaders = () => ({
                    Authorization: 'Token xyz',
                })
                const operation = {
                    method: 'post',
                    target: {
                        id: ex.uri,
                    },
                }

                // when
                await client.invokeOperation(operation)

                // then
                expect(invokeOperation)
                    .toHaveBeenCalledWith(
                        'post',
                        ex.uri.value,
                        expect.objectContaining({
                            headers: new Headers({
                                Authorization: 'Token xyz',
                            }),
                        }))
            })
        })

        describe('as async HeadersInit function', () => {
            it('passes them to loadResource', async () => {
                // given
                client.defaultHeaders = async () => ({
                    Authorization: 'Token xyz',
                })

                // when
                await client.loadResource('uri')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'uri', expect.objectContaining({
                        headers: new Headers({
                            Authorization: 'Token xyz',
                        }),
                    }))
            })

            it('passes them to loadDocumentation', async () => {
                // given
                client.defaultHeaders = async () => ({
                    Authorization: 'Token xyz',
                })

                // when
                await client.loadDocumentation('doc')

                // then
                expect(fetchResource).toHaveBeenCalledWith(
                    'doc', expect.objectContaining({
                        headers: new Headers({
                            Authorization: 'Token xyz',
                        }),
                    }))
            })

            it('passes them to invokeOperation', async () => {
                // given
                client.defaultHeaders = async () => ({
                    Authorization: 'Token xyz',
                })
                const operation = {
                    method: 'post',
                    target: {
                        id: ex.uri,
                    },
                }

                // when
                await client.invokeOperation(operation)

                // then
                expect(invokeOperation)
                    .toHaveBeenCalledWith(
                        'post',
                        ex.uri.value,
                        expect.objectContaining({
                            headers: new Headers({
                                Authorization: 'Token xyz',
                            }),
                        }))
            })
        })
    })
})

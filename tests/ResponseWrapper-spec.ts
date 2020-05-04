import fetchPony from 'fetch-ponyfill'
import * as sinon from 'sinon'
import { EventEmitter } from 'events'
import SinkMap from '@rdfjs/sink-map'
import { Stream } from 'rdf-js'
import ResponseWrapper from '../src/ResponseWrapper'
import { Bodies } from './test-objects'
import { responseBuilder } from './test-utils'

const { Response } = fetchPony()

describe('ResponseWrapper', () => {
    let parsers: SinkMap<EventEmitter, Stream>

    beforeEach(() => {
        parsers = new SinkMap<EventEmitter, Stream>()
    })

    describe('apiDocumentationLink', () => {
        it('should get absolute link', async () => {
            // given
            const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).apiDocumentation().build()

            // when
            const res = new ResponseWrapper('http://resources.example.com/', xhrResponse, parsers)

            // then
            expect(res.apiDocumentationLink).toBe('http://api.example.com/doc/')
        })

        it('should get relative link', async () => {
            // given
            const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).apiDocumentation('doc/').build()

            // when
            const res = new ResponseWrapper('http://api.example.com/resource/', xhrResponse, parsers)

            // then
            expect(res.apiDocumentationLink).toBe('http://api.example.com/resource/doc/')
        })

        it('should base relative link on redirect target', async () => {
            // given
            const xhrResponse = {
                headers: {
                    get: () => '</api-doc>; rel=http://www.w3.org/ns/hydra/core#apiDocumentation',
                    has: () => true,
                },
                redirected: true,
                url: 'http://other.example.api',
            } as any
            xhrResponse.clone = () => xhrResponse

            // when
            const res = new ResponseWrapper('http://api.example.com/resorce/', xhrResponse, parsers)

            // then
            expect(res.apiDocumentationLink).toBe('http://other.example.api/api-doc')
        })
    })

    describe('redirectUrl', () => {
        it('should get redirect URL if redirected', async () => {
            // given
            const xhrResponse = {
                redirected: true,
                url: 'urn:actual:resource',
            } as Response
            xhrResponse.clone = () => xhrResponse

            // when
            const res = new ResponseWrapper('', xhrResponse, parsers)

            // then
            expect(res.redirectUrl).toBe('urn:actual:resource')
        })
    })

    describe('resolveUri', () => {
        it('returns absolute URL unchanged', () => {
            // given
            // given
            const xhrResponse = {
            } as any
            const wrapper = new ResponseWrapper('http://api.example.com/resource/', xhrResponse, parsers)

            // when
            const resolved = wrapper.resolveUri('http://localhost:9876/whatever')

            // then
            expect(resolved).toBe('http://localhost:9876/whatever')
        })

        it('returns absolute URL resolved to request base', () => {
            // given
            // given
            const xhrResponse = {
            } as any
            const wrapper = new ResponseWrapper('http://localhost:9876/to-strip', xhrResponse, parsers)

            // when
            const resolved = wrapper.resolveUri('/whatever')

            // then
            expect(resolved).toBe('http://localhost:9876/whatever')
        })

        it('returns absolute URL resolved to redirected url', () => {
            // given
            // given
            const xhrResponse = {
                redirected: true,
                url: 'http://localhost:1234/base/',
            } as any
            const wrapper = new ResponseWrapper('http://localhost:9876/resource', xhrResponse, parsers)

            // when
            const resolved = wrapper.resolveUri('whatever')

            // then
            expect(resolved).toBe('http://localhost:1234/base/whatever')
        })
    })

    describe('requestUri', () => {
        it('returns the original value', () => {
            const originalUri = 'foo-bar'
            const response = new ResponseWrapper(originalUri, new Response(), parsers)

            // when
            const requestUri = response.requestedUri

            // then
            expect(requestUri).toEqual(originalUri)
        })
    })

    describe('quadStream', () => {
        it('should parse response when media type has additional parameters', async () => {
            // given
            const xhrResponse = await responseBuilder()
                .body(Bodies.someJsonLd, 'application/ld+json; charset=utf-8')
                .build()
            const parser = {
                import: sinon.spy(),
            }
            parsers.set('application/ld+json', parser)
            const response = new ResponseWrapper('', xhrResponse, parsers)

            // when
            await response.quadStream()

            // then
            expect(parser.import.calledOnce).toBeTruthy()
        })
    })

    describe('resourceUri', () => {
        it('should select resource with canonical id if original is not present', async () => {
            // given
            const redirectUri = 'http://example.com/canonical'

            const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).canonical(redirectUri).build()
            const response = new ResponseWrapper('http://example.com/original', xhrResponse, parsers)

            // when
            const value = response.resourceUri

            // then
            expect(value).toBe('http://example.com/canonical')
        })

        describe('when canonical link header is set', () => {
            it('should equal link value', async () => {
                // given
                const xhrResponse = await responseBuilder()
                    .canonical('http://example.com/canonical')
                    .build()
                const response = new ResponseWrapper('http://example.com/original', xhrResponse, parsers)

                // when
                const value = response.resourceUri

                // then
                expect(value).toEqual('http://example.com/canonical')
            })
        })

        describe('when location header is set', () => {
            it('should select the resource with id matching location header', async () => {
                // given
                const xhrResponse = await responseBuilder()
                    .header('Location', 'http://example.com/the-real-id')
                    .statusCode(201)
                    .build()
                const response = new ResponseWrapper('http://example.com/original', xhrResponse, parsers)

                // when
                const value = response.resourceUri

                // then
                expect(value).toEqual('http://example.com/the-real-id')
            })

            it('should not select the resource when status is not 201', async () => {
                // given
                const xhrResponse = await responseBuilder()
                    .header('Location', 'http://example.com/the-real-id')
                    .build()
                const response = new ResponseWrapper('http://example.com/original', xhrResponse, parsers)

                // when
                const value = response.resourceUri

                // then
                expect(value).toEqual('http://example.com/original')
            })
        })
    })
})

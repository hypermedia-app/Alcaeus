import * as sinon from 'sinon'
import 'whatwg-fetch'
import * as fetchUtil from '../src/FetchUtil'
import { Bodies } from './test-objects'
import { responseBuilder } from './test-utils'

describe('FetchUtil', () => {
    let windowFetch

    beforeEach(() => {
        windowFetch = sinon.stub(window, 'fetch')
    })

    describe('fetchResource', () => {
        it('should load resource with RDF accept header', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.fetchResource('http://example.com/resource', {})

            // then
            const requestHeaders = windowFetch.firstCall.args[1].headers
            expect(requestHeaders.get('accept'))
                .toBe('application/ld+json, application/n-triples, application/n-quads')
        })

        it('should append provided headers to the default', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.fetchResource('http://example.com/resource', {
                'x-foo': 'bar',
            })

            // then
            const requestHeaders = windowFetch.firstCall.args[1].headers
            expect(requestHeaders.get('x-foo')).toBe('bar')
            expect(requestHeaders.get('accept'))
                .toBe('application/ld+json, application/n-triples, application/n-quads')
        })

        it('should not alter accept header if other headers added', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.fetchResource('http://example.com/resource', {
                'x-foo': 'bar',
            })

            // then
            const requestHeaders = windowFetch.firstCall.args[1].headers
            expect(requestHeaders.get('accept'))
                .toBe('application/ld+json, application/n-triples, application/n-quads')
        })

        it('should replace default accept header', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.fetchResource('http://example.com/resource', {
                'accept': 'application/vnd.custom+rdf',
            })

            // then
            const requestHeaders = windowFetch.firstCall.args[1].headers
            expect(requestHeaders.get('accept')).toBe('application/vnd.custom+rdf')
        })

        it('should resolve relative URI against', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.fetchResource('resource', {}, 'http://example.com/foo/')

            // then
            const uri = windowFetch.firstCall.args[0]
            expect(uri).toEqual('http://example.com/foo/resource')
        })

        afterEach(() => {
            windowFetch.restore()
        })
    })

    describe('invokeOperation', () => {
        it('should not send body with GET request', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.invokeOperation('get', 'http://example.com/resource', 'foo', {})

            // then
            const body = windowFetch.firstCall.args[1].body
            expect(body).toBeUndefined()
        })

        it('should append provided headers to the default', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.invokeOperation('get', 'http://example.com/resource', 'foo', {
                'x-foo': 'bar',
            })

            // then
            const requestHeaders = windowFetch.firstCall.args[1].headers
            expect(requestHeaders.get('x-foo')).toBe('bar')
            expect(requestHeaders.get('accept'))
                .toBe('application/ld+json, application/n-triples, application/n-quads')
        })

        it('should not alter accept header if other headers added', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.invokeOperation('get', 'http://example.com/resource', 'foo', {
                'x-foo': 'bar',
            })

            // then
            const requestHeaders = windowFetch.firstCall.args[1].headers
            expect(requestHeaders.get('accept'))
                .toBe('application/ld+json, application/n-triples, application/n-quads')
        })

        it('should replace default accept header', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.invokeOperation('get', 'http://example.com/resource', 'foo', {
                'accept': 'application/vnd.custom+rdf',
            })

            // then
            const requestHeaders = windowFetch.firstCall.args[1].headers
            expect(requestHeaders.get('accept')).toBe('application/vnd.custom+rdf')
        })

        it('should set default json-ld content type header when sending body', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.invokeOperation('post', 'http://example.com/resource', 'foo', {})

            // then
            const request = windowFetch.firstCall.args[1]
            expect(request.headers.get('content-type')).toBe('application/ld+json')
            expect(request.body).toBe('foo')
        })

        it('should set not set content-type header for FormData bodies', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.invokeOperation('post', 'http://example.com/resource', new FormData(), {})

            // then
            const request = windowFetch.firstCall.args[1]
            expect(request.headers.get('content-type')).toBeNull()
        })

        it('should resolve relative URI against', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().body(Bodies.someJsonLd).build())

            // when
            await fetchUtil.invokeOperation('get', 'resource', 'foo', {}, 'http://example.com/foo/')

            // then
            const uri = windowFetch.firstCall.args[0]
            expect(uri).toEqual('http://example.com/foo/resource')
        })

        afterEach(() => {
            windowFetch.restore()
        })
    })
})

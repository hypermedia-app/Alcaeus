import 'isomorphic-fetch'
import ResponseWrapper from '../src/ResponseWrapper'
import { Bodies } from './test-objects'
import { responseBuilder } from './test-utils'

describe('ResponseWrapper', () => {
    it('should get absolute documentation link', async () => {
        // given
        const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).apiDocumentation().build()

        // when
        const res = new ResponseWrapper('http://resources.example.com/', xhrResponse)

        // then
        expect(res.apiDocumentationLink).toBe('http://api.example.com/doc/')
    })

    it('should get relative documentation link', async () => {
        // given
        const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).apiDocumentation('doc/').build()

        // when
        const res = new ResponseWrapper('http://api.example.com/resource/', xhrResponse)

        // then
        expect(res.apiDocumentationLink).toBe('http://api.example.com/resource/doc/')
    })

    it('should get redirect URL if redirected', async () => {
        // given
        const xhrResponse = {
            redirected: true,
            url: 'urn:actual:resource',
        } as Response
        xhrResponse.clone = () => xhrResponse

        // when
        const res = new ResponseWrapper('', xhrResponse)

        // then
        expect(res.redirectUrl).toBe('urn:actual:resource')
    })

    it('should base relative documentation link on redirect target', async () => {
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
        const res = new ResponseWrapper('http://api.example.com/resorce/', xhrResponse)

        // then
        expect(res.apiDocumentationLink).toBe('http://other.example.api/api-doc')
    })

    describe('resolveUri', () => {
        it('returns absolute URL unchanged', () => {
            // given
            // given
            const xhrResponse = {
            } as any
            const wrapper = new ResponseWrapper('http://api.example.com/resource/', xhrResponse)

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
            const wrapper = new ResponseWrapper('http://localhost:9876/to-strip', xhrResponse)

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
            const wrapper = new ResponseWrapper('http://localhost:9876/resource', xhrResponse)

            // when
            const resolved = wrapper.resolveUri('whatever')

            // then
            expect(resolved).toBe('http://localhost:1234/base/whatever')
        })
    })
})

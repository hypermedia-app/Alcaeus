import 'isomorphic-fetch'
import { requestCacheHeaders } from '../src/ResourceCacheStrategy'
import { mockedResponse, responseBuilder } from './test-utils'

describe('ResourceCacheStrategy', () => {
    describe('requestCacheHeaders', () => {
        it('sets If-None-Match header if previous response had ETag', async () => {
            // given
            const response = mockedResponse({
                xhrBuilder: responseBuilder().header('ETag', 'foo-bar'),
            })
            const previous = {
                response: await response('http://example.com/'),
            }

            // when
            const headers = new Headers(requestCacheHeaders(previous))

            // then
            expect(headers.get('if-none-match')).toEqual('foo-bar')
        })

        it('sets If-Modified-Since header if previous response had Last-Modified', async () => {
            // given
            const response = mockedResponse({
                xhrBuilder: responseBuilder().header('Last-Modified', 'Mon, 7 Dec 2015 15:29:14 GMT'),
            })
            const previous = {
                response: await response('http://example.com/'),
            }

            // when
            const headers = new Headers(requestCacheHeaders(previous))

            // then
            expect(headers.get('if-modified-since')).toEqual('Mon, 7 Dec 2015 15:29:14 GMT')
        })
    })
})

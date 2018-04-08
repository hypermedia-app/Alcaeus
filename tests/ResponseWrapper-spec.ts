import {ResponseWrapper} from '../src/ResponseWrapper';
import {Bodies} from './test-objects';
import {async, responseBuilder} from './test-utils';

describe('ResponseWrapper', () => {
    async(it, 'should get documentation link', async () => {
        // given
        const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).apiDocumentation().build();

        // when
        const res = new ResponseWrapper(xhrResponse);

        // then
        expect(res.apiDocumentationLink).toBe('http://api.example.com/doc/');
    });

    async(it, 'should get redirect URL if redirected', async () => {
        // given
        const xhrResponse = {
            redirected: true,
            url: 'urn:actual:resource',
        } as Response;

        // when
        const res = new ResponseWrapper(xhrResponse);

        // then
        expect(res.redirectUrl).toBe('urn:actual:resource');
    });
});

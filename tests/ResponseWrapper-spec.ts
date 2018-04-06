import {async, responseBuilder} from './test-utils';
import {Bodies} from './test-objects';
import {ResponseWrapper} from '../src/ResponseWrapper';

describe('ResponseWrapper', () => {
    async(it, 'should get documentation link', async () => {
        // given
        const xhrResponse = await responseBuilder().jsonLdPayload(Bodies.someJsonLd).apiDocumentation().build();

        // when
        const res = new ResponseWrapper(xhrResponse);

        // then
        expect(res.apiDocumentationLink).toBe('http://api.example.com/doc/');
    });

    async(it, 'should get redirect URL if redirected', async () => {
        // given
        const xhrResponse = <Response>{
            redirected: true,
            url: 'urn:actual:resource'
        };

        // when
        const res = new ResponseWrapper(xhrResponse);

        // then
        expect(res.redirectUrl).toBe('urn:actual:resource');
    });
});

import {ResponseWrapper} from '../src/ResponseWrapper';
import {Bodies} from './test-objects';
import {responseBuilder} from './test-utils';

describe('ResponseWrapper', () => {
    it('should get documentation link', async () => {
        // given
        const xhrResponse = await responseBuilder().body(Bodies.someJsonLd).apiDocumentation().build();

        // when
        const res = new ResponseWrapper(xhrResponse);

        // then
        expect(res.apiDocumentationLink).toBe('http://api.example.com/doc/');
    });

    it('should get redirect URL if redirected', async () => {
        // given
        const xhrResponse = {
            redirected: true,
            url: 'urn:actual:resource',
        } as Response;
        xhrResponse.clone = () => xhrResponse;

        // when
        const res = new ResponseWrapper(xhrResponse);

        // then
        expect(res.redirectUrl).toBe('urn:actual:resource');
    });

    it('should be possible to read response multiple times', async () => {
        // given
        const xhrResponse = await responseBuilder().body('some text').build();

        // when
        const res = new ResponseWrapper(xhrResponse);

        // then
        expect(await res.xhr.text()).toBe('some text');
        expect(await res.xhr.text()).toBe('some text');
    });

    it('should not expose originalResponse', () => {
        expect(Object.getOwnPropertyDescriptor(ResponseWrapper.prototype, 'originalResponse').enumerable)
            .toBe(false);
    });
});

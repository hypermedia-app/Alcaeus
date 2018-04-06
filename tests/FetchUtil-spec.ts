import * as sinon from 'sinon';
import 'whatwg-fetch';
import * as fetchUtil from '../src/FetchUtil';
import {Bodies} from './test-objects';
import {async, responseBuilder} from './test-utils';

describe('FetchUtil', () => {

    let windowFetch;

    beforeEach(() => {
        windowFetch = sinon.stub(window, 'fetch');
    });

    describe('fetchResource', () => {

        async(it, 'should load resource with RDF accept header', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().jsonLdPayload(Bodies.someJsonLd).build());

            // when
            await fetchUtil.fetchResource('http://example.com/resource');

            // then
            const requestHeaders = windowFetch.firstCall.args[1].headers;
            expect(requestHeaders.get('accept'))
                .toBe('application/ld+json, application/n-triples, application/n-quads');
        });

        afterEach(() => {
            windowFetch.restore();
        });
    });
});

import * as _ from 'lodash';
import * as sinon from 'sinon';
import {Core, MediaTypes} from '../src/Constants';
import {FetchUtil} from '../src/FetchUtil';
import {Bodies} from './test-objects';
import {async, responseBuilder} from './test-utils';
import {rdf} from '../src/Vocabs';
import 'whatwg-fetch';
import * as n3parser from 'rdf-parser-n3';

describe('FetchUtil', () => {

    let windowFetch, fetchUtil;

    beforeEach(() => {
        windowFetch = sinon.stub(window, 'fetch');
        fetchUtil = new FetchUtil();
    });

    describe('fetchResource', () => {

        async(it, 'should load resource with RDF accept header', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().jsonLdPayload(Bodies.someJsonLd).build());

            // when
            await fetchUtil.fetchResource('http://example.com/resource');

            // then
            expect(windowFetch.calledWithMatch('http://example.com/resource', {
                headers: {
                    accept: 'application/ld+json, application/n-triples, application/n-quads'
                }
            })).toBe(true);
        });

        async(it, 'should expand json-ld', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().jsonLdPayload(Bodies.someJsonLd).build());

            // when
            const res = await fetchUtil.fetchResource('http://example.com/resource');

            // then
            expect(res.resources[0]['http://example.com/vocab#prop']).toBe('some textual value');
        });

        async(it, 'should get documentation link', async () => {
            // given
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().jsonLdPayload(Bodies.someJsonLd).apiDocumentation().build());

            // when
            const res = await fetchUtil.fetchResource('http://example.com/resource');

            // then
            expect(res.apiDocumentationLink).toBe('http://api.example.com/doc/');
        });

        async(it, 'should parse non-json-ld response', async () => {
            // given
            fetchUtil.addParsers({
                [MediaTypes.ntriples]: n3parser
            });

            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().nTriplesPayload(Bodies.ntriples).build());

            // when
            const res = await fetchUtil.fetchResource('http://example.com/resource');

            // then
            expect(res.resources[0]['http://example.com/vocab#prop']).toBe('some textual value');
        });

        async(it, 'should fail when resource returns non-success status code', async () => {
            // given
            windowFetch.withArgs('http://example.com/not/there')
                .returns(responseBuilder().serverError().build());

            try {
                await fetchUtil.fetchResource('http://example.com/not/there');
            } catch(e) {
                return;
            }

            throw new Error('Should have thrown');
        });

        async(it,'should fail when resource returns not found status code', async () => {
            // given
            windowFetch.withArgs('http://example.com/not/there')
                .returns(responseBuilder().notFound().build());

            // when
            const res = await fetchUtil.fetchResource('http://example.com/not/there');

            // then
            expect(res).toBe(null);
        });

        async(xit, 'should handle redirects', async () => {
            // given
            windowFetch.withArgs('http://example.com/something/requested')
                .returns(responseBuilder().redirect('http://example.com/redirected/to').build());

            // when
            const res = await fetchUtil.fetchResource('http://example.com/something/requested');

            // then
            expect(res.resourceIdentifier).toBe('http://example.com/redirected/to');
        });

        async(it, 'should handle Content-Location', async () => {
            // given
            windowFetch.withArgs('http://example.com/something/requested')
                .returns(responseBuilder().contentLocation('http://example.com/redirected/to').build());

            // when
            const res = await fetchUtil.fetchResource('http://example.com/something/requested');

            // then
            expect(res.resourceIdentifier).toBe('http://example.com/redirected/to');
        });

        describe('fetching api documentation', () => {

            const inferredTypes = [
                [Core.Vocab.supportedClass, Core.Vocab.Class],
                [Core.Vocab.expects, Core.Vocab.Class],
                [Core.Vocab.returns, Core.Vocab.Class],
                [Core.Vocab.supportedOperation, Core.Vocab.Operation],
                [Core.Vocab.operation, Core.Vocab.Operation],
                [Core.Vocab.supportedProperty, Core.Vocab.SupportedProperty],
                [Core.Vocab.statusCodes, Core.Vocab.StatusCodeDescription],
                [Core.Vocab.property, rdf.Property],
                [Core.Vocab.mapping, Core.Vocab.IriTemplateMapping],
            ];

            _.forEach(inferredTypes, typePair => {
                (function(prop, type) {
                    async(it, 'should add inferences for property ' + prop, async () => {
                        // given
                        const obj = {'@id': 'http://example.com/resource'};
                        obj[prop] = { '@id': 'http://example.com/child' };
                        windowFetch.withArgs('http://example.com/resource')
                            .returns(responseBuilder().jsonLdPayload(obj).build());

                        // when
                        const res = await fetchUtil.fetchResource('http://example.com/resource');

                        // then
                        const child = res.resources.find(r => r['@id'] === 'http://example.com/child');

                        expect(child['@type']).toBeDefined();
                        expect(child['@type']).toBe(type);
                    });
                })(typePair[0], typePair[1]);
            });

        });
    });

    afterEach(() => {
        windowFetch.restore();
    })
});

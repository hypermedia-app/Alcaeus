import * as _ from 'lodash';
import * as sinon from 'sinon';
import {Core, MediaTypes} from '../src/Constants';
import {FetchUtil} from '../src/FetchUtil';
import {Bodies} from './test-objects';
import {responseBuilder} from './test-utils';
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

        it('should load resource with RDF accept header', (done:any) => {
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().jsonLdPayload(Bodies.someJsonLd).build());

            fetchUtil.fetchResource('http://example.com/resource')
                .then(() => {
                    expect(windowFetch.calledWithMatch('http://example.com/resource', {
                        headers: {
                            accept: 'application/ld+json, application/n-triples, application/n-quads'
                        }
                    })).toBe(true);

                    done();
                })
                .catch(done.fail);
        });

        it('should expand json-ld', (done:any) => {
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().jsonLdPayload(Bodies.someJsonLd).build());

            fetchUtil.fetchResource('http://example.com/resource')
                .then(res => {
                    expect(res.resources[0]['http://example.com/vocab#prop']).toBe('some textual value');
                    done();
                })
                .catch(done.fail);
        });

        it('should get documentation link', (done:any) => {
            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().jsonLdPayload(Bodies.someJsonLd).apiDocumentation().build());

            fetchUtil.fetchResource('http://example.com/resource')
                .then(res => {
                    expect(res.apiDocumentationLink).toBe('http://api.example.com/doc/');
                    done();
                })
                .catch(done.fail);
        });

        it('should parse non-json-ld response', (done:any) => {
            fetchUtil.addParsers({
                [MediaTypes.ntriples]: n3parser
            });

            windowFetch.withArgs('http://example.com/resource')
                .returns(responseBuilder().nTriplesPayload(Bodies.ntriples).build());

            fetchUtil.fetchResource('http://example.com/resource')
                .then(res => {
                    expect(res.resources[0]['http://example.com/vocab#prop']).toBe('some textual value');
                    done();
                })
                .catch(e=> {
                    console.log(e);
                    done.fail(e);
                });
        });

        it('should fail when resource returns non-success status code', (done:any) => {
            windowFetch.withArgs('http://example.com/not/there')
                .returns(responseBuilder().serverError().build());

            fetchUtil.fetchResource('http://example.com/not/there')
                .then(done.fail, done)
                .catch(done.fail);
        });

        it('should fail when resource returns not found status code', (done:any) => {
            windowFetch.withArgs('http://example.com/not/there')
                .returns(responseBuilder().notFound().build());

            fetchUtil.fetchResource('http://example.com/not/there')
                .then(res => {
                    expect(res).toBe(null);
                    done();
                })
                .catch(done.fail);
        });

        xit('should handle redirects', (done:any) => {
            windowFetch.withArgs('http://example.com/something/requested')
                .returns(responseBuilder().redirect('http://example.com/redirected/to').build());

            fetchUtil.fetchResource('http://example.com/something/requested')
                .then(res => {
                    expect(res.resourceIdentifier).toBe('http://example.com/redirected/to');
                    done();
                })
                .catch(done.fail);
        });

        it('should handle Content-Location', (done:any) => {
            windowFetch.withArgs('http://example.com/something/requested')
                .returns(responseBuilder().contentLocation('http://example.com/redirected/to').build());

            fetchUtil.fetchResource('http://example.com/something/requested')
                .then(res => {
                    expect(res.resourceIdentifier).toBe('http://example.com/redirected/to');
                    done();
                })
                .catch(done.fail);
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
                    it('should add inferences for property ' + prop, (done:any) => {
                        const obj = {'@id': 'http://example.com/resource'};
                        obj[prop] = { '@id': 'http://example.com/child' };
                        windowFetch.withArgs('http://example.com/resource')
                            .returns(responseBuilder().jsonLdPayload(obj).build());

                        fetchUtil.fetchResource('http://example.com/resource')
                            .then((res:any) => {
                                const child = res.resources.find(r => r['@id'] === 'http://example.com/child');

                                expect(child['@type']).toBeDefined();
                                expect(child['@type']).toBe(type);
                                done();
                            })
                            .catch(done.fail);
                    });
                })(typePair[0], typePair[1]);
            });

        });
    });

    afterEach(() => {
        windowFetch.restore();
    })
});

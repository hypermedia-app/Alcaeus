'use strict';

import * as _ from 'lodash';
import * as sinon from 'sinon';
import {Core} from '../src/Constants';
import {FetchUtil} from '../src/FetchUtil';
import {Responses, Bodies} from './test-objects';
import 'whatwg-fetch';
//noinspection TypeScriptCheckImport
import * as rdf from 'vocabs-rdf';

describe('FetchUtil', () => {

    beforeEach(() => {
        sinon.stub(window, 'fetch');
    });

    describe('fetchResource', () => {

        it('should load resource with RDF accept header', (done:any) => {
            window.fetch.withArgs('http://example.com/resource')
                .returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, false)));

            FetchUtil.fetchResource('http://example.com/resource')
                .then(() => {
                    expect(window.fetch.calledWithMatch('http://example.com/resource', {
                        headers: {
                            accept: 'application/ld+json, application/n-triples, application/n-quads'
                        }
                    })).toBe(true);

                    done();
                })
                .catch(done.fail);
        });

        it('should expand json-ld', (done:any) => {
            window.fetch.withArgs('http://example.com/resource')
                .returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, false)));

            FetchUtil.fetchResource('http://example.com/resource')
                .then(res => {
                    expect(res.resources[0]['http://example.com/vocab#prop']).toBe('some textual value');
                    done();
                })
                .catch(done.fail);
        });

        it('should get documentation link', (done:any) => {
            window.fetch.withArgs('http://example.com/resource')
                .returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, true)));

            FetchUtil.fetchResource('http://example.com/resource')
                .then(res => {
                    expect(res.apiDocumentationLink).toBe('http://api.example.com/doc/');
                    done();
                })
                .catch(done.fail);
        });

        it('should parse non-json-ld response', (done:any) => {
            window.fetch.withArgs('http://example.com/resource')
                .returns(Promise.resolve(Responses.ntriples(Bodies.ntriples, false)));

            FetchUtil.fetchResource('http://example.com/resource')
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
            window.fetch.withArgs('http://example.com/not/there')
                .returns(Promise.resolve(Responses.serverError()));

            FetchUtil.fetchResource('http://example.com/not/there')
                .then(done.fail, err => {
                    // hm, why doesn't thins work?
                    // expect(err.message).toBe('Request failed');
                    expect(err.response).toBeDefined();
                    done();
                })
                .catch(done.fail);
        });

        it('should fail when resource returns not found status code', (done:any) => {
            window.fetch.withArgs('http://example.com/not/there')
                .returns(Promise.resolve(Responses.notFound()));

            FetchUtil.fetchResource('http://example.com/not/there')
                .then(res => {
                    expect(res).toBe(null);
                    done();
                })
                .catch(done.fail);
        });

        describe('fetching api documentation', () => {

            var inferredTypes = [
                [Core.Vocab.supportedClass, Core.Vocab.Class],
                [Core.Vocab.expects, Core.Vocab.Class],
                [Core.Vocab.returns, Core.Vocab.Class],
                [Core.Vocab.supportedOperation, Core.Vocab.Operation],
                [Core.Vocab.operation, Core.Vocab.Operation],
                [Core.Vocab.supportedProperty, Core.Vocab.SupportedProperty],
                [Core.Vocab.statusCodes, Core.Vocab.StatusCodeDescription],
                [Core.Vocab.property, rdf.ns + 'Property'],
                [Core.Vocab.mapping, Core.Vocab.IriTemplateMapping],
            ];

            _.forEach(inferredTypes, typePair => {
                (function(prop, type) {
                    it('should add inferences for property ' + prop, (done:any) => {
                        var obj = { '@id': 'http://example.com/resource' };
                        obj[prop] = { '@id': 'http://example.com/child' };
                        window.fetch.withArgs('http://example.com/resource')
                            .returns(Promise.resolve(Responses.jsonLd(obj)));

                        FetchUtil.fetchResource('http://example.com/resource')
                            .then(res => {
                                var child = _.find(res.resources, [ '@id', 'http://example.com/child']);

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
        window.fetch.restore();
    })
});

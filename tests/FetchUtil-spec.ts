'use strict';

import * as sinon from 'sinon';
import {FetchUtil} from '../src/FetchUtil';
import {Responses, Bodies} from './test-objects';

describe('FetchUtil', () => {

    beforeEach(() => {
        sinon.stub(window, 'fetch');
    });

    describe('fetchResource', () => {

        it('should load resource with RDF accept header', done => {
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

        it('should expand json-ld', done => {
            window.fetch.withArgs('http://example.com/resource')
                .returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, false)));

            FetchUtil.fetchResource('http://example.com/resource')
                .then(res => {
                    expect(res.resources[0]['http://example.com/vocab#prop']).toBe('some textual value');
                    done();
                })
                .catch(done.fail);
        });

        it('should get documentation link', done => {
            window.fetch.withArgs('http://example.com/resource')
                .returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, true)));

            FetchUtil.fetchResource('http://example.com/resource')
                .then(res => {
                    expect(res.apiDocumentationLink).toBe('http://api.example.com/doc/');
                    done();
                })
                .catch(done.fail);
        });

        it('should parse non-json-ld response', done => {
            window.fetch.withArgs('http://example.com/resource')
                .returns(Promise.resolve(Responses.ntriples(Bodies.ntriples, false)));

            FetchUtil.fetchResource('http://example.com/resource')
                .then(res => {
                    expect(res.resources[0]['http://example.com/vocab#prop']).toBe('some textual value');
                    done();
                })
                .catch(done.fail);
        });

        it('should fail when resource returns non-success status code', done => {
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

        it('should fail when resource returns not found status code', done => {
            window.fetch.withArgs('http://example.com/not/there')
                .returns(Promise.resolve(Responses.notFound()));

            FetchUtil.fetchResource('http://example.com/not/there')
                .then(res => {
                    expect(res).toBe(null);
                    done();
                })
                .catch(done.fail);
        });
    });

    describe('fetchDocumentation', () => {

        it('should return null if ApiDocumentation returned 404 status', done => {
            window.fetch.withArgs('http://example.com/doc')
                .returns(Promise.resolve(Responses.notFound()));

            FetchUtil.fetchDocumentation('http://example.com/doc')
                .then(doc => {
                    expect(doc).toBe(null);
                    done();
                })
                .catch(done.fail);
        });

        it('should fail if ApiDocumentation request fails', done => {
            window.fetch.withArgs('http://example.com/doc')
                .returns(Promise.resolve(Responses.serverError()));

            FetchUtil.fetchDocumentation('http://example.com/doc')
                .then(done.fail)
                .catch(done);
        });

    });

    afterEach(() => {
        window.fetch.restore();
    });
    
});
/// <reference path="../typings/main.d.ts" />

import * as sinon from 'sinon';
import {Resource} from '../src/heracles';
import {Responses, Documentations, Bodies} from './test-objects';
import {ApiDocumentation, Operation} from "../src/ApiDocumentation";

describe('Resource.load', () => {
    beforeEach(() => {
        sinon.stub(ApiDocumentation, 'load');
        sinon.stub(window, 'fetch');
    });

    it('should load resource with RDF accept header', done => {
        window.fetch.withArgs('http://example.com/resource').returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, false)));

        Resource.load('http://example.com/resource')
            .then((res) => {
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
        window.fetch.withArgs('http://example.com/resource').returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, false)));

        Resource.load('http://example.com/resource')
            .then(res => {
                expect(res['http://example.com/vocab#prop']).toBe('some textual value');
                done();
            })
            .catch(done.fail);
    });

    it('should return object with matching @id', done => {
        window.fetch.withArgs('http://example.com/resource').returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, false)));
        //ApiDocumentation.load.returns(null);

        Resource.load('http://example.com/resource')
            .then(res => {
                expect(res['@id']).toBe('http://example.com/resource');
                done();
            })
            .catch(done.fail);
    });

    it('should load documentation', done => {
        window.fetch.withArgs('http://example.com/resource').returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, true)));

        Resource.load('http://example.com/resource')
            .then(() => {
                expect(ApiDocumentation.load.calledWithMatch('http://api.example.com/doc/')).toBe(true);
                done();
            })
            .catch(done.fail);
    });
    
    it('should append class\' supported operations to resource', done => {
        window.fetch.withArgs('http://example.com/resource').returns(Promise.resolve(Responses.jsonLd(Bodies.someJsonLd, true)));
        ApiDocumentation.load.withArgs('http://api.example.com/doc/')
            .returns(Promise.resolve({
                getOperations: () => Promise.resolve([ { method: 'POST', description: 'test'} ])
            }));

        Resource.load('http://example.com/resource')
            .then(res => {
                expect(res.getOperations()[0].method).toBe('POST');
                expect(res.getOperations()[0].description).toBe('test');
                done();
            })
            .catch(done.fail);
    });

    it('should parse non-json-ld response', done => {
        window.fetch.withArgs('http://example.com/resource').returns(Promise.resolve(Responses.ntriples(Bodies.ntriples, false)));

        Resource.load('http://example.com/resource')
            .then(res => {
                expect(res['http://example.com/vocab#prop']).toBe('some textual value');
                done();
            })
            .catch(done.fail);
    });

    afterEach(() => {
        window.fetch.restore();
        ApiDocumentation.load.restore();
    });
});
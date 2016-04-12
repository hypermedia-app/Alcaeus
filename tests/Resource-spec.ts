/// <reference path="../typings/main.d.ts" />

import * as sinon from 'sinon';
import {Resource} from '../src/heracles';
import {Responses} from './test-objects';
import {ApiDocumentation} from "../src/ApiDocumentation";

describe('Resource.load', () => {
    beforeEach(() => {
        sinon.stub(ApiDocumentation, 'load');
        sinon.stub(window, 'fetch');
    });

    it('should load resource with RDF accept header', done => {
        window.fetch.returns(Promise.resolve(Responses.jsonLdResponse()));

        Resource.load('http://example.com/resource')
            .then((res) => {
                expect(window.fetch.calledWithMatch('http://example.com/resource', {
                    headers: {
                        accept: 'application/ld+json, application/ntriples, application/nquads'
                    }
                })).toBe(true);

                done();
            })
            .catch(done.fail);
    });

    it('should leave json-ld intact', done => {
        window.fetch.returns(Promise.resolve(Responses.jsonLdResponse()));

        Resource.load('http://example.com/resource')
            .then(jsonLd => {
                expect(jsonLd.prop['@value']).toBe('some textual value');
                done();
            })
            .catch(done.fail);
    });

    it('should load documentation', done => {
        window.fetch.returns(Promise.resolve(Responses.jsonLdResponse()));

        Resource.load('http://example.com/resource')
            .then(() => {
                expect(ApiDocumentation.load.calledWithMatch('http://api.example.com/doc/')).toBe(true);
                done();
            })
            .catch(done.fail);
    });

    afterEach(() => {
        window.fetch.restore();
        ApiDocumentation.load.restore();
    });
});
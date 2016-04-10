/// <reference path="../typings/main.d.ts" />

import * as sinon from 'sinon';
import * as heracles from '../src/heracles';

describe('Hydra resource', () => {
    it('should load resource with RDF accept header', (done) => {
        sinon.stub(window, 'fetch');

        var res = new Response('{"hello":"world"}', {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            }
        });

        window.fetch.returns(Promise.resolve(res));

        heracles.Hydra.load('http://example.com/resource').then((res) => {
            expect(window.fetch.calledWithMatch('http://example.com/resource', {
               headers: {
                   accept: 'application/ld+json, application/ntriples, application/nquads'
               }
            })).toBe(true);

            done();
        }).catch(done);
    });

    afterEach(() => {
        window.fetch.restore();
    });
});
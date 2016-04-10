import * as sinon from 'sinon';
import {load} from '../src/heracles';

describe('Hydra resource', () => {
    it('should load resource with RDF accept header', (done) => {
        sinon.stub(window, 'fetch');

        var res = new window.Response('{"hello":"world"}', {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            }
        });

        window.fetch.returns(Promise.resolve(res));

        load('http://example.com/resource').then((res) => {
            // application/ld+json, application/ntriples, application/nquads
            assert.isTrue(fetchMock.called());

            done();
        }).catch(done);
    });

    afterEach(() => {
        window.fetch.restore();
    });
});
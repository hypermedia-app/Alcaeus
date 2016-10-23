import {promises as jsonld} from 'jsonld';
import * as sinon from 'sinon';
import {SupportedOperation, ApiDocumentation} from '../src/ApiDocumentation';
import {Core} from '../src/Constants';
import {owl} from 'linkeddata-vocabs';
import {IHeracles} from "../src/interfaces";

describe('SupportedOperation', () => {

    var operationJsonLd;

    beforeEach(() => operationJsonLd = {
        '@context': Core.Context,
        'title': 'The operation',
        'description': 'The operation description',
        'expects': 'http://www.w3.org/2002/07/owl#Nothing',
        'returns': 'http://example.com/Something',
        'method': 'TRACE'
    });

    it('should expose operation method', (done:any) => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            var op = new SupportedOperation(compacted, <IHeracles>{});

            expect(op.method).toBe('TRACE');
            done();
        }).catch(done.fail);
    });

    it('should expose expected class id', (done:any) => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            var op = new SupportedOperation(compacted, <IHeracles>{});

            expect(op.expects['@id']).toBe('http://www.w3.org/2002/07/owl#Nothing');
            done();
        }).catch(done.fail);
    });

    it('should expose returned class id', (done:any) => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            var op = new SupportedOperation(compacted, <IHeracles>{});

            expect(op.returns['@id']).toBe('http://example.com/Something');
            done();
        }).catch(done.fail);
    });
    
    describe('requiresInput', () => {

        it('should return false for GET operation', done => {
            var operation = {
                '@context': Core.Context,
                'method': 'GET'
            };

            jsonld.compact(operation, {}).then(compacted => {
                var op = new SupportedOperation(compacted, <IHeracles>{});

                expect(op.requiresInput).toBe(false);
                done();
            }).catch(done.fail);
        });

        it('should return false for DELETE operation', done => {
            var operation = {
                '@context': Core.Context,
                'method': 'DELETE'
            };

            jsonld.compact(operation, {}).then(compacted => {
                var op = new SupportedOperation(compacted, <IHeracles>{});

                expect(op.requiresInput).toBe(false);
                done();
            }).catch(done.fail);
        });

        it('should return true if operation expects a body', done => {
            var operation = {
                '@context': Core.Context,
                'method': 'POST'
            };

            jsonld.compact(operation, {}).then(compacted => {
                var op = new SupportedOperation(compacted, <IHeracles>{});

                expect(op.requiresInput).toBe(true);
                done();
            }).catch(done.fail);
        });

        it('should return true if operation expects nothing', done => {
            var operation = {
                '@context': Core.Context,
                'method': 'POST'
            };

            jsonld.compact(operation, {}).then(compacted => {

                compacted[Core.Vocab.expects] = { id: owl.ns + 'Nothing' };
                var op = new SupportedOperation(compacted, <IHeracles>{});

                expect(op.requiresInput).toBe(true);
                done();
            }).catch(done.fail);
        });
        
    });
});
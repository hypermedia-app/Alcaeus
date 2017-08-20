import {promises as jsonld} from 'jsonld';
import * as sinon from 'sinon';
import {SupportedOperation, ApiDocumentation} from '../src/ApiDocumentation';
import {Core} from '../src/Constants';
import {owl} from '../src/Vocabs';
import {IHeracles} from "../src/interfaces";

describe('SupportedOperation', () => {

    let operationJsonLd;

    beforeEach(() => operationJsonLd = {
        '@context': Core.Context,
        'title': 'The operation',
        'description': 'The operation description',
        'expects': owl.Nothing,
        'returns': 'http://example.com/Something',
        'method': 'TRACE'
    });

    it('should expose operation method', (done:any) => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            const op = new SupportedOperation(compacted, <IHeracles>{});

            expect(op.method).toBe('TRACE');
            done();
        }).catch(done.fail);
    });

    it('should expose expected class id', (done:any) => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            const op = new SupportedOperation(compacted, <IHeracles>{});

            expect(op.expects['@id']).toBe(owl.Nothing);
            done();
        }).catch(done.fail);
    });

    it('should expose returned class id', (done:any) => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            const op = new SupportedOperation(compacted, <IHeracles>{});

            expect(op.returns['@id']).toBe('http://example.com/Something');
            done();
        }).catch(done.fail);
    });
    
    describe('requiresInput', () => {

        it('should return false for GET operation', (done:any) => {
            const operation = {
                '@context': Core.Context,
                'method': 'GET'
            };

            jsonld.compact(operation, {}).then(compacted => {
                const op = new SupportedOperation(compacted, <IHeracles>{});

                expect(op.requiresInput).toBe(false);
                done();
            }).catch(done.fail);
        });

        it('should return false for DELETE operation', (done:any) => {
            const operation = {
                '@context': Core.Context,
                'method': 'DELETE'
            };

            jsonld.compact(operation, {}).then(compacted => {
                const op = new SupportedOperation(compacted, <IHeracles>{});

                expect(op.requiresInput).toBe(false);
                done();
            }).catch(done.fail);
        });

        it('should return true if operation expects a body', (done:any) => {
            const operation = {
                '@context': Core.Context,
                'method': 'POST'
            };

            jsonld.compact(operation, {}).then(compacted => {
                const op = new SupportedOperation(compacted, <IHeracles>{});

                expect(op.requiresInput).toBe(true);
                done();
            }).catch(done.fail);
        });

        it('should return true if operation expects nothing', (done:any) => {
            const operation = {
                '@context': Core.Context,
                'method': 'POST'
            };

            jsonld.compact(operation, {}).then(compacted => {

                compacted[Core.Vocab.expects] = { id: owl.Nothing };
                const op = new SupportedOperation(compacted, <IHeracles>{});

                expect(op.requiresInput).toBe(true);
                done();
            }).catch(done.fail);
        });
        
    });
});
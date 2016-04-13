import * as sinon from 'sinon';
import {Operation, ApiDocumentation} from '../src/ApiDocumentation';
import {Core} from '../src/Constants';

describe('Operation', () => {

    var apiDoc;
    var operationJsonLd = {
        '@context': Core.Context,
        'title': 'The operation',
        'description': 'The operation description',
        'expects': {
            '@id': 'http://www.w3.org/2002/07/owl#Nothing'
        },
        'returns': {
            '@id': 'http://example.com/Something'
        },
        'method': 'TRACE'
    };
    
    beforeEach(() => apiDoc = new ApiDocumentation('', {}));

    it('should expose operation method', () => {
        var op = new Operation(operationJsonLd, apiDoc);

        expect(op.method).toBe('TRACE');
    });

    it('should expose expected class id', () => {
        var op = new Operation(operationJsonLd, apiDoc);

        expect(op.expects).toBe('http://www.w3.org/2002/07/owl#Nothing');
    });

    it('should expose returned class id', () => {
        var op = new Operation(operationJsonLd, apiDoc);

        expect(op.returns).toBe('http://example.com/Something');
    });

    it('should expose expected class promise', done => {
        var op = new Operation(operationJsonLd, apiDoc);
        sinon.spy(apiDoc, 'getClass');

        op.getExpected()
            .then(expected =>{
                expect(apiDoc.getClass.calledWithExactly('http://www.w3.org/2002/07/owl#Nothing')).toBe(true);
                done();
            })
            .catch(done.fail);
    });

    it('should expose returned class promise', done => {
        var op = new Operation(operationJsonLd, apiDoc);
        sinon.spy(apiDoc, 'getClass');

        op.getReturned()
            .then(expected =>{
                expect(apiDoc.getClass.calledWithExactly('http://example.com/Something')).toBe(true);
                done();
            })
            .catch(done.fail);
    });
});
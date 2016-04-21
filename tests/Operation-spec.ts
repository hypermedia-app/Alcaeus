import * as sinon from 'sinon';
import {Operation, ApiDocumentation} from '../src/ApiDocumentation';
import {Core} from '../src/Constants';

describe('Operation', () => {

    var apiDoc;
    var operationJsonLd;

    beforeEach(() => operationJsonLd = {
        '@context': Core.Context,
        'title': 'The operation',
        'description': 'The operation description',
        'expects': 'http://www.w3.org/2002/07/owl#Nothing',
        'returns': 'http://example.com/Something',
        'method': 'TRACE'
    });

    beforeEach(() => apiDoc = new ApiDocumentation(<IHeracles>{}, '', {}));

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

    describe('getExpected', () => {

        it('should expose expected class promise', (done:any) => {
            operationJsonLd.expects = 'http://example.com/Something';
            var op = new Operation(operationJsonLd, apiDoc);
            sinon.spy(apiDoc, 'getClass');

            op.getExpected()
                .then(() => {
                    expect(apiDoc.getClass.calledWithExactly('http://example.com/Something')).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should reject if Operation expects owl:Nothing', (done:any) => {
            var op = new Operation(operationJsonLd, apiDoc);
            sinon.spy(apiDoc, 'getClass');
            
            op.getExpected()
                .then(done.fail, () => {
                    done();
                })
                .catch(done.fail);

        });

    });

    describe('getExpected', () => {

        it('should expose returned class promise', (done:any) => {
            var op = new Operation(operationJsonLd, apiDoc);
            sinon.spy(apiDoc, 'getClass');

            op.getReturned()
                .then(() => {
                    expect(apiDoc.getClass.calledWithExactly('http://example.com/Something')).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should reject in Operation return owl:Nothing', (done:any) => {
            operationJsonLd.returns = 'http://www.w3.org/2002/07/owl#Nothing';
            var op = new Operation(operationJsonLd, apiDoc);
            sinon.spy(apiDoc, 'getClass');

            op.getReturned()
                .then(done.fail, () => {
                    done();
                })
                .catch(done.fail);
        });

    });


});
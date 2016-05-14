import {promises as jsonld} from 'jsonld';
import {Operation, ApiDocumentation} from '../src/ApiDocumentation';
import {Core} from '../src/Constants';

describe('Operation', () => {

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
            var op = new Operation(compacted);

            expect(op.method).toBe('TRACE');
            done();
        }).catch(done.fail);
    });

    it('should expose expected class id', (done:any) => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            var op = new Operation(compacted);

            expect(op.expects['@id']).toBe('http://www.w3.org/2002/07/owl#Nothing');
            done();
        }).catch(done.fail);
    });

    it('should expose returned class id', (done:any) => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            var op = new Operation(compacted);

            expect(op.returns['@id']).toBe('http://example.com/Something');
            done();
        }).catch(done.fail);
    });

});
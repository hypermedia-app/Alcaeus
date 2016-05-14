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

    it('should expose operation method', () => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            var op = new Operation(null, compacted);

            expect(op.method).toBe('TRACE');
        });
    });

    it('should expose expected class id', () => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            var op = new Operation(null, compacted);

            expect(op.expects['@id']).toBe('http://www.w3.org/2002/07/owl#Nothing');
        });
    });

    it('should expose returned class id', () => {
        jsonld.compact(operationJsonLd, {}).then(compacted => {
            var op = new Operation(null, compacted);

            expect(op.returns['@id']).toBe('http://example.com/Something');
        });
    });

});
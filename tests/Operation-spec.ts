import * as sinon from 'sinon';
import {Operation, ApiDocumentation} from '../src/ApiDocumentation';

describe('Operation', () => {

    var apiDoc;
    var operationJsonLd = {
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

    it('should use hydra:title for title property', () => {
        var op = new Operation(operationJsonLd, apiDoc);

        expect(op.title).toBe('The operation');
    });

    it('should use hydra:description for title property', () => {
        var op = new Operation(operationJsonLd, apiDoc);

        expect(op.description).toBe('The operation description');
    });

    it('should expose operation method', () => {
        var op = new Operation(operationJsonLd, apiDoc);

        expect(op.method).toBe('TRACE');
    });

    it('should use rdfs:label for title property as fallback', () => {
        var op = new Operation({
            'http://www.w3.org/2000/01/rdf-schema#label': 'The operation with rdfs'
        }, apiDoc);

        expect(op.title).toBe('The operation with rdfs');
    });

    it('should use schema:title for title property as fallback', () => {
        var op = new Operation({
            'http://schema.org/title': 'The operation with schema'
        }, apiDoc);

        expect(op.title).toBe('The operation with schema');
    });

    it('should use rdfs:label for title property as fallback', () => {
        var op = new Operation({
            'http://www.w3.org/2000/01/rdf-schema#comment': 'The operation descr with rdfs'
        }, apiDoc);

        expect(op.description).toBe('The operation descr with rdfs');
    });

    it('should use schema:label for title property as fallback', () => {
        var op = new Operation({
            'http://schema.org/description': 'The operation descr with schema'
        }, apiDoc);

        expect(op.description).toBe('The operation descr with schema');
    });

    it('should expose raw operation as promise of compacted object', done => {
        var op = new Operation(operationJsonLd, apiDoc);

        op.getRaw()
            .then(compacted => {
                expect(compacted['title']).toBe('The operation');
                expect(compacted['description']).toBe('The operation description');
                expect(compacted['expects']).toBe('http://www.w3.org/2002/07/owl#Nothing');
                expect(compacted['returns']).toBe('http://example.com/Something');
                done();
            })
            .catch(done.fail);
    });
    
    it('should expose raw operation as compactable promise', done => {
        var op = new Operation(operationJsonLd, apiDoc);
        var customContext = {
            hydra: 'http://www.w3.org/ns/hydra/core#',
            title: { '@id': 'hydra:title' },
            description: { '@id': 'hydra:description' },
            expects: { '@id': 'hydra:expects', '@type': '@id'},
            returns: { '@id': 'hydra:returns', '@type': '@id'}
        };

        op.getRaw(customContext)
            .then(compacted => {
                expect(compacted.title).toBe('The operation');
                expect(compacted.description).toBe('The operation description');
                expect(compacted.expects).toBe('http://www.w3.org/2002/07/owl#Nothing');
                expect(compacted.returns).toBe('http://example.com/Something');
                done();
            })
            .catch(done.fail);
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
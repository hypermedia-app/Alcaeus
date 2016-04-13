import {Operation} from '../src/ApiDocumentation';

describe('Operation', () => {

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

    it('should use hydra:title for title property', () => {
        var op = new Operation(operationJsonLd);

        expect(op.title).toBe('The operation');
    });

    it('should use hydra:description for title property', () => {
        var op = new Operation(operationJsonLd);

        expect(op.description).toBe('The operation description');
    });

    it('should expose operation method', () => {
        var op = new Operation(operationJsonLd);

        expect(op.method).toBe('TRACE');
    });

    it('should use rdfs:label for title property as fallback', () => {
        var op = new Operation({
            'http://www.w3.org/2000/01/rdf-schema#label': 'The operation with rdfs'
        });

        expect(op.title).toBe('The operation with rdfs');
    });

    it('should use schema:title for title property as fallback', () => {
        var op = new Operation({
            'http://schema.org/title': 'The operation with schema'
        });

        expect(op.title).toBe('The operation with schema');
    });

    it('should use rdfs:label for title property as fallback', () => {
        var op = new Operation({
            'http://www.w3.org/2000/01/rdf-schema#comment': 'The operation descr with rdfs'
        });

        expect(op.description).toBe('The operation descr with rdfs');
    });

    it('should use schema:label for title property as fallback', () => {
        var op = new Operation({
            'http://schema.org/description': 'The operation descr with schema'
        });

        expect(op.description).toBe('The operation descr with schema');
    });

    it('should expose raw operation as promise of compacted object', done => {
        var op = new Operation(operationJsonLd);

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
        var op = new Operation(operationJsonLd);
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

});
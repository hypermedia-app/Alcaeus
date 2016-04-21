import {Core} from '../src/Constants';
import {DocumentedResource} from "../src/ApiDocumentation";

describe('DocumentedResource', () => {

    var hydraDescriptionJsonLd = {
        '@context': Core.Context,
        'title': 'The title',
        'description': 'The longer description',
        'http://some/custom/property': 'The value'
    };    
    
    it('should use hydra:title for title property', () => {
        var op = new DocumentedResource(hydraDescriptionJsonLd);

        expect(op.title).toBe('The title');
    });

    it('should use hydra:description for title property', () => {
        var op = new DocumentedResource(hydraDescriptionJsonLd);

        expect(op.description).toBe('The longer description');
    });

    it('should use rdfs:label for title property as fallback', () => {
        var op = new DocumentedResource({
            'http://www.w3.org/2000/01/rdf-schema#label': 'The title with rdfs'
        });

        expect(op.title).toBe('The title with rdfs');
    });

    it('should use schema:title for title property as fallback', () => {
        var op = new DocumentedResource({
            'http://schema.org/title': 'The title with schema'
        });

        expect(op.title).toBe('The title with schema');
    });

    it('should use rdfs:label for title property as fallback', () => {
        var op = new DocumentedResource({
            'http://www.w3.org/2000/01/rdf-schema#comment': 'The title descr with rdfs'
        });

        expect(op.description).toBe('The title descr with rdfs');
    });

    it('should use schema:label for title property as fallback', () => {
        var op = new DocumentedResource({
            'http://schema.org/description': 'The title descr with schema'
        });

        expect(op.description).toBe('The title descr with schema');
    });

    it('should expose raw operation as promise of compacted object', (done:any) => {
        var op = new DocumentedResource(hydraDescriptionJsonLd);

        op.compact()
            .then(compacted => {
                expect(compacted['title']).toBe('The title');
                expect(compacted['description']).toBe('The longer description');
                done();
            })
            .catch(done.fail);
    });

    it('should expose raw operation as compactable promise', (done:any) => {
        var op = new DocumentedResource(hydraDescriptionJsonLd);
        var customContext = {
            hydra: 'http://www.w3.org/ns/hydra/core#',
            title: { '@id': 'hydra:title' },
            description: { '@id': 'hydra:description' },
            prop: 'http://some/custom/property'
        };

        op.compact(customContext)
            .then(compacted => {
                expect(compacted.title).toBe('The title');
                expect(compacted.description).toBe('The longer description');
                expect(compacted.prop).toBe('The value');
                done();
            })
            .catch(done.fail);
    });

});
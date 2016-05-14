import {Core} from '../src/Constants';
import {DocumentedResource} from "../src/ApiDocumentation";
import {promises as jsonld} from 'jsonld';

describe('DocumentedResource', () => {

    var hydraDescriptionJsonLd = {
        '@context': Core.Context,
        'title': 'The title',
        'description': 'The longer description',
        'http://some/custom/property': 'The value'
    };    
    
    it('should use hydra:title for title property', (done:any) => {
        jsonld.compact(hydraDescriptionJsonLd, {}).then(compacted => {
            var op = new DocumentedResource(compacted);

            expect(op.title).toBe('The title');
            done();
        }).catch(done.fail);
    });

    it('should use hydra:description for title property', (done:any) => {
        jsonld.compact(hydraDescriptionJsonLd, {}).then(compacted => {
            var op = new DocumentedResource(compacted);

            expect(op.description).toBe('The longer description');
            done();
        }).catch(done.fail);
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

});
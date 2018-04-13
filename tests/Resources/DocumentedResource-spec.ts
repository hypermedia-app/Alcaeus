import {promises as jsonld} from 'jsonld';
import {Core} from '../../src/Constants';
import {Mixin} from '../../src/Resources/Mixins/DocumentedResource';
import Resource from '../../src/Resources/Resource';

class DocumentedResource extends Mixin(Resource) {}

describe('DocumentedResource', () => {

    const hydraDescriptionJsonLd = {
        '@context': Core.Context,
        'description': 'The longer description',
        'http://some/custom/property': 'The value',
        'title': 'The title',
    };

    it('should use hydra:title for title property', async () => {
        // given
        const compacted = await jsonld.compact(hydraDescriptionJsonLd, {});

        // when
        const op = new DocumentedResource(compacted);

        // then
        expect(op.title).toBe('The title');
    });

    it('should use hydra:description for title property', async () => {
        // given
        const compacted = await jsonld.compact(hydraDescriptionJsonLd, {});

        // when
        const op = new DocumentedResource(compacted);

        // then
        expect(op.description).toBe('The longer description');
    });

    it('should use rdfs:label for title property as fallback', () => {
        const op = new DocumentedResource({
            'http://www.w3.org/2000/01/rdf-schema#label': 'The title with rdfs',
        });

        expect(op.title).toBe('The title with rdfs');
    });

    it('should use schema:title for title property as fallback', () => {
        const op = new DocumentedResource({
            'http://schema.org/title': 'The title with schema',
        });

        expect(op.title).toBe('The title with schema');
    });

    it('should use rdfs:label for title property as fallback', () => {
        const op = new DocumentedResource({
            'http://www.w3.org/2000/01/rdf-schema#comment': 'The title descr with rdfs',
        });

        expect(op.description).toBe('The title descr with rdfs');
    });

    it('should use schema:label for title property as fallback', () => {
        const op = new DocumentedResource({
            'http://schema.org/description': 'The title descr with schema',
        });

        expect(op.description).toBe('The title descr with schema');
    });
});

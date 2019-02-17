import {promises as jsonld} from 'jsonld';
import {Core} from '../../src/Constants';
import {Mixin} from '../../src/Resources/Mixins/RdfProperty';
import Resource from '../../src/Resources/Resource';
import {owl, rdf, rdfs, xsd} from '../../src/Vocabs';

class RdfProperty extends Mixin(Resource) {}

describe('RdfProperty', () => {

    let testProperty;

    beforeEach(() => {
        testProperty = {
            '@context': [
                Core.Context,
                {
                    rdfs: rdfs(),
                },
            ],
            '@id': 'http://purl.org/dc/elements/1.1/partOf',
            '@type': [ rdf.Property ],
            'rdfs:domain': { '@id': xsd.integer },
            'rdfs:range': { '@id': xsd.string },
            'supportedOperation': [
                {
                    description: 'Update this property',
                    expects: xsd.string,
                    method: 'POST',
                    returns: owl.Nothing,
                },
            ],
        };
    });

    it('should link to domain', async () => {
        // given
        const compacted = await jsonld.compact(testProperty, {});

        // when
        const property = new RdfProperty(compacted);

        // then
        expect(property.domain['@id']).toBe(xsd.integer);
    });

    it('should link to range', async () => {
        // given
        const compacted = await jsonld.compact(testProperty, {});

        // when
        const property = new RdfProperty(compacted);

        // them
        expect(property.range['@id']).toBe(xsd.string);
    });

    describe('link', () => {
        it('should not be a link by default', async () => {
            // given
            const compacted = await jsonld.compact(testProperty, {});

            // when
            const property = new RdfProperty(compacted);

            // then
            expect(property.isLink).toBe(false);
        });

        it('should not be a link by default', async () => {
            // given
            testProperty['@type'] = Core.Vocab('Link');
            const compacted = await jsonld.compact(testProperty, {});

            // when
            const property = new RdfProperty(compacted);

            // then
            expect(property.isLink).toBe(true);
        });
    });

    describe('supportedOperations', () => {

        it('should return single operation as array', async () => {
            // given
            const compacted = await jsonld.compact(testProperty, {});

            // when
            const property = new RdfProperty(compacted);

            // then
            expect(property.supportedOperations.length).toBe(1);
        });

        it('should return empty array when property is missing', () => {

            const property = new RdfProperty({});

            expect(Array.isArray(property.supportedOperations)).toBeTruthy();
            expect(property.supportedOperations.length).toBe(0);
        });

    });

});

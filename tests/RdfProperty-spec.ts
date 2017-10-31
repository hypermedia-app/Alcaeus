import {promises as jsonld} from 'jsonld';
import {RdfProperty} from "../src/ApiDocumentation";
import {Core} from '../src/Constants';
import {xsd, rdf, rdfs, owl} from '../src/Vocabs';
import {async} from "./test-utils";

describe('RdfProperty', () => {

    const testProperty = {
        '@context': [
            Core.Context,
            {
                rdfs: rdfs.ns
            }
        ],
        '@id': 'http://purl.org/dc/elements/1.1/partOf',
        '@type': rdf.Property,
        'rdfs:range': { '@id': xsd.string },
        'rdfs:domain': { '@id': xsd.integer },
        'supportedOperation': [
            {
                'description': 'Update this property',
                'expects': xsd.string,
                'method': 'POST',
                'returns': owl.Nothing
            }
        ]
    };

    async(it, 'should link to domain', async () => {
        // given
        const compacted = await jsonld.compact(testProperty, {});

        // when
        const property = new RdfProperty(compacted);

        // then
        expect(property.domain['@id']).toBe(xsd.integer);
    });

    async(it, 'should link to range', async () => {
        // given
        const compacted = await jsonld.compact(testProperty, {});

        // when
        const property = new RdfProperty(compacted);

        // them
        expect(property.range['@id']).toBe(xsd.string);
    });

    describe('supportedOperations', () => {

        async(it, 'should return single operation as array', async () => {
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

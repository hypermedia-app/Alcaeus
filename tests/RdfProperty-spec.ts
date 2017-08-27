import {promises as jsonld} from 'jsonld';
import {RdfProperty} from "../src/ApiDocumentation";
import {Core} from '../src/Constants';
import {xsd, rdf, rdfs, owl} from '../src/Vocabs';

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

    it('should link to domain', (done:any) => {

        jsonld.compact(testProperty, {}).then(compacted => {
            const property = new RdfProperty(compacted);

            expect(property.domain['@id']).toBe(xsd.integer);
            done();
        }).catch(done.fail);
    });

    it('should link to range', (done:any) => {

        jsonld.compact(testProperty, {}).then(compacted => {
            const property = new RdfProperty(compacted);

            expect(property.range['@id']).toBe(xsd.string);
            done();
        }).catch(done.fail);
    });

    describe('supportedOperations', () => {

        it('should return single operation as array', (done:any) => {

            jsonld.compact(testProperty, {}).then(compacted => {
                const property = new RdfProperty(compacted);

                expect(property.supportedOperations.length).toBe(1);
                done();
            }).catch(done.fail);
        });

        it('should return empty array when property is missing', () => {

            const property = new RdfProperty({});

            expect(Array.isArray(property.supportedOperations)).toBeTruthy();
            expect(property.supportedOperations.length).toBe(0);
        });

    });

});
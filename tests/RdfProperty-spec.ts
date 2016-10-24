import 'core-js/es6/weak-map';
import {promises as jsonld} from 'jsonld';
import {RdfProperty} from "../src/ApiDocumentation";
import {Core} from '../src/Constants';
import {xsd, rdf, rdfs, owl} from '../src/Vocabs';

describe('RdfProperty', () => {

    var testProperty = {
        '@context': [
            Core.Context,
            {
                rdfs: rdfs.ns
            }
        ],
        '@id': 'http://purl.org/dc/elements/1.1/partOf',
        '@type': rdf.Property,
        'rdfs:range': xsd.string,
        'rdfs:domain': xsd.integer,
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
            var property = new RdfProperty(compacted);

            expect(property.domain).toBe(xsd.integer);
            done();
        }).catch(done.fail);
    });

    it('should link to range', (done:any) => {

        jsonld.compact(testProperty, {}).then(compacted => {
            var property = new RdfProperty(compacted);

            expect(property.range).toBe(xsd.string);
            done();
        }).catch(done.fail);
    });

    describe('supportedOperations', () => {

        it('should return single operation as array', (done:any) => {

            jsonld.compact(testProperty, {}).then(compacted => {
                var property = new RdfProperty(compacted);

                expect(property.supportedOperations.length).toBe(1);
                done();
            }).catch(done.fail);
        });

        it('should return empty array when property is missing', () => {

            var property = new RdfProperty({});

            expect(Array.isArray(property.supportedOperations)).toBeTruthy();
            expect(property.supportedOperations.length).toBe(0);
        });

    });

});
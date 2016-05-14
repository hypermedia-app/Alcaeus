import {promises as jsonld} from 'jsonld';
import {Class} from "../src/ApiDocumentation";
import {Core} from '../src/Constants';

describe('Class', () => {

    var hydraClass = {
        '@id': 'http://example.com/vocab#SomeClass',
        '@context': Core.Context,
        'supportedProperties': [{}],
        'supportedOperations': [{}]
    };

    describe('getting operations', () => {

        it('should return operations', () => {
            jsonld.compact(hydraClass, {}).then(compacted => {
                var clas = new Class(null, compacted);
                expect(clas.supportedOperations.length).toBe(1);
            });
        });

    });

    describe('getting properties', () => {

        it('should return properties', () => {
            jsonld.compact(hydraClass, {}).then(compacted => {
                var clas = new Class(null, compacted);
                expect(clas.supportedProperties.length).toBe(1);
            });
        });
    });

});
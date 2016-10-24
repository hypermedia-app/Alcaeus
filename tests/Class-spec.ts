import {promises as jsonld} from 'jsonld';
import {Class} from "../src/ApiDocumentation";
import {Core} from '../src/Constants';

describe('Class', () => {

    var hydraClass = {
        '@id': 'http://example.com/vocab#SomeClass',
        '@context': Core.Context,
        'supportedProperty': [{}],
        'supportedOperation': [{}]
    };

    describe('getting operations', () => {

        it('should return operations', (done:any) => {
            jsonld.compact(hydraClass, {}).then(compacted => {
                var clas = new Class(compacted);
                expect(clas.supportedOperations.length).toBe(1);
                done();
            }).catch(done.fail);
        });

        it('should return empty array if property is missing', () => {
            var clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass'
            });

            expect(clas.supportedOperations.length).toBe(0);
        });

        it('should return empty array if property is null', () => {
            var clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass',
                'http://www.w3.org/ns/hydra/core#supportedOperation': null
            });

            expect(clas.supportedOperations.length).toBe(0);
        });

    });

    describe('getting properties', () => {

        it('should return properties', (done:any) => {
            jsonld.compact(hydraClass, {}).then(compacted => {
                var clas = new Class(compacted);
                expect(clas.supportedProperties.length).toBe(1);
                done();
            }).catch(done.fail);
        });

        it('should return empty array if property is missing', () => {
            var clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass'
            });

            expect(clas.supportedProperties.length).toBe(0);
        });

        it('should return empty array if property is null', () => {
            var clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass',
                'http://www.w3.org/ns/hydra/core#supportedProperty': null
            });

            expect(clas.supportedProperties.length).toBe(0);
        });
    });

});
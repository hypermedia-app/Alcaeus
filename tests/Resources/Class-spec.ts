import {promises as jsonld} from 'jsonld';
import ClassMixin from "../../src/Resources/Class";
import {Core} from '../../src/Constants';
import {async} from "../test-utils";

class Class extends ClassMixin(Object) {}

describe('Class', () => {

    const hydraClass = {
        '@id': 'http://example.com/vocab#SomeClass',
        '@context': Core.Context,
        'supportedProperty': [{}],
        'supportedOperation': [{}]
    };

    describe('getting operations', () => {

        async(it, 'should return operations', async () => {
            // then
            const compacted = await jsonld.compact(hydraClass, {});

            // when
            const clas = new Class(compacted);

            // then
            expect(clas.supportedOperations.length).toBe(1);
        });

        it('should return empty array if property is missing', () => {
            const clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass'
            });

            expect(clas.supportedOperations.length).toBe(0);
        });

        it('should return empty array if property is null', () => {
            const clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass',
                'http://www.w3.org/ns/hydra/core#supportedOperation': null
            });

            expect(clas.supportedOperations.length).toBe(0);
        });

    });

    describe('getting properties', () => {

        async(it, 'should return properties', async () => {
            // given
            const compacted = await jsonld.compact(hydraClass, {});

            // when
            const clas = new Class(compacted);

            // then
            expect(clas.supportedProperties.length).toBe(1);
        });

        it('should return empty array if property is missing', () => {
            const clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass'
            });

            expect(clas.supportedProperties.length).toBe(0);
        });

        it('should return empty array if property is null', () => {
            const clas = new Class({
                '@id': 'http://example.com/vocab#SomeClass',
                'http://www.w3.org/ns/hydra/core#supportedProperty': null
            });

            expect(clas.supportedProperties.length).toBe(0);
        });
    });

});

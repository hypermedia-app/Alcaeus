import 'core-js/es6/weak-map';
import {SupportedProperty} from "../src/ApiDocumentation";
import {Core} from '../src/Constants';

describe('SupportedProperty', () => {

    it('is readable if unspecified', () => {
        var prop = new SupportedProperty({ });

        expect(prop.readable).toBe(true);
    });

    it('can be made non readable', () => {
        var prop = new SupportedProperty({ 'http://www.w3.org/ns/hydra/core#readable': false });

        expect(prop.readable).toBe(false);
    });

    it('is writable if unspecified', () => {
        var prop = new SupportedProperty({});

        expect(prop.writable).toBe(true);
    });

    it('can be made non writable', () => {
        var prop = new SupportedProperty({ 'http://www.w3.org/ns/hydra/core#writable': false });

        expect(prop.writable).toBe(false);
    });

    it('is not required by default', () => {
        var prop = new SupportedProperty({ });

        expect(prop.required).toBe(false);
    });

    it('can be made required', () => {
        var prop = new SupportedProperty({ 'http://www.w3.org/ns/hydra/core#required': true });

        expect(prop.required).toBe(true);
    });

    it('should give access to property', () => {
        var jsonLd =  {
            'http://www.w3.org/ns/hydra/core#property': {
                '@id': 'http://example.com/property',
                'http://www.w3.org/2000/01/rdf-schema#range': {
                    '@id': 'http://www.w3.org/2001/XMLSchema#string'
                }
            }
        };
        var prop = new SupportedProperty(jsonLd);

        expect(prop.property['@id']).toBe('http://example.com/property');
        expect(prop.property['http://www.w3.org/2000/01/rdf-schema#range']['@id']).toBe('http://www.w3.org/2001/XMLSchema#string');
    });
});
import {Mixin} from "../../src/Resources/SupportedProperty";
import Resource from "../../src/Resources/Resource";

class SupportedProperty extends Mixin(Resource) {
}

describe('SupportedProperty', () => {

    it('is readable if unspecified', () => {
        const prop = new SupportedProperty({});

        expect(prop.readable).toBe(true);
    });

    it('can be made non readable', () => {
        const prop = new SupportedProperty({'http://www.w3.org/ns/hydra/core#readable': false});

        expect(prop.readable).toBe(false);
    });

    it('is writable if unspecified', () => {
        const prop = new SupportedProperty({});

        expect(prop.writable).toBe(true);
    });

    it('can be made non writable', () => {
        const prop = new SupportedProperty({'http://www.w3.org/ns/hydra/core#writable': false});

        expect(prop.writable).toBe(false);
    });

    it('is not required by default', () => {
        const prop = new SupportedProperty({});

        expect(prop.required).toBe(false);
    });

    it('can be made required', () => {
        const prop = new SupportedProperty({'http://www.w3.org/ns/hydra/core#required': true});

        expect(prop.required).toBe(true);
    });

    it('should give access to property', () => {
        const jsonLd = {
            'http://www.w3.org/ns/hydra/core#property': {
                '@id': 'http://example.com/property',
                'http://www.w3.org/2000/01/rdf-schema#range': {
                    '@id': 'http://www.w3.org/2001/XMLSchema#string'
                }
            }
        };
        const prop = new SupportedProperty(jsonLd);

        expect(prop.property['@id']).toBe('http://example.com/property');
        expect(prop.property['http://www.w3.org/2000/01/rdf-schema#range']['@id']).toBe('http://www.w3.org/2001/XMLSchema#string');
    });
});

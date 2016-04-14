import {SupportedProperty, ApiDocumentation} from "../src/ApiDocumentation";

describe('SupportedProperty', () => {

    var apiDoc = new ApiDocumentation('', {});

    it('is readable if unspecified', () => {
        var prop = new SupportedProperty({ }, apiDoc);

        expect(prop.readable).toBe(true);
    });

    it('can be made non readable', () => {
        var prop = new SupportedProperty({ 'readable': false }, apiDoc);

        expect(prop.readable).toBe(false);
    });

    it('is writable if unspecified', () => {
        var prop = new SupportedProperty({}, apiDoc);

        expect(prop.writable).toBe(true);
    });

    it('can be made non writable', () => {
        var prop = new SupportedProperty({ 'writable': false }, apiDoc);

        expect(prop.writable).toBe(false);
    });

    it('is not required by default', () => {
        var prop = new SupportedProperty({ }, apiDoc);

        expect(prop.required).toBe(false);
    });

    it('can be made required', () => {
        var prop = new SupportedProperty({ required: true }, apiDoc);

        expect(prop.required).toBe(true);
    });

    it('should give access to property', () => {
        var jsonLd =  {
            'property': {
                '@id': 'http://example.com/property',
                'range': 'xsd:string'
            }
        };
        var prop = new SupportedProperty(jsonLd, apiDoc);

        expect(prop.property['@id']).toBe('http://example.com/property');
        expect(prop.property.range).toBe('xsd:string');
    });
});
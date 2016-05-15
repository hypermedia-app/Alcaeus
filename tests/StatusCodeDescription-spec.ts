import {StatusCodeDescription} from "../src/ApiDocumentation";

describe('StatusCodeDescription', () => {

    it('should have code', () => {
        var prop = new StatusCodeDescription({ 'http://www.w3.org/ns/hydra/core#code': 200 });

        expect(prop.code).toBe(200);
    });

    it('should have description', () => {
        var prop = new StatusCodeDescription({ 'http://www.w3.org/ns/hydra/core#description': 'the test' });

        expect(prop.description).toBe('the test');
    });

    it('should have empty description if missing', () => {
        var prop = new StatusCodeDescription({ });

        expect(prop.description).toBe('');
    });

});
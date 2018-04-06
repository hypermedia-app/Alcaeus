import {Mixin} from '../../src/Resources/Mixins/StatusCodeDescription';
import Resource from '../../src/Resources/Resource';

class StatusCodeDescription extends Mixin(Resource) {}

describe('StatusCodeDescription', () => {
    it('should have code', () => {
        const prop = new StatusCodeDescription({'http://www.w3.org/ns/hydra/core#code': 200});

        expect(prop.code).toBe(200);
    });

    it('should have description', () => {
        const prop = new StatusCodeDescription({'http://www.w3.org/ns/hydra/core#description': 'the test'});

        expect(prop.description).toBe('the test');
    });

    it('should have empty description if missing', () => {
        const prop = new StatusCodeDescription({});

        expect(prop.description).toBe('');
    });
});

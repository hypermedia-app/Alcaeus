import Resource from '../../src/Resources/Resource';
import {Bodies} from '../test-objects';

describe('Resource', () => {
    describe('id', () => {
        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'id').enumerable)
                .toBe(false);
        });

    });

    describe('types', () => {
        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'types').enumerable)
                .toBe(false);
        });

        it('should return array for single @type', () => {

            const resource = new Resource(Bodies.someJsonLdExpanded);

            expect(resource.types.length).toBe(1);
        });

        it('should return all @types', () => {
            const resource = new Resource(Bodies.multipleTypesExpanded);

            expect(resource['@type'].length).toBe(2);
        });

        it('should return empty array when undefined', () => {
            const resource = new Resource({}, null);

            expect(Array.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(0);
        });
    });
});

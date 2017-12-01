import CollectionMixin from '../../src/Resources/Collection';
import {Core} from "../../src/Constants";
import Resource from "../../src/Resources/Resource";

class Collection extends CollectionMixin(Resource) {}

describe('Collection', () => {
    describe('members', () => {
        it('should return array even for one member', () => {
            // given
            const collectionBody = {};
            collectionBody[Core.Vocab('member')] = { text: 'hello' };
            const collection = new Collection(collectionBody);

            // then
            expect(Array.isArray(collection.members)).toBe(true);
            expect(collection.members[0]['text']).toBe('hello');
        });

        it('should be non-enumerable', () => {
            expect(Collection.prototype.propertyIsEnumerable('members'))
                .toBe(false);
        });
    });

    describe('views', () => {
        it('should return empty array when views are missing', () => {
            // given
            const collectionBody = {};
            const collection = new Collection(collectionBody);

            // then
            expect(Array.isArray(collection.views)).toBe(true);
            expect(collection.views.length).toBe(0);
        });

        it('should return empty array when views is null', () => {
            // given
            const collectionBody = {};
            collectionBody[Core.Vocab('view')] = null;
            const collection = new Collection(collectionBody);

            // then
            expect(Array.isArray(collection.views)).toBe(true);
            expect(collection.views.length).toBe(0);
        });

        it('should be non-enumerable', () => {
            expect(Collection.prototype.propertyIsEnumerable('views'))
                .toBe(false);
        });
    });
});

import * as Hydra from '../src/Resources';
import {Core} from '../src/Constants';
import {Bodies} from './test-objects';
import 'core-js/es6/object';

describe('PartialCollectionView', () => {

    it('should link to the collection', () => {
        const collection = {};

        const pcv = new Hydra.PartialCollectionView(null, Bodies.hydraCollectionWithView['hydra:view'], null, [
            {
                subjectId: 'http://some.id',
                predicate: Core.Vocab.view,
                subject: collection
            }
        ]);

        expect(Object.is(collection, pcv.collection)).toBe(true);
    });

    it('should contain null links to other pages if missing', () => {
        const pcv = new Hydra.PartialCollectionView(null, {}, null, []);

        expect(pcv.next).toBe(null);
        expect(pcv.previous).toBe(null);
        expect(pcv.first).toBe(null);
        expect(pcv.last).toBe(null);
    });

    it('should contain null links to other pages if missing', () => {
        const pcv = new Hydra.PartialCollectionView(null, Bodies.hydraCollectionWithView['hydra:view'], null, []);

        expect(pcv.next).toBe('http://example.com/resource?page=4');
        expect(pcv.previous).toBe('http://example.com/resource?page=2');
        expect(pcv.first).toBe('http://example.com/resource?page=1');
        expect(pcv.last).toBe('http://example.com/resource?page=58');
    });

    it('first should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(Hydra.PartialCollectionView.prototype, 'first').enumerable)
            .toBe(false);
    });

    it('last should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(Hydra.PartialCollectionView.prototype, 'last').enumerable)
            .toBe(false);
    });

    it('next should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(Hydra.PartialCollectionView.prototype, 'next').enumerable)
            .toBe(false);
    });

    it('previous should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(Hydra.PartialCollectionView.prototype, 'previous').enumerable)
            .toBe(false);
    });

    it('collection should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(Hydra.PartialCollectionView.prototype, 'collection').enumerable)
            .toBe(false);
    });
});

describe('Collection', () => {
    it('should return array even for one member', () => {
        // given
        const collectionBody = {};
        collectionBody[Core.Vocab.member] = { text: 'hello' };
        const collection = new Hydra.Collection(null, collectionBody, null, []);

        // then
        expect(Array.isArray(collection.members)).toBe(true);
        expect(collection.members[0]['text']).toBe('hello');
    });
});

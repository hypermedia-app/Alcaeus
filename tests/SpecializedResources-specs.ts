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
    describe('members', () => {
        it('should return array even for one member', () => {
        // given
        const collectionBody = {};
        collectionBody[Core.Vocab.member] = { text: 'hello' };
        const collection = new Hydra.Collection(null, collectionBody, null, []);

        // then
        expect(Array.isArray(collection.members)).toBe(true);
        expect(collection.members[0]['text']).toBe('hello');
    });

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Hydra.Collection.prototype, 'members').enumerable)
                .toBe(false);
        });
    });

    describe('views', () => {
        it('should return empty array when views are missing', () => {
            // given
            const collectionBody = {};
            const collection = new Hydra.Collection(null, collectionBody, null, []);

            // then
            expect(Array.isArray(collection.views)).toBe(true);
            expect(collection.views.length).toBe(0);
        });

        it('should return empty array when views is null', () => {
            // given
            const collectionBody = {};
            collectionBody[Core.Vocab.view] = null;
            const collection = new Hydra.Collection(null, collectionBody, null, []);

            // then
            expect(Array.isArray(collection.views)).toBe(true);
            expect(collection.views.length).toBe(0);
        });

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Hydra.Collection.prototype, 'views').enumerable)
                .toBe(false);
        });
    });
});

describe('IriTemplate', () => {
    describe('mappings', () => {
        it('should return empty array even for one mapping', () => {
            // given
            const body = {};
            body[Core.Vocab.mapping] = {};
            const iriTemplate = new Hydra.IriTemplate(body);

            // then
            expect(Array.isArray(iriTemplate.mappings)).toBe(true);
            expect(iriTemplate.mappings.length).toBe(0);
        });

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Hydra.IriTemplate.prototype, 'mappings').enumerable)
                .toBe(false);
        });
    });

    describe('variableRepresentation', () => {
        it('should return BasicRepresentation if missing', () => {
            // given
            const body = {};
            const iriTemplate = new Hydra.IriTemplate(body);

            // then
            expect(iriTemplate.variableRepresentation).toBe('BasicRepresentation');
        });

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Hydra.IriTemplate.prototype, 'variableRepresentation').enumerable)
                .toBe(false);
        });
    });
});

describe('IriTemplateMapping', () => {

    describe('required', () => {
        it('should return true if missing', () => {
            // given
            const body = {};
            const iriTemplate = new Hydra.IriTemplateMapping(body);

            // then
            expect(iriTemplate.required).toBe(false);
        });

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Hydra.IriTemplateMapping.prototype, 'required').enumerable)
                .toBe(false);
        });
    });
});

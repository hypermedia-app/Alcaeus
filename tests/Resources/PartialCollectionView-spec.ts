import {Core} from '../../src/Constants';
import {Bodies} from '../test-objects';
import 'core-js/es6/object';
import PartialCollectionViewMixin from '../../src/Resources/PartialCollectionView';
import HydraResource from "../../src/Resources/HydraResource";

class PartialCollectionView extends PartialCollectionViewMixin(HydraResource) {}

describe('PartialCollectionView', () => {

    it('should link to the collection', () => {
        const collection = {};

        const pcv = new PartialCollectionView(null, Bodies.hydraCollectionWithView['hydra:view'], null, [
            {
                subjectId: 'http://some.id',
                predicate: Core.Vocab.view,
                subject: collection
            }
        ]);

        expect(Object.is(collection, pcv.collection)).toBe(true);
    });

    it('should contain null links to other pages if missing', () => {
        const pcv = new PartialCollectionView(null, {}, null, []);

        expect(pcv.next).toBe(null);
        expect(pcv.previous).toBe(null);
        expect(pcv.first).toBe(null);
        expect(pcv.last).toBe(null);
    });

    it('should contain null links to other pages if missing', () => {
        const pcv = new PartialCollectionView(null, Bodies.hydraCollectionWithView['hydra:view'], null, []);

        expect(pcv.next).toBe('http://example.com/resource?page=4');
        expect(pcv.previous).toBe('http://example.com/resource?page=2');
        expect(pcv.first).toBe('http://example.com/resource?page=1');
        expect(pcv.last).toBe('http://example.com/resource?page=58');
    });

    it('first should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(PartialCollectionViewMixin, 'first').enumerable)
            .toBe(false);
    });

    it('last should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(PartialCollectionViewMixin, 'last').enumerable)
            .toBe(false);
    });

    it('next should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(PartialCollectionViewMixin, 'next').enumerable)
            .toBe(false);
    });

    it('previous should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(PartialCollectionViewMixin, 'previous').enumerable)
            .toBe(false);
    });

    it('collection should be nonenumerable', () => {
        expect(Object.getOwnPropertyDescriptor(PartialCollectionViewMixin, 'collection').enumerable)
            .toBe(false);
    });
});

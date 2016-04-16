'use strict';

import * as Hydra from '../src/heracles';
import {Core} from '../src/Constants';
import {Bodies} from './test-objects';

describe('PartialCollectionView', () => {

    it('should link to the collection', () => {
        var collection = {};

        var pcv = new Hydra.PartialCollectionView(Bodies.hydraCollectionWithView['hydra:view'], null, [
            {
                subjectId: 'http://some.id',
                predicate: Core.Vocab.view,
                subject: collection
            }
        ]);

        expect(Object.is(collection, pcv.collection)).toBe(true);
    });

    it('should contain null links to other pages if missing', () => {
        var pcv = new Hydra.PartialCollectionView({}, null, []);

        expect(pcv.next).toBe(null);
        expect(pcv.previous).toBe(null);
        expect(pcv.first).toBe(null);
        expect(pcv.last).toBe(null);
    });

    it('should contain null links to other pages if missing', () => {
        var pcv = new Hydra.PartialCollectionView(Bodies.hydraCollectionWithView['hydra:view'], null, []);

        expect(pcv.next).toBe('http://example.com/resource?page=4');
        expect(pcv.previous).toBe('http://example.com/resource?page=2');
        expect(pcv.first).toBe('http://example.com/resource?page=1');
        expect(pcv.last).toBe('http://example.com/resource?page=58');
    });

});
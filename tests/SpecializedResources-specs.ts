'use strict';

import * as Hydra from '../src/heracles';
import {Core} from '../src/Constants';

describe('PartialCollectionView', () => {

    var pcvJson = {
        '@id': '/markus/friends?page=3',
        '@type': 'http://www.w3.org/ns/hydra/core#PartialCollectionView',
        'http://www.w3.org/ns/hydra/core#totalItems': 10,
        'http://www.w3.org/ns/hydra/core#first': '/markus/friends?page=1',
        'http://www.w3.org/ns/hydra/core#previous': '/markus/friends?page=2',
        'http://www.w3.org/ns/hydra/core#next': '/markus/friends?page=4',
        'http://www.w3.org/ns/hydra/core#last': '/markus/friends?page=58'
    };
    
    it('should link to the collection', () => {
        var collection = {};

        var pcv = new Hydra.PartialCollectionView(pcvJson, null, [
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
        var pcv = new Hydra.PartialCollectionView(pcvJson, null, []);

        expect(pcv.next).toBe('/markus/friends?page=4');
        expect(pcv.previous).toBe('/markus/friends?page=2');
        expect(pcv.first).toBe('/markus/friends?page=1');
        expect(pcv.last).toBe('/markus/friends?page=58');
    });

});
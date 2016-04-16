'use strict';

import * as Hydra from '../src/heracles';
import {Core} from '../src/Constants';

describe('PartialCollectionView', () => {

    var pcvJson = {
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

});
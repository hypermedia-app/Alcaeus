'use strict';

import {Core} from '../src/Constants';
import * as Hydra from '../src/heracles';

describe('ResourceFactory', () => {

    var apiDoc;

    it('should create PartialCollectionView', () => {
        var pcv = {
            '@type': Core.Vocab.PartialCollectionView
        };

        var resource = Hydra.ResourceFactory.instance.createResource(pcv, apiDoc, []);

        expect(resource instanceof Hydra.PartialCollectionView).toBe(true);
    });

});
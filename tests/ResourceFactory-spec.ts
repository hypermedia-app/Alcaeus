'use strict';

import {Core} from '../src/Constants';
import {ResourceFactory} from '../src/ResourceFactory';
import * as specialized from '../src/SpecializedResources';

describe('ResourceFactory', () => {

    var apiDoc;

    it('should create PartialCollectionView', () => {
        var pcv = {
            '@type': Core.Vocab.PartialCollectionView
        };

        var resource = ResourceFactory.instance.createResource(pcv, apiDoc, []);

        expect(resource instanceof specialized.PartialCollectionView).toBe(true);
    });

});
'use strict';

import {Core} from '../src/Constants';
import {ResourceFactory} from '../src/ResourceFactory';
import * as resources from '../src/Resources';

describe('ResourceFactory', () => {

    var apiDoc;
    var factory = new ResourceFactory();

    it('should create PartialCollectionView', () => {
        var pcv = {
            '@type': Core.Vocab.PartialCollectionView
        };

        var resource = factory.createResource(pcv, apiDoc, []);

        expect(resource instanceof resources.PartialCollectionView).toBe(true);
    });

});
'use strict';

import * as _ from 'lodash';
import {Core} from '../src/Constants';
import {ResourceFactory} from '../src/ResourceFactory';
import * as resources from '../src/Resources';
import * as documentationTypes from '../src/ApiDocumentation';

describe('ResourceFactory', () => {

    var apiDoc;
    var factory = new ResourceFactory();

    describe('createResource', () => {

        var constructedTypes = {};
        constructedTypes[Core.Vocab.PartialCollectionView] = res => res instanceof resources.PartialCollectionView;
        constructedTypes[Core.Vocab.ApiDocumentation] = res => res instanceof documentationTypes.ApiDocumentation;
        constructedTypes[Core.Vocab.Class] = res => res instanceof documentationTypes.Class;
        constructedTypes[Core.Vocab.SupportedProperty] = res => res instanceof documentationTypes.SupportedProperty;
        constructedTypes[Core.Vocab.Operation] = res => res instanceof documentationTypes.Operation;

        _.toPairs(constructedTypes).forEach(typePair => {
            (function(typeId, isOfCorrectType) {
                it('should create typed instance for ' + typeId, function() {
                    var jsonLd = {
                        '@type': typeId
                    };

                    var resource = factory.createResource(null, jsonLd, apiDoc, []);

                    expect(isOfCorrectType(resource)).toBe(true);
                });
            })(typePair[0], typePair[1]);
        });

    });

});
'use strict';

import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import {rdf} from 'linkeddata-vocabs';
import {Core} from '../src/Constants';
import {ResourceFactory} from '../src/ResourceFactory';
import * as resources from '../src/Resources';
import * as documentationTypes from '../src/ApiDocumentation';

describe('ResourceFactory', () => {

    var apiDoc;
    var factory;

    beforeEach(() => factory = new ResourceFactory());

    describe('createResource', () => {

        var constructedTypes = {};
        constructedTypes[Core.Vocab.PartialCollectionView] = res => res instanceof resources.PartialCollectionView;
        constructedTypes[Core.Vocab.ApiDocumentation] = res => res instanceof documentationTypes.ApiDocumentation;
        constructedTypes[Core.Vocab.Class] = res => res instanceof documentationTypes.Class;
        constructedTypes[Core.Vocab.SupportedProperty] = res => res instanceof documentationTypes.SupportedProperty;
        constructedTypes[Core.Vocab.Operation] = res => res instanceof documentationTypes.SupportedOperation;
        constructedTypes[Core.Vocab.StatusCodeDescription] = res => res instanceof documentationTypes.StatusCodeDescription;
        constructedTypes[rdf.ns + 'Property'] = res => res instanceof documentationTypes.RdfProperty;

        _.toPairs(constructedTypes).forEach(typePair => {
            (function (typeId, isOfCorrectType) {
                it('should create typed instance for ' + typeId, function () {
                    var jsonLd = {
                        '@type': typeId
                    };

                    var resource = factory.createResource(null, jsonLd, apiDoc, []);

                    expect(isOfCorrectType(resource)).toBe(true);
                });
            })(typePair[0], typePair[1]);
        });

        it('should create typed instance for type expressed as array', function () {
            var jsonLd = {
                '@type': [ Core.Vocab.SupportedProperty, Core.Vocab.Class ]
            };

            var resource = factory.createResource(null, jsonLd, apiDoc, []);

            expect(resource instanceof documentationTypes.SupportedProperty).toBe(true);
        });
        
    });

});
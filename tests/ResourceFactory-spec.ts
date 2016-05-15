'use strict';

import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import {rdf} from 'jasnell/linkeddata-vocabs';
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
        constructedTypes[Core.Vocab.Operation] = res => res instanceof documentationTypes.Operation;

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

        it('should created typed instance when inferred from incoming link', () => {
            var property = {'@id': '_:b1'};
            var supportedClass = {};
            supportedClass[Core.Vocab.supportedProperty] = {'@id': '_:b1'};
            factory.propertyRangeMappings = {};
            factory.propertyRangeMappings[Core.Vocab.supportedProperty] = Core.Vocab.SupportedProperty;

            var resource = factory.createResource(null, property, apiDoc, [supportedClass]);

            expect(resource instanceof documentationTypes.SupportedProperty).toBe(true);
        });

    });

    describe('propertyRangeMappings', () => {

        var mappedProperties = [
            [Core.Vocab.supportedClass, Core.Vocab.Class],
            [Core.Vocab.statusCodes, Core.Vocab.StatusCodeDescription],
            [Core.Vocab.supportedProperty, Core.Vocab.SupportedProperty],
            [Core.Vocab.supportedOperation, Core.Vocab.Operation],
            [Core.Vocab.operation, Core.Vocab.Operation],
            [Core.Vocab.expects, Core.Vocab.Operation],
            [Core.Vocab.returns, Core.Vocab.Operation],
            [Core.Vocab.mapping, Core.Vocab.IriTemplateMapping],
            [Core.Vocab.property, rdf.ns + 'Property']
        ];

        _.forEach(mappedProperties, typePair => {
            (function (predicate, expectedRange) {
                it('should include map for ' + predicate, function () {
                    var range = factory.propertyRangeMappings[predicate];

                    expect(range).toBe(expectedRange);
                });
            })(typePair[0], typePair[1]);
        });
    });

});
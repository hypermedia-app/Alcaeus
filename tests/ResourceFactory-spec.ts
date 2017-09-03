import { entries } from 'core-js/es7/object';
import {rdf} from '../src/Vocabs';
import {Core} from '../src/Constants';
import {ResourceFactory} from '../src/ResourceFactory';
import * as resources from '../src/Resources';
import * as documentationTypes from '../src/ApiDocumentation';

describe('ResourceFactory', () => {

    let apiDoc;
    let factory;

    beforeEach(() => factory = new ResourceFactory());

    describe('createResource', () => {

        const constructedTypes = {};
        constructedTypes[Core.Vocab.PartialCollectionView] = res => res instanceof resources.PartialCollectionView;
        constructedTypes[Core.Vocab.ApiDocumentation] = res => res instanceof documentationTypes.ApiDocumentation;
        constructedTypes[Core.Vocab.Class] = res => res instanceof documentationTypes.Class;
        constructedTypes[Core.Vocab.SupportedProperty] = res => res instanceof documentationTypes.SupportedProperty;
        constructedTypes[Core.Vocab.Operation] = res => res instanceof documentationTypes.SupportedOperation;
        constructedTypes[Core.Vocab.StatusCodeDescription] = res => res instanceof documentationTypes.StatusCodeDescription;
        constructedTypes[rdf.Property] = res => res instanceof documentationTypes.RdfProperty;

        entries(constructedTypes).forEach(typePair => {
            (function (typeId, isOfCorrectType) {
                it('should create typed instance for ' + typeId, function () {
                    const jsonLd = {
                        '@type': typeId
                    };

                    const resource = factory.createResource(null, jsonLd, apiDoc, {});

                    expect(isOfCorrectType(resource)).toBe(true);
                });
            })(typePair[0], typePair[1]);
        });

        it('should create typed instance for type expressed as array', function () {
            const jsonLd = {
                '@type': [Core.Vocab.SupportedProperty, Core.Vocab.Class]
            };

            const resource = factory.createResource(null, jsonLd, apiDoc, {});

            expect(resource instanceof documentationTypes.SupportedProperty).toBe(true);
        });

    });

});

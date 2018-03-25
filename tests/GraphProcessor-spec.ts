import * as _ from 'lodash';
import * as n3parser from 'rdf-parser-n3';
import {async} from './test-utils';
import {Bodies} from './test-objects';
import {parseAndNormalizeGraph, addParsers} from '../src/GraphProcessor';
import {Core, MediaTypes} from '../src/Constants';
import {rdf} from '../src/Vocabs';

describe('GraphProcessor', () => {
    describe('parseAndNormalizeGraph', () => {
        async(it, 'should expand json-ld', async () => {
            // given
            const body =  JSON.stringify(Bodies.someJsonLd);

            // when
            const res = await parseAndNormalizeGraph(body, 'http://example.com/resource', MediaTypes.jsonLd);

            // then
            expect(res[0]['http://example.com/vocab#prop']).toBe('some textual value');
        });

        async(it, 'should parse non-json-ld response', async () => {
            // given
            addParsers({
                [MediaTypes.ntriples]: n3parser
            });
            const body = Bodies.ntriples;

            // when
            const res = await parseAndNormalizeGraph(body,'http://example.com/resource', MediaTypes.ntriples);

            // then
            expect(res[0]['http://example.com/vocab#prop']).toBe('some textual value');
        });

        async(it, 'should parse json-ld response when media type has additional parameters', async () => {
            // given
            const body = JSON.stringify(Bodies.someJsonLd);

            // when
            const res = await parseAndNormalizeGraph(body,'http://example.com/resource', 'application/ld+json; charset=utf-8');

            // then
            expect(res[0]['http://example.com/vocab#prop']).toBe('some textual value');
        });

        describe('processing api documentation', () => {

            const inferredTypes = [
                [Core.Vocab('supportedClass'), Core.Vocab('Class')],
                [Core.Vocab('expects'), Core.Vocab('Class')],
                [Core.Vocab('returns'), Core.Vocab('Class')],
                [Core.Vocab('supportedOperation'), Core.Vocab('Operation')],
                [Core.Vocab('operation'), Core.Vocab('Operation')],
                [Core.Vocab('supportedProperty'), Core.Vocab('SupportedProperty')],
                [Core.Vocab('statusCodes'), Core.Vocab('StatusCodeDescription')],
                [Core.Vocab('property'), rdf.Property],
                [Core.Vocab('mapping'), Core.Vocab('IriTemplateMapping')],
            ];

            _.forEach(inferredTypes, typePair => {
                (function(prop, type) {
                    async(it, 'should add inferences for property ' + prop, async () => {
                        // given
                        const obj = {'@id': 'http://example.com/resource'};
                        obj[prop] = { '@id': 'http://example.com/child' };

                        // when
                        const res = await parseAndNormalizeGraph(JSON.stringify(obj), 'http://example.com/resource', MediaTypes.jsonLd);

                        // then
                        const child = Object.values(res).find(r => r['@id'] === 'http://example.com/child');

                        expect(child['@type']).toBeDefined();
                        expect(child['@type']).toBe(type);
                    });
                })(typePair[0], typePair[1]);
            });

        });
    });
});

import * as _ from 'lodash';
import * as n3parser from 'rdf-parser-n3';
import {Core, JsonLd, MediaTypes} from '../../src/Constants';
import RdfProcessor from '../../src/MediaTypeProcessors/RdfProcessor';
import {rdf} from '../../src/Vocabs';
import {Bodies, Documentations} from '../test-objects';
import {mockedResponse, responseBuilder} from '../test-utils';

describe('RdfProcessor', () => {
    let processor;

    beforeEach(() => {
        const resourceFactory = {
            createResource: (v) => {
                v.id = v[JsonLd.Id];
                return v;
            },
        };
        processor = new RdfProcessor(resourceFactory);
    });

    describe('process', () => {

        it('should turn JSON-LD into linked objects', async () => {
            // given
            const response = await mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
            });

            // when
            const hydraResponse = await processor.process({}, 'http://example.com/resource', response, {});
            const res = hydraResponse['http://example.com/resource'];

            // then
            const sameObj = Object.is(res['http://example.com/vocab#other'], res['http://example.com/vocab#other_yet']);
            expect(sameObj).toBe(true);
            expect(res['http://example.com/vocab#other']['@id']).toBe('http://example.com/linked');
        });

        it('should expand json-ld', async () => {
            // given
            const response = await mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
            });

            // when
            const rep = await processor.process({}, 'http://example.com/resource', response, {});
            const res = rep['http://example.com/resource'];

            // then
            expect(res['http://example.com/vocab#prop']).toBe('some textual value');
        });

        it('should turn JSON-LD into linked objects', async () => {
            // given
            const response = await mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
            });

            // when
            const rep = await processor.process({}, 'http://example.com/resource', response, {});
            const res = rep['http://example.com/resource'];

            // then
            const sameObj = Object.is(res['http://example.com/vocab#other'], res['http://example.com/vocab#other_yet']);
            expect(sameObj).toBe(true);
            expect(res['http://example.com/vocab#other']['@id']).toBe('http://example.com/linked');
        });

        it('should turn object with arrays into matching object graph', async () => {
            // given
            const response = await mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.hydraCollection),
            });

            // when
            const rep = await processor.process({}, 'http://example.com/resource', response, {});
            const res = rep['http://example.com/resource'];

            // then
            expect(res[Core.Vocab('member')].length).toBe(4);
        });

        it('should return type ApiDocumentation when @type is not defined', async () => {
            // given
            const response = await mockedResponse({
                xhrBuilder: responseBuilder().body(Documentations.untyped),
            });

            // when
            const rep = await processor.process({}, 'http://api.example.com/doc/', response, {});
            const doc = rep['http://api.example.com/doc/'];

            // then
            expect(doc['@id']).toBe('http://api.example.com/doc/');
        });

        it('should parse non-json-ld response', async () => {
            // given
            const response = await mockedResponse({
                xhrBuilder: responseBuilder().body(Bodies.ntriples, MediaTypes.ntriples),
            });
            processor.addParsers({
                [MediaTypes.ntriples]: n3parser,
            });

            // when
            const rep = await processor.process({}, 'http://example.com/resource', response, {});
            const res = rep['http://example.com/resource'];

            // then
            expect(res['http://example.com/vocab#prop']).toBe('some textual value');
        });

        it('should parse json-ld response when media type has additional parameters', async () => {
            // given
            const response = await mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.someJsonLd, 'application/ld+json; charset=utf-8'),
                });

            // when
            const rep = await processor.process({}, 'http://example.com/resource', response, {});
            const res = rep['http://example.com/resource'];

            // then
            expect(res['http://example.com/vocab#prop']).toBe('some textual value');
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

            _.forEach(inferredTypes, (typePair) => {
                ((prop, type) => {
                    it('should add inferences for property ' + prop, async () => {
                        // given
                        const obj = {'@id': 'http://example.com/resource'};
                        obj[prop] = { '@id': 'http://example.com/child' };
                        const response = await mockedResponse({
                            xhrBuilder: responseBuilder().body(obj),
                        });

                        // when
                        const rep = await processor.process({}, 'http://example.com/resource', response, {});
                        const res = rep['http://example.com/resource'];

                        // then
                        const child = Object.values(res).find((r) => r['@id'] === 'http://example.com/child');

                        expect(child['@type']).toBeDefined();
                        expect(child['@type']).toBe(type);
                    });
                })(typePair[0], typePair[1]);
            });

        });
    });

    describe('canProcess', () => {
        it('should return true for json-ld', () => {
            // when
            const canProcess = processor.canProcess(MediaTypes.jsonLd);

            // then
            expect(canProcess).toBe(true);
        });

        it('should return true for json-ld with parameters', () => {
            // when
            const canProcess = processor.canProcess('application/ld+json; charset=utf-8');

            // then
            expect(canProcess).toBe(true);
        });
    });
});

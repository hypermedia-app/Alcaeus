import 'core-js/es6/array';
import 'core-js/es6/object';
import {promises as jsonld} from 'jsonld';
import * as _ from 'lodash';
import * as sinon from 'sinon';
import {Hydra} from '../src';
import {Core, JsonLd} from '../src/Constants';
import HydraResource from '../src/Resources/HydraResource';
import {ReverseLinks} from '../src/Resources/Maps';
import {Bodies, Documentations} from './test-objects';
import {async} from './test-utils';

describe('Hydra', () => {

    let fetchResource;
    let createResource: sinon.SinonSpy;

    beforeEach(() => {
        createResource = sinon.spy(Hydra.resourceFactory, 'createResource');
        fetchResource = sinon.stub(Hydra.fetchUtil, 'fetchResource');
    });

    describe('loadResource', () => {

        beforeEach(() => {
            fetchResource.withArgs('http://api.example.com/doc/')
                .returns(mockedResponse(Documentations.classWithOperation));
        });

        async(it, 'should return object with matching @id', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            expect(res['@id']).toBe('http://example.com/resource');
            expect(res instanceof HydraResource).toBe(true);
        });

        async(it, 'should return object with matching @id when it is unescaped in response', async () => {
            // given
            fetchResource.withArgs('http://example.com/bia%C5%82a%20g%C4%99%C5%9B')
                .returns(mockedResponse(Bodies.unescapedDiacritics));

            // when
            // http://example.com/biała gęś
            const res = await Hydra.loadResource('http://example.com/bia%C5%82a%20g%C4%99%C5%9B');

            // then
            expect(res['@id']).toBe('http://example.com/bia%C5%82a%20g%C4%99%C5%9B');
            expect(res instanceof HydraResource).toBe(true);
        });

        async(it, 'should return object with matching redirected @id', async () => {
            // given
            fetchResource.withArgs('http://example.com/not-in-response')
                .returns(mockedResponse(Bodies.someJsonLd, true, 'http://example.com/linked'));

            // when
            const res = await Hydra.loadResource('http://example.com/not-in-response');

            // then
            expect(res['@id']).toBe('http://example.com/linked');
            expect(res instanceof HydraResource).toBe(true);
        });

        async(it, 'should load documentation', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            // when
            await Hydra.loadResource('http://example.com/resource');

            // then
            expect(fetchResource.calledWithMatch('http://api.example.com/doc/')).toBe(true);
        });

        async(it, 'should turn JSON-LD into a graph of objects', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            const sameObj = Object.is(res['http://example.com/vocab#other'], res['http://example.com/vocab#other_yet']);
            expect(sameObj).toBe(true);
            expect(res['http://example.com/vocab#other']['@id']).toBe('http://example.com/linked');
        });

        async(it, 'should turn object with arrays into matching object graph', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.hydraCollection));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            expect(res[Core.Vocab('member')].length).toBe(4);
            _.each(res[Core.Vocab('member')], (member) => {
                expect(member instanceof HydraResource).toBe(true);
            });
        });

        async(it, 'should make each nested object a Resource', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.hydraCollection));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            expect(res['http://example.vocab/managedBy'] instanceof HydraResource)
                .toBe(true, 'was ' + JSON.stringify(res['http://example.vocab/managedBy']));
        });

        async(it, 'should load parent of collection view as Resource', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource?page=3')
                .returns(mockedResponse(Bodies.hydraCollectionWithView));

            // when
            const res = await Hydra.loadResource('http://example.com/resource?page=3');

            // then
            expect(res.collection).toBeDefined();
            expect(res.collection).not.toBeNull();
        });

        async(it, 'should fail when resource with given @id doesn\'t exist in the representation', async () => {
            // given
            fetchResource.withArgs('http://example.com/not/there')
                .returns(mockedResponse(Bodies.someJsonLd));

            // when
            try {
                await Hydra.loadResource('http://example.com/not/there');
            } catch (err) {
                expect(err.message).toBe('Resource http://example.com/not/there was not found in the response');
                return;
            }

            throw new Error('loadResource should have failed');
        });

        async(it, 'should discover incoming links for resources', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');
            const incomingLinks = ReverseLinks.get(res['http://example.com/vocab#other']);

            // then
            expect(incomingLinks.length).toBe(2);
            expect(
                _.some(incomingLinks, {
                    predicate: 'http://example.com/vocab#other',
                    subjectId: 'http://example.com/resource' })).toBe(true);
            expect(_.some(incomingLinks, {
                predicate: 'http://example.com/vocab#other_yet',
                subjectId: 'http://example.com/resource',  })).toBe(true);
        });

        async(it, 'should pass each object through ResourceFactory', async () => {
            // given
            fetchResource.withArgs('http://api.example.com/doc/').returns(Promise.reject(null));
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.hydraCollection));

            // when
            await Hydra.loadResource('http://example.com/resource');

            // then
            const ids = _.map(createResource.getCalls(), (call) => {
                return call.args[0]['@id'];
            });
            expect(createResource.callCount)
                .toBe(6, 'Actual calls for: ' + ids);
        });

        async(it, 'should load resource with deep blank node structure', async () => {
            // given
            fetchResource.withArgs('http://example.com/root')
                .returns(mockedResponse(Bodies.deepBlankNodes));

            // when
            const res = await Hydra.loadResource('http://example.com/root');

            // then
            const p = 'http://example.com/prop';
            const t = 'http://example.com/text';

            expect(res[p][p][p][p][t]).toBe('I\'m nested way deep');
        });

        async(it, 'should return typed string literals as their values', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.typedLiteral));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            expect(res['http://schema.org/image']['http://schema.org/contentUrl'])
                .toBe('http://wikibus-test.gear.host/book/1936/image');
        });

        async(it, 'should return typed numeric literals as their values', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.typedNumericLiteral));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            expect(res['http://schema.org/age']).toBe(21);
        });

        async(it, 'should handle cycles', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.cycledResource));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            const objectsAreSame = Object.is(res, res['http://example.com/vocab#prop']['http://example.com/vocab#top']);
            expect(objectsAreSame).toBeTruthy();
        });

        afterEach(() => fetchResource.restore());
    });

    describe('loadDocumentation', () => {

        async(it, 'should return type ApiDocumentation', async () => {
            // given
            fetchResource.withArgs('http://api.example.com/doc/')
                .returns(mockedResponse(Documentations.classWithOperation, false));

            // when
            const doc = await Hydra.loadDocumentation('http://api.example.com/doc/');

            // then
            expect(doc.id).toBe('http://api.example.com/doc/');
        });

        async(it, 'should return type ApiDocumentation when @type is not defined', async () => {
            // given
            fetchResource.withArgs('http://api.example.com/doc/')
                .returns(mockedResponse(Documentations.untyped, false));

            // when
            const doc = await Hydra.loadDocumentation('http://api.example.com/doc/');

            // then
            expect(doc.id).toBe('http://api.example.com/doc/');
        });

        afterEach(() => fetchResource.restore());
    });

    describe('loadResource with missing ApiDocumentation', () => {

        beforeEach(() => {
            fetchResource.withArgs('http://api.example.com/doc/').returns(Promise.reject(null));
        });

        async(it, 'should succeed even if ApiDocumentation is not available', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            expect(res.apiDocumentation).toBe(null);
        });

        afterEach(() => fetchResource.restore());

    });

    afterEach(() => createResource.restore());
});

function mockedResponse(resource, includeDocsLink = true, redirectUrl = null) {
    return jsonld.flatten(resource, {})
        .then((expanded) => ({
            apiDocumentationLink: includeDocsLink ? 'http://api.example.com/doc/' : null,
            resourceIdentifier: redirectUrl,
            resources: expanded[JsonLd.Graph],
        }));
}

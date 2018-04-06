import 'core-js/es6/array';
import 'core-js/es6/object';
import {promises as jsonld} from 'jsonld';
import * as _ from 'lodash';
import * as sinon from 'sinon';
import {Hydra} from '../src';
import HydraResource from "../src/Resources/HydraResource";
import {JsonLd, Core, MediaTypes} from '../src/Constants';
import {Bodies, Documentations} from './test-objects';
import {async, responseBuilder} from './test-utils';
import * as FetchUtil from '../src/FetchUtil';
import * as GraphProcessor from '../src/GraphProcessor';
import {IResponseWrapper} from '../src/ResponseWrapper';
import {IPartialCollectionView} from '../src/interfaces';
import {ReverseLinks} from '../src/Resources/Maps';

describe('Hydra', () => {

    let fetchResource;
    let createResource, parseAndNormalizeGraph;

    beforeEach(() => {
        createResource = sinon.spy(Hydra.resourceFactory, 'createResource');
        fetchResource = sinon.stub(FetchUtil, 'fetchResource');
        parseAndNormalizeGraph = sinon.stub(GraphProcessor, 'parseAndNormalizeGraph');
    });

    describe('loadResource', () => {

        beforeEach(() => {
            fetchResource.withArgs('http://api.example.com/doc/')
                .returns(mockedResponse());
            parseAndNormalizeGraph.withArgs('', 'http://api.example.com/doc/', MediaTypes.jsonLd)
                .returns(expanded(Documentations.classWithOperation));
        });

        async(it, 'should return the requested uri back', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.someJsonLd));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            expect(res.requestedUri).toBe('http://example.com/resource');
        });

        async(it, 'should return object with matching @id when it is unescaped in response', async () => {
            // given
            const id = 'http://example.com/bia%C5%82a%20g%C4%99%C5%9B'; // http://example.com/biała gęś
            fetchResource.withArgs(id)
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.unescapedDiacritics));

            // when
            const hydraRes = await Hydra.loadResource(id);
            const res = hydraRes.get(id);

            // then
            expect(res['@id']).toBe(id);
            expect(res instanceof HydraResource).toBe(true);
        });

        async(it, 'should load documentation', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.someJsonLd));

            // when
            await Hydra.loadResource('http://example.com/resource');

            // then
            expect(fetchResource.calledWithMatch('http://api.example.com/doc/')).toBe(true);
        });

        async(it, 'should turn JSON-LD into linked objects', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.someJsonLd));

            // when
            const hydraResponse = await Hydra.loadResource('http://example.com/resource');
            const res = hydraResponse.get('http://example.com/resource');

            // then
            const sameObj = Object.is(res['http://example.com/vocab#other'], res['http://example.com/vocab#other_yet']);
            expect(sameObj).toBe(true);
            expect(res['http://example.com/vocab#other']['@id']).toBe('http://example.com/linked');
        });

        async(it, 'should turn object with arrays into matching object graph', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.hydraCollection));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');

            // then
            expect(res[Core.Vocab('member')].length).toBe(4);
            _.each(res[Core.Vocab('member')], (member) => {
                expect(member instanceof HydraResource).toBe(true);
            });
        });

        async(it, 'should load parent of collection view as Resource', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource?page=3')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.hydraCollectionWithView));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource?page=3');
            const res = <IPartialCollectionView>hydraRes.get('http://example.com/resource?page=3');

            // then
            expect(res.collection).toBeDefined();
            expect(res.collection).not.toBeNull();
        });

        async(it, 'should discover incoming links for resources', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.someJsonLd));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');
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
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.hydraCollection));

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
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.deepBlankNodes));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/root');
            const res = hydraRes.get('http://example.com/root');

            // then
            const p = 'http://example.com/prop';
            const t = 'http://example.com/text';

            expect(res[p][p][p][p][t]).toBe('I\'m nested way deep');
        });

        async(it, 'should return typed string literals as their values', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.typedLiteral));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');

            // then
            expect(res['http://schema.org/image']['http://schema.org/contentUrl'])
                .toBe('http://wikibus-test.gear.host/book/1936/image');
        });

        async(it, 'should return typed numeric literals as their values', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.typedNumericLiteral));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');

            // then
            expect(res['http://schema.org/age']).toBe(21);
        });

        async(it, 'should handle cycles', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.cycledResource));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');

            // then
            const objectsAreSame = Object.is(res, res['http://example.com/vocab#prop']['http://example.com/vocab#top']);
            expect(objectsAreSame).toBeTruthy();
        });

        afterEach(() => {
            fetchResource.restore();
            parseAndNormalizeGraph.restore();
        });
    });

    describe('loadDocumentation', () => {

        async(it, 'should return type ApiDocumentation', async () => {
            // given
            fetchResource.withArgs('http://api.example.com/doc/')
                .returns(mockedResponse(false));
            parseAndNormalizeGraph.returns(expanded(Documentations.classWithOperation));

            // when
            const doc = await Hydra.loadDocumentation('http://api.example.com/doc/');

            // then
            expect(doc.id).toBe('http://api.example.com/doc/');
        });

        async(it, 'should return type ApiDocumentation when @type is not defined', async () => {
            // given
            fetchResource.withArgs('http://api.example.com/doc/')
                .returns(mockedResponse(false));
            parseAndNormalizeGraph.returns(expanded(Documentations.untyped));

            // when
            const doc = await Hydra.loadDocumentation('http://api.example.com/doc/');

            // then
            expect(doc.id).toBe('http://api.example.com/doc/');
        });

        afterEach(() => {
            fetchResource.restore();
            parseAndNormalizeGraph.restore();
        });
    });

    describe('loadResource with missing ApiDocumentation', () => {

        beforeEach(() => {
            fetchResource.withArgs('http://api.example.com/doc/').returns(Promise.reject(null));
        });

        async(it, 'should succeed even if ApiDocumentation is not available', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse());
            parseAndNormalizeGraph.returns(expanded(Bodies.someJsonLd));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');

            // then
            expect(res.apiDocumentation).toBe(null);
        });

        afterEach(() => {
            fetchResource.restore();
            parseAndNormalizeGraph.restore();
        });

    });

    describe('default root selectors', () => {
        async(it, 'should select by exact id if exists', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(false));
            parseAndNormalizeGraph.returns(expanded(Bodies.someJsonLd));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            expect(res.root.id).toBe('http://example.com/resource');
        });

        async(xit, 'should select resource with redirected id if original is not present', async () => {
            // given
            const requestedUri = 'http://example.com/not-there';
            const redirectUri = 'http://example.com/resource';

            const xhr = responseBuilder().redirect(redirectUri);
            fetchResource.withArgs(requestedUri)
                .returns(mockedResponse(false, xhr));
            parseAndNormalizeGraph.returns(expanded(Bodies.someJsonLd));

            // when
            const res = await Hydra.loadResource('http://example.com/not-there');

            // then
            expect(res.root.id).toBe('http://example.com/resource');
        });

        async(it, 'should select resource with canonical id if original is not present', async () => {
            // given
            const requestedUri = 'http://example.com/not-there';
            const redirectUri = 'http://example.com/resource';

            const xhr = responseBuilder().canonical(redirectUri);
            fetchResource.withArgs(requestedUri)
                .returns(mockedResponse(false, xhr));
            parseAndNormalizeGraph.returns(expanded(Bodies.someJsonLd));

            // when
            const res = await Hydra.loadResource('http://example.com/not-there');

            // then
            expect(res.root.id).toBe('http://example.com/resource');
        });

        afterEach(() => {
            fetchResource.restore();
            parseAndNormalizeGraph.restore();
        });
    });

    afterEach(() => createResource.restore());
});

async function mockedResponse(includeDocsLink = true, xhrBuilder = null): Promise<IResponseWrapper> {
    xhrBuilder = xhrBuilder || responseBuilder();

    return {
        mediaType: MediaTypes.jsonLd,
        xhr: await xhrBuilder.build(),
        apiDocumentationLink: includeDocsLink ? 'http://api.example.com/doc/' : null,
        redirectUrl: null,
    };
}

function expanded(resource) {
    return jsonld.flatten(resource, {})
        .then(expanded => expanded[JsonLd.Graph]);
}

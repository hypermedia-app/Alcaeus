import 'core-js/es6/array';
import 'core-js/es6/object';
import * as _ from 'lodash';
import * as sinon from 'sinon';
import {Hydra} from '../src';
import * as FetchUtil from '../src/FetchUtil';
import {PartialCollectionView} from '../src/Resources';
import {Bodies, Documentations} from './test-objects';
import {mockedResponse, responseBuilder} from './test-utils';

describe('Hydra', () => {

    let fetchResource;

    beforeEach(() => {
        fetchResource = sinon.stub(FetchUtil, 'fetchResource');
    });

    describe('loadResource', () => {

        beforeEach(() => {
            fetchResource.withArgs('http://api.example.com/doc/')
                .returns(mockedResponse({}));
        });

        it('should return object with matching @id when it is unescaped in response', async () => {
            // given
            const id = 'http://example.com/bia%C5%82a%20g%C4%99%C5%9B'; // http://example.com/biała gęś
            fetchResource.withArgs(id)
                .returns(mockedResponse( {
                    xhrBuilder: responseBuilder().body(Bodies.unescapedDiacritics),
                }));

            // when
            const hydraRes = await Hydra.loadResource(id);
            const res = hydraRes.get(id);

            // then
            expect(res['@id']).toBe(id);
        });

        it('should load documentation', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
                }));

            // when
            await Hydra.loadResource('http://example.com/resource');

            // then
            expect(fetchResource.calledWithMatch('http://api.example.com/doc/')).toBe(true);
        });

        it('should load parent of collection view as Resource', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource?page=3')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.hydraCollectionWithView),
                }));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource?page=3');
            const res = hydraRes.get('http://example.com/resource?page=3') as PartialCollectionView;

            // then
            expect(res.collection).toBeDefined();
            expect(res.collection).not.toBeNull();
        });

        it('should discover incoming links for resources', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
                }));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');
            const incomingLinks = res['http://example.com/vocab#other']._links;

            // then
            expect(incomingLinks.length).toBe(2);
            expect(
                _.some(incomingLinks, {
                    predicate: 'http://example.com/vocab#other',
                    subjectId: 'http://example.com/resource' })).toBe(true);
            expect(_.some(incomingLinks, {
                predicate: 'http://example.com/vocab#other_yet',
                subjectId: 'http://example.com/resource'  })).toBe(true);
        });

        it('should load resource with deep blank node structure', async () => {
            // given
            fetchResource.withArgs('http://example.com/root')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.deepBlankNodes),
                }));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/root');
            const res = hydraRes.get('http://example.com/root');

            // then
            const p = 'http://example.com/prop';
            const t = 'http://example.com/text';

            expect(res[p][p][p][p][t]).toBe('I\'m nested way deep');
        });

        it('should return typed string literals as their values', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.typedLiteral),
                }));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');

            // then
            expect(res['http://schema.org/image']['http://schema.org/contentUrl'])
                .toBe('http://wikibus-test.gear.host/book/1936/image');
        });

        it('should return typed numeric literals as their values', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.typedNumericLiteral),
                }));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');

            // then
            expect(res['http://schema.org/age']).toBe(21);
        });

        it('should handle cycles', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.cycledResource),
                }));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');

            // then
            const objectsAreSame = Object.is(res, res['http://example.com/vocab#prop']['http://example.com/vocab#top']);
            expect(objectsAreSame).toBeTruthy();
        });

        afterEach(() => {
            fetchResource.restore();
        });
    });

    describe('loadDocumentation', () => {

        it('should return type ApiDocumentation', async () => {
            // given
            fetchResource.withArgs('http://api.example.com/doc/')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Documentations.classWithOperation),
                }));

            // when
            const doc = await Hydra.loadDocumentation('http://api.example.com/doc/');

            // then
            expect(doc.id).toBe('http://api.example.com/doc/');
        });

        afterEach(() => {
            fetchResource.restore();
        });
    });

    describe('loadResource with missing ApiDocumentation', () => {

        beforeEach(() => {
            fetchResource.withArgs('http://api.example.com/doc/').returns(Promise.reject(null));
        });

        it('should succeed even if ApiDocumentation is not available', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
                }));

            // when
            const hydraRes = await Hydra.loadResource('http://example.com/resource');
            const res = hydraRes.get('http://example.com/resource');

            // then
            expect(res.apiDocumentation).toBe(null);
        });

        afterEach(() => {
            fetchResource.restore();
        });

    });

    describe('default root selectors', () => {
        it('should select by exact id if exists', async () => {
            // given
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse({
                    xhrBuilder: responseBuilder().body(Bodies.someJsonLd),
                }));

            // when
            const res = await Hydra.loadResource('http://example.com/resource');

            // then
            expect(res.root.id).toBe('http://example.com/resource');
        });

        xit('should select resource with redirected id if original is not present', async () => {
            // given
            const requestedUri = 'http://example.com/not-there';
            const redirectUri = 'http://example.com/resource';

            const xhrBuilder = responseBuilder().body(Bodies.someJsonLd).redirect(redirectUri);
            fetchResource.withArgs(requestedUri)
                .returns(mockedResponse({ xhrBuilder }));

            // when
            const res = await Hydra.loadResource('http://example.com/not-there');

            // then
            expect(res.root.id).toBe('http://example.com/resource');
        });

        it('should select resource with canonical id if original is not present', async () => {
            // given
            const requestedUri = 'http://example.com/not-there';
            const redirectUri = 'http://example.com/resource';

            const xhrBuilder = responseBuilder().body(Bodies.someJsonLd).canonical(redirectUri);
            fetchResource.withArgs(requestedUri)
                .returns(mockedResponse({ xhrBuilder }));

            // when
            const res = await Hydra.loadResource('http://example.com/not-there');

            // then
            expect(res.root.id).toBe('http://example.com/resource');
        });

        afterEach(() => {
            fetchResource.restore();
        });
    });
});

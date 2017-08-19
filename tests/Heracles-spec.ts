'use strict';

import * as _ from 'lodash';
import * as sinon from 'sinon';
import {promises as jsonld} from 'jsonld';
import {Hydra} from '../src';
import {HydraResource} from '../src/Resources';
import {FetchUtil} from '../src/FetchUtil';
import {JsonLd, Core} from '../src/Constants';
import {Bodies, Documentations } from './test-objects';
import {ApiDocumentation} from "../src/ApiDocumentation";
import {IPartialCollectionView} from "../src/interfaces";
import 'core-js/es6/object';
import 'core-js/es6/array';

describe('Hydra', () => {

    let fetchResource, createResource: sinon.SinonSpy;
    
    beforeEach(() => {
        createResource = sinon.spy(Hydra.resourceFactory, 'createResource');
        fetchResource = sinon.stub(FetchUtil, 'fetchResource');
    });

    describe('loadResource', () => {

        beforeEach(() => {
            fetchResource.withArgs('http://api.example.com/doc/').returns(mockedResponse(Documentations.classWithOperation));
        });

        it('should return object with matching @id', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res['@id']).toBe('http://example.com/resource');
                    expect(res instanceof HydraResource).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should return object with matching redirected @id', (done:any) =>{
            fetchResource.withArgs('http://example.com/not-in-response')
                .returns(mockedResponse(Bodies.someJsonLd, true, 'http://example.com/linked'));

            Hydra.loadResource('http://example.com/not-in-response')
                .then(res => {
                    expect(res['@id']).toBe('http://example.com/linked');
                    expect(res instanceof HydraResource).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should load documentation', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(() => {
                    expect(fetchResource.calledWithMatch('http://api.example.com/doc/')).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should turn JSON-LD into a graph of objects', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(Object.is(res['http://example.com/vocab#other'], res['http://example.com/vocab#other_yet'])).toBe(true);
                    expect(res['http://example.com/vocab#other']['@id']).toBe('http://example.com/linked');
                    done();
                })
                .catch(done.fail);
        });

        it('should turn object with arrays into matching object graph', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.hydraCollection));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res[Core.Vocab.member].length).toBe(4);
                    _.each(res[Core.Vocab.member], member => {
                        expect(member instanceof HydraResource).toBe(true);
                    });
                    done();
                })
                .catch(done.fail);
        });

        it('should make each nested object a Resource', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.hydraCollection));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res['http://example.vocab/managedBy'] instanceof HydraResource)
                        .toBe(true, 'was ' + JSON.stringify(res['http://example.vocab/managedBy']));
                    done();
                })
                .catch(done.fail);
        });

        it('should load parent of collection view as Resource', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource?page=3')
                .returns(mockedResponse(Bodies.hydraCollectionWithView));

            Hydra.loadResource('http://example.com/resource?page=3')
                .then((res:IPartialCollectionView) => {
                    expect(res.collection).toBeDefined();
                    expect(res.collection).not.toBeNull();
                    expect(res.collection instanceof HydraResource)
                        .toBe(true, 'Actual type is: ' + res.collection.constructor.name);
                    done();
                })
                .catch(done.fail);
        });

        it('should fail when resource with given @id doesn\'t exist in the representation', (done:any) =>{
            fetchResource.withArgs('http://example.com/not/there')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/not/there')
                .then(done.fail, err => {
                    expect(err.message).toBe('Resource http://example.com/not/there was not found in the response');
                    done();
                })
                .catch(done.fail);
        });

        it('should discover incoming links for resources', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    const incomingLinks = res['http://example.com/vocab#other'].getIncomingLinks();

                    expect(incomingLinks.length).toBe(2);
                    expect(_.some(incomingLinks, { subjectId: 'http://example.com/resource', predicate: 'http://example.com/vocab#other' })).toBe(true);
                    expect(_.some(incomingLinks, { subjectId: 'http://example.com/resource', predicate: 'http://example.com/vocab#other_yet' })).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should pass each object through ResourceFactory', (done:any) => {
            fetchResource.withArgs('http://api.example.com/doc/').returns(Promise.reject(null));

            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.hydraCollection));

            Hydra.loadResource('http://example.com/resource')
                .then(() => {
                    const ids = _.map(createResource.getCalls(), call => {
                        return call.args[0]['@id'];
                    });
                    expect(createResource.callCount)
                        .toBe(6, 'Actual calls for: ' + ids);
                    done();
                })
                .catch(done.fail);
        });

        it('should load resource with deep blank node structure', (done:any) => {
            fetchResource.withArgs('http://example.com/root')
                .returns(mockedResponse(Bodies.deepBlankNodes));

            Hydra.loadResource('http://example.com/root')
                .then(res => {
                    const p = 'http://example.com/prop';
                    const t = 'http://example.com/text';

                    expect(res[p][p][p][p][t]).toBe('I\'m nested way deep');
                    done();
                })
                .catch(done.fail);
        });

        it('should return typed string literals as their values', (done:any) => {
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.typedLiteral));

            Hydra.loadResource('http://example.com/resource').then(res => {
                expect(res['http://schema.org/image']['http://schema.org/contentUrl'])
                    .toBe('http://wikibus-test.gear.host/book/1936/image');
                done();
            }).catch(done.fail);
        });

        it('should return typed numeric literals as their values', (done:any) => {
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.typedNumericLiteral));

            Hydra.loadResource('http://example.com/resource').then(res => {
                expect(res['http://schema.org/age']).toBe(21);
                done();
            }).catch(done.fail);
        });

        it('should handle cycles', (done:any) => {
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.cycledResource));

            Hydra.loadResource('http://example.com/resource').then(res => {
                const objectsAreSame = Object.is(res, res['http://example.com/vocab#prop']['http://example.com/vocab#top']);
                expect(objectsAreSame).toBeTruthy();
                done();
            }).catch(done.fail);
        });

        afterEach(() => fetchResource.restore());
    });
    
    describe('loadDocumentation', () => {

        it('should return type ApiDocumentation', (done:any) => {
            fetchResource.withArgs('http://api.example.com/doc/').returns(mockedResponse(Documentations.classWithOperation, false));

            Hydra.loadDocumentation('http://api.example.com/doc/')
                .then(doc => {
                    expect(doc instanceof ApiDocumentation).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should return type ApiDocumentation when @type is not defined', (done:any) => {

            fetchResource.withArgs('http://api.example.com/doc/').returns(mockedResponse(Documentations.untyped, false));

            Hydra.loadDocumentation('http://api.example.com/doc/')
                .then(doc => {
                    expect(doc instanceof ApiDocumentation).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        afterEach(() => fetchResource.restore());
    });

    describe('loadResource with missing ApiDocumentation', () => {

        beforeEach(() => {
            fetchResource.withArgs('http://api.example.com/doc/').returns(Promise.reject(null));
        });

        it('should succeed even if ApiDocumentation is not available', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res.apiDocumentation).toBe(null);
                    done();
                })
                .catch(done.fail);
        });

        afterEach(() => fetchResource.restore());

    });

    afterEach(() => createResource.restore());
});

function mockedResponse(resource, includeDocsLink = true, redirectUrl = null) {
    return jsonld.flatten(resource, {})
        .then(expanded => ({
            resources: expanded[JsonLd.Graph],
            apiDocumentationLink: includeDocsLink ? 'http://api.example.com/doc/' : null,
            resourceIdentifier: redirectUrl
        }));
}
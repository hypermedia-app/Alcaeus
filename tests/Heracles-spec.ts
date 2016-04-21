'use strict';
import * as _ from 'lodash';
import * as sinon from 'sinon';
import {promises as jsonld} from 'jsonld';
import {Hydra} from '../src/heracles';
import {Resource} from '../src/Resources';
import {FetchUtil} from '../src/FetchUtil';
import {JsonLd, Core} from '../src/Constants';
import {Bodies, Documentations, Responses} from './test-objects';
//noinspection TypeScriptCheckImport
import {default as is} from 'core-js/es6/object';

describe('Hydra', () => {

    var fetchResource, fetchDocumentation, createResource:sinon.SinonSpy;
    
    beforeEach(() => {
        createResource = sinon.spy(Hydra.resourceFactory, 'createResource');
        fetchResource = sinon.stub(FetchUtil, 'fetchResource');
    });

    describe('loadResource', () => {

        beforeEach(() => {
            fetchDocumentation = sinon.stub(FetchUtil, 'fetchDocumentation', () => Promise.resolve(Documentations.classWithOperation));
        });

        it('should return object with matching @id', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res['@id']).toBe('http://example.com/resource');
                    expect(res instanceof Resource).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should return object with matching @id, trailing slash ignored', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource/')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource/')
                .then(res => {
                    expect(res['@id']).toBe('http://example.com/resource');
                    done();
                })
                .catch(done.fail);
        });

        it('should return object with matching @id, trailing slash ignored', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.idWithTrailingSlash));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res['@id']).toBe('http://example.com/resource/');
                    done();
                })
                .catch(done.fail);
        });

        it('should load documentation', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(() => {
                    expect(fetchDocumentation.calledWithMatch('http://api.example.com/doc/')).toBe(true);
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
                        expect(member instanceof Resource).toBe(true);
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
                    expect(res['http://example.vocab/managedBy'] instanceof Resource)
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
                    expect(res.collection instanceof Resource)
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
                    var incomingLinks = res['http://example.com/vocab#other'].getIncomingLinks();

                    expect(incomingLinks.length).toBe(2);
                    expect(_.some(incomingLinks, { subjectId: 'http://example.com/resource', predicate: 'http://example.com/vocab#other' })).toBe(true);
                    expect(_.some(incomingLinks, { subjectId: 'http://example.com/resource', predicate: 'http://example.com/vocab#other_yet' })).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should pass each object through ResourceFactory', (done:any) =>{
            fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.hydraCollection));

            Hydra.loadResource('http://example.com/resource')
                .then(() => {
                    var ids = _.map(createResource.getCalls(), call => {
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
                    var p = 'http://example.com/prop';
                    var t = 'http://example.com/text';

                    expect(res[p][p][p][p][t]).toBe('I\'m nested way deep');
                    done();
                })
                .catch(done.fail);
        });
    });

    describe('loadResource with missing ApiDocumentation', () => {

        beforeEach(() => {
            sinon.stub(FetchUtil, 'fetchDocumentation', () => Promise.reject(null));
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

    });

    afterEach(() => fetchResource.restore());
    afterEach(() => createResource.restore());
    afterEach(() => fetchDocumentation.restore());
});

function mockedResponse(resource) {
    return jsonld.flatten(resource, {})
        .then(expanded => ({
            resources: expanded[JsonLd.Graph],
            apiDocumentationLink: 'http://api.example.com/doc/'
        }));
}
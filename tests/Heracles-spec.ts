'use strict';
import * as sinon from 'sinon';
//noinspection TypeScriptCheckImport
import {promises as jsonld} from 'jsonld';
import {Hydra} from '../src/heracles';
import {Resource} from '../src/Resources';
import {FetchUtil} from '../src/FetchUtil';
import {JsonLd, Core} from '../src/Constants';
import {Bodies, Documentations} from './test-objects';

describe('Hydra', () => {

    beforeEach(() => {
        sinon.spy(Hydra.resourceFactory, 'createResource');
        sinon.stub(FetchUtil, 'fetchResource');
        sinon.stub(FetchUtil, 'fetchDocumentation', () => Promise.resolve(Documentations.classWithOperation));
    });

    describe('loadResource', () => {

        it('should return object with matching @id', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res['@id']).toBe('http://example.com/resource');
                    expect(res instanceof Resource).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should return object with matching @id, trailing slash ignored', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource/')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource/')
                .then(res => {
                    expect(res['@id']).toBe('http://example.com/resource');
                    done();
                })
                .catch(done.fail);
        });

        it('should return object with matching @id, trailing slash ignored', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.idWithTrailingSlash));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res['@id']).toBe('http://example.com/resource/');
                    done();
                })
                .catch(done.fail);
        });

        it('should load documentation', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(() => {
                    expect(FetchUtil.fetchDocumentation.calledWithMatch('http://api.example.com/doc/')).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should turn JSON-LD into a graph of objects', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(Object.is(res['http://example.com/vocab#other'], res['http://example.com/vocab#other_yet'])).toBe(true);
                    expect(res['http://example.com/vocab#other']['@id']).toBe('http://example.com/linked');
                    done();
                })
                .catch(done.fail);
        });

        it('should turn object with arrays into matching object graph', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource')
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

        it('should make each nested object a Resource', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.hydraCollection));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res['http://example.vocab/managedBy'] instanceof Resource)
                        .toBe(true, 'was ' + JSON.stringify(res['http://example.vocab/managedBy']));
                    done();
                })
                .catch(done.fail);
        });

        it('should load parent of collection view as Resource', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource?page=3')
                .returns(mockedResponse(Bodies.hydraCollectionWithView));

            Hydra.loadResource('http://example.com/resource?page=3')
                .then(res => {
                    expect(res.collection).toBeDefined();
                    expect(res.collection instanceof Resource).toBe(true, 'Actual type is: ' + res.collection.constructor.name);
                    done();
                })
                .catch(done.fail);
        });

        it('should fail when resource with given @id doesn\'t exist in the representation', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/not/there')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/not/there')
                .then(done.fail, err => {
                    expect(err.message).toBe('Resource http://example.com/not/there was not found in the response');
                    done();
                })
                .catch(done.fail);
        });

        it('should discover incoming links for resources', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.someJsonLd));

            Hydra.loadResource('http://example.com/resource')
                .then(res => {
                    expect(res['http://example.com/vocab#other'].incomingLinks.length).toBe(2);

                    var incomingLinks = res['http://example.com/vocab#other'].incomingLinks;
                    expect(_.some(incomingLinks, { subjectId: 'http://example.com/resource', predicate: 'http://example.com/vocab#other' })).toBe(true);
                    expect(_.some(incomingLinks, { subjectId: 'http://example.com/resource', predicate: 'http://example.com/vocab#other_yet' })).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should pass each object through ResourceFactory', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/resource')
                .returns(mockedResponse(Bodies.hydraCollection));

            Hydra.loadResource('http://example.com/resource')
                .then(() => {
                    var ids = _.map(Hydra.resourceFactory.createResource.getCalls(), call => {
                        return call.args[0]['@id'];
                    });
                    expect(Hydra.resourceFactory.createResource.callCount)
                        .toBe(6, 'Actual calls for: ' + ids);
                    done();
                })
                .catch(done.fail);
        });

        it('should load resource with deep blank node structure', done => {
            FetchUtil.fetchResource.withArgs('http://example.com/root')
                .returns(mockedResponse(Bodies.deepBlankNodes));

            Hydra.loadResource('http://example.com/root')
                .then(res => {
                    var p = 'http://example.com/prop';
                    var t = 'http://example.com/text';

                    expect(res[p][p][p][p][t]).toBe('I\'m nested way deep');
                    done();
                })
                .catch(done.fail);
        })
    });

    afterEach(() => FetchUtil.fetchResource.restore());
    afterEach(() => FetchUtil.fetchDocumentation.restore());
    afterEach(() => Hydra.resourceFactory.createResource.restore());

});

function mockedResponse(resource) {
    return jsonld.flatten(resource, {})
        .then(expanded => ({
            resources: expanded[JsonLd.Graph],
            apiDocumentationLink: 'http://api.example.com/doc/'
        }));
}
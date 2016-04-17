/// <reference path="../typings/main.d.ts" />

import * as sinon from 'sinon';
import {ApiDocumentation} from "../src/ApiDocumentation";
import {Documentations} from './test-objects';

describe('ApiDocumentation', () => {

    var heracles;
    
    beforeEach(() => heracles = {});
    
    describe('getting operations', () => {

        it('should get operation\'s method and description given a type', done => {

            var docs = new ApiDocumentation(heracles, '', Documentations.classWithOperation);

            var op = docs.getOperations('http://example.com/api#Class')
                .then(op => {
                    expect(op[0].description).toBe('Gets the api#Class');
                    expect(op[0].method).toBe('GET');
                    done();
                })
                .catch(done.fail);
        });

    });

    describe('getting properties', () => {

        it('should get properties for a given class type', done => {

            var docs = new ApiDocumentation(heracles, '', Documentations.classWithOperation);

            var op = docs.getProperties('http://example.com/api#Class')
                .then(props => {
                    expect(props.length).toBe(2);
                    done();
                })
                .catch(done.fail);
        });

    });

    describe('getting classes', () => {

        it('should return classes from documentation', done => {

            var docs = new ApiDocumentation(heracles, '', Documentations.classWithOperation);

            var classes = docs.getClasses()
                .then(classes => {
                    expect(classes.length).toBe(1);
                    expect(classes[0].id).toBe('http://example.com/api#Class');
                    done();
                })
                .catch(done.fail);
        });

        it('should return selected class by @id', done => {

            var docs = new ApiDocumentation(heracles, '', Documentations.classWithOperation);

            var classes = docs.getClass('http://example.com/api#Class')
                .then(clas => {
                    expect(clas.id).toBe('http://example.com/api#Class');
                    done();
                })
                .catch(done.fail);
        });

    });

    describe('getting entrypoint', () => {

        var heracles:IHeracles;
        beforeEach(() => {
            heracles = {
                loadResource: sinon.stub()
            }
        });

        it('should invoke Resource.load', done => {
            var docs = new ApiDocumentation(heracles, '', Documentations.classWithOperation);
            heracles.loadResource.returns(Promise.resolve(null));

            var classes = docs.getEntrypoint()
                .then(entrypoint => {
                    expect(heracles.loadResource.calledWithExactly('http://example.com/home')).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

    });
});
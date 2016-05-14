/// <reference path="../typings/main.d.ts" />

import * as _ from 'lodash';
import * as sinon from 'sinon';
import {promises as jsonld} from 'jsonld';
import {ApiDocumentation} from "../src/ApiDocumentation";
import {Documentations} from './test-objects';

describe('ApiDocumentation', () => {

    var heracles;

    beforeEach(() => heracles = {});

    describe('getting classes', () => {

        it('should return classes from documentation', () => {

            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                var docs = new ApiDocumentation(heracles, expanded);

                expect(docs.classes.length).toBe(1);
                expect(docs.classes[0]['@id']).toBe('http://example.com/api#Class');
            });
        });

        it('should return selected class by @id', () => {

            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                var docs = new ApiDocumentation(heracles, expanded);

                var clas = docs.getClass('http://example.com/api#Class');
                expect(clas['@id']).toBe('http://example.com/api#Class');
            });
        });

        it('should return null for missing supported class', () => {
            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                var docs = new ApiDocumentation(heracles, expanded);

                var clas = docs.getClass('http://example.com/api#UndomcumentedClass');
                expect(clas).toBe(null);
            });
        });

    });

    describe('getting entrypoint', () => {

        var heracles;
        beforeEach(() => {
            heracles = {
                loadResource: sinon.stub()
            }
        });

        it('should invoke Resource.load', (done:any) => {
            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                var docs = new ApiDocumentation(heracles, expanded);
                heracles.loadResource.returns(Promise.resolve(null));

                docs.getEntrypoint()
                    .then(() => {
                        expect(heracles.loadResource.calledWithExactly('http://example.com/home')).toBe(true);
                        done();
                    })
                    .catch(done.fail);
            });
        });

    });
    
    describe('getting operations', () => {
        
        it('should return empty array for missing supported class', () => {
            var docs = new ApiDocumentation(heracles, Documentations.classWithOperation);

            var ops = docs.getOperations('http://example.com/api#UndomcumentedClass');
            expect(_.isArray(ops)).toBe(true);
            expect(ops.length).toBe(0);
        });
    });

    describe('getting properties', () => {

        it('should return empty array for missing supported class', () => {
            var docs = new ApiDocumentation(heracles, Documentations.classWithOperation);

            var props = docs.getProperties('http://example.com/api#UndomcumentedClass');
            expect(_.isArray(props)).toBe(true);
            expect(props.length).toBe(0);
        });
    });
});
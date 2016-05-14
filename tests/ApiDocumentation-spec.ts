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
});
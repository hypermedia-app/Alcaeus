import * as _ from 'lodash';
import * as sinon from 'sinon';
import {promises as jsonld} from 'jsonld';
import {ApiDocumentation} from "../src/ApiDocumentation";
import {Documentations} from './test-objects';
import {fakeHeraclesResources, itAsync} from "./test-utils";
import 'core-js/es6/array';
import {IApiDocumentation} from "../src/interfaces";

describe('ApiDocumentation', () => {

    let heracles;

    beforeEach(() => heracles = {});

    describe('getting classes', () => {

        it('should return classes from documentation', (done:any) => {

            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                const docs = new ApiDocumentation(heracles, fakeHeraclesResources(expanded));

                expect(docs.classes.length).toBe(1);
                expect(docs.classes[0]['@id']).toBe('http://example.com/api#Class');
                done();
            }).catch(done.fail);
        });

        it('should return selected class by @id', (done:any) => {

            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                const docs = new ApiDocumentation(heracles, fakeHeraclesResources(expanded));

                const clas = docs.getClass('http://example.com/api#Class');
                expect(clas['@id']).toBe('http://example.com/api#Class');
                done();
            }).catch(done.fail);
        });

        it('should return null for missing supported class', (done:any) => {
            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                const docs = new ApiDocumentation(heracles, fakeHeraclesResources(expanded));

                const clas = docs.getClass('http://example.com/api#UndomcumentedClass');
                expect(clas).toBe(null);
                done()
            }).catch(done.fail);
        });

    });

    describe('getting entrypoint', () => {

        let heracles;
        beforeEach(() => {
            heracles = {
                loadResource: sinon.stub()
            }
        });

        itAsync('should invoke Resource.load', async () => {
            // given
            const expanded = await jsonld.compact(Documentations.classWithOperation, {});
            const docs = new ApiDocumentation(heracles, fakeHeraclesResources(expanded));
            heracles.loadResource.returns(Promise.resolve(null));

            // when
            await docs.getEntrypoint();

            // then
            expect(heracles.loadResource.calledWithExactly('http://example.com/home')).toBe(true);
        });

        itAsync('should reject if entrypoint missing', async () => {
            // given
            const apiDoc = Object.assign({}, Documentations.classWithOperation);
            delete apiDoc.entrypoint;
            const expanded = await jsonld.compact(apiDoc, {});
            const docs = new ApiDocumentation(heracles, fakeHeraclesResources(expanded));
            heracles.loadResource.returns(Promise.resolve(null));

            // when
            try {
                docs.getEntrypoint()
                    .then(() => {
                        throw new Error('Operation should not succeed');
                    });
            }
            catch(e) {
                throw new Error('Should not throw unhandled exception');
            }
        });
    });

    describe('getting class operations', () => {

        it('should return empty array for missing supported class', (done:any) => {
            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                const docs = new ApiDocumentation(heracles, fakeHeraclesResources(expanded));

                const ops = docs.getOperations('http://example.com/api#UndomcumentedClass');
                expect(_.isArray(ops)).toBe(true);
                expect(ops.length).toBe(0);
                done();
            }).catch(done.fail);
        });
    });

    describe('getting property operations', () => {

        it('should return a value', (done:any) => {
            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                const docs: IApiDocumentation = new ApiDocumentation(heracles, fakeHeraclesResources(expanded));

                const ops = docs.getOperations('http://example.com/api#Class', 'http://purl.org/dc/elements/1.1/partOf');
                expect(ops).toBeDefined();
                expect(ops).not.toBeNull();
                expect(ops.length).toBe(1);
                done();
            }).catch(done.fail);
        });
    });

    describe('getting properties', () => {

        it('should return empty array for missing supported class', (done:any) => {
            jsonld.compact(Documentations.classWithOperation, {}).then(expanded => {
                const docs = new ApiDocumentation(heracles, fakeHeraclesResources(expanded));

                const props = docs.getProperties('http://example.com/api#UndomcumentedClass');
                expect(_.isArray(props)).toBe(true);
                expect(props.length).toBe(0);
                done();
            }).catch(done.fail);
        });
    });
});

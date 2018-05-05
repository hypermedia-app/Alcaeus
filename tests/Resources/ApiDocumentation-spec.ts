import 'core-js/es6/array';
import {promises as jsonld} from 'jsonld';
import * as _ from 'lodash';
import * as sinon from 'sinon';
import {Mixin} from '../../src/Resources/Mixins/ApiDocumentation';
import Resource from '../../src/Resources/Resource';
import {Documentations} from '../test-objects';
import {fakeAlcaeusResources} from '../test-utils';

let alcaeus;
class ApiDocumentation extends Mixin(Resource) {
    public get _alcaeus() {
        return alcaeus;
    }
}

describe('ApiDocumentation', () => {

    beforeEach(() => alcaeus = {});

    describe('getting classes', () => {

        it('should return classes from documentation', (done: any) => {

            jsonld.compact(Documentations.classWithOperation, {}).then((expanded) => {
                const docs = new ApiDocumentation(fakeAlcaeusResources(expanded));

                expect(docs.classes.length).toBe(1);
                expect(docs.classes[0]['@id']).toBe('http://example.com/api#Class');
                done();
            }).catch(done.fail);
        });

        it('should return selected class by @id', (done: any) => {

            jsonld.compact(Documentations.classWithOperation, {}).then((expanded) => {
                const docs = new ApiDocumentation(fakeAlcaeusResources(expanded));

                const clas = docs.getClass('http://example.com/api#Class');
                expect(clas['@id']).toBe('http://example.com/api#Class');
                done();
            }).catch(done.fail);
        });

        it('should return null for missing supported class', (done: any) => {
            jsonld.compact(Documentations.classWithOperation, {}).then((expanded) => {
                const docs = new ApiDocumentation(fakeAlcaeusResources(expanded));

                const clas = docs.getClass('http://example.com/api#UndomcumentedClass');
                expect(clas).toBe(null);
                done();
            }).catch(done.fail);
        });

    });

    describe('getting entrypoint', () => {

        beforeEach(() => {
            alcaeus = {
                loadResource: sinon.stub(),
            };
        });

        it('should invoke Resource.load', async () => {
            // given
            const expanded = await jsonld.compact(Documentations.classWithOperation, {});
            const docs = new ApiDocumentation(fakeAlcaeusResources(expanded));
            alcaeus.loadResource.returns(Promise.resolve(null));

            // when
            await docs.loadEntrypoint();

            // then
            expect(alcaeus.loadResource.calledWithExactly('http://example.com/home')).toBe(true);
        });

        it('should reject if entrypoint missing', async () => {
            // given
            const apiDoc = Object.assign({}, Documentations.classWithOperation);
            delete apiDoc.entrypoint;
            const expanded = await jsonld.compact(apiDoc, {});
            const docs = new ApiDocumentation(fakeAlcaeusResources(expanded));
            alcaeus.loadResource.returns(Promise.resolve(null));

            // when
            try {
                docs.loadEntrypoint()
                    .then(() => {
                        throw new Error('Operation should not succeed');
                    });
            } catch (e) {
                throw new Error('Should not throw unhandled exception');
            }
        });
    });

    describe('getting class operations', () => {

        it('should return empty array for missing supported class', async () => {
            // given
            const expanded = await jsonld.compact(Documentations.classWithOperation, {});
            const docs = new ApiDocumentation(fakeAlcaeusResources(expanded));

            // when
            const ops = docs.getOperations('http://example.com/api#UndomcumentedClass');

            // then
            expect(_.isArray(ops)).toBe(true);
            expect(ops.length).toBe(0);
        });

        it('should return only unique value', async () => {
            // given
            const expanded = await jsonld.compact(Documentations.classWithOperation, {});
            const docs = new ApiDocumentation(fakeAlcaeusResources(expanded));

            // when
            const ops = docs.getOperations('http://example.com/api#UndomcumentedClass');

            // then
            expect(_.isArray(ops)).toBe(true);
            expect(ops.length).toBe(0);
        });
    });

    describe('getting property operations', () => {

        it('should return a value', async () => {
            // given
            const expanded = await jsonld.compact(Documentations.classWithOperation, {});
            const docs = new ApiDocumentation(fakeAlcaeusResources(expanded));

            // when
            const ops = docs.getOperations('http://example.com/api#Class', 'http://purl.org/dc/elements/1.1/partOf');

            // then
            expect(ops).toBeDefined();
            expect(ops).not.toBeNull();
            expect(ops.length).toBe(1);
        });
    });

    describe('getting properties', () => {

        it('should return empty array for missing supported class', async () => {
            // gicven
            const expanded = await jsonld.compact(Documentations.classWithOperation, {});
            const docs = new ApiDocumentation(fakeAlcaeusResources(expanded));

            // when
            const props = docs.getProperties('http://example.com/api#UndomcumentedClass');

            // then
            expect(_.isArray(props)).toBe(true);
            expect(props.length).toBe(0);
        });
    });
});

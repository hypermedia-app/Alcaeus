/// <reference path="../typings/main.d.ts" />

import * as sinon from 'sinon';
import {Resource} from '../src/Resources';
import {Bodies} from './test-objects';

describe('Resource', () => {

    describe('id', () => {

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'id').enumerable)
                .toBe(false);
        });

    });

    describe('apiDocumentation', () => {

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'apiDocumentation').enumerable)
                .toBe(false);
        });

    });
    
    describe('getOperations', () => {

        it('should combine operations from class and property', done => {
            var apiDoc = <IApiDocumentation>{
                getOperations: sinon.stub()
            };
            apiDoc.getOperations.returns(Promise.resolve([]));
            var resource = new Resource(Bodies.someJsonLdExpanded, apiDoc, [
                ['http://example.com/vocab#Resource', 'http://example.com/vocab#other']
            ]);

            resource.getOperations()
                .then(() => {
                    expect(apiDoc.getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
                    expect(apiDoc.getOperations.calledWithExactly('http://example.com/vocab#Resource', 'http://example.com/vocab#other')).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

        it('should combine operations for multiple @types', done => {
            var apiDoc = <IApiDocumentation>{
                getOperations: sinon.stub()
            };
            apiDoc.getOperations.returns(Promise.resolve([]));
            var resource = new Resource(Bodies.multipleTypesExpanded, apiDoc, [ ]);

            resource.getOperations()
                .then(() => {
                    expect(apiDoc.getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
                    expect(apiDoc.getOperations.calledWithExactly('http://example.com/vocab#AnotherType')).toBe(true);
                    done();
                })
                .catch(done.fail);
        });

    });
});
import * as sinon from 'sinon';
import {HydraResource, Resource} from '../src/Resources';
import {Bodies} from './test-objects';
import {IApiDocumentation, IHeracles} from "../src/interfaces";
import 'core-js/es6/Weak-Map';

describe('Resource', () => {

    describe('id', () => {

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'id').enumerable)
                .toBe(false);
        });

    });

    describe('types', () => {

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(Resource.prototype, 'types').enumerable)
                .toBe(false);
        });

        it('should return array for single @type', () => {

            var resource = new HydraResource(null, Bodies.someJsonLdExpanded, <IApiDocumentation>{}, []);

            expect(resource.types.length).toBe(1);
        });

        it('should return all @types', () => {

            var resource = new HydraResource(null, Bodies.multipleTypesExpanded, <IApiDocumentation>{}, []);

            expect(resource.types.length).toBe(2);
        });

    });

    describe('apiDocumentation', () => {

        it('should be non-enumerable', () => {
            expect(Object.getOwnPropertyDescriptor(HydraResource.prototype, 'apiDocumentation').enumerable)
                .toBe(false);
        });

    });
    
    describe('get operations', () => {

        it('should combine operations from class and property', () => {
            var getOperations = sinon.stub();
            var apiDoc = <any>{
                getOperations: getOperations
            };
            getOperations.returns([]);
            var resource = new HydraResource(null, Bodies.someJsonLdExpanded, apiDoc, [
                {
                    subject: { types: [ 'http://example.com/vocab#Resource2', 'http://example.com/vocab#Resource3' ] },
                    predicate: 'http://example.com/vocab#other'
                }
            ]);

            var ops = resource.operations;
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource2', 'http://example.com/vocab#other')).toBe(true);
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource3', 'http://example.com/vocab#other')).toBe(true);
        });

        it('should combine operations for multiple @types', () => {
            var getOperations = sinon.stub();
            var apiDoc = <any>{
                getOperations: getOperations
            };
            getOperations.returns(Promise.resolve([]));
            var resource = new HydraResource(<IHeracles>{}, Bodies.multipleTypesExpanded, apiDoc, [ ]);

            var ops = resource.operations;
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
            expect(getOperations.calledWithExactly('http://example.com/vocab#AnotherType')).toBe(true);
        });

    });
});
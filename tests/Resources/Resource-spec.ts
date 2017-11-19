import * as sinon from 'sinon';
import HydraResource from "../../src/Resources/HydraResource";
import Resource from '../../src/Resources/Resource';
import {Bodies} from '../test-objects';
import {IApiDocumentation, IHydraClient} from "../../src/interfaces";

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

            const resource = new HydraResource(null, Bodies.someJsonLdExpanded, <IApiDocumentation>{}, []);

            expect(resource.types.length).toBe(1);
        });

        it('should return all @types', () => {

            const resource = new HydraResource(null, Bodies.multipleTypesExpanded, <IApiDocumentation>{}, []);

            expect(resource.types.length).toBe(2);
        });

        it('should return empty array when undefined', () => {
            const resource = new HydraResource(null, {}, <IApiDocumentation>{}, []);

            expect(Array.isArray(resource.types)).toBe(true);
            expect(resource.types.length).toBe(0);
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
            const getOperations = sinon.stub();
            const apiDoc = <any>{
                getOperations: getOperations
            };
            getOperations.returns([]);
            const resource = new HydraResource(null, Bodies.someJsonLdExpanded, apiDoc, [
                {
                    subject: {types: ['http://example.com/vocab#Resource2', 'http://example.com/vocab#Resource3']},
                    predicate: 'http://example.com/vocab#other'
                }
            ]);

            let ops = resource.operations;
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource2', 'http://example.com/vocab#other')).toBe(true);
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource3', 'http://example.com/vocab#other')).toBe(true);
        });

        it('should combine operations for multiple @types', () => {
            const getOperations = sinon.stub();
            const apiDoc = <any>{
                getOperations: getOperations
            };
            getOperations.returns(Promise.resolve([]));
            const resource = new HydraResource(<IHydraClient>{}, Bodies.multipleTypesExpanded, apiDoc, []);

            let ops = resource.operations;
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
            expect(getOperations.calledWithExactly('http://example.com/vocab#AnotherType')).toBe(true);
        });

    });
});

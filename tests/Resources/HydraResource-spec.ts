import * as sinon from 'sinon';
import HydraResource from "../../src/Resources/HydraResource";
import {Bodies} from '../test-objects';
import {IHydraClient} from "../../src/interfaces";

describe('HydraResource', () => {
    describe('apiDocumentation', () => {
        it('should be non-enumerable', () => {
            expect(HydraResource.prototype.propertyIsEnumerable('apiDocumentation'))
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
            const resource = new HydraResource(Bodies.someJsonLdExpanded, null, apiDoc, [
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
            const resource = new HydraResource(Bodies.multipleTypesExpanded, <IHydraClient>{}, apiDoc, []);

            let ops = resource.operations;
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
            expect(getOperations.calledWithExactly('http://example.com/vocab#AnotherType')).toBe(true);
        });
    });
});

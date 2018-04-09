import * as sinon from 'sinon';
import HydraResource from '../../src/Resources/HydraResource';
import {Bodies} from '../test-objects';

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
            const apiDoc = {
                getOperations,
            } as any;
            getOperations.returns([]);
            const resource = new HydraResource(Bodies.someJsonLdExpanded, apiDoc, [
                {
                    predicate: 'http://example.com/vocab#other',
                    subject: {types: ['http://example.com/vocab#Resource2', 'http://example.com/vocab#Resource3']},
                },
            ]);

            const ops = resource.operations;
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
            expect(getOperations.calledWithExactly(
                'http://example.com/vocab#Resource2',
                'http://example.com/vocab#other')).toBe(true);
            expect(getOperations.calledWithExactly(
                'http://example.com/vocab#Resource3',
                'http://example.com/vocab#other')).toBe(true);
        });

        it('should combine operations for multiple @types', () => {
            const getOperations = sinon.stub();
            const apiDoc = {
                getOperations,
            } as any;
            getOperations.returns(Promise.resolve([]));
            const resource = new HydraResource(Bodies.multipleTypesExpanded, apiDoc, []);

            const ops = resource.operations;
            expect(getOperations.calledWithExactly('http://example.com/vocab#Resource')).toBe(true);
            expect(getOperations.calledWithExactly('http://example.com/vocab#AnotherType')).toBe(true);
        });
    });
});

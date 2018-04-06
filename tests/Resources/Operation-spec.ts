import * as sinon from 'sinon';
import {IClass, IHydraClient, IHydraResource, IOperation, ISupportedOperation} from '../../src/interfaces';
import {Operation} from '../../src/Resources/Operation';

describe('Operation', () => {

    describe('property', () => {

        let operation: IOperation;
        const expects: IClass = {} as IClass;
        const returns: IClass = {} as IClass;

        beforeEach(() => {
            operation = new Operation({
                description: 'the description',
                expects,
                method: 'POST',
                returns,
                title: 'the title',
            } as ISupportedOperation, {} as IHydraClient, {} as IHydraResource);
        });

        it('method should delegate to operation', () => {
            expect(operation.method).toBe('POST');
        });

        it('expects should delegate to operation', () => {
            expect(operation.expects).toBe(expects);
        });

        it('returns should delegate to operation', () => {
            expect(operation.returns).toBe(returns);
        });

        it('description should delegate to operation', () => {
            expect(operation.description).toBe('the description');
        });

    });

    xdescribe('invoke', () => {

        let alcaeus;
        const supportedOperation = {} as ISupportedOperation;
        const resource = {
            id: 'http://target/resource',
        } as IHydraResource;

        beforeEach(() => alcaeus = {
            invokeOperation: sinon.stub(),
        });

        it('should execute through alcaeus with JSON-LD media type', () => {

            const op = new Operation(supportedOperation, alcaeus, resource);
            const payload = {};

            op.invoke(payload);

            expect(alcaeus.invokeOperation.calledWithExactly(
                op,
                'http://target/resource',
                payload,
                'application/ld+json')).toBeTruthy();
        });

        it('should execute through alcaeus with changed media type', () => {

            const op = new Operation(supportedOperation, alcaeus, resource);
            const payload = {};

            op.invoke(payload, 'text/turtle');

            expect(alcaeus.invokeOperation.firstCall.args[3])
                .toBeTruthy('text/turtle');
        });
    });
});

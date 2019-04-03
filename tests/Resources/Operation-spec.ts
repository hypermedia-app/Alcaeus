import * as sinon from 'sinon';
import {IHydraClient} from '../../src/alcaeus';
import {JsonLd} from '../../src/Constants';
import {Class, HydraResource, IOperation, SupportedOperation} from '../../src/Resources';
import {Operation} from '../../src/Resources/Operation';

describe('Operation', () => {

    describe('property', () => {

        let operation: IOperation;
        const expects: Class = {} as Class;
        const returns: Class = {} as Class;

        beforeEach(() => {
            operation = new Operation({
                description: 'the description',
                expects,
                method: 'POST',
                returns,
                title: 'the title',
            } as SupportedOperation, {} as IHydraClient, {} as HydraResource);
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

    describe('invoke', () => {

        let alcaeus;
        const supportedOperation = {} as SupportedOperation;
        const resource = {
            [JsonLd.Id]: 'http://target/resource',
        } as any;

        beforeEach(() => alcaeus = {
            invokeOperation: sinon.spy(),
        });

        it('should execute through alcaeus with JSON-LD media type', () => {

            const op = new Operation(supportedOperation, alcaeus, resource);

            op.invoke('');

            expect(alcaeus.invokeOperation.calledWithExactly(
                op,
                'http://target/resource',
                sinon.match.string,
                'application/ld+json')).toBeTruthy();
        });

        it('should execute through alcaeus with changed media type', () => {

            const op = new Operation(supportedOperation, alcaeus, resource);

            op.invoke('', 'text/turtle');

            expect(alcaeus.invokeOperation.firstCall.args[3])
                .toBeTruthy('text/turtle');
        });
    });
});

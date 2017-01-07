import * as sinon from 'sinon';
import {Operation} from "../src/Resources";
import {ISupportedOperation, IHeracles, IHydraResource, IOperation, IClass} from "../src/interfaces";

describe('Operation', () => {

    let supportedOperation: ISupportedOperation;

    describe('constructor', () => {

        it('should require supported operation', () => {

            expect(() => new Operation(null, <IHeracles>{}, <IHydraResource>{}))
                .toThrowError('Missing supportedOperation parameter');
            expect(() => new Operation(undefined, <IHeracles>{}, <IHydraResource>{}))
                .toThrowError('Missing supportedOperation parameter');
        });

        it('should require heracles', () => {
            expect(() => new Operation(<ISupportedOperation>{}, null, <IHydraResource>{}))
                .toThrowError('Missing heracles parameter');
            expect(() => new Operation(<ISupportedOperation>{}, undefined, <IHydraResource>{}))
                .toThrowError('Missing heracles parameter');
        });

    });

    describe('property', () => {

        let operation: IOperation;
        const expects: IClass = <IClass>{};
        const returns: IClass = <IClass>{};

        beforeEach(() => {
            operation = new Operation(<ISupportedOperation>{
                method: 'POST',
                expects: expects,
                returns: returns,
                title: 'the title',
                description: 'the description'
            }, <IHeracles>{}, <IHydraResource>{});
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

        let heracles;
        const supportedOperation = <ISupportedOperation>{};
        const resource = <IHydraResource>{
            id: 'http://target/resource'
        };

        beforeEach(() => heracles = {
            invokeOperation: sinon.stub()
        });

        it('should execute through heracles with JSON-LD media type', () => {

            const op = new Operation(supportedOperation, heracles, resource);
            const payload = {};

            op.invoke(payload);

            expect(heracles.invokeOperation.calledWithExactly(op, 'http://target/resource', payload, 'application/ld+json'))
                .toBeTruthy();
        });

        it('should execute through heracles with changed media type', () => {

                const op = new Operation(supportedOperation, heracles, resource);
                const payload = {};

                op.invoke(payload, 'text/turtle');

                expect(heracles.invokeOperation.firstCall.args[3])
                    .toBeTruthy('text/turtle');
        });
    });
});

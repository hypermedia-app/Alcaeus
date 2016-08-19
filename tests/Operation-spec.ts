import * as sinon from 'sinon';
import {Operation} from "../src/Resources";
import {Core} from '../src/Constants'

describe('Operation', () => {

    var supportedOperation:ISupportedOperation;

    describe('constructor', () => {

        it('should require supported operation', () => {

            expect(() => new Operation(null, <IHydraResource>{}, <IHeracles>{}))
                .toThrowError('Missing supportedOperation parameter');
            expect(() => new Operation(undefined, <IHydraResource>{}, <IHeracles>{}))
                .toThrowError('Missing supportedOperation parameter');
        });

    });

    describe('property', () => {

        var operation:IOperation;
        var expects:IClass = <IClass>{};
        var returns:IClass = <IClass>{};

        beforeEach(() => {
            operation = new Operation(<ISupportedOperation>{
                method: 'POST',
                expects: expects,
                returns: returns,
                title: 'the title',
                description: 'the description'
            }, null);
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

        var heracles;
        var supportedOperation = <ISupportedOperation>{
        };
        var resource = <IHydraResource>{
            id: 'http://target/resource'
        };

        beforeEach(() => heracles = {
            invokeOperation: sinon.stub()
        });

        it('should execute through heracles with JSON-LD media type', () => {

            var op = new Operation(supportedOperation, resource, heracles);
            var payload = {};

            op.invoke(payload);

            expect(heracles.invokeOperation.calledWithExactly(op, 'http://target/resource', payload, 'application/ld+json'))
                .toBeTruthy();
        });

        it('should execute through heracles with changed media type', () => {

                var op = new Operation(supportedOperation, resource, heracles);
                var payload = {};

                op.invoke(payload, 'text/turtle');

                expect(heracles.invokeOperation.firstCall.args[3])
                    .toBeTruthy('text/turtle');
        });
    });
});

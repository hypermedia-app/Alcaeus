import {promises as jsonld} from 'jsonld';
import {Operation} from "../src/Resources";

describe('Operation', () => {

    var supportedOperation:ISupportedOperation;

    describe('constructor', () => {

        it('should require supported operation', () => {

            expect(() => new Operation(null, <IHydraResource>{}))
                .toThrow(new Error('Missing supportedOperation parameter'));
            expect(() => new Operation(undefined, <IHydraResource>{}))
                .toThrow(new Error('Missing supportedOperation parameter'));
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
        var operation = {
            '@context': Core.Context,
            'method': 'PUT'
        };

        beforeEach(() => heracles = {
            invokeOperation: sinon.stub()
        });

        it('should execute through heracles with JSON-LD media type', (done) => {

            jsonld.compact(operation, {}).then(compacted => {
                var op = new SupportedOperation(compacted, <IHeracles>heracles);
                var payload = {};

                op.invoke('http://target/address', payload);

                expect(heracles.invokeOperation.calledWithExactly(op, 'http://target/address', payload, 'application/ld+json'))
                    .toBeTruthy();
                done();
            }).catch(done.fail);
        });

        it('should execute through heracles with changed media type', (done) => {

            jsonld.compact(operation, {}).then(compacted => {
                var op = new SupportedOperation(compacted, <IHeracles>heracles);
                var payload = {};

                op.invoke('http://target/address', payload, 'text/turtle');

                expect(heracles.invokeOperation.firstCall.args[3])
                    .toBeTruthy('text/turtle');
                done();
            }).catch(done.fail);
        });

        it('should throw when uri is missing', (done) => {
            jsonld.compact(operation, {}).then(compacted => {
                var op = new SupportedOperation(compacted, <IHeracles>heracles);
                var payload = {};

                expect(() => op.invoke(null, {}))
                    .toThrow(new Error('Target URI is missing'));
                done();
            }).catch(done.fail);
        });
    });
});

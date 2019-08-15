import * as sinon from 'sinon'
import { IHydraClient } from '../../src/alcaeus'
import { Class, HydraResource, IOperation, SupportedOperation } from '../../src/Resources'
import { Operation } from '../../src/Resources/Operation'

describe('Operation', () => {
    describe('property', () => {
        let operation: IOperation
        const expects: Class = {} as Class
        const returns: Class = {} as Class

        beforeEach(() => {
            operation = new Operation({
                description: 'the description',
                expects,
                method: 'POST',
                returns,
                title: 'the title',
            } as SupportedOperation, {} as IHydraClient, {} as HydraResource)
        })

        it('method should delegate to operation', () => {
            expect(operation.method).toBe('POST')
        })

        it('expects should delegate to operation', () => {
            expect(operation.expects).toBe(expects)
        })

        it('returns should delegate to operation', () => {
            expect(operation.returns).toBe(returns)
        })

        it('description should delegate to operation', () => {
            expect(operation.description).toBe('the description')
        })
    })

    describe('invoke', () => {
        let alcaeus
        const supportedOperation = {} as SupportedOperation
        const resource = {
            id: 'http://target/resource',
        } as any

        beforeEach(() => {
            alcaeus = {
                invokeOperation: sinon.spy(),
            }
        })

        it('should execute through alcaeus with JSON-LD media type', () => {
            const op = new Operation(supportedOperation, alcaeus, resource)

            op.invoke('')

            expect(alcaeus.invokeOperation.calledWithExactly(
                op,
                'http://target/resource',
                sinon.match.string,
                sinon.match.has('content-type', 'application/ld+json'),
            )).toBeTruthy()
        })

        it('should execute through alcaeus with provided headers', () => {
            const op = new Operation(supportedOperation, alcaeus, resource)

            op.invoke('', {
                'content-type': 'text/turtle',
                'x-foo': 'bar',
            })

            expect(alcaeus.invokeOperation.firstCall.args[3])
                .toStrictEqual({
                    'content-type': 'text/turtle',
                    'x-foo': 'bar',
                })
        })
    })

    describe('constructor', () => {
        it('throws if supported operation is missing', () => {
            expect(() => new Operation(null as unknown as SupportedOperation, {} as IHydraClient, {} as HydraResource)).toThrow()
        })

        it('throws if resource is missing', () => {
            expect(() => new Operation({} as SupportedOperation, null as unknown as IHydraClient, {} as HydraResource)).toThrow()
        })

        it('throws if client is missing', () => {
            expect(() => new Operation({} as SupportedOperation, {} as IHydraClient, null as unknown as HydraResource)).toThrow()
        })
    })

    describe('target', () => {
        it('returns the underlying resource', () => {
            // given
            const resource = {} as HydraResource
            const operation = new Operation({
                description: 'the description',
                expects: {} as Class,
                method: 'POST',
                returns: {} as Class,
                title: 'the title',
            } as SupportedOperation, {} as IHydraClient, resource)

            // when
            const target = operation.target

            // then
            expect(target).toBe(resource)
        })
    })
})

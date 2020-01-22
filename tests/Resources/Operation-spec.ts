import { RdfResource } from '@tpluscode/rdfine'
import $rdf from 'rdf-ext'
import cf from 'clownface'
import * as sinon from 'sinon'
import namespace from '@rdfjs/namespace'
import { HydraClient } from '../../src/alcaeus'
import { HydraResource } from '../../src/Resources'
import { SupportedOperationMixin } from '../../src/Resources/Mixins/SupportedOperation'
import Operation from '../../src/Resources/Operation'
import { Resource } from './_TestResource'
import { hydra } from '../../src/Vocabs'

const ex = namespace('http://example.com/')
class SupportedOperation extends SupportedOperationMixin(Resource) {}

describe('Operation', () => {
    describe('property', () => {
        let operation: Operation

        beforeEach(() => {
            const node = cf({ dataset: $rdf.dataset() })
                .namedNode(ex.SupportedOperation)
            node.addOut(hydra.description, 'the description')
                .addOut(hydra.title, 'the title')
                .addOut(hydra.method, 'POST')
                .addOut(hydra.expects, ex.Expected)
                .addOut(hydra.returns, ex.Returned)

            operation = new Operation(new SupportedOperation(node), {} as HydraClient, {} as HydraResource)
        })

        it('method should delegate to operation', () => {
            expect(operation.method).toBe('POST')
        })

        it('expects should delegate to operation', () => {
            expect(operation.expects.id.value).toBe(ex.Expected.value)
        })

        it('returns should delegate to operation', () => {
            expect(operation.returns.id.value).toBe(ex.Returned.value)
        })

        it('description should delegate to operation', () => {
            expect(operation.description).toBe('the description')
        })
    })

    describe('invoke', () => {
        let alcaeus
        const supportedOperation = {} as SupportedOperation
        const resource = {
            id: $rdf.namedNode('http://target/resource'),
        } as Partial<RdfResource>

        beforeEach(() => {
            alcaeus = {
                invokeOperation: sinon.spy(),
            }
        })

        it('should execute through alcaeus with provided headers', () => {
            const op = new Operation(supportedOperation, alcaeus, resource as any)

            op.invoke('', {
                'content-type': 'text/turtle',
                'x-foo': 'bar',
            })

            expect(alcaeus.invokeOperation.firstCall.args[2])
                .toStrictEqual({
                    'content-type': 'text/turtle',
                    'x-foo': 'bar',
                })
        })
    })

    describe('constructor', () => {
        it('throws if supported operation is missing', () => {
            expect(() => new Operation(null as unknown as SupportedOperation, {} as HydraClient, {} as HydraResource)).toThrow()
        })

        it('throws if resource is missing', () => {
            expect(() => new Operation({} as SupportedOperation, null as unknown as HydraClient, {} as HydraResource)).toThrow()
        })

        it('throws if client is missing', () => {
            expect(() => new Operation({} as SupportedOperation, {} as HydraClient, null as unknown as HydraResource)).toThrow()
        })
    })

    describe('target', () => {
        it('returns the underlying resource', () => {
            // given
            const resource = {} as HydraResource
            const operation = new Operation({} as SupportedOperation, {} as HydraClient, resource)

            // when
            const target = operation.target

            // then
            expect(target).toBe(resource)
        })
    })
})

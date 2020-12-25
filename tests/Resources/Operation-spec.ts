import RdfResourceImpl, { RdfResource } from '@tpluscode/rdfine'
import * as Hydra from '@rdfine/hydra'
import $rdf from 'rdf-ext'
import cf, { GraphPointer } from 'clownface'
import * as sinon from 'sinon'
import namespace from '@rdfjs/namespace'
import { HydraClient } from '../../src/alcaeus'
import { createMixin, RuntimeOperation } from '../../src/Resources/Operation'
import { hydra } from '@tpluscode/rdf-ns-builders'

const ex = namespace('http://example.com/')

describe('Operation', () => {
    let node: GraphPointer

    function operation({ client, resource }: { client?: HydraClient; resource?: RdfResource } = {}): RuntimeOperation {
        return RdfResourceImpl.factory.createEntity(
            node, [
                createMixin(client || {} as any, resource || {} as any),
                Hydra.OperationMixin,
            ])
    }
    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() })
            .namedNode(ex.SupportedOperation)
    })

    describe('property', () => {
        beforeEach(() => {
            node.addOut(hydra.description, 'the description')
                .addOut(hydra.title, 'the title')
                .addOut(hydra.method, 'POST')
                .addOut(hydra.expects, ex.Expected)
                .addOut(hydra.returns, ex.Returned)
        })

        it('method should delegate to operation', () => {
            expect(operation().method).toBe('POST')
        })

        it('expects should delegate to operation', () => {
            expect(operation().expects[0].id.value).toBe(ex.Expected.value)
        })

        it('returns should delegate to operation', () => {
            expect(operation().returns?.id.value).toBe(ex.Returned.value)
        })

        it('description should delegate to operation', () => {
            expect(operation().description).toBe('the description')
        })
    })

    describe('invoke', () => {
        let client
        const resource = {
            id: $rdf.namedNode('http://target/resource'),
        } as any as RdfResource

        beforeEach(() => {
            client = {
                invokeOperation: sinon.spy(),
            }
        })

        it('should execute through alcaeus with provided headers', () => {
            operation({ client, resource }).invoke('', {
                'content-type': 'text/turtle',
                'x-foo': 'bar',
            })

            expect(client.invokeOperation.firstCall.args[1])
                .toStrictEqual({
                    'content-type': 'text/turtle',
                    'x-foo': 'bar',
                })
            expect(client.invokeOperation.firstCall.args[2]).toStrictEqual('')
        })
    })

    describe('target', () => {
        it('returns the underlying resource', () => {
            // given
            const resource = {} as RdfResource

            // when
            const target = operation({ resource }).target

            // then
            expect(target).toBe(resource)
        })
    })
})

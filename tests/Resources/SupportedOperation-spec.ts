import { NamedNode } from '@rdfjs/types'
import * as Hydra from '@rdfine/hydra'
import cf, { GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import { hydra, owl } from '@tpluscode/rdf-ns-builders'
import { OperationMixin } from '../../src/Resources/Mixins/Operation'
import { Resource } from './_TestResource'

class SupportedOperation extends OperationMixin(Hydra.OperationMixin(Resource)) {}

describe('SupportedOperation', () => {
    let node: GraphPointer<NamedNode>
    let operation: SupportedOperation

    beforeEach(() => {
        node = cf({ dataset: $rdf.dataset() })
            .namedNode('http://example.com/vocab#SupportedOperation')

        node
            .addOut(hydra.description, 'The operation description')
            .addOut(hydra.expects, owl.Nothing)
            .addOut(hydra.method, 'TRACE')
            .addOut(hydra.returns, node.namedNode('http://example.com/Something'))
            .addOut(hydra.title, 'The operation')

        operation = new SupportedOperation(node)
    })

    it('should expose operation method', async () => {
        // then
        expect(operation.method).toBe('TRACE')
    })

    it('should expose expected class id', async () => {
        // then
        expect(operation.expects?.map(e => e.id)).toEqual([owl.Nothing])
    })

    it('should expose returned class id', async () => {
        // then
        expect(operation.returns!.id.value).toEqual('http://example.com/Something')
    })

    describe('requiresInput', () => {
        it('should return false for GET operation', async () => {
            // given
            node.deleteOut(hydra.method).addOut(hydra.method, 'GET')

            // then
            expect(operation.requiresInput).toBe(false)
        })

        it('should return false for DELETE operation', async () => {
            // given
            node.deleteOut(hydra.method).addOut(hydra.method, 'DELETE')

            // then
            expect(operation.requiresInput).toBe(false)
        })

        it('should return true if operation expects a body', async () => {
            // given
            node.deleteOut(hydra.method).addOut(hydra.method, 'POST')

            // then
            expect(operation.requiresInput).toBe(true)
        })

        it('should return true if operation expects nothing', async () => {
            // given
            node.deleteOut(hydra.method).addOut(hydra.method, 'POST')

            // then
            expect(operation.requiresInput).toBe(true)
        })
    })
})

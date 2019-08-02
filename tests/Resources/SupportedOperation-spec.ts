import { promises as jsonld } from 'jsonld'
import { Core } from '../../src/Constants'
import { Mixin } from '../../src/Resources/Mixins/SupportedOperation'
import Resource from '../../src/Resources/Resource'
import { owl } from '../../src/Vocabs'
import Context from '../test-objects/Context'

class SupportedOperation extends Mixin(Resource) {}

describe('SupportedOperation', () => {
    let operationJsonLd

    beforeEach(() => {
        operationJsonLd = {
            '@context': Context,
            'description': 'The operation description',
            'expects': owl.Nothing,
            'method': 'TRACE',
            'returns': 'http://example.com/Something',
            'title': 'The operation',
        }
    })

    it('should expose operation method', async () => {
        // given
        const compacted = await jsonld.compact(operationJsonLd, {})

        // wehen
        const op = new SupportedOperation(compacted)

        // then
        expect(op.method).toBe('TRACE')
    })

    it('should expose expected class id', async () => {
        // given
        const compacted = await jsonld.compact(operationJsonLd, {})

        // when
        const op = new SupportedOperation(compacted)

        // then
        expect(op.expects!['@id']).toBe(owl.Nothing)
    })

    it('should expose returned class id', async () => {
        // given
        const compacted = await jsonld.compact(operationJsonLd, {})

        // when
        const op = new SupportedOperation(compacted)

        // then
        expect(op.returns!['@id']).toBe('http://example.com/Something')
    })

    describe('requiresInput', () => {
        it('should return false for GET operation', async () => {
            // given
            const operation = {
                '@context': Context,
                'method': 'GET',
            }

            const compacted = await jsonld.compact(operation, {})

            // when
            const op = new SupportedOperation(compacted)

            // then
            expect(op.requiresInput).toBe(false)
        })

        it('should return false for DELETE operation', async () => {
            // given
            const operation = {
                '@context': Context,
                'method': 'DELETE',
            }

            const compacted = await jsonld.compact(operation, {})

            // when
            const op = new SupportedOperation(compacted)

            // then
            expect(op.requiresInput).toBe(false)
        })

        it('should return true if operation expects a body', async () => {
            // given
            const operation = {
                '@context': Context,
                'method': 'POST',
            }

            const compacted = await jsonld.compact(operation, {})

            // when
            const op = new SupportedOperation(compacted)

            // then
            expect(op.requiresInput).toBe(true)
        })

        it('should return true if operation expects nothing', async () => {
            // given
            const operation = {
                '@context': Context,
                'method': 'POST',
            }

            const compacted = await jsonld.compact(operation, {})
            compacted[Core.Vocab('expects')] = { id: owl.Nothing }

            // when
            const op = new SupportedOperation(compacted)

            // then
            expect(op.requiresInput).toBe(true)
        })
    })
})

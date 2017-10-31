import {promises as jsonld} from 'jsonld';
import {SupportedOperation} from '../src/ApiDocumentation';
import {Core} from '../src/Constants';
import {owl} from '../src/Vocabs';
import {IHeracles} from "../src/interfaces";
import {async} from "./test-utils";

describe('SupportedOperation', () => {

    let operationJsonLd;

    beforeEach(() => operationJsonLd = {
        '@context': Core.Context,
        'title': 'The operation',
        'description': 'The operation description',
        'expects': owl.Nothing,
        'returns': 'http://example.com/Something',
        'method': 'TRACE'
    });

    async(it, 'should expose operation method', async () => {
        // given
        const compacted = await jsonld.compact(operationJsonLd, {});

        // wehen
        const op = new SupportedOperation(compacted, <IHeracles>{});

        // then
        expect(op.method).toBe('TRACE');
    });

    async(it, 'should expose expected class id', async () => {
        // given
        const compacted = await jsonld.compact(operationJsonLd, {});

        // when
            const op = new SupportedOperation(compacted, <IHeracles>{});

        // then
        expect(op.expects['@id']).toBe(owl.Nothing);
    });

    async(it, 'should expose returned class id', async () => {
        // given
        const compacted = await jsonld.compact(operationJsonLd, {});

        // when
        const op = new SupportedOperation(compacted, <IHeracles>{});

        // then
        expect(op.returns['@id']).toBe('http://example.com/Something');
    });

    describe('requiresInput', () => {

        async(it, 'should return false for GET operation', async () => {
            // given
            const operation = {
                '@context': Core.Context,
                'method': 'GET'
            };

            const compacted = await jsonld.compact(operation, {});

            // when
            const op = new SupportedOperation(compacted, <IHeracles>{});

            // then
            expect(op.requiresInput).toBe(false);
        });

        async(it, 'should return false for DELETE operation', async () => {
            // given
            const operation = {
                '@context': Core.Context,
                'method': 'DELETE'
            };

            const compacted = await jsonld.compact(operation, {});

            // when
            const op = new SupportedOperation(compacted, <IHeracles>{});

            // then
            expect(op.requiresInput).toBe(false);
        });

        async(it, 'should return true if operation expects a body', async () => {
            // given
            const operation = {
                '@context': Core.Context,
                'method': 'POST'
            };

            const compacted = await jsonld.compact(operation, {});

            // when
            const op = new SupportedOperation(compacted, <IHeracles>{});

            // then
            expect(op.requiresInput).toBe(true);
        });

        async(it, 'should return true if operation expects nothing', async () => {
            // given
            const operation = {
                '@context': Core.Context,
                'method': 'POST'
            };

            const compacted = await jsonld.compact(operation, {});
            compacted[Core.Vocab.expects] = { id: owl.Nothing };

            // when
            const op = new SupportedOperation(compacted, <IHeracles>{});

            // then
            expect(op.requiresInput).toBe(true);
        });
    });
});

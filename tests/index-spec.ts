import { Stream } from 'rdf-js'
import { EventEmitter } from 'events'
import SinkMap from '@rdfjs/sink-map'
import datasetIndexed from 'rdf-dataset-indexed'
import 'isomorphic-fetch'
import { create } from '../src'

describe('alcaeus', () => {
    describe('create', () => {
        it('attaches all parsers', () => {
            // given
            const parsers: SinkMap<EventEmitter, Stream> = new SinkMap<EventEmitter, Stream>([
                ['text/foo', {} as any],
                ['text/bar', {} as any],
            ])

            // when
            const client = create({
                parsers,
                fetch,
                Headers,
                datasetFactory: datasetIndexed,
            })

            // then
            expect(client.parsers.size).toEqual(2)
            expect(client.parsers.has('text/foo')).toBeTruthy()
            expect(client.parsers.has('text/bar')).toBeTruthy()
        })
    })
})

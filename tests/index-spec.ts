import { EventEmitter } from 'events'
import { Stream } from '@rdfjs/types'
import SinkMap from '@rdfjs/sink-map'
import { dataset } from '@rdfjs/dataset'
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
                datasetFactory: dataset,
            })

            // then
            expect(client.parsers.size).toEqual(2)
            expect(client.parsers.has('text/foo')).toBeTruthy()
            expect(client.parsers.has('text/bar')).toBeTruthy()
        })
    })
})

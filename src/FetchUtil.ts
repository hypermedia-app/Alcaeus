import type { SinkMap } from '@rdf-esm/sink-map'
import type { EventEmitter } from 'events'
import type { Stream } from 'rdf-js'
import ResponseWrapper from './ResponseWrapper'
import { merge } from './helpers/MergeHeaders'

type Parsers = SinkMap<EventEmitter, Stream>

function requestAcceptHeaders(sinkMap: Parsers) {
    return [...sinkMap.keys()].join(', ')
}

export default function (_fetch: typeof fetch, _Headers: typeof Headers) {
    async function getResponse(effectiveUri, { method, headers = {}, body, parsers }: { method: string; headers?: HeadersInit; body?: BodyInit; parsers: Parsers }) {
        const defaultHeaders: HeadersInit = {
            accept: requestAcceptHeaders(parsers),
        }

        const requestInit: RequestInit = {
            method,
        }

        if (method.toLowerCase() !== 'get') {
            requestInit.body = body
        }

        requestInit.headers = merge(new _Headers(defaultHeaders), new _Headers(headers), _Headers)

        const res = await _fetch(effectiveUri, requestInit)

        return new ResponseWrapper(effectiveUri, res, parsers)
    }

    function resource(uri: string, requestInit: { parsers: Parsers; headers?: HeadersInit }): Promise<ResponseWrapper> {
        return getResponse(uri, {
            method: 'get',
            ...requestInit,
        })
    }

    function operation(
        method: string,
        uri: string,
        requestInit: { parsers: Parsers; headers?: HeadersInit; body?: BodyInit }): Promise<ResponseWrapper> {
        return getResponse(uri, { method, ...requestInit })
    }

    return {
        resource,
        operation,
    }
}

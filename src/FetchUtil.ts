import type { EventEmitter } from 'events'
import type { Stream } from '@rdfjs/types'
import type { SinkMap } from '@rdf-esm/sink-map'
import li from 'parse-link-header'
import ResponseWrapper from './ResponseWrapper'
import { merge } from './helpers/MergeHeaders'
import * as Constants from './Constants'

type Parsers = SinkMap<EventEmitter, Stream>

function requestAcceptHeaders(sinkMap: Parsers) {
    return [...sinkMap.keys()].join(', ')
}

export default function (_fetch: typeof fetch, _Headers: typeof Headers) {
    async function getResponse(effectiveUri: string, { method, headers = {}, body, parsers }: { method: string; headers?: HeadersInit; body?: BodyInit; parsers: Parsers }) {
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
        const linkHeaders = res.headers.get(Constants.Headers.Link) || ''
        const links = li(linkHeaders) || {}

        let jsonLdContext: unknown
        if (links[Constants.LinkRelations.context]) {
            jsonLdContext = await _fetch(links[Constants.LinkRelations.context].url).then(res => res.json())
        }

        return new ResponseWrapper(effectiveUri, res, parsers, jsonLdContext)
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

import SinkMap from '@rdfjs/sink-map'
import { EventEmitter } from 'events'
import { Stream } from 'rdf-js'
import url from 'url'
import { fetch, Headers } from './fetch'
import ResponseWrapper from './ResponseWrapper'
import { merge } from './helpers/MergeHeaders'

type Parsers = SinkMap<EventEmitter, Stream>

function requestAcceptHeaders(sinkMap: Parsers) {
    return [...sinkMap.keys()].join(', ')
}

async function getResponse(uri, { method, headers = {}, body, baseUri, parsers }: { method: string; headers?: HeadersInit; body?: BodyInit; baseUri?: string; parsers: Parsers }) {
    let effectiveUri = uri
    if (uri.match(/^https?:\/\//) === null && baseUri) {
        effectiveUri = url.resolve(baseUri, uri)
    }

    const defaultHeaders: HeadersInit = {
        accept: requestAcceptHeaders(parsers),
    }

    const requestInit: RequestInit = {
        method,
    }

    if (method.toLowerCase() !== 'get') {
        requestInit.body = body
    }

    requestInit.headers = merge(new Headers(defaultHeaders), new Headers(headers))

    const res = await fetch(effectiveUri, requestInit)

    return new ResponseWrapper(effectiveUri, res, parsers)
}

export function fetchResource(uri: string, requestInit: { parsers: Parsers; headers?: HeadersInit; baseUri?: string }): Promise<ResponseWrapper> {
    return getResponse(uri, {
        method: 'get',
        ...requestInit,
    })
}

export function invokeOperation(
    method: string,
    uri: string,
    requestInit: { parsers: Parsers; headers?: HeadersInit; body?: BodyInit; baseUri?: string }): Promise<ResponseWrapper> {
    return getResponse(uri, { method, ...requestInit })
}

import SinkMap from '@rdfjs/sink-map'
import { EventEmitter } from 'events'
import { Stream } from 'rdf-js'
import ResponseWrapper from './ResponseWrapper'
import { merge } from './helpers/MergeHeaders'

type Parsers = SinkMap<EventEmitter, Stream>

function requestAcceptHeaders (sinkMap: Parsers) {
    return [...sinkMap.keys()].join(', ')
}

async function getResponse (uri: string, method: string, headers: HeadersInit = {}, parsers: Parsers, body?: BodyInit) {
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

    const res = await fetch(uri, requestInit)

    return new ResponseWrapper(uri, res)
}

export function fetchResource (uri: string, parsers: Parsers, headers?: HeadersInit): Promise<ResponseWrapper> {
    return getResponse(uri, 'get', headers, parsers)
}

export function invokeOperation (
    method: string,
    uri: string,
    parsers: Parsers,
    headers?: HeadersInit,
    body?: BodyInit): Promise<ResponseWrapper> {
    return getResponse(uri, method, headers, parsers, body)
}

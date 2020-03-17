import * as Constants from './Constants'
import { ResponseWrapper } from './ResponseWrapper'
import { merge } from './helpers/MergeHeaders'

// tslint:disable:max-line-length
const requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads

async function getResponse (uri, { method, headers = {}, body, baseUri }: { method: string; headers?: HeadersInit; body?: BodyInit; baseUri?: string }) {
    let effectiveUri = uri
    if (uri.match(/^https?:\/\//) === null && baseUri) {
        effectiveUri = new URL(uri, baseUri).toString()
    }

    const defaultHeaders: HeadersInit = {
        accept: requestAcceptHeaders,
    }

    const requestInit: RequestInit = {
        method,
    }

    if (method.toLowerCase() !== 'get') {
        if (!(body instanceof FormData)) {
            defaultHeaders['content-type'] = Constants.MediaTypes.jsonLd
        }

        requestInit.body = body
    }

    requestInit.headers = merge(new Headers(defaultHeaders), new Headers(headers))

    const res = await fetch(effectiveUri, requestInit)

    return new ResponseWrapper(effectiveUri, res)
}

export function fetchResource (uri: string, headers: HeadersInit, baseUri?: string): Promise<ResponseWrapper> {
    return getResponse(uri, {
        method: 'get',
        headers,
        baseUri,
    })
}

export function invokeOperation (
    method: string,
    uri: string,
    body?: BodyInit,
    headers?: HeadersInit,
    baseUri?: string): Promise<ResponseWrapper> {
    return getResponse(uri, { method, headers, body, baseUri })
}

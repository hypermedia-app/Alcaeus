import * as Constants from './Constants'
import { ResponseWrapper } from './ResponseWrapper'
import { merge } from './helpers/MergeHeaders'

// tslint:disable:max-line-length
const requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads

async function getResponse (uri: string, method: string, headers: HeadersInit = {}, body?: BodyInit) {
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

    requestInit.headers = new Headers(merge(defaultHeaders, headers))

    const res = await fetch(uri, requestInit)

    return new ResponseWrapper(uri, res)
}

export function fetchResource (uri: string, headers: HeadersInit): Promise<ResponseWrapper> {
    return getResponse(uri, 'get', headers)
}

export function invokeOperation (
    method: string,
    uri: string,
    body?: BodyInit,
    headers?: HeadersInit): Promise<ResponseWrapper> {
    return getResponse(uri, method, headers, body)
}

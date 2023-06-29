import type { EventEmitter } from 'events'
import type { Stream } from '@rdfjs/types'
import type { SinkMap } from '@rdfjs/sink-map'
import li from 'parse-link-header'
import ResponseWrapper from './ResponseWrapper.js'
import { merge } from './helpers/MergeHeaders.js'
import * as Constants from './Constants.js'

export type AllowedRequestInit = Omit<RequestInit, 'headers' | 'method' | 'body' | 'redirect'>
type Parsers = SinkMap<EventEmitter, Stream>

function requestAcceptHeaders(sinkMap: Parsers) {
  return [...sinkMap.keys()].join(', ')
}

export default function (_fetch: typeof fetch, _Headers: typeof Headers) {
  async function getResponse(effectiveUri: string, { method = 'get', headers = {}, body, parsers, ...rest }: { parsers: Parsers } & RequestInit) {
    const defaultHeaders: HeadersInit = {
      accept: requestAcceptHeaders(parsers),
    }

    const requestInit: RequestInit = {
      method,
      ...filterRequestInit(rest),
    }

    if (method.toLowerCase() !== 'get') {
      requestInit.body = body
    }

    requestInit.headers = merge(new _Headers(defaultHeaders), new _Headers(headers), _Headers)

    const res = await _fetch(effectiveUri, requestInit)
    const linkHeaders = res.headers.get(Constants.Headers.Link) || ''
    const links = li(linkHeaders) || {}

    let jsonLdContext: unknown
    const context = links[Constants.LinkRelations.context]
    if (typeof context !== 'undefined') {
      jsonLdContext = await _fetch(context.url).then(res => res.json())
    }

    return new ResponseWrapper(effectiveUri, res, parsers, jsonLdContext)
  }

  function resource(uri: string, requestInit: { parsers: Parsers; headers?: HeadersInit } & AllowedRequestInit): Promise<ResponseWrapper> {
    return getResponse(uri, {
      method: 'get',
      ...requestInit,
    })
  }

  function operation(
    method: string,
    uri: string,
    requestInit: { parsers: Parsers; headers?: HeadersInit; body?: BodyInit } & AllowedRequestInit): Promise<ResponseWrapper> {
    return getResponse(uri, { method, ...requestInit })
  }

  return {
    resource,
    operation,
  }
}

function filterRequestInit(arg: RequestInit = {}): AllowedRequestInit {
  const { headers, body, method, redirect, ...rest } = arg
  return rest
}

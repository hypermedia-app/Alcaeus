import stringToStream from 'string-to-stream'
import rdf from 'rdf-ext'
import Parser from '@rdfjs/parser-n3'
import { prefixes } from '@zazuko/rdf-vocabularies'
import { parsers } from '@rdfjs/formats-common'
import { ResponseWrapper } from '../src/ResponseWrapper'
import { MediaTypes } from './Constants'
import 'isomorphic-fetch'

const parser = new Parser()

export function responseBuilder() {
    let statusCode = 200
    let responseBody: any
    let responseUri: string
    const headers = {
        'Content-Type': MediaTypes.jsonLd,
    } as any

    return {

        body(body: string | Record<any, any>, contentType = MediaTypes.jsonLd) {
            if (typeof body === 'object') {
                responseBody = stringToStream(JSON.stringify(body))
            } else {
                responseBody = stringToStream(body)
            }
            return this.header('Content-Type', contentType)
        },

        redirect(redirectUri: string) {
            responseUri = redirectUri
            return this
        },

        contentLocation(headerValue: string) {
            return this.header('Content-Location', headerValue)
        },

        link(href: string, rel: string) {
            return this.header('Link', `<${href}>; rel=${rel}`)
        },

        canonical(href: string) {
            return this.link(href, 'canonical')
        },

        header(name: string, value: string) {
            headers[name] = value
            return this
        },

        statusCode(status: number) {
            statusCode = status
            return this
        },

        notFound() {
            return this.statusCode(404)
        },

        serverError() {
            return this.statusCode(500)
        },

        apiDocumentation(docUri = 'http://api.example.com/doc/') {
            return this.link(docUri, 'http://www.w3.org/ns/hydra/core#apiDocumentation')
        },

        build({ url }: { url?: string } = {}): Promise<Response> {
            let response

            if (responseUri) {
                response = Response.redirect(responseUri, 302)
            } else {
                response = new Response(responseBody, <any>{
                    headers: new Headers(headers),
                    status: statusCode,
                    url,
                })
            }

            return Promise.resolve(response)
        },

    }
}

export function mockedResponse({ includeDocsLink = true, xhrBuilder }: { includeDocsLink?: boolean; xhrBuilder: ReturnType<typeof responseBuilder> }): (uri: string) => Promise<ResponseWrapper> {
    xhrBuilder = xhrBuilder || responseBuilder()

    return async (requestedUri: string) => {
        const xhr = await xhrBuilder.build()

        const response: Omit<ResponseWrapper, 'xhr'> = {
            apiDocumentationLink: includeDocsLink ? 'http://api.example.com/doc/' : null,
            mediaType: xhr.headers.get('Content-Type')!,
            redirectUrl: null,
            quadStream() {
                if (!xhr.body) {
                    return null
                }

                return parsers.import(this.mediaType, xhr.body as any)
            },
            requestedUri,
            resourceUri: requestedUri,
            effectiveUri: requestedUri,
            resolveUri(uri: string): string {
                return uri
            },
        }

        Object.defineProperty(response, 'xhr', {
            get: () => xhr.clone(),
        })

        return response as ResponseWrapper
    }
}

export function createGraph(ntriples: string) {
    return async () => {
        const dataset = rdf.dataset()
        const stream = stringToStream(`
    BASE <http://example.com/>
    PREFIX rdf: <${prefixes.rdf}>
    PREFIX rdfs: <${prefixes.rdfs}>
    PREFIX foaf: <${prefixes.foaf}>
    PREFIX hydra: <${prefixes.hydra}>

    ${ntriples}`)
        return dataset.import(parser.import(stream as any))
    }
}

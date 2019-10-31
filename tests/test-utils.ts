import * as _ from 'lodash'
import { Core, JsonLd, MediaTypes } from '../src/Constants'
import { IResponseWrapper } from '../src/ResponseWrapper'
import 'isomorphic-fetch'
import stringToStream from 'string-to-stream'
import rdf from 'rdf-ext'
import Parser from '@rdfjs/parser-n3'
import { prefixes } from '@zazuko/rdf-vocabularies'

const parser = new Parser()

function addPredicateGetter (this: any, prop: string, pred: string, wrapArray: boolean = true) {
    Object.defineProperty(this, prop, {
        get: () => {
            const ret = this[pred]
            if (Array.isArray(ret) === false && wrapArray) {
                return [ret]
            }

            return ret
        },
    })
}

export function fakeAlcaeusResources (obj: object) {
    if (!obj || typeof obj !== 'object') {
        return {}
    }

    const addGetter = addPredicateGetter.bind(obj)

    addGetter('id', JsonLd.Id, false)
    addGetter('types', JsonLd.Type, false)
    addGetter('supportedProperties', Core.Vocab('supportedProperty'))
    addGetter('supportedOperations', Core.Vocab('supportedOperation'))
    addGetter('property', Core.Vocab('property'), false)

    _.forOwn(obj, fakeAlcaeusResources)

    return obj
}

export function responseBuilder (): any {
    let statusCode = 200
    let responseBody = '{}'
    let responseUri
    const headers = {
        'Content-Type': MediaTypes.jsonLd,
    } as any

    return {

        body (body: string | object, contentType = MediaTypes.jsonLd) {
            if (typeof body === 'object') {
                responseBody = JSON.stringify(body)
            } else {
                responseBody = body as string
            }
            headers['Content-Type'] = contentType
            return this
        },

        redirect (redirectUri: string) {
            responseUri = redirectUri
            return this
        },

        contentLocation (headerValue: string) {
            headers['Content-Location'] = headerValue
            return this
        },

        link (href: string, rel: string) {
            headers.Link = `<${href}>; rel=${rel}`
            return this
        },

        canonical (href: string) {
            return this.link(href, 'canonical')
        },

        statusCode (status: number) {
            statusCode = status
            return this
        },

        notFound () {
            return this.statusCode(404)
        },

        serverError () {
            return this.statusCode(500)
        },

        apiDocumentation (docUri: string = 'http://api.example.com/doc/') {
            return this.link(docUri, 'http://www.w3.org/ns/hydra/core#apiDocumentation')
        },

        build (): Promise<Response> {
            let response

            if (responseUri) {
                response = Response.redirect(responseUri, 302)
            } else {
                response = new Response(responseBody, {
                    headers: new Headers(headers),
                    status: statusCode,
                })
            }

            return Promise.resolve(response)
        },

    }
}

export async function mockedResponse ({ includeDocsLink = true, xhrBuilder }): Promise<IResponseWrapper> {
    xhrBuilder = xhrBuilder || responseBuilder()
    const xhr = await xhrBuilder.build()

    const response = {
        apiDocumentationLink: includeDocsLink ? 'http://api.example.com/doc/' : null,
        mediaType: xhr.headers.get('Content-Type'),
        redirectUrl: null,
    }

    Object.defineProperty(response, 'xhr', {
        get: () => xhr.clone(),
    })

    return response as IResponseWrapper
}

export function createGraph (ntriples: string) {
    return async () => {
        const dataset = rdf.dataset()
        const stream = stringToStream(`
    BASE <http://example.com/>
    PREFIX rdf: <${prefixes.rdf}>
    PREFIX rdfs: <${prefixes.rdfs}>
    PREFIX foaf: <${prefixes.foaf}>
    PREFIX hydra: <${prefixes.hydra}>

    ${ntriples}`)
        return dataset.import(await parser.import(stream))
    }
}

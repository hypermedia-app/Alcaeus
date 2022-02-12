import type { EventEmitter } from 'events'
import type { Stream } from '@rdfjs/types'
import type { SinkMap } from '@rdf-esm/sink-map'
import li from 'parse-link-header'
import * as Constants from './Constants'
import { patchResponseBody } from './helpers/fetchToStream'
import { stripContentTypeParameters } from './mediaType'

export interface ResponseWrapper {
    /**
     * Gets the URI used to perform the request
     */
    readonly requestedUri: string

    /**
     * Gets the response content type, as advertised in response HTTP header
     */
    mediaType: string

    /**
     * Gets the URI identifying the ApiDocumentation resource if present in the response Link header
     */
    apiDocumentationLink: string | null

    /**
     * If the request was redirected, returns the target resource
     */
    redirectUrl: string | null

    effectiveUri: string

    resourceUri: string

    /**
     * Gets the actual XMLHttpResponse object which can be used to do custom processing
     */
    xhr: Response

    /**
     * Returns a URL which is the product of applying it
     * to the request base.
     *
     * If the parameter is already an absolute URI reference,
     * it will be returned unchanged
     */
    resolveUri(uri: string): string

    quadStream(): Stream | null
}

export default class implements ResponseWrapper {
    public constructor(
        public readonly requestedUri: string,
        public readonly xhr: Response,
        private readonly parsers: SinkMap<EventEmitter, Stream>,
        private readonly jsonLdContext?: unknown,
    ) {}

    public quadStream(): Stream | null {
        const quadStream = this.parsers.import(
            stripContentTypeParameters(this.mediaType),
            patchResponseBody(this.xhr),
            { baseIRI: this.effectiveUri, context: this.jsonLdContext })
        if (quadStream == null) {
            return null
        }

        return quadStream
    }

    public get status(): number {
        return this.xhr.status
    }

    public get apiDocumentationLink() {
        if (this.xhr.headers.has(Constants.Headers.Link)) {
            if (this.links[Constants.LinkRelations.apiDocumentation]) {
                const linkUrl = this.links[Constants.LinkRelations.apiDocumentation].url

                return this.resolveUri(linkUrl)
            }
        }

        return null
    }

    public get links() {
        const linkHeaders = this.xhr.headers.get(Constants.Headers.Link) || ''
        return li(linkHeaders) || {}
    }

    public get mediaType(): string {
        if (this.links[Constants.LinkRelations.context]) {
            return 'application/ld+json'
        }

        return this.xhr.headers.get(Constants.Headers.ContentType) || ''
    }

    public get redirectUrl() {
        if (this.xhr.redirected) {
            return this.xhr.url
        }

        return null
    }

    public get effectiveUri() {
        return this.redirectUrl || this.requestedUri
    }

    public get resourceUri(): string {
        return this.createdResourceUri || this.canonicalUri || this.effectiveUri
    }

    private get createdResourceUri(): string | undefined {
        const location = this.xhr.headers.get(Constants.Headers.Location)

        if (this.xhr.status === 201 && location !== null) {
            return this.resolveUri(location)
        }

        return undefined
    }

    private get canonicalUri(): string | undefined {
        if (this.links[Constants.LinkRelations.canonical]) {
            return this.resolveUri(this.links[Constants.LinkRelations.canonical].url)
        }

        return undefined
    }

    public resolveUri(uri: string) {
        return new URL(uri, this.effectiveUri).toString()
    }
}

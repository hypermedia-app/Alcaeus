import SinkMap from '@rdfjs/sink-map'
import { EventEmitter } from 'events'
import li from 'parse-link-header'
import { Stream } from 'rdf-js'
import * as Constants from './Constants'
import { patchResponseBody } from './helpers/fetchToStream'
import nonenumerable from './helpers/nonenumerable'
import { hydra } from '@tpluscode/rdf-ns-builders'

const apiDocumentationRel = hydra.apiDocumentation.value

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

function stripContentTypeParameters(mediaType: string) {
    return mediaType.split(';').shift() || ''
}

export default class implements ResponseWrapper {
    public readonly requestedUri: string;

    @nonenumerable
    public readonly xhr: Response;

    private parsers: SinkMap<EventEmitter, Stream>

    public constructor(requestedUri: string, res: Response, parsers: SinkMap<EventEmitter, Stream>) {
        this.xhr = res

        this.requestedUri = requestedUri
        this.parsers = parsers
    }

    public quadStream(): Stream | null {
        const quadStream = this.parsers.import(stripContentTypeParameters(this.mediaType), patchResponseBody(this.xhr))
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
            const linkHeaders = this.xhr.headers.get(Constants.Headers.Link)
            const links = li(linkHeaders)

            if (links[apiDocumentationRel]) {
                const linkUrl = links[apiDocumentationRel].url

                return this.resolveUri(linkUrl)
            }
        }

        return null
    }

    public get mediaType(): string {
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
        const linkHeaders = this.xhr.headers.get(Constants.Headers.Link)
        const links = li(linkHeaders)

        if (links && links[Constants.LinkRelations.canonical]) {
            return this.resolveUri(links[Constants.LinkRelations.canonical].url)
        }

        return undefined
    }

    public resolveUri(uri: string) {
        return new URL(uri, this.effectiveUri).toString()
    }
}

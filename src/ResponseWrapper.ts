import li from 'parse-link-header'
import * as Constants from './Constants'
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
}

export default class implements ResponseWrapper {
    public readonly requestedUri: string;

    @nonenumerable
    public readonly xhr: Response;

    public constructor(requestedUri: string, res: Response) {
        this.xhr = res

        this.requestedUri = requestedUri
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

    public resolveUri(uri: string) {
        return new URL(uri, this.redirectUrl || this.requestedUri).toString()
    }
}

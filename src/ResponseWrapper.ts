import * as li from 'parse-link-header'
import * as Constants from './Constants'
import nonenumerable from './helpers/nonenumerable'

export interface IResponseWrapper {
    /**
     * Gets the URI used to perform the request
     */
    readonly requestedUri: string;

    /**
     * Gets the response content type, as advertised in response HTTP header
     */
    mediaType: string;

    /**
     * Gets the URI identifying the ApiDocumentation resource if present in the response Link header
     */
    apiDocumentationLink: string;

    /**
     * If the request was redirected, returns the target resource
     */
    redirectUrl: string;

    /**
     * Gets the actual XMLHttpResponse object which can be used to do custom processing
     */
    xhr: Response;
}

export class ResponseWrapper implements IResponseWrapper {
    public readonly requestedUri: string;

    @nonenumerable
    public readonly xhr: Response;

    public constructor (requestedUri: string, res: Response) {
        this.xhr = res

        this.requestedUri = requestedUri
    }

    public get status (): number {
        return this.xhr.status
    }

    public get apiDocumentationLink (): string {
        if (this.xhr.headers.has(Constants.Headers.Link)) {
            const linkHeaders = this.xhr.headers.get(Constants.Headers.Link)
            const links = li(linkHeaders)

            if (links[Constants.Core.Vocab('apiDocumentation')]) {
                const linkUrl = links[Constants.Core.Vocab('apiDocumentation')].url

                return new URL(linkUrl, this.redirectUrl || this.requestedUri).toString()
            }
        }

        return null
    }

    public get mediaType (): string {
        return this.xhr.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd
    }

    public get redirectUrl (): string {
        if (this.xhr.redirected) {
            return this.xhr.url
        }

        return null
    }
}

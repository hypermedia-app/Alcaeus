import * as li from 'parse-link-header';
import * as Constants from './Constants';

export interface IResponseWrapper {
    mediaType: string;
    apiDocumentationLink: string;
    redirectUrl: string;
    xhr: Response;
}

export class ResponseWrapper implements IResponseWrapper {
    constructor(res: Response) {
        this.xhr = res;
    }

    readonly xhr: Response;

    get status(): number {
        return this.xhr.status;
    }

    get apiDocumentationLink(): string {
        if (this.xhr.headers.has(Constants.Headers.Link)) {
            const linkHeaders = this.xhr.headers.get(Constants.Headers.Link);
            const links = li(linkHeaders);

            if (links[Constants.Core.Vocab('apiDocumentation')]) {
                return links[Constants.Core.Vocab('apiDocumentation')].url;
            }
        }

        return null;
    }

    get mediaType(): string {
        return this.xhr.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd;
    }

    get redirectUrl(): string {
        if (this.xhr.redirected) {
            return this.xhr.url;
        }

        return null;
    }
}

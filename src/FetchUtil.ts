'use strict';

//noinspection TypeScriptCheckImport
import * as li from 'li';
import {promises as jsonld} from 'jsonld';
import * as Constants from "./Constants";
import {FlatteningOptions} from "jsonld";

export class FetchUtil {
    static _requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads;

    static fetchResource(uri:string):Promise<ExpandedWithDocs> {

        return window.fetch(uri, <FetchOptions>{
                headers: {
                    accept: FetchUtil._requestAcceptHeaders
                }
            })
            .then(rejectNotFoundStatus)
            .then((res:Response) => {
                    var apiDocsUri = getDocumentationUri(res);

                    return getFlattendGraph(res)
                        .then(obj => new ExpandedWithDocs(obj, apiDocsUri));
                },
                () => null);
    }

    static fetchDocumentation(uri:string):Promise<Object> {
        return window.fetch(uri, <FetchOptions>{
                headers: {
                    accept: FetchUtil._requestAcceptHeaders
                }
            })
            .then(rejectNotFoundStatus)
            .then(getFlattendGraph, () => null);
    }
}

function rejectNotFoundStatus(res:Response) {
    if (res.status === 404) {
        return Promise.reject(null);
    }

    return res;
}

function getDocumentationUri(res:Response):string {
    if (res.headers.has(Constants.Headers.Link)) {
        var linkHeaders = res.headers.get(Constants.Headers.Link);
        var links = li.parse(linkHeaders);

        return links[Constants.Core.Vocab.apiDocumentation];
    }

    return null;
}

class ExpandedWithDocs {
    constructor(resources:Object, apiDocumentationLink:string) {
        this.resources = resources;
        this.apiDocumentationLink = apiDocumentationLink;
    }

    resources:Object;
    apiDocumentationLink:string;
}

class FetchError extends Error {
    private _response;

    constructor(response:Response) {
        super('Request failed');

        this._response = response;
    }

    get response() {
        return this._response;
    }
}

function getFlattendGraph(res:Response) {
    var mediaType = res.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd;

    if (res.ok === false) {
        return Promise.reject(new FetchError(res))
    }

    if (mediaType === Constants.MediaTypes.jsonLd) {
        return res.json().then(flatten(res.url));
    } else {

        if (mediaType === Constants.MediaTypes.ntriples ||
            mediaType === Constants.MediaTypes.ntriples) {
            mediaType = 'application/nquads';
        }

        return res.text().then(rdf => {
            return jsonld.fromRDF(rdf, {format: mediaType}).then(flatten(res.url));
        });
    }
}

function flatten(url) {
    return json => {
        var opts:FlatteningOptions = {};
        if (url) {
            opts.base = url;
        }

        return jsonld.expand(json, opts)
            .then(expanded => jsonld.flatten(expanded, {}))
            .then(flattened => flattened[Constants.JsonLd.Graph]);
    }
}
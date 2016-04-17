'use strict';

//noinspection TypeScriptCheckImport
import * as li from 'li';
//noinspection TypeScriptCheckImport
import {promises as jsonld} from 'jsonld';
import * as Constants from "./Constants";

export class FetchUtil {
    static _requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads;

    static fetchResource(uri:string):Promise<ExpandedWithDocs> {

        return window.fetch(uri, <FetchOptions>{
                headers: {
                    accept: FetchUtil._requestAcceptHeaders
                }
            })
            .then((res:Response) => {
                var apiDocsUri = getDocumentationUri(res);

                return getFlattendGraph(res)
                    .then(obj => new ExpandedWithDocs(obj, apiDocsUri));
            });
    }

    static fetchDocumentation(uri:string):Promise<Object> {
        return window.fetch(uri, <FetchOptions>{
            headers: {
                accept: FetchUtil._requestAcceptHeaders
            }
        }).then(getFlattendGraph);
    }
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
        return res.json().then(flatten);
    } else {

        if (mediaType === Constants.MediaTypes.ntriples ||
            mediaType === Constants.MediaTypes.ntriples) {
            mediaType = 'application/nquads';
        }

        return res.text().then(rdf => {
            return jsonld.fromRDF(rdf, {format: mediaType}).then(flatten);
        });
    }
}

function flatten(json) {
    return jsonld.flatten(json, {})
        .then(flattened => flattened[Constants.JsonLd.Graph]);
}
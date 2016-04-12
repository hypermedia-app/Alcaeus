/// <reference path="../typings/browser.d.ts" />
'use strict';

//noinspection TypeScriptCheckImport
import * as li from 'li';
//noinspection TypeScriptCheckImport
import {promises as jsonld} from 'jsonld';
import {ApiDocumentation} from "./ApiDocumentation";
import * as Constants from './Constants';

export class Resource {
    static load(uri:string) {
        var requestAcceptHeaders = 'application/ld+json, application/ntriples, application/nquads';

        return window.fetch(uri, <FetchOptions>{
                headers: {
                    accept: requestAcceptHeaders
                }
            })
            .then((res:Response) => {
                if (res.headers.has(Constants.Headers.Link)) {
                    var linkHeaders = res.headers.get(Constants.Headers.Link);
                    var links = li.parse(linkHeaders);
                }

                if (links[Constants.Core.Vocab.apiDocumentation]) {
                    ApiDocumentation.load(links[Constants.Core.Vocab.apiDocumentation]);
                }

                return getJsObject(res);
            });
    }
}

function getJsObject(res:Response) {
    var mediaType = res.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.JsonLd;

    if (mediaType === Constants.MediaTypes.JsonLd) {
        return res.json();
    }

    if (mediaType === 'application/ntriples' || mediaType === 'application/nquads') {
        return res.text().then(jsonld.expand);
    }

    throw new Error('Unsupported media type: ' + mediaType);
}

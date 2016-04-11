/// <reference path="../typings/browser.d.ts" />
'use strict';

import * as li from 'li';
import {promises as jsonld} from 'jsonld';

export class ApiDocumentation {
    constructor(apiOdc:any) {
        throw new Error('not implemented');
    }

    static load(uri:string) {

    }
}

export class Resource {
    static load(uri:string) {
        var requestAcceptHeaders = 'application/ld+json, application/ntriples, application/nquads';

        return window.fetch(uri, <FetchOptions>{
                headers: {
                    accept: requestAcceptHeaders
                }
            })
            .then((res:Response) => {
                if (res.headers.has('Link')) {
                    var linkHeaders = res.headers.get('Link');
                    var links = li.parse(linkHeaders);
                }

                if (links['http://www.w3.org/ns/hydra/core#apiDocumentation']) {
                    ApiDocumentation.load(links['http://www.w3.org/ns/hydra/core#apiDocumentation']);
                }

                return getJsObject(res);
            });
    }
}

function getJsObject(res:Response) {
    var mediaType = res.headers.get('Content-Type') || 'application/ld+json';

    if (mediaType === 'application/ld+json') {
        return res.json();
    }

    if (mediaType === 'application/ntriples' || mediaType === 'application/nquads') {
        return res.text().then(jsonld.expand);
    }

    throw new Error('Unsupported media type: ' + mediaType);
}
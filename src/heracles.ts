/// <reference path="../typings/browser.d.ts" />

'use strict';

export class Hydra {

    static load(uri: string) {
        var requestAcceptHeaders = 'application/ld+json, application/ntriples, application/nquads';

        return window.fetch(uri, <FetchOptions>{
            headers: {
                accept: requestAcceptHeaders
            }
        });
    }
}

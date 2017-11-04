import * as _ from 'lodash';
import {JsonLd, Core, MediaTypes} from "../src/Constants";

export function fakeAlcaeusResources(obj: Object) {
    if (!obj || typeof obj !== 'object') {
        return;
    }

    const addGetter = addPredicateGetter.bind(obj);

    addGetter('id', JsonLd.Id, false);
    addGetter('types', JsonLd.Type, false);
    addGetter('supportedProperties', Core.Vocab.supportedProperty);
    addGetter('supportedOperations', Core.Vocab.supportedOperation);
    addGetter('property', Core.Vocab.property, false);

    _.forOwn(obj, fakeAlcaeusResources);

    return obj;
}

export function responseBuilder() {
    let isOk = true;
    let statusCode = 200;
    let responseBody = '{}';
    let responseUri;
    const headers = {
        'Content-Type': MediaTypes.jsonLd
    };

    return {

        body: function (body: string) {
            responseBody = body;
            return this;
        },

        redirect: function (redirectUri: string) {
            responseUri = redirectUri;
            return this;
        },

        contentLocation: function (headerValue: string) {
            headers['Content-Location'] = headerValue;
            return this;
        },

        contentType: function (value: string) {
            headers['Content-Type'] = value;
            return this;
        },

        jsonLdPayload: function (jsonLd: Object) {
            return this.body(JSON.stringify(jsonLd))
                .contentType(MediaTypes.jsonLd);
        },

        nTriplesPayload: function (triples: string) {
            return this.body(triples)
                .contentType(MediaTypes.ntriples);
        },

        statusCode: function (status: number) {
            statusCode = status;
            if (status >= 400) {
                isOk = false;
            }
            return this;
        },

        notFound: function () {
            return this.statusCode(404);
        },

        serverError: function () {
            return this.statusCode(500);
        },

        apiDocumentation: function (docUri?: string) {
            docUri = docUri || 'http://api.example.com/doc/';
            headers['Link'] = `<${docUri}>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"`;
            return this;
        },

        build: function (): Promise<Response> {
            let response;

            if (responseUri) {
                response = Response.redirect(responseUri, 302);
            }
            else {
                response = new Response(responseBody, {
                    headers: new Headers(headers),
                    status: statusCode
                });
            }

            return Promise.resolve(response);
        }

    };
}

export function async(it, expectation, test) {
    it(expectation, done => {
        test.call(this).then(done).catch(done.fail);
    });
}

function addPredicateGetter(prop: string, pred: string, wrapArray: boolean = true) {
    Object.defineProperty(this, prop, {
        get: () => {
            const ret = this[pred];
            if (Array.isArray(ret) === false && wrapArray) {
                return [ret];
            }

            return ret;
        }
    });
}

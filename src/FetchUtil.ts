'use strict';

import * as li from 'li';
import * as _ from 'lodash';
import {promises as jsonld} from 'jsonld';
import * as Constants from "./Constants";
import {FlattenOptions} from "jsonld";
import * as $rdf from 'rdf-ext';
import * as formats from 'rdf-formats-common';
import * as JsonLdSerializer from 'rdf-serializer-jsonld'
import {rdf} from 'jasnell/linkeddata-vocabs';

formats($rdf);

export class FetchUtil {
    static _requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads;

    static _propertyRangeMappings = [
        [Constants.Core.Vocab.supportedClass, Constants.Core.Vocab.Class],
        [Constants.Core.Vocab.expects, Constants.Core.Vocab.Class],
        [Constants.Core.Vocab.returns, Constants.Core.Vocab.Class],
        [Constants.Core.Vocab.supportedOperation, Constants.Core.Vocab.Operation],
        [Constants.Core.Vocab.operation, Constants.Core.Vocab.Operation],
        [Constants.Core.Vocab.supportedProperty, Constants.Core.Vocab.SupportedProperty],
        [Constants.Core.Vocab.statusCodes, Constants.Core.Vocab.StatusCodeDescription],
        [Constants.Core.Vocab.property, rdf.ns + 'Property'],
        [Constants.Core.Vocab.mapping, Constants.Core.Vocab.IriTemplateMapping],
    ];

    static fetchResource(uri:string):Promise<ExpandedWithDocs> {

        return window.fetch(uri, {
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

    static invokeOperation(method:string, uri:string, body?:any, mediaType = Constants.MediaTypes.jsonLd):Promise<ExpandedWithDocs> {

        return window.fetch(uri, {
                method: method,
                headers: {
                    'Content-Type': mediaType,
                    Accept: FetchUtil._requestAcceptHeaders
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
}

function rejectNotFoundStatus(res:Response):Promise<any> {
    if (res.status === 404) {
        return Promise.reject(null);
    }

    return Promise.resolve(res);
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

    return res.text()
        .then(jsonld => $rdf.parsers.parse(mediaType, jsonld, null, res.url))
        .then(runInference)
        .then(graph => JsonLdSerializer.serialize(graph))
        .then(flatten(res.url));
}

function runInference(graph) {
    _.map(FetchUtil._propertyRangeMappings, mapping => {
        var matches = graph.match(null, mapping[0], null, null);
        _.forEach(matches.toArray(), triple => {
            graph.add(new $rdf.Triple(
                triple.object,
                new $rdf.NamedNode(rdf.type),
                new $rdf.NamedNode(mapping[1])
            ));
        });
    });

    return graph;
}

function flatten(url) {
    return json => {
        var opts:FlattenOptions = {};
        if (url) {
            opts.base = url;
        }

        return jsonld.expand(json, opts)
            .then(expanded => jsonld.flatten(expanded, {}))
            .then(flattened => flattened[Constants.JsonLd.Graph]);
    }
}
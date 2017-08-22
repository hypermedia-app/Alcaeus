import * as li from 'parse-link-header';
import {promises as jsonld} from 'jsonld';
import * as Constants from "./Constants";
import {FlattenOptions} from "jsonld";
import * as $rdf from 'rdf-ext';
import * as JsonLdParser from 'rdf-parser-jsonld';
import * as JsonLdSerializer from 'rdf-serializer-jsonld'
import {rdf} from './Vocabs';
import {ExpandedWithDocs} from "./internals";
import 'isomorphic-fetch';

$rdf.parsers[Constants.MediaTypes.jsonLd] = JsonLdParser;

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
        [Constants.Core.Vocab.property, rdf.Property],
        [Constants.Core.Vocab.mapping, Constants.Core.Vocab.IriTemplateMapping],
    ];

    static fetchResource(uri:string):Promise<ExpandedWithDocs> {

        return fetch(uri, {
                headers: {
                    accept: FetchUtil._requestAcceptHeaders
                }
            })
            .then(rejectNotFoundStatus)
            .then((res:Response) => {
                    const apiDocsUri = getDocumentationUri(res);

                    return getFlattendGraph(res)
                        .then(obj => new ExpandedWithDocs(obj, apiDocsUri, res.headers.get('Content-Location') || res.url));
                },
                () => null);
    }

    static invokeOperation(method:string, uri:string, body?:any, mediaType = Constants.MediaTypes.jsonLd):Promise<ExpandedWithDocs> {

        return fetch(uri, {
                method: method,
                headers: {
                    'Content-Type': mediaType,
                    Accept: FetchUtil._requestAcceptHeaders
                }
            })
            .then(rejectNotFoundStatus)
            .then((res:Response) => {
                    const apiDocsUri = getDocumentationUri(res);

                    return getFlattendGraph(res)
                        .then(obj => new ExpandedWithDocs(obj, apiDocsUri, res.headers.get('Content-Location') || res.url));
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
        const linkHeaders = res.headers.get(Constants.Headers.Link);
        const links = li(linkHeaders);

        if(links[Constants.Core.Vocab.apiDocumentation]){
            return links[Constants.Core.Vocab.apiDocumentation].url;
        }
    }

    return null;
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

function getFlattendGraph(res:Response):Promise<any> {
    const mediaType = res.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd;

    if (res.ok === false) {
        return Promise.reject(new FetchError(res));
    }

    return res.text()
        .then(parseResourceRepresentation(mediaType, res))
        .then(runInference)
        .then(graph => JsonLdSerializer.serialize(graph))
        .then(flatten(res.url));
}

function parseResourceRepresentation(mediaType:string, res:Response) {
    return jsonld => {
        return $rdf.parsers.parse(mediaType, jsonld, null, res.url);
    };
}

function runInference(graph) {
    FetchUtil._propertyRangeMappings.map(mapping => {
        const matches = graph.match(null, mapping[0], null, null);
        matches.toArray().forEach(triple => {
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
        const opts: FlattenOptions = {};
        if (url) {
            opts.base = url;
        }

        return jsonld.expand(json, opts)
            .then(expanded => jsonld.flatten(expanded, {}))
            .then(flattened => flattened[Constants.JsonLd.Graph]);
    }
}
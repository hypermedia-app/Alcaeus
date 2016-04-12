//noinspection TypeScriptCheckImport
import * as li from 'li';
//noinspection TypeScriptCheckImport
import {promises as jsonld} from 'jsonld';
import {ApiDocumentation} from "./ApiDocumentation";
import * as Constants from "./Constants";

export class FetchUtil {
    static fetchResource(uri:string, fetchApiDocs:boolean):Promise<ExpandedWithDocs> {
        var requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads;

        return window.fetch(uri, <FetchOptions>{
                headers: {
                    accept: requestAcceptHeaders
                }
            })
            .then((res:Response) => {
                var apiDocsPromise;
                if (fetchApiDocs) {
                    apiDocsPromise = FetchUtil.fetchDocumentation(res);
                } else {
                    apiDocsPromise = Promise.resolve(null);
                }

                return Promise.all([getJsObject(res), apiDocsPromise])
                    .then(values => {
                        return new ExpandedWithDocs(values[0], values[1]);
                    });
            })
    }

    static fetchDocumentation(res:Response):Promise<ApiDocumentation> {
        if (res.headers.has(Constants.Headers.Link)) {
            var linkHeaders = res.headers.get(Constants.Headers.Link);
            var links = li.parse(linkHeaders);

            if (links[Constants.Core.Vocab.apiDocumentation]) {
                return FetchUtil.fetchResource(links[Constants.Core.Vocab.apiDocumentation], false)
                    .then(expanded => new ApiDocumentation(expanded.resources));
            }
        }

        return Promise.resolve(null);
    }
}

class ExpandedWithDocs {
    constructor(resources:Object, apiDocumentation:ApiDocumentation) {
        this.resources = resources;
        this.apiDocumentation = apiDocumentation;
    }

    resources:Object;
    apiDocumentation:ApiDocumentation
}

function getJsObject(res:Response) {
    var mediaType = res.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd;
    var jsonPromise;

    if (mediaType === Constants.MediaTypes.jsonLd) {
        return res.json().then(getFlattenedGraph);
    } else {

        if (mediaType === Constants.MediaTypes.ntriples ||
            mediaType === Constants.MediaTypes.ntriples) {
            mediaType = 'application/nquads';
        }

        return res.text().then(rdf => {
            return jsonld.fromRDF(rdf, {format: mediaType}).then(getFlattenedGraph);
        });
    }
}

function getFlattenedGraph(json) {
    return jsonld.flatten(json, {})
        .then(flattened => flattened[Constants.JsonLd.Graph]);
}
//noinspection TypeScriptCheckImport
import {rdf, xsd} from 'jasnell/linkeddata-vocabs';

export namespace Bodies {
    export var someJsonLd = {
        '@context': {
            '@vocab': 'http://example.com/vocab#'
        },
        '@id': 'http://example.com/resource',
        '@type': 'Resource',
        'prop': {
            '@value': 'some textual value'
        },
        'other': {
            '@id': 'http://example.com/linked'
        },
        'other_yet': {
            '@id': 'http://example.com/linked'
        }
    };

    export var ntriples = `
<http://example.com/resource> <http://example.com/vocab#other> <http://example.com/linked> .
<http://example.com/resource> <http://example.com/vocab#prop> "some textual value" .
`;
    
    export var hydraCollection = {
        '@id': 'http://example.com/resource',
        '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
        'member': [
            { '@id': 'http://example.com/element/1' },
            { '@id': 'http://example.com/element/2' },
            { '@id': 'http://example.com/element/3' },
            { '@id': 'http://example.com/element/4' }
        ],
        'http://example.vocab/managedBy': {
            '@id': 'http://example.com/collection-curator'
        }
    };
}

export namespace Responses {
    export var jsonLd = (jsonLd:Object, includeDocsLink = true) => createResponse(JSON.stringify(jsonLd), 'application/ld+json', includeDocsLink);

    export var ntriples = (ntriples, includeDocsLink = true) => createResponse(ntriples, 'application/n-triples', includeDocsLink);

    function createResponse(body:string, contentType:string, includeDocsLink:boolean) {
        var headers = new Headers({
            'Content-Type': contentType
        });

        if(includeDocsLink){
            headers.append('Link', '<http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
        }

        return new Response(body, {
            headers: headers
        });
    }
}

export namespace Documentations {
    export var classWithOperation = {
        '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
        'supportedClass': [
            {
                '@id': 'http://example.com/api#Class',
                '@type': 'hydra:Class',
                'supportedOperation': [
                    {
                        'description': 'Gets the api#Class',
                        'expects': 'owl:Nothing',
                        'method': 'GET',
                        'returns': 'http://example.com/api#Class'
                    }
                ],
                'supportedProperty': [
                    {
                        'title': 'The very important name',
                        'description': 'A short description thereof',
                        'readable': true,
                        'readable': false,
                        'required': false,
                        'property': {
                            '@id': 'http://purl.org/dc/elements/1.1/partOf',
                            '@type': rdf.ns + 'Property',
                            'range': xsd.string
                        }
                    },
                    {
                        'title': 'The less important name',
                        'description': 'A pretty much longer description test',
                        'readable': true,
                        'readable': false,
                        'required': true,
                        'property': {
                            '@id': 'http://schema.org/name',
                            '@type': rdf.ns + 'Property',
                            'range': xsd.string
                        }
                    }
                ]
            }
        ]
    };
}
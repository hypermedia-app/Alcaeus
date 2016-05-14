//noinspection TypeScriptCheckImport
import {rdf, xsd} from 'jasnell/linkeddata-vocabs';
import {Core} from '../src/Constants';
import {promises as jsonld} from 'jsonld';
import {JsonLd} from '../src/Constants';

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

    export var idWithTrailingSlash = {
        '@context': {
            '@vocab': 'http://example.com/vocab#'
        },
        '@id': 'http://example.com/resource/',
        '@type': 'Resource'
    };

    export var someJsonLdExpanded = {
        '@id': 'http://example.com/resource',
        '@type': 'http://example.com/vocab#Resource',
        'http://example.com/vocab#prop': {
            '@value': 'some textual value'
        },
        'http://example.com/vocab#other': {
            '@id': 'http://example.com/linked'
        },
        'http://example.com/vocab#other_yet': {
            '@id': 'http://example.com/linked'
        }
    };

    export var cycledResource = {
        '@id': 'http://example.com/resource',
        'http://example.com/vocab#prop': {
            'http://example.com/vocab#top': {
                '@id': 'http://example.com/resource'
            }
        }
    };

    export var typedLiteral = {
        "@id": "http://example.com/resource",
        "http://schema.org/image": {
            "http://schema.org/contentUrl": {
                "@type": "http://schema.org/URL",
                "@value": "http://wikibus-test.gear.host/book/1936/image"
            }
        }
    };

    export var typedNumericLiteral = {
        "@id": "http://example.com/resource",
        "http://schema.org/age": {
            "@type": xsd.integer,
            "@value": 21
        }
    };

    export var multipleTypesExpanded = {
        '@id': 'http://example.com/resource',
        '@type': [
            'http://example.com/vocab#Resource',
            'http://example.com/vocab#AnotherType'
        ]
    };

    export var deepBlankNodes = {
        "@id": "http://example.com/root",
        "http://example.com/prop": {
            "http://example.com/prop": {
                "http://example.com/prop": {
                    "http://example.com/prop": {
                        "http://example.com/text": {
                            "@value": "I'm nested way deep"
                        }
                    }
                }
            }
        }
    };

    export var ntriples = `
<http://example.com/resource> <http://example.com/vocab#other> <http://example.com/linked> .
<http://example.com/resource> <http://example.com/vocab#prop> "some textual value" .
`;

    export var hydraCollection = {
        '@id': 'http://example.com/resource',
        '@context': Core.Context,
        'hydra:member': [
            { '@id': 'http://example.com/element/1' },
            { '@id': 'http://example.com/element/2' },
            { '@id': 'http://example.com/element/3' },
            { '@id': 'http://example.com/element/4' }
        ],
        'http://example.vocab/managedBy': {
            '@id': 'http://example.com/collection-curator',
            '@type': 'http://example.com/Person'
        }
    };

    export var hydraCollectionWithView = {
        '@id': 'http://example.com/resource',
        '@context': Core.Context,
        'member': [
            { '@id': 'http://example.com/element/1' },
            { '@id': 'http://example.com/element/2' },
            { '@id': 'http://example.com/element/3' },
            { '@id': 'http://example.com/element/4' }
        ],
        'http://example.vocab/managedBy': {
            '@id': 'http://example.com/collection-curator',
            '@type': 'http://example.com/Person'
        },
        'hydra:view': {
            '@id': 'http://example.com/resource?page=3',
            '@type': 'http://www.w3.org/ns/hydra/core#PartialCollectionView',
            'http://www.w3.org/ns/hydra/core#totalItems': 10,
            'http://www.w3.org/ns/hydra/core#first': 'http://example.com/resource?page=1',
            'http://www.w3.org/ns/hydra/core#previous': 'http://example.com/resource?page=2',
            'http://www.w3.org/ns/hydra/core#next': 'http://example.com/resource?page=4',
            'http://www.w3.org/ns/hydra/core#last': 'http://example.com/resource?page=58'
        }
    };
}

export namespace Responses {
    export var jsonLd = (jsonLd:Object, includeDocsLink = true) => createResponse(JSON.stringify(jsonLd), 'application/ld+json', includeDocsLink);

    export var ntriples = (ntriples, includeDocsLink = true) => createResponse(ntriples, 'application/n-triples', includeDocsLink);

    export var notFound = negativeResponse(404);

    export var serverError = negativeResponse(500);

    export function flattened(res) {
        return jsonld.flatten(res, {})
            .then(flat => flat[JsonLd.Graph]);
    }

    function negativeResponse(status) {
        return () => new Response('', {
            status: status,
            ok: false
        });
    }

    function createResponse(body:string, contentType:string, includeDocsLink:boolean) {
        var headers = new Headers({
            'Content-Type': contentType
        });

        if(includeDocsLink){
            headers.append('Link', '<http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"');
        }

        return new Response(body, {
            status: 200,
            ok: true,
            headers: headers
        });
    }
}

export namespace Documentations {
    export var classWithOperation = {
        '@id': 'http://api.example.com/doc',
        '@context': Core.Context,
        'entrypoint': 'http://example.com/home',
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
                        'writable': false,
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
                        'writable': false,
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
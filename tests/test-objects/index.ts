// tslint:disable:no-namespace object-literal-sort-keys

import {Core} from '../../src/Constants';
import {owl, rdf, xsd} from '../../src/Vocabs';

export namespace Bodies {
    export let someJsonLd = {
        '@context': {
            '@vocab': 'http://example.com/vocab#',
        },
        '@id': 'http://example.com/resource',
        '@type': 'Resource',
        'prop': {
            '@value': 'some textual value',
        },
        'other': {
            '@id': 'http://example.com/linked',
        },
        'other_yet': {
            '@id': 'http://example.com/linked',
        },
    };

    export let unescapedDiacritics = {
        '@context': {
            '@vocab': 'http://example.com/vocab#',
        },
        '@id': 'http://example.com/biała gęś',
        '@type': 'Resource',
    };

    export let idWithTrailingSlash = {
        '@context': {
            '@vocab': 'http://example.com/vocab#',
        },
        '@id': 'http://example.com/resource/',
        '@type': 'Resource',
    };

    export let someJsonLdExpanded = {
        '@id': 'http://example.com/resource',
        '@type': 'http://example.com/vocab#Resource',
        'http://example.com/vocab#prop': {
            '@value': 'some textual value',
        },
        'http://example.com/vocab#other': {
            '@id': 'http://example.com/linked',
        },
        'http://example.com/vocab#other_yet': {
            '@id': 'http://example.com/linked',
        },
    };

    export let cycledResource = {
        '@id': 'http://example.com/resource',
        'http://example.com/vocab#prop': {
            'http://example.com/vocab#top': {
                '@id': 'http://example.com/resource',
            },
        },
    };

    export let typedLiteral = {
        '@id': 'http://example.com/resource',
        'http://schema.org/image': {
            'http://schema.org/contentUrl': {
                '@type': 'http://schema.org/URL',
                '@value': 'http://wikibus-test.gear.host/book/1936/image',
            },
        },
    };

    export let typedNumericLiteral = {
        '@id': 'http://example.com/resource',
        'http://schema.org/age': {
            '@type': xsd.integer,
            '@value': 21,
        },
    };

    export let multipleTypesExpanded = {
        '@id': 'http://example.com/resource',
        '@type': [
            'http://example.com/vocab#Resource',
            'http://example.com/vocab#AnotherType',
        ],
    };

    export let deepBlankNodes = {
        '@id': 'http://example.com/root',
        'http://example.com/prop': {
            'http://example.com/prop': {
                'http://example.com/prop': {
                    'http://example.com/prop': {
                        'http://example.com/text': {
                            '@value': 'I\'m nested way deep',
                        },
                    },
                },
            },
        },
    };

    export let ntriples = `
<http://example.com/resource> <http://example.com/vocab#other> <http://example.com/linked> .
<http://example.com/resource> <http://example.com/vocab#prop> "some textual value" .
`;

    export let hydraCollection = {
        '@id': 'http://example.com/resource',
        '@context': Core.Context,
        'hydra:member': [
            {'@id': 'http://example.com/element/1'},
            {'@id': 'http://example.com/element/2'},
            {'@id': 'http://example.com/element/3'},
            {'@id': 'http://example.com/element/4'},
        ],
        'http://example.vocab/managedBy': {
            '@id': 'http://example.com/collection-curator',
            '@type': 'http://example.com/Person',
        },
    };

    export let hydraCollectionWithView = {
        '@id': 'http://example.com/resource',
        '@context': Core.Context,
        'member': [
            {'@id': 'http://example.com/element/1'},
            {'@id': 'http://example.com/element/2'},
            {'@id': 'http://example.com/element/3'},
            {'@id': 'http://example.com/element/4'},
        ],
        'http://example.vocab/managedBy': {
            '@id': 'http://example.com/collection-curator',
            '@type': 'http://example.com/Person',
        },
        'hydra:view': {
            '@id': 'http://example.com/resource?page=3',
            '@type': 'http://www.w3.org/ns/hydra/core#PartialCollectionView',
            'http://www.w3.org/ns/hydra/core#totalItems': 10,
            'http://www.w3.org/ns/hydra/core#first': 'http://example.com/resource?page=1',
            'http://www.w3.org/ns/hydra/core#previous': 'http://example.com/resource?page=2',
            'http://www.w3.org/ns/hydra/core#next': 'http://example.com/resource?page=4',
            'http://www.w3.org/ns/hydra/core#last': 'http://example.com/resource?page=58',
        },
    };
}

export namespace Documentations {
    export let classWithOperation = {
        '@id': 'http://api.example.com/doc/',
        '@type': Core.Vocab('ApiDocumentation'),
        '@context': Core.Context,
        'entrypoint': 'http://example.com/home',
        'supportedClass': [
            {
                '@id': 'http://example.com/api#Class',
                '@type': 'hydra:Class',
                'supportedOperation': [
                    {
                        description: 'Gets the api#Class',
                        expects: 'owl:Nothing',
                        method: 'GET',
                        returns: 'http://example.com/api#Class',
                    },
                ],
                'supportedProperty': [
                    {
                        title: 'The very important name',
                        description: 'A short description thereof',
                        readable: true,
                        writable: false,
                        required: false,
                        property: {
                            '@id': 'http://purl.org/dc/elements/1.1/partOf',
                            '@type': rdf.Property,
                            'range': xsd.string,
                            'supportedOperation': [
                                {
                                    description: 'Update this property',
                                    expects: xsd.string,
                                    method: 'POST',
                                    returns: owl.Nothing,
                                },
                            ],
                        },
                    },
                    {
                        title: 'The less important name',
                        description: 'A pretty much longer description test',
                        readable: true,
                        writable: false,
                        required: true,
                        property: {
                            '@id': 'http://schema.org/name',
                            '@type': rdf.Property,
                            'range': xsd.string,
                        },
                    },
                ],
            },
        ],
    };

    export let untyped = {
        '@context': Core.Context,
        '@id': 'http://api.example.com/doc/',
        'entrypoint': 'http://example.com/home',
    };
}

var someJsonLd = {
    '@context': {
        '@vocab': 'http://example.com/vocab#'
    },
    '@id': 'http://example.com/resource',
    'prop': {
        '@value': 'some textual value'
    },
    'other': {
        '@id': 'http://example.com/linked'
    }
};

export class Responses {
    static jsonLdResponse = () => new Response(JSON.stringify(someJsonLd), {
        headers: new Headers({
            'Content-Type': 'application/ld+json',
            Link: '<http://api.example.com/doc/>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation"'
        })
    });
}

export class Documentations {
    static classWithOperation = {
        '@context': 'http://www.w3.org/ns/hydra/context.jsonld',
        'supportedClass': [
            {
                '@id': 'http://example.com/api#Class',
                'supportedOperation': [
                    {
                        'description': 'Gets the api#Class',
                        'expects': 'owl:Nothing',
                        'method': 'GET',
                        'returns': 'http://example.com/api#Class'
                    }
                ]
            }
        ]
    };
}
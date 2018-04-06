// tslint:disable:no-namespace object-literal-sort-keys

type HydraTerm = 'apiDocumentation' |
    'ApiDocumentation' |
    'title' |
    'description' |
    'method' |
    'Class' |
    'member' |
    'PartialCollectionView' |
    'Collection' |
    'view' |
    'first' |
    'next' |
    'last' |
    'previous' |
    'entrypoint' |
    'SupportedProperty' |
    'supportedProperty' |
    'SupportedOperation' |
    'supportedClass' |
    'supportedOperation' |
    'expects' |
    'returns' |
    'readable' |
    'writable' |
    'required' |
    'property' |
    'statusCodes' |
    'operation' |
    'Operation' |
    'mapping' |
    'StatusCodeDescription' |
    'IriTemplate' |
    'IriTemplateMapping' |
    'code' |
    'variable' |
    'variableRepresentation' |
    'template' |
    'BasicRepresentation' |
    'ExplicitRepresentation';

export namespace Core {
    export const Context = {
        hydra: 'http://www.w3.org/ns/hydra/core#',
        apiDocumentation: 'hydra:apiDocumentation',
        ApiDocumentation: 'hydra:ApiDocumentation',
        title: 'hydra:title',
        description: 'hydra:description',
        entrypoint: {'@id': 'hydra:entrypoint', '@type': '@id'},
        supportedClass: {'@id': 'hydra:supportedClass', '@type': '@vocab'},
        Class: 'hydra:Class',
        supportedProperty: {'@id': 'hydra:supportedProperty', '@type': '@id'},
        SupportedProperty: 'hydra:SupportedProperty',
        property: {'@id': 'hydra:property', '@type': '@vocab'},
        required: 'hydra:required',
        readonly: 'hydra:readonly',
        writeonly: 'hydra:writeonly',
        supportedOperation: {'@id': 'hydra:supportedOperation', '@type': '@id'},
        Operation: 'hydra:SupportedOperation',
        CreateResourceOperation: 'hydra:CreateResourceOperation',
        ReplaceResourceOperation: 'hydra:ReplaceResourceOperation',
        DeleteResourceOperation: 'hydra:DeleteResourceOperation',
        method: 'hydra:method',
        expects: {'@id': 'hydra:expects', '@type': '@vocab'},
        returns: {'@id': 'hydra:returns', '@type': '@vocab'},
        statusCodes: {'@id': 'hydra:statusCodes', '@type': '@id'},
        StatusCodeDescription: 'hydra:StatusCodeDescription',
        statusCode: 'hydra:statusCode',
        Error: 'hydra:Error',
        Resource: 'hydra:Resource',
        operation: 'hydra:operation',
        Collection: 'hydra:Collection',
        member: {'@id': 'hydra:member', '@type': '@id'},
        search: 'hydra:search',
        freetextQuery: 'hydra:freetextQuery',
        PagedCollection: 'hydra:PagedCollection',
        totalItems: 'hydra:totalItems',
        itemsPerPage: 'hydra:itemsPerPage',
        firstPage: {'@id': 'hydra:firstPage', '@type': '@id'},
        lastPage: {'@id': 'hydra:lastPage', '@type': '@id'},
        nextPage: {'@id': 'hydra:nextPage', '@type': '@id'},
        previousPage: {'@id': 'hydra:previousPage', '@type': '@id'},
        Link: 'hydra:Link',
        TemplatedLink: 'hydra:TemplatedLink',
        IriTemplate: 'hydra:IriTemplate',
        template: 'hydra:template',
        mapping: 'hydra:mapping',
        IriTemplateMapping: 'hydra:IriTemplateMapping',
        variable: 'hydra:variable',
    };

    export function Vocab(term: HydraTerm) {
        return Core.Context.hydra + term;
    }
}

export namespace JsonLd {
    export let Graph = '@graph';
    export const Context = '@context';
    export let Id = '@id';
    export let Value = '@value';
    export let Type = '@type';
    export let Language = '@language';
}

export namespace MediaTypes {
    export let jsonLd = 'application/ld+json';
    export let ntriples = 'application/n-triples';
    export let nquads = 'application/n-quads';
}

export namespace Headers {
    export let Link = 'Link';
    export let ContentType = 'Content-Type';
}

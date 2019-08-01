/* eslint-disable @typescript-eslint/no-namespace,no-inner-declarations */
// tslint:disable:no-namespace object-literal-sort-keys

export type HydraTerm = 'apiDocumentation' |
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
'ExplicitRepresentation' |
'totalItems' |
'Link' |
'collection' |
'manages' |
'subject' |
'object' |
'search';

export namespace Core {
    export function Vocab (term?: HydraTerm) {
        return 'http://www.w3.org/ns/hydra/core#' + (term || '')
    }
}

export namespace JsonLd {
    export let Graph = '@graph'
    export const Context = '@context'
    export let Id = '@id'
    export let Value = '@value'
    export let Type = '@type'
    export let Language = '@language'
}

export namespace MediaTypes {
    export let jsonLd = 'application/ld+json'
    export let ntriples = 'application/n-triples'
    export let nquads = 'application/n-quads'
}

export namespace Headers {
    export let Link = 'Link'
    export let Location = 'Location'
    export let ContentType = 'Content-Type'
}

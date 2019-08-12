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
'writeable' |
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

export const Core = {
    Vocab (term?: HydraTerm) {
        return 'http://www.w3.org/ns/hydra/core#' + (term || '')
    },
}

export const JsonLd = {
    Graph: '@graph',
    Context: '@context',
    Id: '@id',
    Value: '@value',
    Type: '@type',
    Language: '@language',
}

export const MediaTypes = {
    jsonLd: 'application/ld+json',
    ntriples: 'application/n-triples',
    nquads: 'application/n-quads',
}

export const Headers = {
    Link: 'Link',
    Location: 'Location',
    ContentType: 'Content-Type',
}

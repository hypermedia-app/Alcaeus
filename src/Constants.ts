import { hydra } from '@tpluscode/rdf-ns-builders'

export const Headers = {
    Link: 'Link',
    Location: 'Location',
    ContentType: 'Content-Type',
}

export const LinkRelations = {
    canonical: 'canonical',
    context: 'http://www.w3.org/ns/json-ld#context',
    apiDocumentation: hydra.apiDocumentation.value,
}

type SchemaTerm = 'description' | 'title';

type RdfsTerm = 'comment' | 'label' | 'range' | 'domain';

export function Schema (term?: SchemaTerm) {
    return 'http://schema.org/' + (term || '')
}

export function rdfs (term?: RdfsTerm) {
    return 'http://www.w3.org/2000/01/rdf-schema#' + (term || '')
}

const owlns = 'http://www.w3.org/2002/07/owl#'
export const owl = {
    ns: owlns,

    Nothing: owlns + 'Nothing',
}

const rdfns = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
export const rdf = {
    ns: rdfns,

    Property: rdfns + 'Property',
    type: rdfns + 'type',
}

const xsdns = 'http://www.w3.org/2001/XMLSchema#'
export const xsd = {
    ns: xsdns,

    string: xsdns + 'string',
    integer: xsdns + 'integer',
}

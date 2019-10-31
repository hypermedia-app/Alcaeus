type SchemaTerm = 'description' | 'title';

type RdfsTerm = 'comment' | 'label' | 'range' | 'domain' | 'subClassOf';

interface NamespaceBuilder {
    [key: string]: string;
}

const handler = {
    apply: (target, thisArg, args) => target(args[0]),
    get: (target, property) => target(property),
}

function namespace (baseIRI): NamespaceBuilder {
    const builder = (term = '') => {
        if (term === 'ns') {
            return baseIRI
        }

        return `${baseIRI}${term}`
    }

    return typeof Proxy === 'undefined' ? builder : new Proxy(builder, handler)
}

export function Schema (term?: SchemaTerm) {
    return 'http://schema.org/' + (term || '')
}

export function rdfs (term?: RdfsTerm) {
    return 'http://www.w3.org/2000/01/rdf-schema#' + (term || '')
}

export const owl = namespace('http://www.w3.org/2002/07/owl#')

export const rdf = namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')

export const xsd = namespace('http://www.w3.org/2001/XMLSchema#')

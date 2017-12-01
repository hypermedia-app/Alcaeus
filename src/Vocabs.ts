type SchemaTerm = 'description' | 'title';

type RdfsTerm = 'comment' | 'label' | 'range' | 'domain';

export function Schema(term?: SchemaTerm) {
    return 'http://schema.org/' + (term || '');
}

export function rdfs(term?: RdfsTerm) {
    return 'http://www.w3.org/2000/01/rdf-schema#' + (term || '');
}

export namespace owl {
    export const ns = 'http://www.w3.org/2002/07/owl#';

    export const Nothing = ns + 'Nothing';
}

export namespace rdf {
    export const ns = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';

    export const Property = ns + 'Property';
    export const type = ns + 'type';
}

export namespace xsd {
    export const ns = 'http://www.w3.org/2001/XMLSchema#';

    export const string = ns + 'string';
    export const integer = ns + 'integer';
}

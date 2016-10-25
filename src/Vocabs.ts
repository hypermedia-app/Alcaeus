export namespace Schema {
    export const ns = 'http://schema.org/';

    export const description = ns + 'description';
    export const title = ns + 'title';
}

export namespace rdfs {
    export const ns = 'http://www.w3.org/2000/01/rdf-schema#';

    export const comment = ns + 'comment';
    export const label = ns + 'label';
    export const range = ns + 'range';
    export const domain = ns + 'domain';
}

export namespace owl {
    export const ns = 'http://www.w3.org/2002/07/owl#';

    export const Nothing = 'http://www.w3.org/2002/07/owl#';
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
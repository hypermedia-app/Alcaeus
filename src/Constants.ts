export namespace Core {
    export var Context = {
        "_id": "@id",
        "hydra": "http://www.w3.org/ns/hydra/core#",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "owl": "http://www.w3.org/2002/07/owl#",
        "vs": "http://www.w3.org/2003/06/sw-vocab-status/ns#",
        "dc": "http://purl.org/dc/terms/",
        "cc": "http://creativecommons.org/ns#",
        "apiDocumentation": "hydra:apiDocumentation",
        "ApiDocumentation": "hydra:ApiDocumentation",
        "title": "hydra:title",
        "description": "hydra:description",
        "entrypoint": {"@id": "hydra:entrypoint", "@type": "@id"},
        "supportedClass": {"@id": "hydra:supportedClass", "@type": "@vocab"},
        "Class": "hydra:Class",
        "supportedProperty": {"@id": "hydra:supportedProperty", "@type": "@id"},
        "SupportedProperty": "hydra:SupportedProperty",
        "property": {"@id": "hydra:property", "@type": "@vocab"},
        "required": "hydra:required",
        "readonly": "hydra:readonly",
        "writeonly": "hydra:writeonly",
        "supportedOperation": {"@id": "hydra:supportedOperation", "@type": "@id"},
        "Operation": "hydra:Operation",
        "CreateResourceOperation": "hydra:CreateResourceOperation",
        "ReplaceResourceOperation": "hydra:ReplaceResourceOperation",
        "DeleteResourceOperation": "hydra:DeleteResourceOperation",
        "method": "hydra:method",
        "expects": {"@id": "hydra:expects", "@type": "@vocab"},
        "returns": {"@id": "hydra:returns", "@type": "@vocab"},
        "statusCodes": {"@id": "hydra:statusCodes", "@type": "@id"},
        "StatusCodeDescription": "hydra:StatusCodeDescription",
        "statusCode": "hydra:statusCode",
        "Error": "hydra:Error",
        "Resource": "hydra:Resource",
        "operation": "hydra:operation",
        "Collection": "hydra:Collection",
        "member": {"@id": "hydra:member", "@type": "@id"},
        "search": "hydra:search",
        "freetextQuery": "hydra:freetextQuery",
        "PagedCollection": "hydra:PagedCollection",
        "totalItems": "hydra:totalItems",
        "itemsPerPage": "hydra:itemsPerPage",
        "firstPage": {"@id": "hydra:firstPage", "@type": "@id"},
        "lastPage": {"@id": "hydra:lastPage", "@type": "@id"},
        "nextPage": {"@id": "hydra:nextPage", "@type": "@id"},
        "previousPage": {"@id": "hydra:previousPage", "@type": "@id"},
        "Link": "hydra:Link",
        "TemplatedLink": "hydra:TemplatedLink",
        "IriTemplate": "hydra:IriTemplate",
        "template": "hydra:template",
        "mapping": "hydra:mapping",
        "IriTemplateMapping": "hydra:IriTemplateMapping",
        "variable": "hydra:variable",
        "defines": {"@reverse": "rdfs:isDefinedBy"},
        "comment": "rdfs:comment",
        "label": "rdfs:label",
        "preferredPrefix": "http://purl.org/vocab/vann/preferredNamespacePrefix",
        "cc:license": {"@type": "@id"},
        "cc:attributionURL": {"@type": "@id"},
        "domain": {"@id": "rdfs:domain", "@type": "@vocab"},
        "range": {"@id": "rdfs:range", "@type": "@vocab"},
        "subClassOf": {"@id": "rdfs:subClassOf", "@type": "@vocab"},
        "subPropertyOf": {"@id": "rdfs:subPropertyOf", "@type": "@vocab"},
        "seeAlso": {"@id": "rdfs:seeAlso", "@type": "@id"}
    };

    export var Vocab = {
        apiDocumentation: Context['hydra'] + 'apiDocumentation'
    };
}

export namespace JsonLd {
    export var Graph = '@graph';
}

export namespace MediaTypes {
    export var jsonLd = 'application/ld+json';
    export var ntriples = 'application/n-triples';
    export var nquads = 'application/n-quads';
}

export namespace Headers {
    export var Link = 'Link';
    export var ContentType = 'Content-Type';
}
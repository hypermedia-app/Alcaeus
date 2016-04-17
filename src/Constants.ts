'use strict';

export namespace Core {
    export var Context = {
        "hydra": "http://www.w3.org/ns/hydra/core#",
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
        "variable": "hydra:variable"
    };

    export var Vocab = {
        apiDocumentation: Context['hydra'] + 'apiDocumentation',
        title: Context['hydra'] + 'title',
        description: Context['hydra'] + 'description',
        method: Context['hydra'] + 'method',
        Class: Context['hydra'] + 'Class',
        member: Context['hydra'] + 'member',
        PartialCollectionView: Context['hydra'] + 'PartialCollectionView',
        view: Context['hydra'] + 'view',
        first: Context['hydra'] + 'first',
        next: Context['hydra'] + 'next',
        last: Context['hydra'] + 'last',
        previous: Context['hydra'] + 'previous',
        entrypoint: Context['hydra'] + 'entrypoint'
    };
}

export namespace JsonLd {
    export var Graph = '@graph';
    export var Context = '@context';
    export var Id = '@id';
    export var Type = '@type';
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
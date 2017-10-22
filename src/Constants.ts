export namespace Core {
    export const Context = {
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
        "Operation": "hydra:SupportedOperation",
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

    export let Vocab = {
        apiDocumentation: Context['hydra'] + 'apiDocumentation',
        ApiDocumentation: Context['hydra'] + 'ApiDocumentation',
        title: Context['hydra'] + 'title',
        description: Context['hydra'] + 'description',
        method: Context['hydra'] + 'method',
        Class: Context['hydra'] + 'Class',
        member: Context['hydra'] + 'member',
        PartialCollectionView: Context['hydra'] + 'PartialCollectionView',
        Collection: Context['hydra'] + 'Collection',
        view: Context['hydra'] + 'view',
        first: Context['hydra'] + 'first',
        next: Context['hydra'] + 'next',
        last: Context['hydra'] + 'last',
        previous: Context['hydra'] + 'previous',
        entrypoint: Context['hydra'] + 'entrypoint',
        SupportedProperty: Context['hydra'] + 'SupportedProperty',
        supportedProperty: Context['hydra'] + 'supportedProperty',
        Operation: Context['hydra'] + 'SupportedOperation',
        supportedClass: Context['hydra'] + 'supportedClass',
        supportedOperation: Context['hydra'] + 'supportedOperation',
        expects: Context['hydra'] + 'expects',
        returns: Context['hydra'] + 'returns',
        readable: Context['hydra'] + 'readable',
        writable: Context['hydra'] + 'writable',
        required: Context['hydra'] + 'required',
        property: Context['hydra'] + 'property',
        statusCodes: Context['hydra'] + 'statusCodes',
        operation: Context['hydra'] + 'operation',
        mapping: Context['hydra'] + 'mapping',
        StatusCodeDescription: Context['hydra'] + 'StatusCodeDescription',
        IriTemplateMapping: Context['hydra'] + 'IriTemplateMapping',
        code: Context['hydra'] + 'code',
    };
}

export namespace JsonLd {
    export let Graph = '@graph';
    export const Context = '@context';
    export let Id = '@id';
    export let Value = '@value';
    export let Type = '@type';
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

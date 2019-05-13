# Links

Links have a special place in any hypermedia media types. In most formats links are an independent
piece of the object model, such as a `__links` property etc.

Hydra is different given that it's based on RDF data model. In RDF any property whose object is
a resource (URI node) could be treated as a link.

```
<http://example.com/Barney> foaf:knows <http://example.com/Fred>
``` 

## Not all links are dereferencable

The problem this causes is that without additional information, the client has no way to tell
if a given resource is actually intended for dereferencing. In other words it does not make sense
to follow every "potential link relation".

This could apply to resources from external APIs over which there is no control and likely are
not part of another Hydra API. Also, some resources within an API could be write-only, only accepting
`POST` requests but without support for the `GET` method.

## Annotated links

Hydra has the ability to explicitly mark links without the necessarily resorting to a `SupportedOperation`.
Instead, it's simply required to use `hydra:Link` type for supported RDF properties.

```json
{
  "@context": {
    "@vocab": "http://www.w3.org/ns/hydra/core#",
    "foaf": "http://xmlns.com/foaf/0.1/" 
  },
  "@type": "ApiDocumentation",
  "supportedClass": [
    {
      "supportedProperty": [
        {
          "property": {
            "@id": "foaf:knows",
            "@type": "Link"
          }
        }
      ]
    }
  ]
}
```

{% hint style="tip" %}
`hydra:Link` is subclass of `rdfs:Property` so it may not necessary to explicitly type is as such.
{% endhint %}

{% hint style="warn" %}
Adding `hydra:Link` type to properties coming from third party vocabularies may have unexpected side
effects if the Hydra statements are leaked into other datasets.
{% endhint %}

## Links within a resource representation

Any resource object fetched from a Hydra-compliant API allows implements a method
which returns a map of links and their values.

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}")

const rep = await Hydra.loadResource('https://sources.test.wikibus.org/')

rep.root.getLinks()
{% endrunkit %}

{% hint style="tip" %}
Properties defined as `hydra:Link` but not used by the given resource will not be included in the result.
To get all properties, call `getLinks(true)`.
{% endhint %}


## Links within ApiDocumentation

Below snippet shows how `isLink` property can be used to check if a property used
in `SupportedProperty` is typed as a link. 

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}")

const rep = await Hydra.loadResource('https://sources.test.wikibus.org/')

rep.root.apiDocumentation
  .getClass('https://wikibus.org/api#EntryPoint')
  .supportedProperties.map(sp => ({
    id: sp.property.id, isLink: sp.property.isLink
  }))
{% endrunkit %}

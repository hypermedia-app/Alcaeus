# Supported Property

A property is one of key concepts of RDF and, by extension to web links, the Internet at large. 
Properties as [links][link] connect resources, also across APIs. This fact easily makes properties 
the most important element of a APIs design.

[link]: ../representations/affordances/links.md

But properties are of course on only links between resource but also simple datatype attributes.

Hydra builds on top of plain `rdf:Property` and defines a `SupportedProperty` class which
extends the raw construct with API-specific information important for the client.

Here's the `SupportedProperty` interface of Alcaeus (excerpt):

```typescript
interface IDocumentedResource {
    title: string;
    description: string;
}

interface ISupportedProperty {
    readable: boolean;
    writable: boolean;
    required: boolean;
    property: RdfProperty;
}

export interface IRdfProperty {
    range: Class;
    domain: Class;
    supportedOperations: SupportedOperation[];
    isLink: boolean;
}

type RdfProperty = IRdfProperty & IDocumentedResource;
type SupportedProperty = ISupportedProperty & IDocumentedResource;
```

Few things to notice here:

1. `SupportedProperty` wraps `rdf:Property` and adds client-specific attributes such as writability
and human-readable labels
1. A property can also define supported operations which will apply to all object where that property is used
(learn more [here](./operation.md#propertys-supported-operations)
1. The `isLink` getter is not a property; its value is based on the property type. Learn more [here](../representations/affordances/links.md)

## Discovering properties from ApiDocumentation

Given a reference to an `ApiDocumentation` and a class URI, it is possible to get all supported properties
of that class:

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}")

const doc = await client.loadDocumentation('https://wikibus-sources-staging.herokuapp.com/doc')

doc.getProperties('https://wikibus.org/ontology#Book')
{% endrunkit %}

Alternatively, it's possible to reach the same properties from an instance of `Class`:

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}")

const doc = await client.loadDocumentation('https://wikibus-sources-staging.herokuapp.com/doc')

doc.classes
    .find(c => c.id === 'https://wikibus.org/ontology#Book')
    .supportedProperties
{% endrunkit %}

## Getting properties of an instance

Any instance of a resource can have multiple types, some of which are APIs supported classes. 
For convenience a `getProperties` method also exists on all resource objects and returns a 
combined set of all types' supported properties as well as their values.

Here's an example which returns a key/value map of property labels and their values:

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}")

const doc = await client.loadDocumentation('http://www.markus-lanthaler.com/hydra/api-demo/vocab')

doc.root.getProperties()
    .filter(tuple => tuple.objects.length > 0)
    .reduce((obj, tuple) => ({ 
        ...obj, 
        [tuple.supportedProperty.title]: tuple.objects
    }), {})
{% endrunkit %}

{% hint style="tip" %}
 `getProperties()` always returns all properties, even if the are not used in the given resource.
 They can be filtered as seen above by excluding results with an empty `objects` array.
{% endhint %}

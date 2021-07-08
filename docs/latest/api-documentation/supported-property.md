# Supported Property

A property is one of key concepts of RDF and, by extension to web links, the Internet at large.
Properties as [links][link] connect resources, also across APIs. This fact easily makes properties the most important element of a APIs design.

[link]: representations/affordances/links

But, properties are of course not only links between resource but also simple datatype attributes.

Hydra builds on top of plain `rdf:Property` and defines a `SupportedProperty` class which extends the raw construct with API-specific information important to the client.

## Discovering properties from ApiDocumentation

Given a reference to an `ApiDocumentation` and a class URI, it is possible to get all supported properties of that class:

<run-kit>

```typescript
const { Hydra } = require("${alcaeus}/node")

const doc = await Hydra.loadDocumentation('https://always-read-the-plaque.herokuapp.com/api')

doc
  .supportedClass.find(sc => sc.id.value === 'https://always-read-the-plaque.herokuapp.com/api/class/Plaque')
  .supportedProperty
  .map(sp => sp.toJSON())
```

</run-kit>

## Getting properties of an instance

Any instance of a resource can have multiple types, some of which are API's supported classes.
For convenience a `getProperties` method also exists on all resource objects and returns a
combined set of all types' supported properties as well as their values.

Here's an example which returns a key/value map of property labels and their values:

<run-kit>

```typescript
const { Hydra } = require("${alcaeus}/node")

const { representation } = await Hydra.loadResource('https://always-read-the-plaque.herokuapp.com/plaque/red-rocks-amphitheatre')

representation.root.getProperties()
    .reduce((obj, { supportedProperty: { property }, objects }) => ({
        ...obj,
        [property.id.value]: objects.map(o => o.toJSON())
    }), {})
```

</run-kit>

> [!TIP]
> `getProperties()` always returns all properties, even if those with no values for a given resource. They can be filtered as seen above by excluding results with an empty `objects` array.

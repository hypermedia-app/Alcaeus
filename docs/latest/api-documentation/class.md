# Supported classes

The core concept of Hydra is a class, which defines API-wide description of resource structures and their behaviour. In addition to the standard interface of [resource objects][res], classes define properties derived from the Hydra vocabulary

[res]: representations/resource-objects

## Getting classes from documentation

First, it is possible to get all classes using a simple getter. It will return an array of all supported classes from the documentation resource.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra

const doc = await client.loadDocumentation('https://source.wikibus.org/doc')

doc.class.map(c => c.toJSON())
```

</run-kit>


## rdfs:subClassOf

Alcaeus recognizes subclassing of Supported Classes and will combine the supported
properties and supported operations from all parents. For example, consider the
`ApiDocumentation` below:

```
api:DereferencableClass a hydra:Class ;
  hydra:supportedOperation api:GetResource .
  
ex:Article rdfs:subClassOf api:DereferencableClass ;
  hydra:supportedProperty [
    hydra:property dcterms:title
  ] .

ex:PublishedArticle rdfs:subClassOf ex:Article ;
  hydra:supportedProperty [
    hydra:property schema:publishedOn
  ] .
```

Alcaeus will combine the definitions of parent classes and "learn" that:

- `ex:PublishedArticle` supports `dcterms:title` inherited from `ex:Article`
- `ex:PublishedArticle` and `ex:Article` both support operation `api:GetResource` inherited from `api:DereferencableClass`

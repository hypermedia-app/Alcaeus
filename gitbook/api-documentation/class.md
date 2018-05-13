# Supported classes

The core concept of Hydra is a class, which defines API-wide description of resource structures and their 
behaviour. In addition to the standard interface of [resource objects][res], classes define a number of handy
properties:

```typescript
interface IClass {
    title: string;
    description: string;
    supportedOperations: ISupportedOperation[];
    supportedProperties: ISupportedProperty[];
}
```

[res]: ../representations/resource-objects.md

## Getting classes from documentation

First, it is possible to get all classes using a simple getter. It will return an array of all supported
classes from the documentation resource.

{% runkit %} 
const client = require("alcaeus@0.4.0-a5").Hydra;

const doc = await client.loadDocumentation('http://wikibus-data-test.gear.host/doc');

doc.classes;
{% endrunkit %}

If you know a specific RDF type you can also get look it up within the API documentation:

{% runkit %} 
const client = require("alcaeus@0.4.0-a5").Hydra;

const doc = await client.loadDocumentation('http://wikibus-data-test.gear.host/doc');

doc.getClass('http://wikibus.org/ontology#Book');
{% endrunkit %}

# Selecting resources by type

The representation returned by `Alcaeus#loadResource` comes with a handy method which returns resources of
the given RDF type. Code speaks louder than words so here's an example:

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const { representation } = await client.loadResource('https://sources.wikibus.org/books');

representation
    .ofType('http://schema.org/Book')
    .map(book => book['http://purl.org/dc/terms/title'].value)
```
</run-kit>

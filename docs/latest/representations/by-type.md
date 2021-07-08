# Selecting resources by type

The representation returned by `Alcaeus#loadResource` comes with a handy method which returns resources of
the given RDF type. Code speaks louder than words so here's an example:

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const { representation } = await client.loadResource('https://always-read-the-plaque.herokuapp.com/plaques');

representation
    .ofType('https://plaque.maze.link/vocab#Plaque')
    .map(plaque => plaque['http://schema.org/name'].value)
```
</run-kit>

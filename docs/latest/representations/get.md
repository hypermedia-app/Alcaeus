# Getting arbitrary resource

If you know a specific resource identifier you want to retrieve from a resource representation you can take
advantage of a handy getter method from `ResourceRepresentation` object comes with which gives access to specific
resources.

<run-kit>

```js
const client = require("${alcaeus}/node").Hydra;

const { representation } = await client.loadResource('https://always-read-the-plaque.herokuapp.com/plaques');

// find a URI of a collection member
const collection = representation.root
const id = collection.member[0].id.value

// get that resource directly from the representation
representation.get(id).toJSON()
```

</run-kit>

> [!NOTE]
> Note, that the individual resources are "real" JavaScript objects, and hence everything is fully traversable by indexing with property names or using the dot notation.

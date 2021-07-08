# Supported operations

The `ApiDocumentation` object allows inspecting operations supported by specific resources.

Operations can come from three places:

1. Attached to supported classes
1. Attached to supported properties
1. Inline in resource representations (not yet supported)

This page details methods for accessing the first two, which are part of the ApiDocumentation functionality.

> [!TIP]
> The objects returned by the examples below are only the operation metadata. They cannot be  used directly to invoke an operation.

## Class' supported operations

A supported class can support operations. This instructs the client that every instance of given class should allow performing a request as described by the operation.

To retrieve these operations the client needs to know the class identifier. With that it's possible to request operations from the `ApiDocumentation` object:

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const { representation } = await client.loadResource('https://always-read-the-plaque.herokuapp.com/api')

representation
    .get('http://www.w3.org/ns/auth/acl#Authorization')
    .supportedOperation[0]
    .toJSON()
```

</run-kit>

## Property's supported operations

Supported properties also can support operations. This may be difficult to grasp initially but allows for fine-grained control of runtime operations available for any single object. Please read about [affordances](representations/resource-affordances) to learn more.

To retrieve operations for a class' property the client has to get hold of the two identifiers: the supported class and the property.

> [!TIP]
> It's the actual `rdf:Property` and not `hydra:SupportedProperty`.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const doc = await client.loadDocumentation('https://always-read-the-plaque.herokuapp.com/api');

doc.getOperations(
  'https://plaque.maze.link/vocab#Plaque', // class
  'https://plaque.maze.link/vocab#images'  // property
)
```

</run-kit>

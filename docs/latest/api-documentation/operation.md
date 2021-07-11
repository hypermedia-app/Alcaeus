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

Any resource which appears a graph as an object of a supported property with a supported operation, will thus inherit this operation. To give an example, here's an excerpt from the resource involved in the snippet below.

```turtle
prefix schema: <http://schema.org/>
prefix hydra: <http://www.w3.org/ns/hydra/core#>
prefix api: <https://plaque.maze.link/vocab#>
base <https://always-read-the-plaque.herokuapp.com/>

# Class needs to be supported by the API
<api> hydra:supportedClass <api/class/Plaque> .

# Class needs to support that property
<api/class/Plaque>
  a hydra:Class ;
  hydra:supportedProperty
    [
      hydra:property api:images ;
    ] ;
.

# The property needs to support the operation
api:images
  hydra:supportedOperation
    [
      hydra:method "POST" ;
      hydra:title "Add an image" ;
      hydra:expects schema:ImageObject ;
    ] ;
.

# Create a link using the supported property
# The link target will support the operation to
<plaque/red-rocks-amphitheatre> 
  api:images <plaque/red-rocks-amphitheatre/images> ;
.
```

> [!NOTE]
> Do pay attention to how it's the actual `rdf:Property` and not `hydra:SupportedProperty` which has supports the operation.

Here's a snippet which load the `Plaque` resource and demonstrate how the images child resource support the `POST` operation

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const { representation: { root: plaque } } = 
  await client.loadResource('https://always-read-the-plaque.herokuapp.com/plaque/red-rocks-amphitheatre');

const images = plaque.get('https://plaque.maze.link/vocab#images')

images.findOperations({
  byMethod: 'POST',
})[0].toJSON()
```

</run-kit>

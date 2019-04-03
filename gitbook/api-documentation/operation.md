# Supported operations

The `ApiDocumentation` object let's inspecting operations supported by specific resources.

Operations can come from three places:

1. Attached to supported classes
1. Attached to supported properties
1. Inline in resource representations (currently unsupported)

This page details methods for accessing the first two, which are part of the ApiDocumentation
functionality.

{% hint style="info" %}
 The objects returned by the examples below are only the operation metadata. They cannot be
 used directly to invoke an operation.
{% endhint %}

## Class' supported operations

A supported class can support operations. This instructs the client that every instance of
given class should allow performing a request as described by the operation.

To retrieve these operations the client needs to know the class identifier. With that it's possible
to request operations from the `ApiDocumentation` object:

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const doc = await client.loadDocumentation('http://www.markus-lanthaler.com/hydra/api-demo/vocab');

doc.getOperations('http://www.markus-lanthaler.com/hydra/api-demo/vocab#Comment');
{% endrunkit %}

## Property's supported operations

Supported properties also can support operations. This may be difficult to grasp initially but allows
for fine-grained control of runtime operations available for any single object. Please read
about [affordances](../../representations/resource-affordances.md) to learn more.

To retrieve operations for a class' property the client has to get hold of the two identifiers:
the supported class and the property.

{% hint style="tip" %}
 It's the actual `rdf:Property` and not `hydra:SupportedProperty`.
{% endhint %}

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const doc = await client.loadDocumentation('http://www.markus-lanthaler.com/hydra/api-demo/vocab');

doc.getOperations(
  'http://www.markus-lanthaler.com/hydra/api-demo/vocab#Comment', // class
  'http://www.markus-lanthaler.com/hydra/api-demo/vocab#Comment/issue' // property
);
{% endrunkit %}

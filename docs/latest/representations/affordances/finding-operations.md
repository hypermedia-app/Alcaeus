# Finding operations

Clients may ne interested in very specific [operations](invoking-operations.md), for example
only ones implemented by a `GET` method or expecting a specific type of payload.

Alcaeus resources implement some handy methods which let clients easily find the operations
that they need.

## Find direct operations of a resource

With an instance of a `HydraResource` it is possible to filter out operations
by matching the HTTP method, the expected and the returned class.

{% runkit %}
const { Hydra } = require('alcaeus@{{ book.version }}')
const { expand } = require('@zazuko/rdf-vocabularies')

const { root } = await Hydra.loadResource('https://hydra-movies.herokuapp.com/')
const [ collection ] = root.getCollections()

return collection.findOperations({
  byMethod: 'post',
  bySupportedOperation: expand('schema:CreateAction'), // matches hydra:SupportedOperation's @id and @type
  expecting: expand('schema:Movie'), // matches hydra:expects
  returning: expand('schema:Movie'), // matches hydra:returns
})
{% endrunkit %}

{% hint style="tip" %}
 Each one of the criteria can also be function which takes a single
 parameter (the method name, `Class` or `SupportedOperation` object)
 and returns `true`/`false` to indicate whether to return the operation.
{% endhint %}

For a single constraints object, all of its criteria must be satisfied for
an operation to be returned. The method also accepts zero or more such objects,
which will returns a logical alternative.
For example, to find operation which return `schema:Person` or `schema:Company`
one would call the method with two parameters:

```typescript
import { expand } from '@zazuko/rdf-vocabularies'
import {HydraResource} from 'alcaeus/types/Resources'
let resource: HydraResource

resource.findOperations({
  returning: expand('schema:Person')
}, {
  returning: expand('schema:Company')
})
```

{% hint style="info" %}
 Unless `byMethod` is explicitly provided by the criteria object, `GET` operations
 will be implicitly excluded from the result. To simply get all operations, use the
 `HydraResource#operations` getter or see the `getOperationsDeep()` method below.
{% endhint %}

## Find operations of resource and its children in graph

It is also possible to find operations across the entire resource graph using
a similar `findOperationsDeep` method. It also accepts criteria objects as
seen above.

{% runkit %}
const { Hydra } = require('alcaeus@{{ book.version }}')
const { expand } = require('@zazuko/rdf-vocabularies')

const { root } = await Hydra.loadResource('https://hydra-movies.herokuapp.com/')

return root.findOperationsDeep({
  expecting: expand('schema:Movie'),
})
{% endrunkit %}

The first parameter can optionally be an object which excludes certain
branches from being traversed. It has a single array property which
blacklists properties

{% runkit %}
const { Hydra } = require('alcaeus@{{ book.version }}')
const { expand } = require('@zazuko/rdf-vocabularies')

const { root } = await Hydra.loadResource('https://hydra-movies.herokuapp.com/')

return root.findOperationsDeep({
  excludedProperties: expand('hydra:collection'),
})
{% endrunkit %}

{% hint style="info" %}
 By default `hydra:member` property will be excluded to prevent returning
 operations of each [collection](../collections.md) member.
{% endhint %}

## Getting unfiltered operations

Finally, there is the `getOperationsDeep` method. It acts similarly to
`findOperationsDeep` but does not do any filtering. It also takes a single,
optional parameter to exclude subgraphs.

{% runkit %}
const { Hydra } = require('alcaeus@{{ book.version }}')

const { root } = await Hydra.loadResource('https://hydra-movies.herokuapp.com/')

return root.getOperationsDeep({
  excludedProperties: [],
})
{% endrunkit %}

The snippet above combines all `operations` from all nested resources. Note
the empty `excludedProperties` array which would remove impilict `hydra:member`
limitation.

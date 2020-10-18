# Finding operations

Clients may ne interested in very specific [operations](invoking-operations.md), for example only ones implemented by a `GET` method or expecting a specific type of payload.

Alcaeus resources implement some handy methods which let clients easily find the operations that they need.

## Find direct operations of a resource

With an instance of a `Resource` it is possible to filter out operations
by matching the HTTP method, the expected and the returned class.

<run-kit>

```typescript
const { Hydra } = require('${alcaeus}/node')
const { hydra, schema } = require('@tpluscode/rdf-ns-builders')

const { representation } = await Hydra.loadResource('https://hydra-movies.herokuapp.com/')
const [ collection ] = representation.root.getArray(hydra.collection)

collection.findOperations({
  byMethod: 'post',
  bySupportedOperation: schema.CreateAction, // matches hydra:SupportedOperation's @id and @type
  expecting: schema.Movie, // matches hydra:expects
  returning: schema.Movie, // matches hydra:returns
})
```

</run-kit>

> [!TIP]
> Each one of the criteria can also be function which takes a single
 parameter (the method name, `Class` or `SupportedOperation` object)
 and returns `true`/`false` to indicate whether to return the operation.

For a single constraint object, all of its criteria must be satisfied for
an operation to be returned. The method also accepts zero or more such objects, which will returns a logical alternative.
For example, to find operation which return `schema:Person` or `schema:Company` one would call the method with two parameters:

```typescript
import { Resource } from 'alcaeus'
const { schema } = require('@tpluscode/rdf-ns-builders')

let resource: Resource

resource.findOperations({
  returning: schema.Person
}, {
  returning: schema.Company
})
```

> [!TIP]
> Unless `byMethod` is explicitly provided by the criteria object, `GET` operations will be implicitly excluded from the result. To simply get all operations, use the `HydraResource#operations` getter or see the `getOperationsDeep()` method below.

## Find operations of resource and its children in graph

It is also possible to find operations across the entire resource graph using a similar `findOperationsDeep` method. It also accepts criteria objects as seen above.

<run-kit>

```typescript
const { Hydra } = require('${alcaeus}/node')
const { hydra, schema } = require('@tpluscode/rdf-ns-builders')

const { representation } = await Hydra.loadResource('https://hydra-movies.herokuapp.com/')

representation.root.findOperationsDeep({
  namespaces: [hydra],
  expecting: schema.Movie,
})
```

</run-kit>

> [!WARNING]
> Notice the otherwise options `namespaces` parameter which was necessary in the above example because by default the properties from Hydra vocabulary are ignored when looking or operations.

The first parameter can optionally be an object which excludes certain
branches from being traversed. It has a single array property which
blacklists properties

<run-kit>

```typescript
const { Hydra } = require('${alcaeus}/node')
const { hydra } = require('@tpluscode/rdf-ns-builders')

const { representation } = await Hydra.loadResource('https://hydra-movies.herokuapp.com/')

representation.root.findOperationsDeep({
  namespaces: [hydra],
  excludedProperties: hydra.collection,
})
```

</run-kit>

## Getting unfiltered operations

Finally, there is the `getOperationsDeep` method. It acts similarly to
`findOperationsDeep` but does not do any filtering. It also takes a single, optional parameter to exclude subgraphs.

<run-kit>

```typescript
const { Hydra } = require('${alcaeus}/node')
const { hydra } = require('@tpluscode/rdf-ns-builders')

const { representation } = await Hydra.loadResource('https://hydra-movies.herokuapp.com/')

representation.root.getOperationsDeep({
  namespaces: [hydra],
})
```

</run-kit>

The snippet above combines all `operations` from all nested resources.

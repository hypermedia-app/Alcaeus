# Resource objects in JavaScript

## Accessing arbitrary RDF properties

Individual resources within a representation will be always in the form similar to expanded JSON-LD, with all properties and classes as absolute URIs. Getting any objects from within the tree is thus possible using JS indexer notation.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const { representation } = await client.loadResource('https://sources.wikibus.org/book/1331');

representation.root['http://schema.org/author']['http://schema.org/name'];
```

</run-kit>

> [!NOTE]
> As you see, literal objects are returned as a [RDF/JS Literals](http://rdf.js.org/data-model-spec/#literal-interface)

Read more about accessing property values on a [dedicated page](./resource-properties)

### Recognizing anonymous resources

RDF recognizes two kinds of resource identifiers:

* URIs, such as `http://www.wikidata.org/entity/Q61694`
* Blank nodes, such as identified by as pseudo URI staring with `_:`

Resources identified by blank nodes are only recognizable within a single graph and they are called **anonymous resource**.

While it is trivial to tell one from the other just by looking at the `id`, Alcaeus resources provide a convenience getter:

<run-kit>

```typescript
const { Hydra } = require("${alcaeus}/node")

const { representation } = await Hydra.loadResource('https://sources.wikibus.org/book/1331');

[...representation].map(resource => ({
  id: resource.id.value,
  isAnonymous: resource.isAnonymous
}))
```
</run-kit>

### Resource type(s)

A `types` property returns resource's RDF types as a JavaScript [`Set<RdfResource>`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Set)

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const { representation } = await client.loadResource('https://sources.wikibus.org/book/1331')

const example = {
  types: [...representation.root.types],
  isBook: representation.root.types.has('http://schema.org/Book')
}
```

</run-kit>

## Loading related resources

It is possible to quickly dereference a linked resource using a handy `load` method
of all resource objects.

The example below shows how it's used to deference first member of a [collection](./collections).

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const collection = await client.loadResource('https://sources.wikibus.org/books');

const book = await collection.representation.root.member[0].load()

book.representation.root.toJSON()
```
</run-kit>

> [!NOTE]
> The returned object is a [hydra response](./hydra) and not the resource itself, just like the response from `loadResource`

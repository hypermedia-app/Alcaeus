# Collections

Hydra specifications defines an interface for collections. A basic collection is represented by an array of its items (`member`) and the total number of items.

```typescript
import { MemberAssertion, Resource, View } from '@rdfine/hydra'

interface Collection {
    readonly totalItems: number;
    readonly member: Resource[];
    readonly views?: View[];
    readonly memberAssertion: MemberAssertion[];
}
```

Here's an example of loading a collection which is not paged. In such case the server should respond with a representation where the `totalItems` property equals `member.length`.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra

const { representation } = await client.loadResource('https://sources.wikibus.org/magazine/Buses/issues')

representation.root.toJSON()
```

</run-kit>

## Member assertion

> [!WARNING]
> I the past a property `hydra:manages` was used instead of `memberAssertion`. It is now deprecated and will be removed in future version of Alcaeus.

Hydra introduces a concept of "member assertions" which add additional metadata to collections. It can serve two purposes:

:one: Inform clients about collection members' relation with another resource

:two: Inform clients about the type of collection elements

In case of member relations, a member assertion can look like this (excerpt):

```json
{
  "@id": "https://sources.wikibus.org/magazine/Buses/issues",
  "memberAssertion": {
    "subject": "https://sources.wikibus.org/magazine/Buses",
    "predicate": "dcterms:isPartOf"
  }
}
```

This tells the client that all members of the `/magazine/Buses/issues` collection are in relation with `/magazine/Buses` defined as

```
?member dcterms:isPartOf </magazine/Buses> .
```

The second case is to declare that all members will be of a certain type:

```json
{
  "@id": "https://sources.wikibus.org/magazine/Buses/issues",
  "memberAssertion": {
    "predicate": "rdf:type",
    "object": "https://wikibus.org/vocab#MagazineIssue"
  }
}
```

> [!WARNING]
> Alcaeus will explicitly add all triples which are implicitly stated about collection members.

Here's an example showing how the member assertion is retrieved from a collection to find the `rdf:type` of collection members. Nothing more than a simple array filter.

<run-kit>

```typescript
const { Hydra } = require('${alcaeus}/node')
const { rdf } = require('@tpluscode/rdf-ns-builders')

const { representation } = await Hydra.loadResource('https://sources.wikibus.org/magazines')

representation.root.memberAssertion.find(assertion => assertion.property.equals(rdf.type)).toJSON()
```

</run-kit>

> [!NOTE]
> Do see the [`hydra:collection` page](representations/affordances/collection-property.md) for details on discovering collections based on their member assertions.

## Paged (partial) collections

It is a common scenario to split a large collections into smaller chunks. Typically called pages, Hydra uses the term **view** which means to be more generic way of splitting the collection. Currently the only one actually specified is a `PartialCollectionView`.

It is important to notice that requesting a page will actually return the collection object. The view serves only as metadata for how to retrieve more pages or views but the members will still be "attached" to the actual collection resource.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra

const { representation } = await client.loadResource('https://sources.test.wikibus.org/magazines?page=2')

representation.root.view[0].toJSON()
```

</run-kit>

This design has the consequence that it is possible to combine individual view (page) resources by simply
concatenating members of each one. Combining all pages should produce the complete collection.

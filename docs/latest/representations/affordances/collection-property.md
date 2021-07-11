# `hydra:collection` property

Hydra offers a specialized property to link to collections without the need for minting a new
relation every time such link is required.

```json
{
  "@context": {
    "collection": {
      "@id": "http://www.w3.org/ns/hydra/core#collection",
      "@type": "@id"
    }
  },
  "collection": "http://example.com/collection"
}
```

It can easily be accessed from the resource itself using a dedicated getter method

<run-kit>

```javascript
const { Hydra } = require("${alcaeus}/node")

const { representation } = await Hydra.loadResource('https://always-read-the-plaque.herokuapp.com/')

representation.root.getCollections().map(c => c.id)
```

</run-kit>

## Discovering specific collections

The `getCollections` method accepts an optional parameter which is used to find only
collections conforming to given [member assertion](../collections.md#member-assertion).

Below is an example for finding collection with members of a given `SupportedClass`.

<run-kit>

```js
const { Hydra } = require("${alcaeus}/node")

const { representation } = await Hydra.loadResource('https://always-read-the-plaque.herokuapp.com/')

const [ collection ] = representation.root.getCollections({
  object: 'https://plaque.maze.link/vocab#Plaque'
})

collection.toJSON()
```

</run-kit>

> [!WARNING]
> When using the `object` parameter, `predicate` will implicitly be `rdf:type`. Changing it to anything else will cause an empty result.

Remember that for the filtering to work the member assertion has to be present not only in the actual `/plaques` resource representation but also on the link context. In this case the entrypoint links to the collection and will have to duplicate the member assertion in its representation too

```turtle
prefix hydra: <http://www.w3.org/ns/hydra/core#>
prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
prefix api: <https://plaque.maze.link/vocab#>
base <https://always-read-the-plaque.herokuapp.com/>

<> hydra:collection </plaques> .

# this should match the representation of /plaques
</plaques>
  hydra:memberAssertion
    [
      hydra:property rdf:type ;
      hydra:object api:Plaque ;
    ] ;
.
```

Second option is to look for collections by subject and predicate:

```js
const { Hydra } = require("alcaeus/node")

const { representation } = await Hydra.loadResource('https://wikibus.org/')

representation.root.getCollections({
    subject: 'https://sources.test.wikibus.org/magazine/Buses',
    predicate: 'http://purl.org/dc/terms/isPartOf'
})
```

> [!TIP]
> You may notice in the snippets strings are used for `subject`, `predicate` and `object` parameters. They can be either strings (URI) or resource objects.

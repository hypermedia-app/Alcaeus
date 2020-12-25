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
const { Hydra } = require("${alcaeus}")

const rep = await Hydra.loadResource('http://hydra-movies.herokuapp.com')

rep.root.getCollections()
</run-kit>

## Discovering specific collections

The `getCollections` method accepts an optional parameter which is used to find only
collections conforming to given ["manages block" pattern](../collections.md#manages-block).

Below is an example for finding collection with members of a given `SupportedClass`.

```js
const { Hydra } = require("alcaeus")

const rep = await Hydra.loadResource('http://hydra-movies.herokuapp.com')
const supportedClass = rep.root.apiDocumentation.classes[0]

rep.root.getCollections({
    object: supportedClass
})
```

{% hint style="danger" %}
 When using the `object` parameter, `predicate` will implicitly be `rdf:type`. Changing
 it to anything else will cause an empty result.
{% endhint %}

Second option is to look for collections by subject and predicate:

```js
const { Hydra } = require("alcaeus")

const rep = await Hydra.loadResource('http://hydra-movies.herokuapp.com')

rep.root.getCollections({
    subject: 'https://sources.test.wikibus.org/magazine/Buses',
    predicate: 'http://purl.org/dc/terms/isPartOf'
})
```

{% hint style="tip" %}
 You may notice in the second snippet that strings are used for `subject`
 and `predicate` parameters. Same is true for `object`; all three parameters can be either
 strings (URI) or resource objects.
{% endhint %}

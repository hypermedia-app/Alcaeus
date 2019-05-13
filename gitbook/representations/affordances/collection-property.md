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

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}")

const rep = await Hydra.loadResource('http://hydra-movies.herokuapp.com')

rep.root.getCollections()
{% endrunkit %}

{% hint style="working" %}
 In a future version this method will be extended with a parameter to filter the collections
 by their manages block specification.
{% endhint %}

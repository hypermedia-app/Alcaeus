# Resource objects in JavaScript

## Accessing properties

Individual resources within a representation will be always in the form similar to expanded JSON-LD, with all
properties and classes as absolute URIs. Getting any objects from within the tree is thus possible using JS
indexer notation.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://sources.test.wikibus.org/book/1331');

rep.root['http://schema.org/author']['http://schema.org/name'];
{% endrunkit %}

{% hint style="danger" %}
 Note that RDF literals are currently unwrapped from their JSON-LD `@value` object.
 There is an [issue](https://github.com/wikibus/Alcaeus/issues/26) pending to introduce
 an extensibility point and more semantic behaviour depending on the literal `@type`.
{% endhint %}

### Resource identifier

The resource identifier is accessible by the `@id` keyword just like any other JS property. For convenience
it is being wrapped by a getter, which makes it easier to use in declarative binding syntax.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://sources.test.wikibus.org/book/1331');

rep.root.id;
{% endrunkit %}

### Recognizing anonymous resources

RDF recognizes two kinds of resource identifiers: 

* URIs, such as `http://www.wikidata.org/entity/Q61694`
* Blank nodes, such as identified by as pseudo URI staring with `_:`

Resources identified by blank nodes are only recognizable within a single graph and
they are called **anonymous resource**.

While it is trivial to tell one from the other just by looking at the `id`, Alcaeus
resources provide a convenience getter:

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}");

const representation = await Hydra.loadResource('https://sources.test.wikibus.org/book/1331');

[...representation].map(resource => ({
  id: resource.id,
  isAnonymous: resource.isAnonymous
}))
{% endrunkit %}

### Resource type(s)

Similarly to the identifier, the JSON-LD `@type` keyword can be used on any resource object. It is impractical
though, because JSON-LD allows both an array or a single string value which makes handling types awkward. For
that reason there is a `types` getter which wraps them in an Array-like object which also comes with a `contains`
method to check if a resource is of give type.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://sources.test.wikibus.org/book/1331');

const example = {
  types: rep.root.types,
  isBook: rep.root.types.contains('http://schema.org/Book')
}
{% endrunkit %}

## Reshaping the JSON structure

It is possible to process a resource using JSON-LD [compaction][compact] algorithm as an ad-hoc way of simplifying

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://sources.test.wikibus.org/book/1331');

await rep.root.compact({
  '@vocab': 'https://wikibus.org/ontology#',
  '@base': 'https://wikibus.org/',
  'sch': 'http://schema.org/'
});
{% endrunkit %}

{% hint style="info" %}
 The `compact` method returns a plain JS object, removing any properties added by Alcaeus.
{% endhint %}

{% hint style="danger" %}
 Compaction will fail miserably if attempted on a graph with cycles. In such case it is necessary to first
 break the cycles by using some JS library like [json-cycle](https://www.npmjs.com/package/json-cycle) or
 [circular-json](https://www.mpjs.com/packages/circular-json).
{% endhint %}

{% hint style="tip" %}
 There is a more maintainable way of extending the resource objects by applying custom class mixins which
 can add methods and properties to the JS objects without sacrificing other functionalities. To learn more
 read the [dedicated page](./mixins.md).
{% endhint %}


[compact]: https://www.w3.org/TR/json-ld-api/#compaction

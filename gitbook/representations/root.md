# Root resource

## Most common behaviour

Hydra resources are expressed as a graph which can contain one or more related resources. The returned object
comes with a `root` property which returns a single resource from within the representation graph. In most
common case it will be the resource identified by the request URI

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://wikibus-test.gear.host/book/426');

rep.root;
{% endrunkit %}

## Root with different identifier

There can be some cases when the above is not true, that within a representation the main resource will
not be identified by the requested URI. Alcaeus handles a few such cases by default, described in following
sections and also allows to extend with custom behaviour.

### `Link: rel="canonical"`

It is not uncommon, especially in the RDF world, that an API can distinguish between an information resource
and its representation document, ie. actual serialized form. This is described on the
[Cool URIs for the Semantic Web](https://www.w3.org/TR/cooluris/#semweb) document and applies especially
to abstract concepts and object which cannot be transferred in an eletrconic form (for example a person).

Consider the example below in which the client requests the document directly which will return the
representation of the resource and also includes a
[`canonical`](http://webconcepts.info/concepts/link-relation/canonical) link relation, thus informing the
client that the returned payload represents that particular resource instead.

```http-request
GET /api/data/my-resource.json

HTTP/1.1 200 OK
Link: </api/my-resource>; rel="canonical"

{
  "@id": "/api/my-resource"
}
```

Here's a running example showing this in the real.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://wikibus-data-test.gear.host/brochures');

rep.root;
{% endrunkit %}

### `PartialCollectionView`

Consider a `hydra:Collection` which supports paging. Current design of Hydra makes is that when requesting
a specific page, the client will still be interested in the collection resource itself. This is to make it
simple to combine multiple

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://wikibus-test.gear.host/brochures?page=1');

await rep.xhr.json();
{% endrunkit %}

As you can see above, the requested resource does not really contain the most "interesting" data, the
collection `member`s.

```json
{
  "@id": "https://wikibus-test.gear.host/brochures",
  "member": [ {}, {}, {} ],
  "view": {
    "@id": "https://wikibus-test.gear.host/brochures?page=1",
    "@type": "PartialCollectionView",
    "next": "",
    "prev": "",
    "first": "",
    "last": ""
  }
}
```

For that reason, whenever a `PartialCollectionView` is returned from the API, the root will actually be the
collection itself.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://wikibus-test.gear.host/brochures?page=1');

rep.root;
{% endrunkit %}

### Inconsistent trailing slash

Even though the URI standard clearly states that locators `https://wikibus.org` and `https://wikibus.org/`
are two distinct resources, some API libraries will treat the as equal and respond with the same representation
to either, even though only one is explicitly set up in their respective routing table. Alcaeus tries to
gracefully resolve such inconsistency by looking for either both alternatives.

Below is such an example, where the request tries an URL without the slash but the actual resource is
identified with the slash included.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://wikibus-test.gear.host');

rep.root;
{% endrunkit %}

### Redirected request

Sometimes the request will be redirected not to a document but to a completely different resource. In such
case the correct resource, as identified by the redirect target will be returned as the `root`.

## Custom root selection policies

TBD

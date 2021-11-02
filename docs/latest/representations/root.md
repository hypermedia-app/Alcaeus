# Root resource

## Most common behaviour

Hydra resources are expressed as a graph which can contain one or more related resources. The returned object comes with a `root` property which returns a single resource from within the representation graph. In most common case it will be the resource identified by the request URI.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const { representation } = await client.loadResource('https://always-read-the-plaque.herokuapp.com/plaque/red-rocks-amphitheatre');

representation.root.toJSON()
```

</run-kit>

## Root with different identifier

There can be some cases when the above is not true, that within a representation the main resource will
not be identified by the requested URI. Alcaeus handles a few such cases by default, described in following
sections and also allows to extend with custom behaviour.

### `Location` header

Sometimes `POST` requests will create a new resource and also return its representation
in the response. When the API does that it will set a `Location` header and status `201`.

For such responses the client will look for a resource identified by the value of that header.
However, the `Location` header will be ignored if the status is anything else than `201`.

```http
HTTP/1.1 201 Created
Location: /api/movie/title

{
  "@id": "/api/movie/title"
}
```

### `Link: rel="canonical"`

It is not uncommon, especially in the RDF world, that an API can distinguish between an information resource
and its representation document, ie. actual serialized form. This is described on the
[Cool URIs for the Semantic Web](https://www.w3.org/TR/cooluris/#semweb) document and applies especially
to abstract concepts and object which cannot be transferred in an eletrconic form (for example a person).

Consider the example below in which the client requests the document directly which will return the
representation of the resource and also includes a
[`canonical`](http://webconcepts.info/concepts/link-relation/canonical) link relation, thus informing the
client that the returned payload represents that particular resource instead.

```http
HTTP/1.1 200 OK
Link: </api/my-resource>; rel="canonical"

{
  "@id": "/api/my-resource"
}
```

### `PartialCollectionView`

Consider a `hydra:Collection` which supports paging. Current design of Hydra makes is that when requesting a specific page, the client will still be interested in the collection resource itself.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const { representation } = await client.loadResource('https://always-read-the-plaque.herokuapp.com/plaques?page=1')

representation.get('https://always-read-the-plaque.herokuapp.com/plaques?page=1').toJSON()
```

</run-kit>

As you can see above, the requested "page resource" does not really contain the most interesting data: the collection `member`s.

```json
{
  "@context": {},
  "id": "https://always-read-the-plaque.herokuapp.com/plaques?page=1",
  "type": ["PartialCollectionView"],
  "next": "",
  "prev": "",
  "first": "",
  "last": ""
}
```

For that reason, whenever a `PartialCollectionView` is returned from the API, the `root` will actually be the collection itself.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

const { representation } = await client.loadResource('https://always-read-the-plaque.herokuapp.com/plaques?page=1')

representation.root.toJSON()
```

</run-kit>

### Inconsistent trailing slash

Even though the URI standard clearly states that locators `https://wikibus.org` and `https://wikibus.org/` are two distinct resources, some API libraries will treat the as equal and respond with the same representation to either, even though only one is explicitly set up in their respective routing table. Alcaeus tries to gracefully resolve such inconsistency by looking for either both alternatives.

### Redirected request

Sometimes the request will be redirected not to a document but to a completely different resource. In such
case the correct resource, as identified by the redirect target will be returned as the `root`.

## Error responses

Alcaeus out of the box supports [RFC7807](https://datatracker.ietf.org/doc/html/rfc7807) `application/problem+json` responses, and it will attempt to select the right node from the JSON parsed as JSON-LD.

Ideally, it would have `rdf:type hydra:Error`. If that is not present, alcaeus will select the topmost resource, ie. one which is not an object node.

## Custom root selection policies

For example, let's implement a custom function which will have alcaeus look for a resource where a hash fragment `#this` is appended to the original URI.

In other words, when requesting `/resource/foo`, the root node would be `/resource/foo#this`

```typescript
import { Hydra } from 'alcaeus/web'
import { namedNode } from '@rdf-esm/data-model'

// inserting as first element to make this the first root node to try 
Hydra.rootSelectors.unshift(function hashFragmentSelector(response) {
    const url = new URL(response.resourceUri)
    if (url.search.length) {
        // do nothing if URI has query
        return undefined
    }
    
    url.hash = 'this'
    return namedNode(url.toString())
})
```

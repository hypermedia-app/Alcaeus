# Operations

## Invoking

When the client gets hold of an `Operation` object, they can _invoke_, which
performs an actual web request according to the operation's description.

The `invoke` method has a single required parameter: the body. It it expected to
be any of the body types accepted by [`fetch`][f] body parameter.

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}");

// get the issues collection & fetch the first member
const rep = await Hydra.loadResource('http://www.markus-lanthaler.com/hydra/api-demo/issues/');
const issue = (await rep.root.members[0].load()).root

// find POST operation on the `#Issue/comments` property
const comments = issue['http://www.markus-lanthaler.com/hydra/api-demo/vocab#Issue/comments']
const operation = comments.operations.find(o => o.method === 'POST')

// prepare the request body
const newComment = {
   '@context': {
     '@vocab': 'http://www.markus-lanthaler.com/hydra/api-demo/vocab#'
   },
   '@type': 'Comment',
   'Comment/text': 'Comment from Alcaeus doc pages'
 }

// invoke the operation
await operation.invoke(JSON.stringify(newComment))
{% endrunkit %}

{% hint style="danger" %}
 Note that the `invoke` method does not accept objects. If the client operates on JSON-LD
 objects, the body must be serialized as shown above.
{% endhint %}

## Media type

By default the operation request will be sent with `application/ld+json` content type. If the client
wishes to send the payload in another format, the second parameter can be used to set the correct
header value.

{% hint style="info" %}
 Sending `FormData` object, such as when uploading files with multipart request,
 will not set the content-type to let the `fetch` implementation set it with correct
 boundary.
{% endhint %}

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}");

// get the issues collection & fetch the first member
const rep = await Hydra.loadResource('http://www.markus-lanthaler.com/hydra/api-demo/issues/');
const issue = (await rep.root.members[0].load()).root

// find POST operation on the `#Issue/comments` property
const comments = issue['http://www.markus-lanthaler.com/hydra/api-demo/vocab#Issue/comments']
const operation = comments.operations.find(o => o.method === 'POST')

// prepare the request body
const newCommentTurtle = `
@prefix : &lt;http://www.markus-lanthaler.com/hydra/api-demo/vocab#> .
@prefix comment: &lt;http://www.markus-lanthaler.com/hydra/api-demo/vocab#Comment/> .

<> a :Comment ;
   comment:text "Comment from Alcaeus doc pages" .`

// invoke the operation
await operation.invoke(newCommentTurtle, 'text/turtle')
{% endrunkit %}

[f]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters 

## Target

Currently the operation is always invoked on the resource it is attached to as this is
the design of Hydra at the moment. The original resource which declared the operation can
be accessed using a property of an `Operation` object.

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}");

// get the operation
const root = (await Hydra.loadResource('https://hydra-movies.herokuapp.com/')).root;
const collection = root.getCollections()[0]
const operation = collection.operations[0]

// proof
operation.target.id === collection.id
{% endrunkit %}

# Operations

## Invoking

When the client gets hold of a `RuntimeOperation` object, they can _invoke_, which performs an actual web request according to the operation's description.

The `invoke` method has a single required parameter: the body. It it expected to be any of the body types accepted by [`fetch`][f] body parameter.

However, the easiest way it to construct an `RdfResource` and stringify its JSON representation

<run-kit>

```typescript
const { Hydra } = require("${alcaeus}/node")

// get the issues collection & fetch the first member
const { root: collection } = (await Hydra.loadResource('http://www.markus-lanthaler.com/hydra/api-demo/issues/')).representation
const { root: issue } = (await collection.member[0].load()).representation

// find POST operation on the `#Issue/comments` property
const [operation] = issue.findOperationsDeep({
  expecting: 'http://www.markus-lanthaler.com/hydra/api-demo/vocab#Comment'
})

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
```

</run-kit>

> [!WARNING]
> Note that the `invoke` method does not accept objects. If the client operates on JSON-LD objects, the body must be stringified beforehand.

## Media type

By default the operation request will be sent with `application/ld+json` content type. If the client wishes to send the payload in another format, the second parameter can be used to set the correct header value.

> [!TIP]
> Sending `FormData` object, such as when uploading files with multipart request, will not set the content-type to let the `fetch` implementation set it with correct boundary.

<run-kit>

```typescript
const { Hydra } = require("${alcaeus}/node");

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
```

</run-kit>

[f]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters

## Target

The operation is always invoked on the resource it is attached to as this is the design of Hydra at the moment. The original resource which declared the operation can be accessed using a property of an `Operation` object.

<run-kit>

```typescript
const { Hydra } = require("${alcaeus}/node")
const { hydra } = require('@tpluscode/rdf-ns-builders')

// get the operation
const { representation: { root } } = await Hydra.loadResource('https://hydra-movies.herokuapp.com/')

const [operation] = root.getOperationsDeep({
    namespaces: [hydra]
})

operation.target.toJSON()
```

</run-kit>

# API Documentation

Every Hydra-compliant response should come with a HTTP `Link` header linking to the machine-readable description of the API's resources.

> [!WARNING]
> A Hydra server needs to give Alcaeus explicit permissions to read the `Link` header if **CORS is enabled**.
>
> In order to achieve that `Access-Control-Expose-Headers` has to contain `Link`.

## Accessing origin API Documentation

For every resource dereferenced by Alcaeus which links to its API Documentation, as it should according to the Hydra spec, that API Documentation is accessible from all resource objects. That includes resources deeper in the graph.

Simply access the `apiDocumentation` getter:

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra

const { representation } = await client.loadResource('https://always-read-the-plaque.herokuapp.com/')

representation.root.collection.apiDocumentation.toJSON()
```

</run-kit>

## Accessing all API Documentations

All API Documentations discovered by the client are stored and exposed by an `apiDocumentations` property.

It returns an array of all documentations which have been fetched over the client's lifetime, keeping in mind that resources can be loaded from multiple APIs and every response can come with multiple API Documentation `Link` headers.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra

await client.loadResource('https://always-read-the-plaque.herokuapp.com/')

client.apiDocumentations[0].root.toJSON()
```

</run-kit>

## Representation of ApiDocumentation

API Documentation is also an RDF resource and thus it is represented in the exact same way as all other resources returned by Alcaeus. It can even be loaded directly, preferably using a dedicated method:

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra

const apiDoc = await client.loadDocumentation('https://always-read-the-plaque.herokuapp.com/api')

apiDoc.toJSON()
```

</run-kit>

The API documentation is a direct JS representation of the Hydra concepts: classes and their descriptions, properties, operations, and the entrypoint link. Please see the child pages for more information.

[a]: representations/resource-affordances.md
[api-doc-spec]: http://www.hydra-cg.com/spec/latest/core/#discovering-a-hydra-powered-web-api

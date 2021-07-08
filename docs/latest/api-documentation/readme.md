# API Documentation

Every Hydra-compliant response should come with a HTTP `Link` header linking to the machine-readable description of the API's resources.

> [!WARNING]
> A Hydra server needs to give Alcaeus explicit permissions to read the `Link` header if **CORS is enabled**.
>
> In order to achieve that `Access-Control-Expose-Headers` has to contain `Link`.

As explained on the [Affordances][a] page, all API Documentations discovered by the client are stored and exposed by an `apiDocumentations` property.

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

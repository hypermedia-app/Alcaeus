# Entrypoint

The API Documentation should provide a link to the entrypoint resource. It can be fetched byt the client and used to build a navigation menu for example.

There is a shortcut method on the `ApiDocumentation` object which loads the entrypoint link. It simply wraps the [standard way of loading resources][load], hence to get the actual object the `root` property must be accessed.

[load]: representations/hydra

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra

const doc = await client.loadDocumentation('https://always-read-the-plaque.herokuapp.com/api')
const { representation } = await doc.loadEntrypoint()

representation.root.toJSON()
```

</run-kit>

The entrypoint workflow itself is described in more detail on [Hydra's specification](http://www.hydra-cg.com/spec/latest/core/#discovering-a-hydra-powered-web-api)

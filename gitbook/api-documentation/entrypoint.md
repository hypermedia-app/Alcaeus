# Entrypoint

The API Documentation should provide a link to the entrypoint resource. It can be fetched byt the client
and used to build a navigation menu for example.

There is a shortcut method on the `ApiDocumentation` object which loads the entrypoint link.
It simply wraps the [standard way of loading resources][load], hence to get the actual object the `root`
property must be accessed.

[load]: ../representations/hydra.html

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra

const doc = await client.loadDocumentation('https://wikibus-data-test.gear.host/doc')
const entrypointResponse = await doc.loadEntrypoint()

entrypointResponse.root
{% endrunkit %}

The entrypoint workflow itself is described in more detail on [Hydra's specification](http://www.hydra-cg.com/spec/latest/core/#discovering-a-hydra-powered-web-api)

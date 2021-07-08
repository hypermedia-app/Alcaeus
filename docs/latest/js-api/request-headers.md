# Request headers

## Default request headers

It is possible to change the request headers for every request made by the Alcaeus client.

Especially useful for setting authentication headers, the example below show how the `Accept` header can be changed so that Turtle has higher priority over JSON-LD.

<run-kit>

```typescript
const { Hydra } = require('${alcaeus}/node')

Hydra.defaultHeaders = {
  Accept: 'text/turtle, application/ld+json'
}

const { response } = await Hydra.loadResource('https://always-read-the-plaque.herokuapp.com/')

response.xhr.headers.get('content-type')
```

</run-kit>

Alternatively, a function can be used to dynamically build the default headers before each request.

```typescript
Hydra.defaultHeaders = async ({ uri: string }) => { /* headers */ }
```

## Setting headers for a single request

Individual calls to `Hydra.loadResource` or `RuntimeOperation#invoke` also accept a set of headers to be used for the following request.

```typescript
import { Hydra } from 'alcaeus/node'

const { representation } = await Hydra.loadResource('http://example.org/me', {
    Authorization: 'Bearer xyz'
})

representation.root.operations[0].invoke(turtleBody, {
    Authorization: 'Bearer xyz',
    'Content-Type': 'text/turtle',
})
```

> [!NOTE]
> Also affects the accompanying request for the linked API Documentation.

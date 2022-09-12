# Request parameters

In addition to [headers](./request-headers.md), which have a special treatment, it is also possible to change all
[parameters](https://developer.mozilla.org/en-US/docs/Web/API/fetch#syntax) passed to `fetch` calls made in the background.

## Default request parameters

Here's an example where alcaeus is instructed to forward user credentials, such as when the API is protected using
basic authentication. 

```typescript
const { Hydra } = require('${alcaeus}/node')

Hydra.defaultRequestInit = {
  credentials: 'include'
}
```

## Setting headers for a single request

Alternatively, pass single-request options when calling `loadResource` to change the behaviour of one call.

```typescript
import { Hydra } from 'alcaeus/node'

const { representation } = await Hydra.loadResource('http://example.org/me', {
    Authorization: 'Bearer xyz'
}, {
    cache: 'no-cache'
})
```

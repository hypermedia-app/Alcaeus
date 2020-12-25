# Base resource URL

Out of the box only absolute URIs will be correctly dereferenced. A base URL can be set to the client to have it resolve relative identifiers passed to `loadResource`, and `invokeOperation` calls.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra;

client.baseUri = 'https://sources.wikibus.org/'

const { response } = await client.loadResource('brochure/1300')

response.xhr.status
```

</run-kit>

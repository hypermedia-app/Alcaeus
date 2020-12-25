# Resource cache

Alcaeus has two mechanisms for handling cache: local and HTTP-based.

## HTTP cache

By default, when preparing a request for a previously fetched resource, Alcaeus will either:

* set previous [`ETag` response header][etag] as [`If-None-Match` request header][ifnm], or
* set previous [`Last-Modified` response header][lm] as [`If-Modified-Since` request header][ifms].

[etag]: http://webconcepts.info/concepts/http-header/ETag
[ifnm]: http://webconcepts.info/concepts/http-header/If-None-Match
[lm]: http://webconcepts.info/concepts/http-header/Last-Modified
[ifms]: http://webconcepts.info/concepts/http-header/If-Modified-Since

If the response has status `304` the previous representation will be reused.

### Customising cache headers

```typescript
import { Hydra } from 'alcaeus/web'

Hydra.cacheStrategy.requestCacheHeaders = ({ response }) => {
    // return a HeadersInit object or null
    return {}
}
```

## Local cache

Since all resource representation from `GET` requests get stored by Alcaeus, the client has the opportunity to completely do without performing subsequent requests. The default setting is to dispatch requests for all loaded resources where a simple function can be used to have the cached resource returned when necessary.

For example, to never load the API Documentation twice, check the RDF type of the cached resource

```typescript
import { Hydra } from 'alcaeus/web'
import { hydra } from '@tpluscode/rdf-ns-builders'

Hydra.cacheStrategy.shouldLoad = (previous) => {
    return previous.representation.root?.types.has(hydra.ApiDocumentation)
}
```

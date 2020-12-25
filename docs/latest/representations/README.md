# Resource representations

The main method of Alcaeus client is `loadResource(string)` which performs a `GET` request for the given identifier and returns an object wrapping the XHR object and the actual response. The JS object will implement the [`HydraResponse`][HydraResponse] interface.

[HydraResponse]: https://github.com/wikibus/Alcaeus/blob/master/src/alcaeus.ts#L25-L28

```typescript
import { RdfResource } from '@tpluscode/rdfine'
import { Resource } from '@rdfine/hydra'
import { DatasetCore } from 'rdf-js'
import { ResourceRepresentation } from 'alcaeus/ResourceRepresentation'
import { ResponseWrapper } from 'alcaeus/ResourceWrapper'

export interface HydraResponse<D extends DatasetCore = DatasetCore, T extends RdfResource<D> = Resource<D>> {
    representation?: ResourceRepresentation<D, T>
    response?: ResponseWrapper
}
```

In the case of a successful response both properties will be defined and give access to the fetch `response`, and a parsed `representation` wrapped in an [rdfine](https://npm.im/@tpluscode/rdfine) RdfResource.

> [!TIP]
> Not only successful responses will return a representation. As long as the response body can be parsed as RDF, it will be returned.

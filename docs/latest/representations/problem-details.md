# Problem Details for HTTP APIs

Alcaeus will parse JSON responses as RDF, provided that a [JSON-LD context link header](https://json-ld.org/spec/latest/json-ld/#interpreting-json-as-json-ld) is present in the response.

A special use for this feature is interpreting `application/problem+json` as RDF. To do that, the server can link to a context document published in the Hydra namespace:

```
Link: <https://www.w3.org/ns/hydra/error>; rel="http://www.w3.org/ns/json-ld#context"
```

See [the example](https://www.hydra-cg.com/spec/latest/core/#example-31-rfc-7807-compatible-error-description) in Hydra specification.

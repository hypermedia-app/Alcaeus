# Request headers

## Default request headers

It is possible to change the request headers for every request made by the Alcaeus
client.

Especially useful for setting authentication headers, the example below show
how the `Accept` header can be changed so that Turtle has higher priority over
JSON-LD.

{% hint style="warning" %}
Remember to set up a [media type processor]() to parse the resource representation in 
the accepted content type.
{% endhint %}

{% runkit %}
const { Hydra } = require('alcaeus@{{ book.version }}')
const ParserN3 = require('@rdfjs/parser-n3')

Hydra.defaultHeaders = {
  Accept: 'text/turtle, application/ld+json'
}
Hydra.mediaTypeProcessors.RDF.addParsers({
  'text/turtle': ParserN3
})

const rep = await Hydra.loadResource('https://sources.test.wikibus.org/')

rep.xhr.headers.get('content-type')
{% endrunkit %}

Alternatively, a function can be used to dynamically build the default headers
before each request.

`Hydra.defaultHeaders = () => { /* headers */ }`

## Setting headers for a single request

Individual calls to `Hydra.loadResource` or `IOperation#invoke` also accept a
set of headers to be used for the following request.

```typescript
import { Hydra } from 'alcaeus'

const res = await Hydra.loadResource('http://example.org/me', {
    Authorization: 'Bearer xyz'
})

res.root.operations[0].invoke(turtleBody, {
    Authorization: 'Bearer xyz',
    'Content-Type': 'text/turtle',
})
```

{% hint style="tip" %}
Also affects the accompanying request for the linked API Documentation.
{% endhint %}

# Media type support

Out of the box Alcaeus can only parse RDF serialized as JSON-LD. That is
to reduce the bundle size when using in a web application by not including
all the different parsers.

Node applications may not care however, and some may prefer the use of another
media type, possibly not even RDF.

## Adding support for other RDF serializations

To "teach" Alcaeus to parse other flavors of RDF, any [`@rdfjs`-compliant][parser]
can be added to the default media type processor

```typescript
import { Hydra } from 'alcaeus'
import ParserN3 from '@rdfjs/parser-n3'

Hydra.mediaTypeProcessors.RDF.addParsers({
  'text/turtle': ParserN3
})
```

Check the [request headers](request-headers.md) page for a live example.

[parser]: https://www.npmjs.com/search?q=RDFJS%20parser

## Custom media types

TODO

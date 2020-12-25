# Media type support

Out of the box Alcaeus parses common RDF formats using parsers provided by the [@rdf-esm/formats-common](https://npm.im/@rdf-esm/formats-common) package

To add or replace a parser:

```typescript
import { Hydra } from 'alcaeus/node'
import TrigParser from './my-trig-parser'

Hydra.parsers.set('application/trig', new TrigParser())
```

The parser class must implement the [RDF/JS Sink interface](http://rdf.js.org/stream-spec/#sink-interface).

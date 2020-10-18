# Hydra resource representations

A natural, special case for Alcaeus are resources actually represented in one of RDF serializations.
Whenever such representation is retrieved, the object returned from `loadResource` will include additional
methods for accessing the resource withing the returned payload.

```typescript
import { Resource } from '@rdfine/hydra'
import { NamedNode } from 'rdf-js'
 
interface ResourceRepresentation extends Iterable<Resource> {
    /**
     * Gets the root of the representation or undefined if it cannot be determined
     */
    root: Resource | null;

    /**
     * Gets the number of resources within this representation
     */
    length: number;

    /**
     * Indexer to look up any arbitrary resource by its id within the representation
     */
    get(uri: string): Resource | undefined;

    /**
     * Gets all resources of given RDF type from the representation
     */
    ofType(classId: string | NamedNode): Resource[];
}
```

Instances of the `Resource` interface seen above are JS proxy objects, which directly access an underlying [`RDF/JS Dataset`](https://rdf.js.org/dataset-spec/).

Throughout the examples in this documentation a `.toJSON` method will be called on them to present a more readable result - a plain JS object which is a snapshot of the underlying triples.

See the subpages for more details about individual members of the `ResourceRepresentation` interface:

* [`ResourceRepresentation.root`](representations/root.md)
* [`ResourceRepresentation.get(id)`](representations/get.md)
* [`ResourceRepresentation.ofType(id)`](representations/by-type.md)
* [`Iterable<Resource>`](representations/iterating.md)

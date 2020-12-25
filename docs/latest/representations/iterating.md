# Iterating all resources

The representation returned by `Alcaeus#loadResource` implements the well-known `Symbol.iterator`, which means
that it can be used directly in a `for..of` loop.

<run-kit>

```typescript
const client = require("alcaeus@1.0.0-RC.1/node").Hydra

const { representation } = await client.loadResource('https://sources.wikibus.org/books')

for(const resource of representation) {
  if (!resource.isAnonymous) { // handy rdfine property to check for blank nodes 
    console.log(resource.id)
  }
}
```

</run-kit>

The representation itself doesn't implement the Array interface but it can be trivially converted into one
so that more complex operation can be performed.

Here's an example which counts the occurrences of RDF types within an `ApiDocumentation`.

<run-kit>

```typescript
const client = require("alcaeus@1.0.0-RC.1/node").Hydra
const TermMap = require('@rdfjs/term-map')

const { representation } = await client.loadResource('https://sources.wikibus.org/doc')

const sums = Array.from(representation)
    .reduce((sums, resource) => {
        resource.types.forEach(type => {
            const previousSum = sums.get(type.id) || 0
            sums.set(type.id, previousSum + 1)
        });
        return sums;
     }, new TermMap())
     
;[...sums.entries()]
 ```

</run-kit>

> [!NOTE]
> The elements of the `RdfResource#types` array are themselves also resource objects

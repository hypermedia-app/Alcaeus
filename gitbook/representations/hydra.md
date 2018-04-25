# Hydra resource representations

A natural, special case for Alcaeus are resources actually represented in one of RDF serializations.
Whenever such representation is retrieved, the object returned from `loadResource` will include additional
methods for accessing the resource withing the returned payload.

```ts
interface IHydraResponse extends Iterable<IHydraResource> {
    /**
     * Gets the root of the representation or undefined if it cannot be determined
     */
    root: IHydraResource;

    /**
     * Gets the number of resource within this representation
     */
    length: number;

    /**
     * Indexer to look up any arbitrary resource by its id within the representation
     */
    get(uri: string): IHydraResource;

    /**
     * Gets all resources of given RDF type from the representation
     * @param {string} classId RDF class identifier
     * @returns {Array<IHydraResource>}
     */
    ofType(classId: string): IResource[];
}
```

See the subpages for more details about individual members of the `IHydraResponse` interface:

* [`IHydraResponse.get(string)`](get.md)
* [`IHydraResponse.root`](root.md)
* [`IHydraResponse.ofType(string)`](by-type.md)
* [`Iterable<IHydraResource>`](iterating.md)

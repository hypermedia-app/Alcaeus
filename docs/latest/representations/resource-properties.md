# Working with resource properties

Individual resources can come with properties of different values of properties. Because JavaScript is a very loose language, weird problems can go undetected until runtime.

Alcaeus' base `Resource` class comes with a few handy helper methods which can be used to retain some type checking at run time as well as during development time in the case of TypeScript.

## Literal properties

Alcaeus will convert the RDF literals, which are strings, to their respective JS
representation based on the datatype. By default numeric xsd types and `xsd:boolean`
are converted.

<run-kit>

```javascript
const { Hydra } = require("${alcaeus}/node");

const { representation } = await Hydra.loadResource('https://always-read-the-plaque.herokuapp.com/plaques')
const collection = representation.root;

// hydra:totalItems is a "real" number
Number.isInteger(collection.totalItems)
```

</run-kit>

## `get` and `getArray`

A most generic type of property accessors are two methods which take a property name
and return the value or values of that property.

They are very similar to the built-in indexer and differ in a few details:

* `getArray` will ensure that a single values is wrapped in an `Array`
* `get` returns `null` instead of `undefined`
* both can be used a generics, but it serves only as compiler hint

## Typed helper methods

There is a handful of typed methods to get literals:

* `getNumber`
* `getString`
* `getBoolean`

All of the will throw if the actual value is not of the expected type.

> [!WARNING]
> That includes an array, even if it contain all values of that type.

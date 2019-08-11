# Working with resource properties

Individual resources can come with properties of different values of properties.
Because JavaScript is a very loose language, weird problems can go undetected until
runtime.

Alcaeus' base `Resource` class comes with a few handy helper methods which can be used
to retain some type checking at run time as well as during development time in the
case of TypeScript.

## Literal properties

Alcaeus will convert the RDF literals, which are strings, to their respective JS
representation based on the datatype. By default numeric xsd types and `xsd:boolean`
are converted.

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}");

const collection = (await Hydra.loadResource('https://sources.test.wikibus.org/brochures')).root;

// hydra:totalItems is a "real" number
Number.isInteger(collection.totalItems)
{% endrunkit %} 
 
It is also possible to add a custom converter:

{% runkit %}
const { Hydra } = require("alcaeus@{{ book.version }}")
const { Duration } = require('luxon')

// hook up a converter
Hydra.mediaTypeProcessors.RDF.literalConverters['http://schema.org/Duration'] = 
    (value, type) => {
        // type can be used if a converter
        // handles multiple datatypes
    
        return Duration.fromISO(value)
    }

// get the operation
const root = (await Hydra.loadResource('https://hydra-movies.herokuapp.com/')).root;
const collection = root.getCollections()[0]
const operation = collection.operations[0]

// invoke (it will echo a Movie with its duration)
const newMovie = {
   '@context': 'http://schema.org/',
   'schema:duration': 'PT115M'
 }

// invoke the operation
const movie = (await operation.invoke(JSON.stringify(newMovie))).root

// check that the movie's duration property gets converted
movie.duration.minutes === 115
{% endrunkit %} 

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

{% hint style="danger" %}
That includes an array, even if it contain all values of that type.
{% endhint %}

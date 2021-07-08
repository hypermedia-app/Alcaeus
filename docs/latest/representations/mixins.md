# Extending resource objects with mixins

Working with absolute URI properties can prove cumbersome. After all who would want to write code like:

```js
resource['http://schema.org/author']['http://schema.org/name'];
```

This is verbose and error prone.

Resources returned from Alcaeus are composed of JavaScript mixins applied on top of plain RDF/JS Dataset wrapper objects. Mixins allow creating friendly getters for RDF properties, and methods, adding behaviour to resource objects.

## Adding mixins to resource

There are two steps necessary to apply a mixin:

1. Create a function which returns the mixins class
1. Add the object to Alcaeus' `ResourceFactory`

### Example

<run-kit>

```typescript
const { Hydra } = require("${alcaeus}/node");
const { schema } = require('@tpluscode/rdf-ns-builders')
const namespace = require('@rdf-esm/namespace')

const ns = namespace('https://plaque.maze.link/vocab#')

const PlaqueMixin = Base => {
  return class extends Base {
    get contributorName() {
      return this.get(schema.contributor).getString(schema.name)
    }
  }
}

// Have the mixin added to instances of Plaque class
PlaqueMixin.appliesTo = ns.Plaque

// Add mixin to the client
Hydra.resources.factory.addMixin(PlaqueMixin)

const { representation } = await Hydra.loadResource('https://always-read-the-plaque.herokuapp.com/plaque/red-rocks-amphitheatre');

// access property defined in mixin
representation.root.contributorName
```

</run-kit>

## Annotated properties

To further simplify the code, mixins can be annotated using `@tpluscode/rdfine` decorators. This feature is available in TypeScript and JS when compiled with babel.

```typescript
const { schema } = require('@tpluscode/rdf-ns-builders')
const { property, Constructor } = require('@tpluscode/rdfine')

const PlaqueMixin = <Base extends Constructor>(base: Base) => {
  class Book extends base {
    @property.literal({ path: [schema.contributor, schema.name]})  
    contributorName?: string
  }
  
  return Book
}
```

### Choosing resources to extend

Seen above is the preferred way to implement a mixin, by selecting the RDF type URI which it applies to. All instances of that type will be extended.

Another way is to apply a mixin to every RDF resource object:

<run-kit>

```typescript
const { Hydra } = require("${alcaeus}/node");
const { schema } = require('@tpluscode/rdf-ns-builders')
const namespace = require('@rdf-esm/namespace')

const ns = namespace('https://plaque.maze.link/vocab#')

const PlaqueMixin = Base => {
  return class extends Base {
    get isPlaque() {
      return this.types.has(ns.Plaque)
    }
  }
}

// Used instead of appliesTo
PlaqueMixin.shouldApply = true
Hydra.resources.factory.addMixin(PlaqueMixin)

const { representation } = await Hydra.loadResource('https://always-read-the-plaque.herokuapp.com/plaques')

// isBook is now a property of all resource objects
const rootIsPlaque = representation.root.isPlaque
const memberIsPlaque = representation.root.member[0].isPlaque

const result = {
    rootIsPlaque,
    memberIsPlaque,
}
```

</run-kit>

Finally, a custom function can be provided to decide whether a resource is to be extended wth a mixin.

> [!WARNING]
> This functionality should be used sparingly, as it will have an adverse effect on performance.

<run-kit>

```typescript
const { Hydra } = require("${alcaeus}/node");
const { schema } = require('@tpluscode/rdf-ns-builders')

const PlaqueMixin = Base => {
  return class extends Base {
    get text() {
      return this.getString(schema.text)
    }
  }
}

// Accepts a single parameter - the candidate resource
PlaqueMixin.shouldApply = (resource) => resource.pointer.out(schema.text).values.length > 0
Hydra.resources.factory.addMixin(PlaqueMixin)

const { representation } = await Hydra.loadResource('https://always-read-the-plaque.herokuapp.com/plaques')

representation.root.member[0].text
```

</run-kit>

### Extending built-in resource types

Using TypeScript's interfaces it is possible to extend the declarations of existing resource types to have full IDE support for the declared properties and methods.

```typescript
declare module 'alcaeus' {
    // mixin.shouldApply = true
    interface Resource {
        // extending all resources
    }

    // mixin.appliesTo = hydra.Collection
    interface Collection {
        // extending hydra:Collection resources
    }
}
```

## Built-in mixins

Alcaeus includes a number of mixins imported from the package [@rdfine/hydra](https://npm.im/@rdfine/hydra) as well as [client extensions][m] to provide the features described in these documentation pages.

[m]: https://github.com/wikibus/Alcaeus/tree/master/src/Resources

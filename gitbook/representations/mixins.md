# Extending resource objects with mixins

Working with absolute URI properties can prove cumbersome. After all who would want to write code like:

```js
resource['http://schema.org/author']['http://schema.org/name'];
```

This is verbose, error prone and probably will be an issue for declarative binding syntax of some libraries
(I'm looking at you, Polymer).

Resources returned from Alcaeus are composed of JavaScript mixins applied on top of plain JS objects coming from
the JSON-LD processing algorithms. Mixins allow creating friendly getters for RDF properties, and methods
adding some behaviour to your resources.

## Adding mixins to resource

There are two steps necessary to apply a mixin:

1. Create an object with two members which implements the below interface

     ```typescript
     type Constructor<T = {}> = new (...args: any[]) => T;
     interface IMixin {
         Mixin: Constructor;
         shouldApply(obj: IHydraResource): boolean;
     }
     ```

1. Add the object to Alcaeus's `ResourceFactory`

The `Mixin` property is, obviously, the actual mixin to apply when creating objects from JSON-LD resources.
The `shouldApply` function is used to choose whether a given mixin should be used with a given resource.

{% hint style="info" %}
 If `shouldApply` is missing, the mixin will be ignored.
{% endhint %}

### Example

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const Mixin = Base => {
  return class extends Base {
    get authorName() {
      return this['http://schema.org/author']['http://schema.org/name'];
    }
  };
};

const shouldApply = resource => {
  return resource.types.contains('http://schema.org/Book');
};

// Add mixin to the client
client.mediaTypeProcessors.RDF.resourceFactory.mixins.push({ Mixin, shouldApply });

const rep = await client.loadResource('https://wikibus-test.gear.host/book/1331');

// access property defined in mixin
rep.root.authorName;
{% endrunkit %}

{% hint style="tip" %}
 A clean way is to export the `Mixin` and `shouldApply` function, which is then easily imported to
 add to resource factory.
{% endhint %}

```js
// AuthorMixin.js
export function Mixin(Base) {
  return class extends Base {};
}

export const shouldApply = () => true;
```

```js
// index.js
import Hydra from 'alcaeus';
import * as AuthorMixin from './AuthorMixin';

Hydra.mediaTypeProcessors.RDF.resourceFactory.mixins.push(AuthorMixin);
```

### Helper methods

When defining a resource mixin it is possible to take advantage of protected methods which make it easier to
access the underlying triples.

```typescript
export function Mixin(Base) {
  return class extends Base {
    get authorName() {
      // The `_get` method will simply return coalesce missing property to a `null`
      // In other words, it will prevent the `undefined` value from being returned
      return this._get('http://schema.org/author');
    }

    get chapters() {
      // `_getArray` will ensure that an `Array` is always returned:
      // * Wrapping a non-array value
      // * Empty array if the property is missing
      return this._getArray('http://purl.org/ontology/bibo/chapter');
    }
  };
}
```

## Built-in mixins

Alcaeus [includes a number of mixins][m] which are applied to elements of the Hydra vocabulary. These are mainly
resources within the `ApiDocumentation` but also `Collection` and `PartialCollectionView`.

[m]: https://github.com/wikibus/Alcaeus/tree/master/src/Resources/Mixins

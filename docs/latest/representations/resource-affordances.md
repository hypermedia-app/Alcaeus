# Resource affordances

In addition to the [basic](representations/resource-objects.md) `types` and `id` properties resource objects will also include two properties giving access to hypermedia descriptions coming from the API Documentation.

## Getting resource's operations

Resource objects come with an `operations` property which will return an array of [`RuntimeOperation`][op] instances which represent a combination of:

* inline operations
* supported operations for all of the resource's types
* supported operations for the supported property, where the resource is an object of said property

Especially the last point can be a bit mind-boggling so here's an example. First, here's excerpt from the API Documentation.

```json
{
  "@type": "ApiDocumentation",
  "supportedClass": [
    {
      "@type": "v:Person",
      "supportedOperation": [{
        "@type": "v:UpdatePerson",
        "method": "PUT",
        "description": "Updates the person"
      }],
      "supportedProperty": [{
        "property": {
          "@type": "v:homeAddress",
          "supportedOperation": [{
            "@id": "v:RemoveAddress",
            "method": "DELETE",
            "description": "Deletes the address"
          }]
        }
      }]
    },
    {
      "@type": "v:Address",
      "supportedOperation": [{
        "@type": "v:UpdateAddress",
        "method": "PUT",
        "description": "Updates the address"
      }]
    }
  ]
}
```

From the above you can read that a classes `Person` and `Address` supports a `PUT` operation to update them.
Additionally person's home address object will support a `DELETE` operation, regardless of its type.

Now, let's combine this with a resource representation:

```json
{
  "@id": "/a/person",
  "v:homeAddress": {
    "@type": "v:Address"
  },
  "operation": [{
    "@type": "v:RequestFriend",
    "method": "POST",
    "description": "Creates a friend request"
  }]
}
```

With these documents you can use the client to get the resources' operations, which will produce results as
described in the below snippet.


```js
import {Hydra} from 'alcaeus/node';

const representation = await Hydra.loadResource('/a/Person');
const person = representation.root;

/*
 * will return operations:
 * v:RequestFriend (inline)
 * v:UpdatePerson (supported by class v:Person)
 */
const personOperations = person.operations;

/*
 * will return operations:
 * v:UpdateAddress (supported by type v:Address)
 * v:RemoveAddress (supported by objects of property v:homeAddress)
 */
const addressOperations = person["v:homeAddress"].operations;
```

## Accessing all API Documentations

The client itself has a property for accessing all documentations which have been fetched over the client's lifetime, keeping in mind that resources can be loaded from multiple APIs and every response can come with multiple API Documentation `Link` headers.

<run-kit>

```typescript
const client = require("${alcaeus}/node").Hydra

await client.loadResource('https://always-read-the-plaque.herokuapp.com/')

client.apiDocumentations[0].root.toJSON()
```

</run-kit>

For more information about the API Documentation please refer to [its dedicated page][doc] and child pages.

[op]: api-documentation/operation.md
[doc]: api-documentation/readme.md

# Alcaeus [![npm version](https://badge.fury.io/js/alcaeus.svg)](https://badge.fury.io/js/alcaeus) ![](https://github.com/wikibus/Alcaeus/workflows/Test/badge.svg) [![Code coverage](https://codecov.io/gh/wikibus/alcaeus/branch/master/graph/badge.svg)](https://codecov.io/gh/wikibus/alcaeus)


## [Hydra Core](http://www.hydra-cg.com/spec/latest/core/) library for JavaScript

Alcaeus (pronounced <code>AL-SEE-UHS</code>) is a Node.js/browser library for consuming Hydra APIs.

Alcaeus is the birth name of Heracles. The demigod who defeated Hydra.

## Installation

Use npm or yarn:

``` bash
npm i alcaeus
```

## Requirements

Alcaues `v3` is implemented only as ES Modules. It will work in recent versions on node and modern browsers.

## Usage

Since `v3` Alcaeus is configured using an RDF/JS Environment factory. This decouples the library from any specific RDF/JS implementation.

It is recommended to use the implementation provided by `@zazuko/env` which allows to easily reuse extend existing environments.

```js
import create from 'alcaeus'
import Environment from '@zazuko/env/Environment.js'
import rdf from '@zazuko/env'

const env = new Environment(create(), { parent: rdf })

const { response, representation } = await env.hydra.loadResource('http://example.com/resource');
const rootResource = representation.root;

// contains supported classes, operations, etc.
const apiDocs = Hydra.apiDocumentations[0];
    
const id = rootResource.id; 
```

To learn more, head to http://alcaeus.hydra.how.

## License

MIT

[p1]: https://github.com/github/fetch
[p3]: https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

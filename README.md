# Alcaeus [![npm version](https://badge.fury.io/js/alcaeus.svg)](https://badge.fury.io/js/alcaeus) ![](https://github.com/wikibus/Alcaeus/workflows/Test/badge.svg) [![Code coverage](https://codecov.io/gh/wikibus/alcaeus/branch/master/graph/badge.svg)](https://codecov.io/gh/wikibus/alcaeus)


## [Hydra Core](http://www.hydra-cg.com/spec/latest/core/) library for JavaScript

Alcaeus (pronounced <code>AL-SEE-UHS</code>) is a Node.js/browser library for consuming Hydra APIs.

Alcaeus is the birth name of Heracles. The demigod who defeated Hydra.

## Installation

Use npm or yarn:

``` bash
npm i -S alcaeus
```

## Usage

``` js
import { Hydra } from 'alcaeus/web' // (or 'alcaeus/node')

const { response, representation } = await Hydra.loadResource('http://example.com/resource');
const rootResource = representation.root;

// contains supported classes, operations, etc.
const apiDocs = Hydra.apiDocumentations[0];
    
const id = rootResource.id; 
```

To learn more head to http://alcaeus.hydra.how.

### More examples (outdated)

* [Introduction to heracles](http://t-code.pl/blog/2016/04/introducing-heracles/)
* [Working with jsonld.js](http://t-code.pl/blog/2016/04/heracles-compacting-resources/)

## License

MIT

[p1]: https://github.com/github/fetch
[p3]: https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

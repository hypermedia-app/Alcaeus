# Alcaeus [![Build Status](https://travis-ci.org/wikibus/Alcaeus.svg?branch=master)](https://travis-ci.org/wikibus/Alcaeus) [![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=QVRBWEUwNTc3eWtQUkFXRkNMRDdZcjdZWWxwMHdCSDV3KzdhN2VSa3lIaz0tLU5LYktmMmZvWk1JWis2aVhEVCtjQUE9PQ==--8ad273bf2d71920e02edadd79043d8862d3f1c2e)](https://www.browserstack.com/automate/public-build/QVRBWEUwNTc3eWtQUkFXRkNMRDdZcjdZWWxwMHdCSDV3KzdhN2VSa3lIaz0tLU5LYktmMmZvWk1JWis2aVhEVCtjQUE9PQ==--8ad273bf2d71920e02edadd79043d8862d3f1c2e)


## [Hydra Core](http://www.hydra-cg.com/spec/latest/core/) library for JavaScript

Alcaeus is a Promise-based library for consuming Hydra APIs.

Alcaeus is the birth name of Heracles. The demigod who defeated Hydra.

## Installation

Use npm or yarn:

``` bash
yarn add alcaeus
```

## Usage

``` js
import {Hydra} from 'alcaeus';

const representation = await Hydra.loadResource('http://example.com/resource');
const rootResource = representation.root;

// contains supported classes, operations, etc.
const apiDoc = rootResource.apiDocumentation;

// contains supported classes, operations, etc.
const apiDocs = rootResource.apiDocumentation;
    
// same as rootResource['@id']
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

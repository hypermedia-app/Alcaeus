# heracles

## [Hydra Core](http://www.hydra-cg.com/spec/latest/core/) library for JavaScript

Heracles is a Promise-based library for consuming Hydra APIs

## Browser support

[![Sauce Test Status](https://saucelabs.com/browser-matrix/heracles-tcode.svg)](https://travis-ci.org/wikibus/heracles)

## Installation

``` bash
jspm install npm:wikibus/heracles
```

It should also be possible to install from NPM directly, but jspm makes it much easier to then use in ES6 code.

## Usage

Assuming JSPM installation

``` js
import {Hydra} from 'wikibus/heracles';

Hydra.loadResource('http://example.com/resource')
  .then(res => {
    // contains supported classes, operations, etc.
    var apiDocs = res.apiDocumentation;
    
    // same as res['@id']
    var id = res.id; 
  });
```

### More examples

* [Introduction to heracles](http://t-code.pl/blog/2016/04/introducing-heracles/)
* [Working with jsonld.js](http://t-code.pl/blog/2016/04/heracles-compacting-resources/)

## License

MIT

# Alcaeus [![Build Status](https://travis-ci.org/wikibus/alcaeus.svg?branch=master)](https://travis-ci.org/wikibus/alcaeus) [![Sauce Test Status](https://saucelabs.com/buildstatus/heracles-tcode)](https://saucelabs.com/u/heracles-tcode)

## [Hydra Core](http://www.hydra-cg.com/spec/latest/core/) library for JavaScript

Alcaeus is a Promise-based library for consuming Hydra APIs.

Alcaeus is the birth name of Heracles. The demigod who defeated Hydra.

## Browser support

[![Sauce Test Status](https://saucelabs.com/browser-matrix/heracles-tcode.svg)](https://saucelabs.com/u/heracles-tcode)

## Installation

Use npm or yarn:

``` bash
yarn add alcaeus
```

## Usage

``` js
import {Hydra} from 'alcaeus';

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

[p1]: https://github.com/github/fetch
[p3]: https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

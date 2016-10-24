# heracles [![Sauce Test Status](https://saucelabs.com/buildstatus/heracles-tcode)](https://saucelabs.com/u/heracles-tcode)

## [Hydra Core](http://www.hydra-cg.com/spec/latest/core/) library for JavaScript

Heracles is a Promise-based library for consuming Hydra APIs

## Browser support

[![Sauce Test Status](https://saucelabs.com/browser-matrix/heracles-tcode.svg)](https://saucelabs.com/u/heracles-tcode)

You will need polyfills for older browsers:

|                     | Chrome | Firefox | IExplore | Safari | Opera |
| -------------       |--------|---------|----------|--------|-------|
| [window.fetch][p1]  | <42    | <39     | :x:      | :x:    | <29   |
| [WeakMap][p3]       | <36    | <6      | <11      | <7.1   | <23   |

## Installation

Heracles uses JSPM for development and is probably best used with it:

``` bash
jspm install npm:heracles
```

However, it is also possible to install from NPM directly. 

``` bash
npm install heracles
```

Heracles is bundled as a CommonJS module and has been verified to work fine with Webpack. Please let me know if you have any issues 
with other tools like Browserify, server-side NodeJS, etc.

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

[p1]: https://github.com/github/fetch
[p3]: https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

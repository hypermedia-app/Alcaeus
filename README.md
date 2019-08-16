# Alcaeus [![npm version](https://badge.fury.io/js/alcaeus.svg)](https://badge.fury.io/js/alcaeus) [![Build Status](https://travis-ci.org/wikibus/Alcaeus.svg?branch=master)](https://travis-ci.org/wikibus/Alcaeus) [![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=QitnVVJlZEJBWkExWGVYOXZ0Ymo1NkNvSHY1R1VCbEllcU1FbHU0VWdFQT0tLW14Wk5UcjdlZ1luK0Z1S1NwWWhLQXc9PQ==--e9ceda4d03cff10bd985c21e8ecce9d540aa65a1)](https://www.browserstack.com/automate/public-build/QitnVVJlZEJBWkExWGVYOXZ0Ymo1NkNvSHY1R1VCbEllcU1FbHU0VWdFQT0tLW14Wk5UcjdlZ1luK0Z1S1NwWWhLQXc9PQ==--e9ceda4d03cff10bd985c21e8ecce9d540aa65a1) [![Code coverage](https://codecov.io/gh/wikibus/alcaeus/branch/master/graph/badge.svg)](https://codecov.io/gh/wikibus/alcaeus)


## [Hydra Core](http://www.hydra-cg.com/spec/latest/core/) library for JavaScript

Alcaeus (pronounced <code>AL-SEE-UHS</code>) is a Promise-based library for consuming Hydra APIs.

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

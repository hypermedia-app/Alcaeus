# Getting started

## Installation

To install Alcaeus is to simply add its package using yarn, npm or your shinier package manager:

```bash
$ yarn add alcaeus
```

```bash
$ npm install --save alcaeus
```

## Requiremenets

Alcaeus tries to keep up with modern JavaScript ecosystem. The library is published as a dual modules+commonjs package.

* Node version: `12+` (with `--experimental-modules` flag where necessary)
* TypeScript: `3.8`

## Basic usage

Typically one would import an instance set up with sensible defaults. In the browser that would be:

```js
import { Hydra } from 'alcaeus/web'
```

And in node

```js
import { Hydra } from 'alcaeus/node'
```

> [!NOTE]
> Throughout these pages runnable examples will be shown using runkit, which only supports commonjs. Hence, the `require` function is used instead of ES6 imports

Here's a most basic example, which fetches an API entrypoint

<run-kit>

```javascript
const { Hydra } = require("${alcaeus}/node");

await Hydra.loadResource('https://sources.test.wikibus.org/');
```

</run-kit>

> [!NOTE]
> Also note that runkit examples will be shown loading a specific version, which one would not include in real code.

## Past docs

For reference, here are snapshots of docs at their state in previous versions:

* <a href="/0.4.0">0.4.0</a>
* <a href="/0.4.3">0.4.3</a>
* <a href="/0.5.3">0.5.3</a>
* <a href="/0.10.7">0.10.7</a>

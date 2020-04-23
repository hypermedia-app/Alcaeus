# Getting started

## Installation

To install Alcaeus is to simply add its package using yarn, npm or your shinier package manager:

```bash
$ yarn add alcaeus
```

```bash
$ npm install --save alcaeus
```

## Basic usage

Typically one would import an instance set up with sensible defaults

```js
import {Hydra} from 'alcaeus';
```

{% hint style="info" %}
 Throughout these pages runnable examples will be shown using runkit, which only
 supports commonjs. Hence, the `require` function is used instead of ES6 imports
{% endhint %}

Here's a most basic example, which fetches an API entrypoint

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

await client.loadResource('https://sources.test.wikibus.org/');
{% endrunkit %}

{% hint style="info" %}
 Also note that runkit examples will be shown loading a specific version,
 which one would not include in real code.
{% endhint %}

## Past docs

For reference, here are snapshots of docs at their state in previous versions:

* [0.4.0](../0.4.0)
* [0.4.3](../0.4.3)
* [0.5.3](../0.5.3)
* [0.10.7](../0.10.7)

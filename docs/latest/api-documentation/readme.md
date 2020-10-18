# API Documentation

As explained on the [Affordances][a] page, each and every resource object within a Hydra representation comes
with an `apiDoumentation` getter. This API Documentation is fetched from the web by following the HTTP `Link`
header as specified by [Hydra][api-doc-spec].

{% hint style="tip" %}
 The Hydra server needs to give Alcaeus explicit permissions to read the `Link` header if **CORS is enabled**. In order to achieve that `Access-Control-Expose-Headers` has to contain `Link`.
{% endhint %}

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;
const li = require('parse-link-header');

const docUri = 'http://www.w3.org/ns/hydra/core#apiDocumentation';

const rep = await client.loadResource('https://sources.test.wikibus.org/');

console.log(`The documentation URI is: '${li(rep.xhr.headers.get('Link'))[docUri].url}'`);
const apiDoc = rep.root.apiDocumentation.valueOr(null);
{% endrunkit %}

The getter returns a `Maybe<ApiDocumentation>` object which makes it easier to handle representations
without it or when it failed to load for some reason.

{% hint style="working" %}
 For a
 single representation (in other words a single call to `loadResource`) the documentation will be fetched
 exactly once. However there is no other caching yet.
{% endhint %}

The API documentation is a direct JS representation of the Hydra concepts: classes and their descriptions,
and the entrypoint link. Please see the child pages for more information.

It is also possible to load the documentation resource directly using dedicated method. It will return
a typical resource object. After all the API Documentation is also a JSON-LD resource like any other.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

await client.loadDocumentation('https://wikibus-data-test.gear.host/doc');
{% endrunkit %}

[a]: ../representations/resource-affordances.md#accessing-entire-apidocumentation
[api-doc-spec]: http://www.hydra-cg.com/spec/latest/core/#discovering-a-hydra-powered-web-api

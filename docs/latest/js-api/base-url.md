# Base resource URL

Out of the box only absolute URIs will be correctly dereferenced. A base URL can be set to the client to have it resolve relative identifiers passed to `loadResource`, and `invokeOperation` calls.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

client.baseUri = 'https://sources.test.wikibus.org/'

await client.loadResource('brochure/1331')
{% endrunkit %}

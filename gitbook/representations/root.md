# Root resource

Hydra resources are expressed as a graph which can contain more than one embedded resources. Even though
most often the representation will be expressed in a form of a JSON-LD tree, it may not always be true that
the resource of interest will actually be the root of that JSON document.

Consider a `hydra:Collection` which supports paging. Current design of Hydra makes it easier to make the
collection itself the topmost object in the JSON tree as in the below raw response

{% runkit %} 
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('http://wikibus-test.gear.host/brochures?page=1');

await rep.xhr.json();
{% endrunkit %}

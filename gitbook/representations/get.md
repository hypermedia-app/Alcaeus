# Getting arbitrary resource

If you know a specific resource identifier you want to retrieve from a resource representation you can take
advantage of a handy getter method from `IHydraResource` object comes with which gives access to specific
resources.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const rep = await client.loadResource('https://sources.test.wikibus.org/books');

rep.get('https://sources.test.wikibus.org/books/5');
{% endrunkit %}

{% hint style="info" %}
 Note, that the individual resources are "real" JavaScript objects, and hence everything is fully traversable
 by indexing with property names or using the dot notation.
{% endhint %}

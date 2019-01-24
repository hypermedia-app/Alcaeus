# Iterating all resources

The representation returned by `Alcaeus#loadResource` implements the well-known `Symbol.iterator`, which means
that it can be used directly in a `for..of` loop.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const resources = await client.loadResource('https://wikibus-test.gear.host/');

for(let res of resources) {
  console.log(res.id);
}
{% endrunkit %}

The representation itself doesn't implement the Array interface but it can be trivially converted into one
so that more complex operation can be performed.

Here's an example which counts the occurrences of RDF types within an `ApiDocumentation`.

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const resources = await client.loadResource('https://wikibus-test.gear.host/doc');

Array.from(resources).reduce((acc, item) => {
            item.types.forEach(type => {
                acc[type] = acc[type] ? acc[type] + 1 : 1;
            });
            return acc;
         }, {});
{% endrunkit %}

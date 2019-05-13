# Selecting resources by type

The representation returned by `Alcaeus#loadResource` comes with a handy method which returns resources of
the given RDF type. Code speaks louder than words so here's an example:

{% runkit %}
const client = require("alcaeus@{{ book.version }}").Hydra;

const resources = await client.loadResource('https://sources.test.wikibus.org/books/3');

resources.ofType('http://schema.org/Book')
         .map(book => book['http://purl.org/dc/terms/title']);
{% endrunkit %}

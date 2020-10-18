# Hydra vocabulary

It will be often necessary to build terms from the Hydra vocabulary. For that purpose
the library exports a simple yet handy function which takes a string parameter and
returns URI in the Hydra base URI

{% runkit %}
const { Vocab } = require("alcaeus@{{ book.version }}")

Vocab('Class')
{% endrunkit %}

Calling `Vocab` without parameters will return the Hydra namespace itself.

## IDE integration

Although the `Vocab` function does not verify the correctness of requested term
at runtime, the parameter is declared as a union of allowed names which exist
in the Hydra Core vocabulary. Typings will ensure that developers don't commit
typos by integrating with editors which understand `.d.ts` files.

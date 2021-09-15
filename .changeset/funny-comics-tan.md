---
"alcaeus": minor
---

`getProperties` returned only resources (fixes #248)

**WARNING**: this may be a BREAKING CHANGE for clients relying on the current, broken behaviour. To keep the current return value call `.getProperties({ termTypes: ['NamedNode', 'BlankNode'] })`. See [the docs for details](https://alcaeus.hydra.how/latest/#/api-documentation/supported-property)

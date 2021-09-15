# Changelog

## 1.3.0

### Minor Changes

- b2fd347: `getProperties` returned only resources (fixes #248)

  **WARNING**: this may be a BREAKING CHANGE for clients relying on the current, broken behaviour. To keep the current return value call `.getProperties({ termTypes: ['NamedNode', 'BlankNode'] })`. See [the docs for details](https://alcaeus.hydra.how/latest/#/api-documentation/supported-property)

- 0537be7: Added generic type argument to operation `invoke` methods

### Patch Changes

- 5536a73: Unwanted `any` type when implementing `ResourceCacheStrategy`

## 1.2.1

### Patch Changes

- 91808a5: Typo in `ApiDocumentation#loadEntrypoint` method

## 1.2.0

### Minor Changes

- 9894812: Added support for `hydra:memberAssertion`

### Patch Changes

- a15434d: Iterating response and resource count would return same resource multiple times
- 52beb52: Update isomorphic-fetch

## 1.1.4

### Patch Changes

- 8d0a898: Update RDF/JS types, rdfine and rdf-ns-builders

## 1.1.3

### Patch Changes

- ca9dc9e: Web: Do not capture the global fetch function

  The problem is that tools which monkey-patch the `Window.fetch`, such as Sentry, would not work with alcaeus if it captures the original fetch function before patching happens

## 1.1.2

### Patch Changes

- 42e1a8c: alcaeus/node incorrectly imported formats-common

## 1.1.1

### Patch Changes

- 48362a0: Empty representation cannot be retrieved back from ResourceStore

## 1.1.0

### Minor Changes

- 9f906d6: Pass request URI to defaultHeaders

## 1.0.1

### Patch Changes

- c212178: Fix typing of Class mixin

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/wikibus/alcaeus/compare/v1.0.0-RC.4...v1.0.0) (2020-12-03)

### Bug Fixes

- **performance:** improve operation lookup ([d8dfddc](https://github.com/wikibus/alcaeus/commit/d8dfddce1bcf1d1db6aadb88e7618a5da3cee14e))

## [1.0.0-RC.4](https://github.com/wikibus/alcaeus/compare/v1.0.0-RC.3...v1.0.0-RC.4) (2020-10-24)

### Bug Fixes

- ensure body reader is opened only once ([3dc9018](https://github.com/wikibus/alcaeus/commit/3dc901824ab4fd4b63d07bb24ce991e3d02526e2))

## [1.0.0-RC.3](https://github.com/wikibus/alcaeus/compare/v1.0.0-RC.2...v1.0.0-RC.3) (2020-10-22)

### Bug Fixes

- do not consume body until parsing ([5bfebf2](https://github.com/wikibus/alcaeus/commit/5bfebf24f14237f0d51acc5fa6965a427f7e249e))

## [1.0.0-RC.2](https://github.com/wikibus/alcaeus/compare/v1.0.0-RC.1...v1.0.0-RC.2) (2020-10-20)

### Bug Fixes

- relax generic params to allow any RdfResource ([2d429f8](https://github.com/wikibus/alcaeus/commit/2d429f8db1c3250cff2d2d6d60eb94dc99ff2c7d))
- standalone loadDocumentation did not work ([392622b](https://github.com/wikibus/alcaeus/commit/392622bfa576f66d7fddd134c220f5c15b20cd44))

## [1.0.0-RC.1](https://github.com/wikibus/alcaeus/compare/v1.0.0-RC.0...v1.0.0-RC.1) (2020-10-13)

### Bug Fixes

- ensure types of CoreMixins are exported ([dc1ea74](https://github.com/wikibus/alcaeus/commit/dc1ea746d17f3571e9ee1d2134f2ea8a02315a99))

## [1.0.0-RC.0](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.18...v1.0.0-RC.0) (2020-10-08)

### Features

- use @rdfine/hydra for most of API model ([d26566b](https://github.com/wikibus/alcaeus/commit/d26566bd30c2e0e88e1ece37eb97d493998f35c8))
- **perf:** add cache wrapper over ResourceFactory ([497f268](https://github.com/wikibus/alcaeus/commit/497f2680579d01e9c665d819dfd1f92d07383d59))
- cache request headers added to subsequent requests ([1344d7f](https://github.com/wikibus/alcaeus/commit/1344d7ffc72c3e7bf79ec8486b9a8c62e5d16e4e))

### Bug Fixes

- do not add failed responses to store ([1cbd4fd](https://github.com/wikibus/alcaeus/commit/1cbd4fdb5755ffdb6363aa3d27228f5794b0aa2e))
- ensure type augmentations are picked up ([0606b9b](https://github.com/wikibus/alcaeus/commit/0606b9b19abf285719f5edfc2134d77047ccc8d2))
- findOperations does not find by type name node ([7f2ce91](https://github.com/wikibus/alcaeus/commit/7f2ce91fa7d6b685f547a53837a43957821e1162))
- make load generic ([f7e378a](https://github.com/wikibus/alcaeus/commit/f7e378a864963bda2524172e086c98c0b00e6256))
- requested (or redirected) URI used as base to parse ([02a4fd5](https://github.com/wikibus/alcaeus/commit/02a4fd5dd801a938e2a2a916d1e09cc7267181a1))
- **perf:** include operations more selectively by namespaces ([07e7aab](https://github.com/wikibus/alcaeus/commit/07e7aabf39b3442fbbd94531c8c2c47ed9080d0d))

## [1.0.0-beta.18](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.17...v1.0.0-beta.18) (2020-09-22)

## [1.0.0-beta.17](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.16...v1.0.0-beta.17) (2020-09-22)

### Bug Fixes

- hydra:expects allows multiple objects and not only hydra:Class ([e1486f0](https://github.com/wikibus/alcaeus/commit/e1486f02efde8371f894f028128a559492c70916))

## [1.0.0-beta.16](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2020-09-18)

### Bug Fixes

- built-in Headers was still used in code ([cab40e5](https://github.com/wikibus/alcaeus/commit/cab40e5c9ec8ebdaf6dee00657ad02da005682bc))

## [1.0.0-beta.15](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2020-09-17)

### Bug Fixes

- only use built-in URL class ([1a46f09](https://github.com/wikibus/alcaeus/commit/1a46f090130372168b6771f2abfb688055fdc732))

## [1.0.0-beta.14](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2020-09-17)

### Features

- create separate entrypoints for node/web ([a0efc1a](https://github.com/wikibus/alcaeus/commit/a0efc1a7e6ef7d1c0d099a4fc0dbe44d39b00759))

## [1.0.0-beta.13](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2020-09-16)

### Bug Fixes

- readable-stream must be default-imported ([c46c71a](https://github.com/wikibus/alcaeus/commit/c46c71a837eb86f3e075ff648f37f68c96653ef7))

## [1.0.0-beta.12](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2020-09-16)

### Bug Fixes

- **esm:** remove typescript interfaces from imports in mjs build ([17d6966](https://github.com/wikibus/alcaeus/commit/17d696679300f6dc2262c97c4923e98288985bd5))

## [1.0.0-beta.11](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2020-09-02)

### Bug Fixes

- **declarations:** avoid this outside of interface ([b498527](https://github.com/wikibus/alcaeus/commit/b498527b53283c671bd0a7f3a16ee8b1482814c6))

## [1.0.0-beta.10](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2020-09-02)

### Bug Fixes

- exports must begin with dot ([76e802b](https://github.com/wikibus/alcaeus/commit/76e802bd500266a408684f3bc1bcd842507a9423))

## [1.0.0-beta.9](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2020-09-02)

## [1.0.0-beta.8](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2020-09-01)

### Features

- defaultHeaders should allow async function ([d6f89b5](https://github.com/wikibus/alcaeus/commit/d6f89b507f6f6e9eb0c2cb89c7d82054c19174bd))

## [1.0.0-beta.7](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2020-05-19)

### Bug Fixes

- revert modules deps to support commonjs ([f679111](https://github.com/wikibus/alcaeus/commit/f6791117c1cf74eb006dff93611280ad2135a996))

## [1.0.0-beta.6](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2020-05-18)

### Features

- use esm of formats-common to have access to parsers by default ([9baca32](https://github.com/wikibus/alcaeus/commit/9baca32c4989eb9068165f7f2c23248e42c3597b))

### Bug Fixes

- bogus headers were sent due to qubyte/fetch-ponyfill[#248](https://github.com/wikibus/alcaeus/issues/248) ([14e2247](https://github.com/wikibus/alcaeus/commit/14e2247243884d67f03a03514925f2a6173ee268))

## [1.0.0-beta.5](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2020-05-04)

### Bug Fixes

- **node:** replace isomorphic-fetch with fetch-ponyfill ([035ce44](https://github.com/wikibus/alcaeus/commit/035ce442d2c24895be707bbd45aa5a09b58304d3))

## [1.0.0-beta.4](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2020-04-30)

### Features

- added a resource store, changed how bodies are processed ([94d46ba](https://github.com/wikibus/alcaeus/commit/94d46baedcc63544703a15e51d02e69f7cc2d34f))

### Bug Fixes

- re-export HydraResponse from main module ([c932dbb](https://github.com/wikibus/alcaeus/commit/c932dbbc602783f6e2ace05390f547ea5badfe83))

## [1.0.0-beta.3](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2020-04-25)

### ⚠ BREAKING CHANGES

- root selectors are now simple functions, initialized through an array of [string, func]

### Bug Fixes

- getting links failed if any object was Literal ([38ce61a](https://github.com/wikibus/alcaeus/commit/38ce61a62fec49a83caad02979d4014f0be2d4f4))
- selecting root only work for hydra:PartialCollectionView ([18d637a](https://github.com/wikibus/alcaeus/commit/18d637aae1ad3c60d5bdf6cc55467ad62c36a8a4))

## [1.0.0-beta.2](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2020-04-24)

## [1.0.0-beta.1](https://github.com/wikibus/alcaeus/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2020-04-23)

### Bug Fixes

- add required transitive dependencies to package.json ([57ab8ce](https://github.com/wikibus/alcaeus/commit/57ab8cea9c690ce4e8e25ce0a4dad2ca1e3dab49))

## [1.0.0-beta.0](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.16...v1.0.0-beta.0) (2020-04-23)

## [1.0.0-alpha.16](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2020-04-22)

### Features

- **template:** resolve relative templates against immediate parent ([68221d3](https://github.com/wikibus/alcaeus/commit/68221d393c28c1ee94681290992539db32229962))

### Bug Fixes

- **templates:** expanding template calls "abstract" method ([7e889fd](https://github.com/wikibus/alcaeus/commit/7e889fd2ec77453b944bbf6cf2755b2f51e601ac))

### [0.10.7](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.10...v0.10.7) (2020-03-17)

### Features

- setting base URI to allow relative resource ids ([275664d](https://github.com/wikibus/alcaeus/commit/275664d3cc62709cd00eebbc5f973e5560482069))

### [0.10.6](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.9...v0.10.6) (2020-02-29)

### Bug Fixes

- alcaeus had an unlisted dependency ([ed80788](https://github.com/wikibus/alcaeus/commit/ed80788c8d83574906f74ff5ad64814f100e8dc9))

## [1.0.0-alpha.15](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2020-04-17)

### Bug Fixes

- improve how root is selected by checking graph connections ([2d36689](https://github.com/wikibus/alcaeus/commit/2d36689c38f000eb5454f05ac75df374629b6855)), closes [#161](https://github.com/wikibus/alcaeus/issues/161)
- operation finder should not traverse graphs ([049f74a](https://github.com/wikibus/alcaeus/commit/049f74a046032e5bf4851b847d087fa22a7102d4))

## [1.0.0-alpha.14](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2020-04-17)

### Features

- **node:** add a cjs module exporting client with all parsers ([59f8311](https://github.com/wikibus/alcaeus/commit/59f8311fdc77a58a77c3cd332e337d935b6239d6))

### Bug Fixes

- initializing alcaeus with parsers ([afd6e37](https://github.com/wikibus/alcaeus/commit/afd6e37999315a223c409f7af1a0fa000e323d57))

## [1.0.0-alpha.13](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2020-04-15)

## [1.0.0-alpha.12](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2020-04-14)

### Bug Fixes

- operations are searched in the resource's graph only ([25d3aba](https://github.com/wikibus/alcaeus/commit/25d3abad0392c800d8909700a8113d02e6cc809a))

## [1.0.0-alpha.11](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2020-04-02)

### ⚠ BREAKING CHANGES

- no separate commonjs build may require setting up esm

### Features

- only single es modules build ([76382b6](https://github.com/wikibus/alcaeus/commit/76382b6ab78704b8e3074a5e830c01352a02e3fb))

## [1.0.0-alpha.10](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2020-03-12)

## [1.0.0-alpha.9](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2020-02-04)

### Bug Fixes

- **build:** reduce bundle size by updating rdf-transform-to-quad ([fa9cc01](https://github.com/wikibus/alcaeus/commit/fa9cc01899b05da443359bbd3c28ea80fb6de498))

## [1.0.0-alpha.8](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2020-01-29)

### ⚠ BREAKING CHANGES

- parsers have to be provided explicitly by the calling application
- content type is mandatory on operations with body

- remove dependency on JSON-LD parser and simplify rdf handling ([4065aa3](https://github.com/wikibus/alcaeus/commit/4065aa3aa4156544a845f204105c4eda1ddf9b47))

## [1.0.0-alpha.7](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2020-01-28)

## [1.0.0-alpha.6](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2020-01-27)

### Features

- make collection generic for nicer runtime typings ([15483e3](https://github.com/wikibus/alcaeus/commit/15483e37ffb7b5404b4d1ad92e9d537345484389))

### Bug Fixes

- collection mixin was ot hooked up to factory ([604de05](https://github.com/wikibus/alcaeus/commit/604de05140cec094902be22dd04701809c9ecb5e))
- required dependency string-to-stream missing ([259bf16](https://github.com/wikibus/alcaeus/commit/259bf1682865e70d073ff4e8fb1b245ab5d3ec50))

## [1.0.0-alpha.5](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2020-01-26)

### Bug Fixes

- add NamedNode to inout type foe load methods ([d60a1b0](https://github.com/wikibus/alcaeus/commit/d60a1b0c342e187bad501ed00cc74b80c220cf80))

## [1.0.0-alpha.4](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2020-01-23)

### Bug Fixes

- also export Operation from main ([e1e8c44](https://github.com/wikibus/alcaeus/commit/e1e8c44b19dc6d49189e1d9c7a7d9fa7cca164f7))
- invoked operation does not return the representation object ([2a8a214](https://github.com/wikibus/alcaeus/commit/2a8a214458ac36c5d0de6544685d535e0acfbaf5))

## [1.0.0-alpha.3](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2020-01-19)

### Bug Fixes

- change api documentation promise to return instances ([a82bdcd](https://github.com/wikibus/alcaeus/commit/a82bdcda02f2601942a760014c3299d7ea16058e))
- remove deprecated code ([5a07cff](https://github.com/wikibus/alcaeus/commit/5a07cffe149d9bef451e936584abdf78a1ca4dad))
- rename and reorganize interfaces ([46c3d73](https://github.com/wikibus/alcaeus/commit/46c3d73b837d5ef8af50fdbba996c145c75be38f))

## [1.0.0-alpha.2](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2020-01-17)

### Bug Fixes

- **resource:** getArray should only return resources ([aa1f860](https://github.com/wikibus/alcaeus/commit/aa1f86034193ef2ca29bbc7e4a6214f4798d14f3))

## [1.0.0-alpha.1](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2020-01-17)

### Features

- load method to allow named node param ([1e4cf66](https://github.com/wikibus/alcaeus/commit/1e4cf66b4443417148b0d19e21d5d62a133e80aa))

## [1.0.0-alpha.2](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.0...v1.0.0-alpha.2) (2020-01-17)

### Features

- load method to allow named node param ([74f37e7](https://github.com/wikibus/alcaeus/commit/74f37e75be4d111278b44a25b179406fde9cd28d))

## [1.0.0-alpha.1](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2020-01-17)

### Features

- load method to allow named node param ([dc165d7](https://github.com/wikibus/alcaeus/commit/dc165d7733fbf06d6399b3aaaa02349d02735e38))

## [1.0.0-alpha.0](https://github.com/wikibus/alcaeus/compare/v0.10.5...v1.0.0-alpha.0) (2020-01-17)

### [0.10.5](https://github.com/wikibus/alcaeus/compare/v0.10.4...v0.10.5) (2019-12-07)

### Bug Fixes

- headers are not getting correctly applied ([77f8fbb](https://github.com/wikibus/alcaeus/commit/77f8fbb34491dcd69dc9851c1dcdb69b3bd757f6))

### [0.10.4](https://github.com/wikibus/alcaeus/compare/v0.10.3...v0.10.4) (2019-12-04)

### Bug Fixes

- missing import of FormData in node environment ([4a5b378](https://github.com/wikibus/alcaeus/commit/4a5b378c06ec1e49299b36f97b2f4deaa752f1f7))

### [0.10.3](https://github.com/wikibus/alcaeus/compare/v0.10.2...v0.10.3) (2019-11-24)

### Bug Fixes

- form data should automatically set multipart content type ([965bcc2](https://github.com/wikibus/alcaeus/commit/965bcc2982ca3d4ee01a844b49b21acd5145ba55))

### [0.10.2](https://github.com/wikibus/alcaeus/compare/v0.10.0...v0.10.2) (2019-11-21)

### Features

- added methods to find operations on resources, also recursively ([fac47cc](https://github.com/wikibus/alcaeus/commit/fac47ccd8e2d904eb4f896b3ff5273f3c094dfda))

### Bug Fixes

- change return type annotation for `getCollections` ([bded51e](https://github.com/wikibus/alcaeus/commit/bded51e725e86cc24087b433cd3a7da1a3bac0eb))
- duplicate operation returned when supported by two resource types ([#150](https://github.com/wikibus/alcaeus/issues/150)) ([20878f6](https://github.com/wikibus/alcaeus/commit/20878f65005fcce57a3d695e9b5d193bccd37c7b))
- findOperationsDeep did not apply default filter ([88c5dbb](https://github.com/wikibus/alcaeus/commit/88c5dbb953737bd8739ffb583beb5a43a45f8d4c))

## [0.10.0](https://github.com/wikibus/alcaeus/compare/v0.9.2...v0.10.0) (2019-10-31)

### Bug Fixes

- **deps:** make gitbook stuff dev dependencies ([61a7840](https://github.com/wikibus/alcaeus/commit/61a7840))

### Build System

- bump version to use on gitbook ([5dd85f7](https://github.com/wikibus/alcaeus/commit/5dd85f7))
- ensure that import casing matches file names ([f1006f8](https://github.com/wikibus/alcaeus/commit/f1006f8))

### Features

- explicitly add triples inferred from the manages block ([7fc3178](https://github.com/wikibus/alcaeus/commit/7fc3178)), closes [#147](https://github.com/wikibus/alcaeus/issues/147)
- explicitly assert props and operations from subClassOf relation ([8ab6cf5](https://github.com/wikibus/alcaeus/commit/8ab6cf5)), closes [#145](https://github.com/wikibus/alcaeus/issues/145)

### [0.9.2](https://github.com/wikibus/alcaeus/compare/v0.9.1...v0.9.2) (2019-10-17)

### Bug Fixes

- wrap rdf:List resources in an Array object ([d2e1b09](https://github.com/wikibus/alcaeus/commit/d2e1b09))

### Build System

- **deps:** [security] bump eslint-utils from 1.3.1 to 1.4.2 ([b53d877](https://github.com/wikibus/alcaeus/commit/b53d877))

### [0.9.1](https://github.com/wikibus/alcaeus/compare/v0.9.0...v0.9.1) (2019-08-16)

### Bug Fixes

- headers do not get properly overridden when casing differs ([7f3a62e](https://github.com/wikibus/alcaeus/commit/7f3a62e))
- warn about unsupported media type ([661c966](https://github.com/wikibus/alcaeus/commit/661c966)), closes [#47](https://github.com/wikibus/alcaeus/issues/47)

### Tests

- make sure header merging accepts arrays ([93723f8](https://github.com/wikibus/alcaeus/commit/93723f8))

## [0.9.0](https://github.com/wikibus/alcaeus/compare/v0.8.1...v0.9.0) (2019-08-15)

### Features

- set default headers for all api requests ([e150767](https://github.com/wikibus/alcaeus/commit/e150767))
- **fetch:** setting request headers on individual calls ([9343d55](https://github.com/wikibus/alcaeus/commit/9343d55))

### [0.8.1](https://github.com/wikibus/alcaeus/compare/v0.8.0...v0.8.1) (2019-08-12)

### Bug Fixes

- extend the return type of operation.target ([724fcf2](https://github.com/wikibus/alcaeus/commit/724fcf2))
- proper typing for implementation of mediaTypeProcessors ([e465bc1](https://github.com/wikibus/alcaeus/commit/e465bc1))
- wrong predicate used for SupportedProperty#writable ([d293503](https://github.com/wikibus/alcaeus/commit/d293503))

### Build System

- **deps:** [security] bump tar from 2.2.1 to 2.2.2 ([6f0e265](https://github.com/wikibus/alcaeus/commit/6f0e265))

## [0.8.0](https://github.com/wikibus/alcaeus/compare/v0.7.1...v0.8.0) (2019-08-11)

### Bug Fixes

- literals should be converted to native values ([52877f0](https://github.com/wikibus/alcaeus/commit/52877f0))

### Build System

- **deps:** [security] bump extend from 3.0.0 to 3.0.2 ([de18658](https://github.com/wikibus/alcaeus/commit/de18658))
- **deps:** [security] bump fstream from 1.0.10 to 1.0.12 ([e5fbfd7](https://github.com/wikibus/alcaeus/commit/e5fbfd7))
- **deps:** [security] bump https-proxy-agent from 2.0.0 to 2.2.2 ([15c696c](https://github.com/wikibus/alcaeus/commit/15c696c))
- **deps:** [security] bump is-my-json-valid from 2.13.1 to 2.20.0 ([cf45e33](https://github.com/wikibus/alcaeus/commit/cf45e33))
- **deps:** [security] bump stringstream from 0.0.5 to 0.0.6 ([e2d65b4](https://github.com/wikibus/alcaeus/commit/e2d65b4))
- **deps:** [security] bump tough-cookie from 2.3.1 to 2.3.4 ([77e6662](https://github.com/wikibus/alcaeus/commit/77e6662))

### Features

- expose a target property on IOperation ([0cf8e56](https://github.com/wikibus/alcaeus/commit/0cf8e56))

### [0.7.1](https://github.com/wikibus/alcaeus/compare/v0.7.0...v0.7.1) (2019-08-05)

### Bug Fixes

- problem building upstream project with strict compilation ([189a47a](https://github.com/wikibus/alcaeus/commit/189a47a))

### Build System

- **deps:** [security] bump brace-expansion from 1.1.6 to 1.1.11 ([1f1b982](https://github.com/wikibus/alcaeus/commit/1f1b982))
- **deps:** [security] bump http-proxy-agent from 2.0.0 to 2.1.0 ([301999c](https://github.com/wikibus/alcaeus/commit/301999c))
- **deps:** [security] bump sshpk from 1.9.2 to 1.16.1 ([fc94742](https://github.com/wikibus/alcaeus/commit/fc94742))
- **deps:** [security] bump tar-fs from 1.15.3 to 1.16.3 ([f32dc2b](https://github.com/wikibus/alcaeus/commit/f32dc2b))

## [0.7.0](https://github.com/wikibus/alcaeus/compare/v0.6.3...v0.7.0) (2019-08-02)

### Bug Fixes

- canonical link selector should resolve relative links ([46f3fd2](https://github.com/wikibus/alcaeus/commit/46f3fd2))
- reverse links not calculated for multiple triple objects ([7678378](https://github.com/wikibus/alcaeus/commit/7678378))
- **typings:** missing return value of IOperation#invoke ([196e47f](https://github.com/wikibus/alcaeus/commit/196e47f))

### Features

- add a method to quickly load resources ([852f05c](https://github.com/wikibus/alcaeus/commit/852f05c)), closes [#55](https://github.com/wikibus/alcaeus/issues/55)
- added indexer signature and bunch of type guards ([121cffe](https://github.com/wikibus/alcaeus/commit/121cffe)), closes [#116](https://github.com/wikibus/alcaeus/issues/116)
- create a root selector for 201 response with location ([5f45323](https://github.com/wikibus/alcaeus/commit/5f45323))

### Tests

- missing tests to boost coverage ([c701b44](https://github.com/wikibus/alcaeus/commit/c701b44))
- test IriTemplateMapping properties ([c8caac6](https://github.com/wikibus/alcaeus/commit/c8caac6))

### [0.6.3](https://github.com/wikibus/alcaeus/compare/v0.6.2...v0.6.3) (2019-06-27)

### Bug Fixes

- **collections:** type views as IResource ([eb3f2f9](https://github.com/wikibus/alcaeus/commit/eb3f2f9)), closes [#83](https://github.com/wikibus/alcaeus/issues/83)

### Features

- **operations:** publicly expose underlying supported operation ([7ef5d35f](https://github.com/wikibus/alcaeus/commit/7ef5d35f))

### Build System

- added standard-version ([203bf34](https://github.com/wikibus/alcaeus/commit/203bf34))
- remove yarn from scripts ([5e33eff](https://github.com/wikibus/alcaeus/commit/5e33eff))
- use pretest script ([7832517](https://github.com/wikibus/alcaeus/commit/7832517))

### [0.6.2](https://github.com/wikibus/alcaeus/compare/v0.6.1...v0.6.2) (2019-05-23)

### Bug Fixes

- [Manages block calls unbound ApiDocumentation function](https://github.com/wikibus/Alcaeus/issues/77)
- [Manages missing form default mixins](https://github.com/wikibus/Alcaeus/issues/76)
- [Getting the vocabulary is inconvenient](https://github.com/wikibus/Alcaeus/issues/75)

### Features

- [Add getter to see if a resource is blank node](https://github.com/wikibus/Alcaeus/issues/74)

### [0.6.1](https://github.com/wikibus/alcaeus/compare/v0.6.0...v0.6.1) (2019-05-23)

### Bug Fixes

- [Properties are returned twice](https://github.com/wikibus/Alcaeus/issues/71)

### Documentation

- [Document supported properties](https://github.com/wikibus/Alcaeus/pull/73)

## [0.6.0](https://github.com/wikibus/alcaeus/compare/v0.5.3...v0.6.0) (2019-05-19)

### Features

- [Implement manages block](https://github.com/wikibus/Alcaeus/issues/51)
- [Add hydra:collection to resources](https://github.com/wikibus/Alcaeus/issues/63)
- [Find collections by manages block](https://github.com/wikibus/Alcaeus/issues/64)

### BREAKING CHANGES

- [Handle no docs gracefully](https://github.com/wikibus/Alcaeus/pull/59)
- [Remove embedded context](https://github.com/wikibus/Alcaeus/pull/70)

### [0.5.3](https://github.com/wikibus/alcaeus/compare/v0.5.2...v0.5.3) (2019-05-01)

### Bug Fixes

- [Relative Links to ApiDocumentation](https://github.com/wikibus/Alcaeus/issues/56)

### [0.5.2](https://github.com/wikibus/alcaeus/compare/v0.5.1...v0.5.2) (2019-05-01)

### Bug Fixes

- [Relative Links to ApiDocumentation](https://github.com/wikibus/Alcaeus/issues/56)

### [0.5.1](https://github.com/wikibus/alcaeus/compare/v0.5.0...v0.5.1) (2019-04-09)

### Bug Fixes

- [Invoked operation is not sending the body](https://github.com/wikibus/Alcaeus/issues/52)

## [0.5.0](https://github.com/wikibus/alcaeus/compare/v0.4.6...v0.5.0) (2019-03-26)

### Bug Fixes

- [Missing flag to check if property is a link](https://github.com/wikibus/Alcaeus/issues/48)

### Chores

- [update old rdf-ext packages to latest from @rdfjs](https://github.com/wikibus/Alcaeus/pull/50)

## [0.4.6](https://github.com/wikibus/alcaeus/compare/v0.4.5...v0.4.6) (2019-02-17)

### Bug Fixes

- [Core decorators are missing as dependency](https://github.com/wikibus/Alcaeus/issues/46)

### [0.4.5](https://github.com/wikibus/alcaeus/compare/v0.4.4...v0.4.5) (2019-01-24)

### Bug Fixes

- [Do not fetch ApiDocumentation in absence of link](https://github.com/wikibus/Alcaeus/issues/23)
- [ExactMatchIdSelector behaves differently from Graph.root](https://github.com/wikibus/Alcaeus/issues/42)
- [Operations not getting properly initialised](https://github.com/wikibus/Alcaeus/issues/43)

### [0.4.4](https://github.com/wikibus/alcaeus/compare/v0.4.3...v0.4.4) (2019-12-13)

### Bug Fixes

- [Fix typing of loadResource](https://github.com/wikibus/Alcaeus/pull/40)

### Chores

- [correct typing](https://github.com/wikibus/Alcaeus/pull/41)

### Features

- [Node-friendly package](https://github.com/wikibus/Alcaeus/pull/39)

### [0.4.3](https://github.com/wikibus/alcaeus/compare/v0.4.2...v0.4.3) (2018-10-30)

### Bug Fixes

- [Invalid handling spaces](https://github.com/wikibus/Alcaeus/pull/36)
- [Inconsistent handling of URI escaping](https://github.com/wikibus/Alcaeus/issues/35)

### Build System

- [Publishing not only bundled version](https://github.com/wikibus/Alcaeus/pull/37)

### [0.4.2](https://github.com/wikibus/alcaeus/compare/v0.4.1...v0.4.2) (2018-07-21)

### Chores

- fix declaration generation and packaging ([1ba5c7c](https://github.com/wikibus/Alcaeus/commit/1ba5c7ca339ed2677d9b223d61d16c3b5e62a7cf))

### [0.4.1](https://github.com/wikibus/alcaeus/compare/v0.4.0...v0.4.1) (2018-06-19)

### Bug Fixes

- handle bool fals in \_get ([7743c50](https://github.com/wikibus/Alcaeus/commit/7743c501325bf92304865f9467a0c6248fe963b8))

### Build System

- transpile with typings ([5b68b6c](https://github.com/wikibus/Alcaeus/commit/5b68b6c01597824178d6548d3518efec62976836)), closes [#31](https://github.com/wikibus/Alcaeus/pull/31)

## [0.4.0](https://github.com/wikibus/alcaeus/compare/v0.3.0-a1...v0.4.0) (2018-06-17)

Too much to manually back fill.

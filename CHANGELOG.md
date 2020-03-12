# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0-alpha.10](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2020-03-12)

## [1.0.0-alpha.9](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2020-02-04)


### Bug Fixes

* **build:** reduce bundle size by updating rdf-transform-to-quad ([fa9cc01](https://github.com/wikibus/alcaeus/commit/fa9cc01899b05da443359bbd3c28ea80fb6de498))

## [1.0.0-alpha.8](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2020-01-29)


### ⚠ BREAKING CHANGES

* parsers have to be provided explicitly by the calling application
* content type is mandatory on operations with body

* remove dependency on JSON-LD parser and simplify rdf handling ([4065aa3](https://github.com/wikibus/alcaeus/commit/4065aa3aa4156544a845f204105c4eda1ddf9b47))

## [1.0.0-alpha.7](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2020-01-28)

## [1.0.0-alpha.6](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2020-01-27)


### Features

* make collection generic for nicer runtime typings ([15483e3](https://github.com/wikibus/alcaeus/commit/15483e37ffb7b5404b4d1ad92e9d537345484389))


### Bug Fixes

* collection mixin was ot hooked up to factory ([604de05](https://github.com/wikibus/alcaeus/commit/604de05140cec094902be22dd04701809c9ecb5e))
* required dependency string-to-stream missing ([259bf16](https://github.com/wikibus/alcaeus/commit/259bf1682865e70d073ff4e8fb1b245ab5d3ec50))

## [1.0.0-alpha.5](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2020-01-26)


### Bug Fixes

* add NamedNode to inout type foe load methods ([d60a1b0](https://github.com/wikibus/alcaeus/commit/d60a1b0c342e187bad501ed00cc74b80c220cf80))

## [1.0.0-alpha.4](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2020-01-23)


### Bug Fixes

* also export Operation from main ([e1e8c44](https://github.com/wikibus/alcaeus/commit/e1e8c44b19dc6d49189e1d9c7a7d9fa7cca164f7))
* invoked operation does not return the representation object ([2a8a214](https://github.com/wikibus/alcaeus/commit/2a8a214458ac36c5d0de6544685d535e0acfbaf5))

## [1.0.0-alpha.3](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2020-01-19)


### Bug Fixes

* change api documentation promise to return instances ([a82bdcd](https://github.com/wikibus/alcaeus/commit/a82bdcda02f2601942a760014c3299d7ea16058e))
* remove deprecated code ([5a07cff](https://github.com/wikibus/alcaeus/commit/5a07cffe149d9bef451e936584abdf78a1ca4dad))
* rename and reorganize interfaces ([46c3d73](https://github.com/wikibus/alcaeus/commit/46c3d73b837d5ef8af50fdbba996c145c75be38f))

## [1.0.0-alpha.2](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2020-01-17)


### Bug Fixes

* **resource:** getArray should only return resources ([aa1f860](https://github.com/wikibus/alcaeus/commit/aa1f86034193ef2ca29bbc7e4a6214f4798d14f3))

## [1.0.0-alpha.1](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2020-01-17)


### Features

* load method to allow named node param ([1e4cf66](https://github.com/wikibus/alcaeus/commit/1e4cf66b4443417148b0d19e21d5d62a133e80aa))

## [1.0.0-alpha.2](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.0...v1.0.0-alpha.2) (2020-01-17)


### Features

* load method to allow named node param ([74f37e7](https://github.com/wikibus/alcaeus/commit/74f37e75be4d111278b44a25b179406fde9cd28d))

## [1.0.0-alpha.1](https://github.com/wikibus/alcaeus/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2020-01-17)


### Features

* load method to allow named node param ([dc165d7](https://github.com/wikibus/alcaeus/commit/dc165d7733fbf06d6399b3aaaa02349d02735e38))

## [1.0.0-alpha.0](https://github.com/wikibus/alcaeus/compare/v0.10.5...v1.0.0-alpha.0) (2020-01-17)

### [0.10.5](https://github.com/wikibus/alcaeus/compare/v0.10.4...v0.10.5) (2019-12-07)


### Bug Fixes

* headers are not getting correctly applied ([77f8fbb](https://github.com/wikibus/alcaeus/commit/77f8fbb34491dcd69dc9851c1dcdb69b3bd757f6))

### [0.10.4](https://github.com/wikibus/alcaeus/compare/v0.10.3...v0.10.4) (2019-12-04)


### Bug Fixes

* missing import of FormData in node environment ([4a5b378](https://github.com/wikibus/alcaeus/commit/4a5b378c06ec1e49299b36f97b2f4deaa752f1f7))

### [0.10.3](https://github.com/wikibus/alcaeus/compare/v0.10.2...v0.10.3) (2019-11-24)


### Bug Fixes

* form data should automatically set multipart content type ([965bcc2](https://github.com/wikibus/alcaeus/commit/965bcc2982ca3d4ee01a844b49b21acd5145ba55))

### [0.10.2](https://github.com/wikibus/alcaeus/compare/v0.10.0...v0.10.2) (2019-11-21)


### Features

* added methods to find operations on resources, also recursively ([fac47cc](https://github.com/wikibus/alcaeus/commit/fac47ccd8e2d904eb4f896b3ff5273f3c094dfda))


### Bug Fixes

* change return type annotation for `getCollections` ([bded51e](https://github.com/wikibus/alcaeus/commit/bded51e725e86cc24087b433cd3a7da1a3bac0eb))
* duplicate operation returned when supported by two resource types ([#150](https://github.com/wikibus/alcaeus/issues/150)) ([20878f6](https://github.com/wikibus/alcaeus/commit/20878f65005fcce57a3d695e9b5d193bccd37c7b))
* findOperationsDeep did not apply default filter ([88c5dbb](https://github.com/wikibus/alcaeus/commit/88c5dbb953737bd8739ffb583beb5a43a45f8d4c))

## [0.10.0](https://github.com/wikibus/alcaeus/compare/v0.9.2...v0.10.0) (2019-10-31)


### Bug Fixes

* **deps:** make gitbook stuff dev dependencies ([61a7840](https://github.com/wikibus/alcaeus/commit/61a7840))


### Build System

* bump version to use on gitbook ([5dd85f7](https://github.com/wikibus/alcaeus/commit/5dd85f7))
* ensure that import casing matches file names ([f1006f8](https://github.com/wikibus/alcaeus/commit/f1006f8))


### Features

* explicitly add triples inferred from the manages block ([7fc3178](https://github.com/wikibus/alcaeus/commit/7fc3178)), closes [#147](https://github.com/wikibus/alcaeus/issues/147)
* explicitly assert props and operations from subClassOf relation ([8ab6cf5](https://github.com/wikibus/alcaeus/commit/8ab6cf5)), closes [#145](https://github.com/wikibus/alcaeus/issues/145)



### [0.9.2](https://github.com/wikibus/alcaeus/compare/v0.9.1...v0.9.2) (2019-10-17)


### Bug Fixes

* wrap rdf:List resources in an Array object ([d2e1b09](https://github.com/wikibus/alcaeus/commit/d2e1b09))


### Build System

* **deps:** [security] bump eslint-utils from 1.3.1 to 1.4.2 ([b53d877](https://github.com/wikibus/alcaeus/commit/b53d877))



### [0.9.1](https://github.com/wikibus/alcaeus/compare/v0.9.0...v0.9.1) (2019-08-16)


### Bug Fixes

* headers do not get properly overridden when casing differs ([7f3a62e](https://github.com/wikibus/alcaeus/commit/7f3a62e))
* warn about unsupported media type ([661c966](https://github.com/wikibus/alcaeus/commit/661c966)), closes [#47](https://github.com/wikibus/alcaeus/issues/47)


### Tests

* make sure header merging accepts arrays ([93723f8](https://github.com/wikibus/alcaeus/commit/93723f8))



## [0.9.0](https://github.com/wikibus/alcaeus/compare/v0.8.1...v0.9.0) (2019-08-15)


### Features

* set default headers for all api requests ([e150767](https://github.com/wikibus/alcaeus/commit/e150767))
* **fetch:** setting request headers on individual calls ([9343d55](https://github.com/wikibus/alcaeus/commit/9343d55))



### [0.8.1](https://github.com/wikibus/alcaeus/compare/v0.8.0...v0.8.1) (2019-08-12)


### Bug Fixes

* extend the return type of operation.target ([724fcf2](https://github.com/wikibus/alcaeus/commit/724fcf2))
* proper typing for implementation of mediaTypeProcessors ([e465bc1](https://github.com/wikibus/alcaeus/commit/e465bc1))
* wrong predicate used for SupportedProperty#writable ([d293503](https://github.com/wikibus/alcaeus/commit/d293503))


### Build System

* **deps:** [security] bump tar from 2.2.1 to 2.2.2 ([6f0e265](https://github.com/wikibus/alcaeus/commit/6f0e265))



## [0.8.0](https://github.com/wikibus/alcaeus/compare/v0.7.1...v0.8.0) (2019-08-11)


### Bug Fixes

* literals should be converted to native values ([52877f0](https://github.com/wikibus/alcaeus/commit/52877f0))


### Build System

* **deps:** [security] bump extend from 3.0.0 to 3.0.2 ([de18658](https://github.com/wikibus/alcaeus/commit/de18658))
* **deps:** [security] bump fstream from 1.0.10 to 1.0.12 ([e5fbfd7](https://github.com/wikibus/alcaeus/commit/e5fbfd7))
* **deps:** [security] bump https-proxy-agent from 2.0.0 to 2.2.2 ([15c696c](https://github.com/wikibus/alcaeus/commit/15c696c))
* **deps:** [security] bump is-my-json-valid from 2.13.1 to 2.20.0 ([cf45e33](https://github.com/wikibus/alcaeus/commit/cf45e33))
* **deps:** [security] bump stringstream from 0.0.5 to 0.0.6 ([e2d65b4](https://github.com/wikibus/alcaeus/commit/e2d65b4))
* **deps:** [security] bump tough-cookie from 2.3.1 to 2.3.4 ([77e6662](https://github.com/wikibus/alcaeus/commit/77e6662))


### Features

* expose a target property on IOperation ([0cf8e56](https://github.com/wikibus/alcaeus/commit/0cf8e56))



### [0.7.1](https://github.com/wikibus/alcaeus/compare/v0.7.0...v0.7.1) (2019-08-05)


### Bug Fixes

* problem building upstream project with strict compilation ([189a47a](https://github.com/wikibus/alcaeus/commit/189a47a))


### Build System

* **deps:** [security] bump brace-expansion from 1.1.6 to 1.1.11 ([1f1b982](https://github.com/wikibus/alcaeus/commit/1f1b982))
* **deps:** [security] bump http-proxy-agent from 2.0.0 to 2.1.0 ([301999c](https://github.com/wikibus/alcaeus/commit/301999c))
* **deps:** [security] bump sshpk from 1.9.2 to 1.16.1 ([fc94742](https://github.com/wikibus/alcaeus/commit/fc94742))
* **deps:** [security] bump tar-fs from 1.15.3 to 1.16.3 ([f32dc2b](https://github.com/wikibus/alcaeus/commit/f32dc2b))



## [0.7.0](https://github.com/wikibus/alcaeus/compare/v0.6.3...v0.7.0) (2019-08-02)


### Bug Fixes

* canonical link selector should resolve relative links ([46f3fd2](https://github.com/wikibus/alcaeus/commit/46f3fd2))
* reverse links not calculated for multiple triple objects ([7678378](https://github.com/wikibus/alcaeus/commit/7678378))
* **typings:** missing return value of IOperation#invoke ([196e47f](https://github.com/wikibus/alcaeus/commit/196e47f))


### Features

* add a method to quickly load resources ([852f05c](https://github.com/wikibus/alcaeus/commit/852f05c)), closes [#55](https://github.com/wikibus/alcaeus/issues/55)
* added indexer signature and bunch of type guards ([121cffe](https://github.com/wikibus/alcaeus/commit/121cffe)), closes [#116](https://github.com/wikibus/alcaeus/issues/116)
* create a root selector for 201 response with location ([5f45323](https://github.com/wikibus/alcaeus/commit/5f45323))


### Tests

* missing tests to boost coverage ([c701b44](https://github.com/wikibus/alcaeus/commit/c701b44))
* test IriTemplateMapping properties ([c8caac6](https://github.com/wikibus/alcaeus/commit/c8caac6))



### [0.6.3](https://github.com/wikibus/alcaeus/compare/v0.6.2...v0.6.3) (2019-06-27)


### Bug Fixes

* **collections:** type views as IResource ([eb3f2f9](https://github.com/wikibus/alcaeus/commit/eb3f2f9)), closes [#83](https://github.com/wikibus/alcaeus/issues/83)

### Features

* **operations:** publicly expose underlying supported operation ([7ef5d35f](https://github.com/wikibus/alcaeus/commit/7ef5d35f))

### Build System

* added standard-version ([203bf34](https://github.com/wikibus/alcaeus/commit/203bf34))
* remove yarn from scripts ([5e33eff](https://github.com/wikibus/alcaeus/commit/5e33eff))
* use pretest script ([7832517](https://github.com/wikibus/alcaeus/commit/7832517))

### [0.6.2](https://github.com/wikibus/alcaeus/compare/v0.6.1...v0.6.2) (2019-05-23)

### Bug Fixes

* [Manages block calls unbound ApiDocumentation function](https://github.com/wikibus/Alcaeus/issues/77)
* [Manages missing form default mixins](https://github.com/wikibus/Alcaeus/issues/76)
* [Getting the vocabulary is inconvenient](https://github.com/wikibus/Alcaeus/issues/75)

### Features

* [Add getter to see if a resource is blank node](https://github.com/wikibus/Alcaeus/issues/74)

### [0.6.1](https://github.com/wikibus/alcaeus/compare/v0.6.0...v0.6.1) (2019-05-23)

### Bug Fixes

* [Properties are returned twice](https://github.com/wikibus/Alcaeus/issues/71)

### Documentation

* [Document supported properties](https://github.com/wikibus/Alcaeus/pull/73)

## [0.6.0](https://github.com/wikibus/alcaeus/compare/v0.5.3...v0.6.0) (2019-05-19)

### Features

* [Implement manages block](https://github.com/wikibus/Alcaeus/issues/51)
* [Add hydra:collection to resources](https://github.com/wikibus/Alcaeus/issues/63)
* [Find collections by manages block](https://github.com/wikibus/Alcaeus/issues/64)

### BREAKING CHANGES

* [Handle no docs gracefully](https://github.com/wikibus/Alcaeus/pull/59)
* [Remove embedded context](https://github.com/wikibus/Alcaeus/pull/70)

### [0.5.3](https://github.com/wikibus/alcaeus/compare/v0.5.2...v0.5.3) (2019-05-01)

### Bug Fixes

* [Relative Links to ApiDocumentation](https://github.com/wikibus/Alcaeus/issues/56)

### [0.5.2](https://github.com/wikibus/alcaeus/compare/v0.5.1...v0.5.2) (2019-05-01)

### Bug Fixes

* [Relative Links to ApiDocumentation](https://github.com/wikibus/Alcaeus/issues/56)

### [0.5.1](https://github.com/wikibus/alcaeus/compare/v0.5.0...v0.5.1) (2019-04-09)

### Bug Fixes

* [Invoked operation is not sending the body](https://github.com/wikibus/Alcaeus/issues/52)

## [0.5.0](https://github.com/wikibus/alcaeus/compare/v0.4.6...v0.5.0) (2019-03-26)

### Bug Fixes

* [Missing flag to check if property is a link](https://github.com/wikibus/Alcaeus/issues/48)

### Chores

* [update old rdf-ext packages to latest from @rdfjs](https://github.com/wikibus/Alcaeus/pull/50)

## [0.4.6](https://github.com/wikibus/alcaeus/compare/v0.4.5...v0.4.6) (2019-02-17)

### Bug Fixes

* [Core decorators are missing as dependency](https://github.com/wikibus/Alcaeus/issues/46)

### [0.4.5](https://github.com/wikibus/alcaeus/compare/v0.4.4...v0.4.5) (2019-01-24)

### Bug Fixes

* [Do not fetch ApiDocumentation in absence of link](https://github.com/wikibus/Alcaeus/issues/23)
* [ExactMatchIdSelector behaves differently from Graph.root](https://github.com/wikibus/Alcaeus/issues/42)
* [Operations not getting properly initialised](https://github.com/wikibus/Alcaeus/issues/43)

### [0.4.4](https://github.com/wikibus/alcaeus/compare/v0.4.3...v0.4.4) (2019-12-13)

### Bug Fixes

* [Fix typing of loadResource](https://github.com/wikibus/Alcaeus/pull/40)

### Chores

* [correct typing](https://github.com/wikibus/Alcaeus/pull/41)

### Features

* [Node-friendly package](https://github.com/wikibus/Alcaeus/pull/39)

### [0.4.3](https://github.com/wikibus/alcaeus/compare/v0.4.2...v0.4.3) (2018-10-30)

### Bug Fixes

* [Invalid handling spaces](https://github.com/wikibus/Alcaeus/pull/36)
* [Inconsistent handling of URI escaping](https://github.com/wikibus/Alcaeus/issues/35)

### Build System

* [Publishing not only bundled version](https://github.com/wikibus/Alcaeus/pull/37)

### [0.4.2](https://github.com/wikibus/alcaeus/compare/v0.4.1...v0.4.2) (2018-07-21)

### Chores

* fix declaration generation and packaging ([1ba5c7c](https://github.com/wikibus/Alcaeus/commit/1ba5c7ca339ed2677d9b223d61d16c3b5e62a7cf))

### [0.4.1](https://github.com/wikibus/alcaeus/compare/v0.4.0...v0.4.1) (2018-06-19)

### Bug Fixes

* handle bool fals in _get ([7743c50](https://github.com/wikibus/Alcaeus/commit/7743c501325bf92304865f9467a0c6248fe963b8))

### Build System

* transpile with typings ([5b68b6c](https://github.com/wikibus/Alcaeus/commit/5b68b6c01597824178d6548d3518efec62976836)), closes [#31](https://github.com/wikibus/Alcaeus/pull/31)

## [0.4.0](https://github.com/wikibus/alcaeus/compare/v0.3.0-a1...v0.4.0) (2018-06-17)

Too much to manually back fill. 

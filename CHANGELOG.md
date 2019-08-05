# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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

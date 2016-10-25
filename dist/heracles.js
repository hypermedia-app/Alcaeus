!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1","2"], ["4","7","8","9","a","b"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('3', ['4', '7', '8', '5', '9', 'a', 'b', '6'], true, function ($__require, exports, module) {
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var li = $__require('4');
    var _ = $__require('7');
    var jsonld_1 = $__require('8');
    var Constants = $__require('5');
    var $rdf = $__require('9');
    var formats = $__require('a');
    var JsonLdSerializer = $__require('b');
    var Vocabs_1 = $__require('6');
    formats($rdf);
    var FetchUtil = function () {
        function FetchUtil() {}
        FetchUtil.fetchResource = function (uri) {
            return window.fetch(uri, {
                headers: {
                    accept: FetchUtil._requestAcceptHeaders
                }
            }).then(rejectNotFoundStatus).then(function (res) {
                var apiDocsUri = getDocumentationUri(res);
                return getFlattendGraph(res).then(function (obj) {
                    return new ExpandedWithDocs(obj, apiDocsUri);
                });
            }, function () {
                return null;
            });
        };
        FetchUtil.invokeOperation = function (method, uri, body, mediaType) {
            if (mediaType === void 0) {
                mediaType = Constants.MediaTypes.jsonLd;
            }
            return window.fetch(uri, {
                method: method,
                headers: {
                    'Content-Type': mediaType,
                    Accept: FetchUtil._requestAcceptHeaders
                }
            }).then(rejectNotFoundStatus).then(function (res) {
                var apiDocsUri = getDocumentationUri(res);
                return getFlattendGraph(res).then(function (obj) {
                    return new ExpandedWithDocs(obj, apiDocsUri);
                });
            }, function () {
                return null;
            });
        };
        FetchUtil._requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads;
        FetchUtil._propertyRangeMappings = [[Constants.Core.Vocab.supportedClass, Constants.Core.Vocab.Class], [Constants.Core.Vocab.expects, Constants.Core.Vocab.Class], [Constants.Core.Vocab.returns, Constants.Core.Vocab.Class], [Constants.Core.Vocab.supportedOperation, Constants.Core.Vocab.Operation], [Constants.Core.Vocab.operation, Constants.Core.Vocab.Operation], [Constants.Core.Vocab.supportedProperty, Constants.Core.Vocab.SupportedProperty], [Constants.Core.Vocab.statusCodes, Constants.Core.Vocab.StatusCodeDescription], [Constants.Core.Vocab.property, Vocabs_1.rdf.Property], [Constants.Core.Vocab.mapping, Constants.Core.Vocab.IriTemplateMapping]];
        return FetchUtil;
    }();
    exports.FetchUtil = FetchUtil;
    function rejectNotFoundStatus(res) {
        if (res.status === 404) {
            return Promise.reject(null);
        }
        return Promise.resolve(res);
    }
    function getDocumentationUri(res) {
        if (res.headers.has(Constants.Headers.Link)) {
            var linkHeaders = res.headers.get(Constants.Headers.Link);
            var links = li.parse(linkHeaders);
            return links[Constants.Core.Vocab.apiDocumentation];
        }
        return null;
    }
    var ExpandedWithDocs = function () {
        function ExpandedWithDocs(resources, apiDocumentationLink) {
            this.resources = resources;
            this.apiDocumentationLink = apiDocumentationLink;
        }
        return ExpandedWithDocs;
    }();
    var FetchError = function (_super) {
        __extends(FetchError, _super);
        function FetchError(response) {
            _super.call(this, 'Request failed');
            this._response = response;
        }
        Object.defineProperty(FetchError.prototype, "response", {
            get: function () {
                return this._response;
            },
            enumerable: true,
            configurable: true
        });
        return FetchError;
    }(Error);
    function getFlattendGraph(res) {
        var mediaType = res.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd;
        if (res.ok === false) {
            return Promise.reject(new FetchError(res));
        }
        return res.text().then(function (jsonld) {
            return $rdf.parsers.parse(mediaType, jsonld, null, res.url);
        }).then(runInference).then(function (graph) {
            return JsonLdSerializer.serialize(graph);
        }).then(flatten(res.url));
    }
    function runInference(graph) {
        _.map(FetchUtil._propertyRangeMappings, function (mapping) {
            var matches = graph.match(null, mapping[0], null, null);
            _.forEach(matches.toArray(), function (triple) {
                graph.add(new $rdf.Triple(triple.object, new $rdf.NamedNode(Vocabs_1.rdf.type), new $rdf.NamedNode(mapping[1])));
            });
        });
        return graph;
    }
    function flatten(url) {
        return function (json) {
            var opts = {};
            if (url) {
                opts.base = url;
            }
            return jsonld_1.promises.expand(json, opts).then(function (expanded) {
                return jsonld_1.promises.flatten(expanded, {});
            }).then(function (flattened) {
                return flattened[Constants.JsonLd.Graph];
            });
        };
    }
    

    return module.exports;
});
$__System.registerDynamic('6', [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var Schema;
    (function (Schema) {
        Schema.ns = 'http://schema.org/';
        Schema.description = Schema.ns + 'description';
        Schema.title = Schema.ns + 'title';
    })(Schema = exports.Schema || (exports.Schema = {}));
    var rdfs;
    (function (rdfs) {
        rdfs.ns = 'http://www.w3.org/2000/01/rdf-schema#';
        rdfs.comment = rdfs.ns + 'comment';
        rdfs.label = rdfs.ns + 'label';
        rdfs.range = rdfs.ns + 'range';
        rdfs.domain = rdfs.ns + 'domain';
    })(rdfs = exports.rdfs || (exports.rdfs = {}));
    var owl;
    (function (owl) {
        owl.ns = 'http://www.w3.org/2002/07/owl#';
        owl.Nothing = 'http://www.w3.org/2002/07/owl#';
    })(owl = exports.owl || (exports.owl = {}));
    var rdf;
    (function (rdf) {
        rdf.ns = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
        rdf.Property = rdf.ns + 'Property';
        rdf.type = rdf.ns + 'type';
    })(rdf = exports.rdf || (exports.rdf = {}));
    var xsd;
    (function (xsd) {
        xsd.ns = 'http://www.w3.org/2001/XMLSchema#';
        xsd.string = xsd.ns + 'string';
        xsd.integer = xsd.ns + 'integer';
    })(xsd = exports.xsd || (exports.xsd = {}));
    

    return module.exports;
});
$__System.registerDynamic("c", ["7", "5", "6", "d", "e", "f"], true, function ($__require, exports, module) {
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var _ = $__require("7");
    var Constants_1 = $__require("5");
    var Vocabs_1 = $__require("6");
    var Resources_1 = $__require("d");
    var nonenumerable_1 = $__require("e");
    var WeakMap = $__require("f");
    var heraclesWeakMap = new WeakMap();
    var ApiDocumentation = function (_super) {
        __extends(ApiDocumentation, _super);
        function ApiDocumentation(heracles, apiDoc) {
            _super.call(this, apiDoc);
            heraclesWeakMap.set(this, heracles);
        }
        Object.defineProperty(ApiDocumentation.prototype, "classes", {
            get: function () {
                if (Array.isArray(this[Constants_1.Core.Vocab.supportedClass])) {
                    return this[Constants_1.Core.Vocab.supportedClass];
                }
                return [this[Constants_1.Core.Vocab.supportedClass]];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ApiDocumentation.prototype, "_heracles", {
            get: function () {
                return heraclesWeakMap.get(this);
            },
            enumerable: true,
            configurable: true
        });
        ApiDocumentation.prototype.getOperations = function (classUri, predicateUri) {
            var clas = this.getClass(classUri);
            if (!clas) {
                return [];
            }
            if (!predicateUri) {
                return clas.supportedOperations;
            }
            var supportedProperty = _.find(clas.supportedProperties, function (prop) {
                return prop.property && prop.property.id === predicateUri;
            });
            if (!supportedProperty) {
                return [];
            }
            return supportedProperty.property.supportedOperations;
        };
        ApiDocumentation.prototype.getProperties = function (classUri) {
            var clas = this.getClass(classUri);
            if (!clas) {
                return [];
            }
            return clas.supportedProperties;
        };
        ApiDocumentation.prototype.getClass = function (classId) {
            return _.find(this.classes, [Constants_1.JsonLd.Id, classId]) || null;
        };
        ApiDocumentation.prototype.getEntrypoint = function () {
            return this._heracles.loadResource(this[Constants_1.Core.Vocab.entrypoint][Constants_1.JsonLd.Id]);
        };
        __decorate([nonenumerable_1.default, __metadata('design:type', Object)], ApiDocumentation.prototype, "_heracles", null);
        return ApiDocumentation;
    }(Resources_1.Resource);
    exports.ApiDocumentation = ApiDocumentation;
    var DocumentedResource = function (_super) {
        __extends(DocumentedResource, _super);
        function DocumentedResource(hydraResource) {
            _super.call(this, hydraResource);
        }
        Object.defineProperty(DocumentedResource.prototype, "description", {
            get: function () {
                return this[Constants_1.Core.Vocab.description] || this[Vocabs_1.rdfs.comment] || this[Vocabs_1.Schema.description];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentedResource.prototype, "title", {
            get: function () {
                return this[Constants_1.Core.Vocab.title] || this[Vocabs_1.rdfs.label] || this[Vocabs_1.Schema.title];
            },
            enumerable: true,
            configurable: true
        });
        return DocumentedResource;
    }(Resources_1.Resource);
    exports.DocumentedResource = DocumentedResource;
    var SupportedOperation = function (_super) {
        __extends(SupportedOperation, _super);
        function SupportedOperation(hydraOperation, heracles) {
            _super.call(this, hydraOperation);
            heraclesWeakMap.set(this, heracles);
        }
        Object.defineProperty(SupportedOperation.prototype, "method", {
            get: function () {
                return this[Constants_1.Core.Vocab.method];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SupportedOperation.prototype, "expects", {
            get: function () {
                return this[Constants_1.Core.Vocab.expects];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SupportedOperation.prototype, "returns", {
            get: function () {
                return this[Constants_1.Core.Vocab.returns];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SupportedOperation.prototype, "requiresInput", {
            get: function () {
                var method = this.method || '';
                var methodExpectsBody = method.toUpperCase() !== 'GET' && this.method.toUpperCase() !== 'DELETE';
                var operationExpectsBody = !!this.expects && this.expects.id !== Vocabs_1.owl.Nothing;
                return methodExpectsBody || operationExpectsBody;
            },
            enumerable: true,
            configurable: true
        });
        return SupportedOperation;
    }(DocumentedResource);
    exports.SupportedOperation = SupportedOperation;
    var SupportedProperty = function (_super) {
        __extends(SupportedProperty, _super);
        function SupportedProperty(hydraSupportedProperty) {
            _super.call(this, hydraSupportedProperty);
        }
        Object.defineProperty(SupportedProperty.prototype, "readable", {
            get: function () {
                if (typeof this[Constants_1.Core.Vocab.readable] === 'boolean') {
                    return this[Constants_1.Core.Vocab.readable];
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SupportedProperty.prototype, "writable", {
            get: function () {
                if (typeof this[Constants_1.Core.Vocab.writable] === 'boolean') {
                    return this[Constants_1.Core.Vocab.writable];
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SupportedProperty.prototype, "required", {
            get: function () {
                if (typeof this[Constants_1.Core.Vocab.required] === 'boolean') {
                    return this[Constants_1.Core.Vocab.required];
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SupportedProperty.prototype, "property", {
            get: function () {
                return this[Constants_1.Core.Vocab.property];
            },
            enumerable: true,
            configurable: true
        });
        return SupportedProperty;
    }(DocumentedResource);
    exports.SupportedProperty = SupportedProperty;
    var Class = function (_super) {
        __extends(Class, _super);
        function Class(hydraClass) {
            _super.call(this, hydraClass);
        }
        Object.defineProperty(Class.prototype, "supportedOperations", {
            get: function () {
                var operations = this[Constants_1.Core.Vocab.supportedOperation];
                if (typeof operations === 'undefined' || operations === null) {
                    return [];
                }
                if (Array.isArray(operations)) {
                    return this[Constants_1.Core.Vocab.supportedOperation];
                }
                return [operations];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Class.prototype, "supportedProperties", {
            get: function () {
                var properties = this[Constants_1.Core.Vocab.supportedProperty];
                if (typeof properties === 'undefined' || properties === null) {
                    return [];
                }
                if (Array.isArray(properties)) {
                    return properties;
                }
                return [properties];
            },
            enumerable: true,
            configurable: true
        });
        return Class;
    }(DocumentedResource);
    exports.Class = Class;
    var StatusCodeDescription = function (_super) {
        __extends(StatusCodeDescription, _super);
        function StatusCodeDescription() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(StatusCodeDescription.prototype, "code", {
            get: function () {
                return this[Constants_1.Core.Vocab.code];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatusCodeDescription.prototype, "description", {
            get: function () {
                return this[Constants_1.Core.Vocab.description] || '';
            },
            enumerable: true,
            configurable: true
        });
        return StatusCodeDescription;
    }(Resources_1.Resource);
    exports.StatusCodeDescription = StatusCodeDescription;
    var RdfProperty = function (_super) {
        __extends(RdfProperty, _super);
        function RdfProperty() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(RdfProperty.prototype, "range", {
            get: function () {
                return this[Vocabs_1.rdfs.range];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RdfProperty.prototype, "domain", {
            get: function () {
                return this[Vocabs_1.rdfs.domain];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RdfProperty.prototype, "supportedOperations", {
            get: function () {
                var value = this[Constants_1.Core.Vocab.supportedOperation];
                if (typeof value === 'undefined') {
                    return [];
                }
                if (Array.isArray(value) === false) {
                    return [value];
                }
                return this[Constants_1.Core.Vocab.supportedOperation];
            },
            enumerable: true,
            configurable: true
        });
        return RdfProperty;
    }(DocumentedResource);
    exports.RdfProperty = RdfProperty;
    

    return module.exports;
});
$__System.registerDynamic('10', [], true, function ($__require, exports, module) {
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var JsonLdUtil = function () {
        function JsonLdUtil() {}
        JsonLdUtil.idsEqual = function (id1, id2) {
            return JsonLdUtil.trimTrailingSlash(id1) === JsonLdUtil.trimTrailingSlash(id2);
        };
        JsonLdUtil.trimTrailingSlash = function (uri) {
            if (!uri || !uri.replace) {
                return null;
            }
            // todo: is this really correct to ignore trailing slash?
            return uri.replace(/\/$/, '');
        };
        return JsonLdUtil;
    }();
    exports.JsonLdUtil = JsonLdUtil;
    

    return module.exports;
});
$__System.registerDynamic('11', ['7', '6', 'd', 'c', '5', '10'], true, function ($__require, exports, module) {
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var _ = $__require('7');
    var Vocabs_1 = $__require('6');
    var Types = $__require('d');
    var DocTypes = $__require('c');
    var Constants_1 = $__require('5');
    var JsonLdUtil_1 = $__require('10');
    var ResourceFactory = function () {
        function ResourceFactory() {
            this.factories = {};
            setUpDefaultFactories.call(this);
        }
        ResourceFactory.prototype.createResource = function (heracles, obj, apiDocumentation, resources, typeOverride) {
            var incomingLinks = findIncomingLinks(obj, resources);
            var factory = this.factories[typeOverride || obj[Constants_1.JsonLd.Type]];
            if (!factory && Array.isArray(obj[Constants_1.JsonLd.Type])) {
                for (var i = 0; i < obj[Constants_1.JsonLd.Type].length; i++) {
                    factory = this.factories[obj[Constants_1.JsonLd.Type][i]];
                    if (factory) {
                        break;
                    }
                }
            }
            if (factory) {
                return factory.call(this, heracles, obj, apiDocumentation, incomingLinks);
            }
            return new Types.HydraResource(heracles, obj, apiDocumentation, incomingLinks);
        };
        return ResourceFactory;
    }();
    exports.ResourceFactory = ResourceFactory;
    var IncomingLink = function () {
        function IncomingLink(id, predicate, resources) {
            this._id = id;
            this._predicate = predicate;
            Object.defineProperty(this, 'subject', {
                get: function () {
                    return resources[id];
                }
            });
        }
        Object.defineProperty(IncomingLink.prototype, "subjectId", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IncomingLink.prototype, "predicate", {
            get: function () {
                return this._predicate;
            },
            enumerable: true,
            configurable: true
        });
        return IncomingLink;
    }();
    function findIncomingLinks(object, resources) {
        return _.transform(resources, function (acc, res, key) {
            _.forOwn(res, function (value, predicate) {
                if (value && value[Constants_1.JsonLd.Id] && JsonLdUtil_1.JsonLdUtil.idsEqual(value[Constants_1.JsonLd.Id], object[Constants_1.JsonLd.Id])) {
                    acc.push(new IncomingLink(key, predicate, resources));
                }
            });
        }, []);
    }
    function setUpDefaultFactories() {
        this.factories[Constants_1.Core.Vocab.ApiDocumentation] = createApiDocumentation;
        this.factories[Constants_1.Core.Vocab.PartialCollectionView] = createPartialCollectionView;
        this.factories[Constants_1.Core.Vocab.Class] = createClass;
        this.factories[Constants_1.Core.Vocab.SupportedProperty] = createSupportedProperty;
        this.factories[Constants_1.Core.Vocab.Operation] = createOperation;
        this.factories[Constants_1.Core.Vocab.StatusCodeDescription] = createStatusCodeDescription;
        this.factories[Vocabs_1.rdf.Property] = createRdfProperty;
    }
    function createRdfProperty(heracles, obj) {
        return new DocTypes.RdfProperty(obj);
    }
    function createApiDocumentation(heracles, obj) {
        return new DocTypes.ApiDocumentation(heracles, obj);
    }
    function createPartialCollectionView(heracles, obj, apiDocumentation, incomingLinks) {
        return new Types.PartialCollectionView(heracles, obj, apiDocumentation, incomingLinks);
    }
    function createClass(heracles, obj) {
        return new DocTypes.Class(obj);
    }
    function createSupportedProperty(heracles, obj) {
        return new DocTypes.SupportedProperty(obj);
    }
    function createOperation(heracles, obj) {
        return new DocTypes.SupportedOperation(obj, heracles);
    }
    function createStatusCodeDescription(heracles, obj) {
        return new DocTypes.StatusCodeDescription(obj);
    }
    

    return module.exports;
});
$__System.registerDynamic('2', ['12'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, '__esModule', { value: true });
  exports['default'] = lazyInitialize;
  var _privateUtils = $__require('12');
  function handleDescriptor(target, key, descriptor) {
    var configurable = descriptor.configurable;
    var enumerable = descriptor.enumerable;
    var initializer = descriptor.initializer;
    var value = descriptor.value;
    return {
      configurable: configurable,
      enumerable: enumerable,
      get: function get() {
        if (this === target) {
          return;
        }
        var ret = initializer ? initializer.call(this) : value;
        Object.defineProperty(this, key, {
          configurable: configurable,
          enumerable: enumerable,
          writable: true,
          value: ret
        });
        return ret;
      },
      set: (0, _privateUtils.createDefaultSetter)(key)
    };
  }
  function lazyInitialize() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (0, _privateUtils.decorate)(handleDescriptor, args);
  }
  module.exports = exports['default'];
  return module.exports;
});
$__System.registerDynamic('12', ['2'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, '__esModule', { value: true });
  var _slice = Array.prototype.slice;
  var _createDecoratedClass = function () {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor || descriptor.initializer) descriptor.writable = true;
        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];
            if (typeof decorator === 'function') {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);
            }
          }
          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }
        Object.defineProperty(target, key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  }();
  exports.isDescriptor = isDescriptor;
  exports.decorate = decorate;
  exports.metaFor = metaFor;
  exports.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
  exports.createDefaultSetter = createDefaultSetter;
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _defineDecoratedPropertyDescriptor(target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor) return;
    var descriptor = {};
    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];
    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  }
  var _lazyInitialize = $__require('2');
  var _lazyInitialize2 = _interopRequireDefault(_lazyInitialize);
  var defineProperty = Object.defineProperty;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  function isDescriptor(desc) {
    if (!desc || !desc.hasOwnProperty) {
      return false;
    }
    var keys = ['value', 'initializer', 'get', 'set'];
    for (var i = 0, l = keys.length; i < l; i++) {
      if (desc.hasOwnProperty(keys[i])) {
        return true;
      }
    }
    return false;
  }
  function decorate(handleDescriptor, entryArgs) {
    if (isDescriptor(entryArgs[entryArgs.length - 1])) {
      return handleDescriptor.apply(undefined, _toConsumableArray(entryArgs).concat([[]]));
    } else {
      return function () {
        return handleDescriptor.apply(undefined, _slice.call(arguments).concat([entryArgs]));
      };
    }
  }
  var Meta = function () {
    var _instanceInitializers = {};
    function Meta() {
      _classCallCheck(this, Meta);
      _defineDecoratedPropertyDescriptor(this, 'debounceTimeoutIds', _instanceInitializers);
      _defineDecoratedPropertyDescriptor(this, 'throttleTimeoutIds', _instanceInitializers);
      _defineDecoratedPropertyDescriptor(this, 'throttlePreviousTimestamps', _instanceInitializers);
    }
    _createDecoratedClass(Meta, [{
      key: 'debounceTimeoutIds',
      decorators: [_lazyInitialize2['default']],
      initializer: function initializer() {
        return {};
      },
      enumerable: true
    }, {
      key: 'throttleTimeoutIds',
      decorators: [_lazyInitialize2['default']],
      initializer: function initializer() {
        return {};
      },
      enumerable: true
    }, {
      key: 'throttlePreviousTimestamps',
      decorators: [_lazyInitialize2['default']],
      initializer: function initializer() {
        return {};
      },
      enumerable: true
    }], null, _instanceInitializers);
    return Meta;
  }();
  var META_KEY = typeof Symbol === 'function' ? Symbol('__core_decorators__') : '__core_decorators__';
  function metaFor(obj) {
    if (obj.hasOwnProperty(META_KEY) === false) {
      defineProperty(obj, META_KEY, { value: new Meta() });
    }
    return obj[META_KEY];
  }
  var getOwnKeys = getOwnPropertySymbols ? function (object) {
    return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
  } : getOwnPropertyNames;
  function getOwnPropertyDescriptors(obj) {
    var descs = {};
    getOwnKeys(obj).forEach(function (key) {
      return descs[key] = getOwnPropertyDescriptor(obj, key);
    });
    return descs;
  }
  function createDefaultSetter(key) {
    return function set(newValue) {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: newValue
      });
      return newValue;
    };
  }
  return module.exports;
});
$__System.registerDynamic('e', ['12'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, '__esModule', { value: true });
  exports['default'] = nonenumerable;
  var _privateUtils = $__require('12');
  function handleDescriptor(target, key, descriptor) {
    descriptor.enumerable = false;
    return descriptor;
  }
  function nonenumerable() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (0, _privateUtils.decorate)(handleDescriptor, args);
  }
  module.exports = exports['default'];
  return module.exports;
});
$__System.registerDynamic("5", [], true, function ($__require, exports, module) {
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var Core;
    (function (Core) {
        Core.Context = {
            "hydra": "http://www.w3.org/ns/hydra/core#",
            "apiDocumentation": "hydra:apiDocumentation",
            "ApiDocumentation": "hydra:ApiDocumentation",
            "title": "hydra:title",
            "description": "hydra:description",
            "entrypoint": { "@id": "hydra:entrypoint", "@type": "@id" },
            "supportedClass": { "@id": "hydra:supportedClass", "@type": "@vocab" },
            "Class": "hydra:Class",
            "supportedProperty": { "@id": "hydra:supportedProperty", "@type": "@id" },
            "SupportedProperty": "hydra:SupportedProperty",
            "property": { "@id": "hydra:property", "@type": "@vocab" },
            "required": "hydra:required",
            "readonly": "hydra:readonly",
            "writeonly": "hydra:writeonly",
            "supportedOperation": { "@id": "hydra:supportedOperation", "@type": "@id" },
            "Operation": "hydra:SupportedOperation",
            "CreateResourceOperation": "hydra:CreateResourceOperation",
            "ReplaceResourceOperation": "hydra:ReplaceResourceOperation",
            "DeleteResourceOperation": "hydra:DeleteResourceOperation",
            "method": "hydra:method",
            "expects": { "@id": "hydra:expects", "@type": "@vocab" },
            "returns": { "@id": "hydra:returns", "@type": "@vocab" },
            "statusCodes": { "@id": "hydra:statusCodes", "@type": "@id" },
            "StatusCodeDescription": "hydra:StatusCodeDescription",
            "statusCode": "hydra:statusCode",
            "Error": "hydra:Error",
            "Resource": "hydra:Resource",
            "operation": "hydra:operation",
            "Collection": "hydra:Collection",
            "member": { "@id": "hydra:member", "@type": "@id" },
            "search": "hydra:search",
            "freetextQuery": "hydra:freetextQuery",
            "PagedCollection": "hydra:PagedCollection",
            "totalItems": "hydra:totalItems",
            "itemsPerPage": "hydra:itemsPerPage",
            "firstPage": { "@id": "hydra:firstPage", "@type": "@id" },
            "lastPage": { "@id": "hydra:lastPage", "@type": "@id" },
            "nextPage": { "@id": "hydra:nextPage", "@type": "@id" },
            "previousPage": { "@id": "hydra:previousPage", "@type": "@id" },
            "Link": "hydra:Link",
            "TemplatedLink": "hydra:TemplatedLink",
            "IriTemplate": "hydra:IriTemplate",
            "template": "hydra:template",
            "mapping": "hydra:mapping",
            "IriTemplateMapping": "hydra:IriTemplateMapping",
            "variable": "hydra:variable"
        };
        Core.Vocab = {
            apiDocumentation: Core.Context['hydra'] + 'apiDocumentation',
            ApiDocumentation: Core.Context['hydra'] + 'ApiDocumentation',
            title: Core.Context['hydra'] + 'title',
            description: Core.Context['hydra'] + 'description',
            method: Core.Context['hydra'] + 'method',
            Class: Core.Context['hydra'] + 'Class',
            member: Core.Context['hydra'] + 'member',
            PartialCollectionView: Core.Context['hydra'] + 'PartialCollectionView',
            view: Core.Context['hydra'] + 'view',
            first: Core.Context['hydra'] + 'first',
            next: Core.Context['hydra'] + 'next',
            last: Core.Context['hydra'] + 'last',
            previous: Core.Context['hydra'] + 'previous',
            entrypoint: Core.Context['hydra'] + 'entrypoint',
            SupportedProperty: Core.Context['hydra'] + 'SupportedProperty',
            supportedProperty: Core.Context['hydra'] + 'supportedProperty',
            Operation: Core.Context['hydra'] + 'SupportedOperation',
            supportedClass: Core.Context['hydra'] + 'supportedClass',
            supportedOperation: Core.Context['hydra'] + 'supportedOperation',
            expects: Core.Context['hydra'] + 'expects',
            returns: Core.Context['hydra'] + 'returns',
            readable: Core.Context['hydra'] + 'readable',
            writable: Core.Context['hydra'] + 'writable',
            required: Core.Context['hydra'] + 'required',
            property: Core.Context['hydra'] + 'property',
            statusCodes: Core.Context['hydra'] + 'statusCodes',
            operation: Core.Context['hydra'] + 'operation',
            mapping: Core.Context['hydra'] + 'mapping',
            StatusCodeDescription: Core.Context['hydra'] + 'StatusCodeDescription',
            IriTemplateMapping: Core.Context['hydra'] + 'IriTemplateMapping',
            code: Core.Context['hydra'] + 'code'
        };
    })(Core = exports.Core || (exports.Core = {}));
    var JsonLd;
    (function (JsonLd) {
        JsonLd.Graph = '@graph';
        JsonLd.Context = '@context';
        JsonLd.Id = '@id';
        JsonLd.Value = '@value';
        JsonLd.Type = '@type';
    })(JsonLd = exports.JsonLd || (exports.JsonLd = {}));
    var MediaTypes;
    (function (MediaTypes) {
        MediaTypes.jsonLd = 'application/ld+json';
        MediaTypes.ntriples = 'application/n-triples';
        MediaTypes.nquads = 'application/n-quads';
    })(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
    var Headers;
    (function (Headers) {
        Headers.Link = 'Link';
        Headers.ContentType = 'Content-Type';
    })(Headers = exports.Headers || (exports.Headers = {}));
    

    return module.exports;
});
$__System.registerDynamic('13', ['14', '15', '16'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  var classof = $__require('14'),
      test = {};
  test[$__require('15')('toStringTag')] = 'z';
  if (test + '' != '[object z]') {
    $__require('16')(Object.prototype, 'toString', function toString() {
      return '[object ' + classof(this) + ']';
    }, true);
  }
  return module.exports;
});
$__System.registerDynamic('17', ['15', '18'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var UNSCOPABLES = $__require('15')('unscopables'),
      ArrayProto = Array.prototype;
  if (ArrayProto[UNSCOPABLES] == undefined) $__require('18')(ArrayProto, UNSCOPABLES, {});
  module.exports = function (key) {
    ArrayProto[UNSCOPABLES][key] = true;
  };
  return module.exports;
});
$__System.registerDynamic("19", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (done, value) {
    return { value: value, done: !!done };
  };
  return module.exports;
});
$__System.registerDynamic("1a", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = false;
  return module.exports;
});
$__System.registerDynamic('1b', ['1c', '1d', '1e', '1f'], true, function ($__require, exports, module) {
    var define,
        global = this || self,
        GLOBAL = global;
    /* */
    var dP = $__require('1c'),
        anObject = $__require('1d'),
        getKeys = $__require('1e');
    module.exports = $__require('1f') ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = getKeys(Properties),
            length = keys.length,
            i = 0,
            P;
        while (length > i) dP.f(O, P = keys[i++], Properties[P]);
        return O;
    };
    return module.exports;
});
$__System.registerDynamic('20', ['21'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = $__require('21').document && document.documentElement;
  return module.exports;
});
$__System.registerDynamic('22', ['1d', '1b', '23', '24', '25', '20'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var anObject = $__require('1d'),
      dPs = $__require('1b'),
      enumBugKeys = $__require('23'),
      IE_PROTO = $__require('24')('IE_PROTO'),
      Empty = function () {},
      PROTOTYPE = 'prototype';
  var createDict = function () {
    var iframe = $__require('25')('iframe'),
        i = enumBugKeys.length,
        gt = '>',
        iframeDocument;
    iframe.style.display = 'none';
    $__require('20').appendChild(iframe);
    iframe.src = 'javascript:';
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write('<script>document.F=Object</script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
    return createDict();
  };
  module.exports = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : dPs(result, Properties);
  };
  return module.exports;
});
$__System.registerDynamic('26', ['22', '27', '28', '18', '15'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  var create = $__require('22'),
      descriptor = $__require('27'),
      setToStringTag = $__require('28'),
      IteratorPrototype = {};
  $__require('18')(IteratorPrototype, $__require('15')('iterator'), function () {
    return this;
  });
  module.exports = function (Constructor, NAME, next) {
    Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
    setToStringTag(Constructor, NAME + ' Iterator');
  };
  return module.exports;
});
$__System.registerDynamic('29', ['2a', '2b', '24'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var has = $__require('2a'),
      toObject = $__require('2b'),
      IE_PROTO = $__require('24')('IE_PROTO'),
      ObjectProto = Object.prototype;
  module.exports = Object.getPrototypeOf || function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    }
    return O instanceof Object ? ObjectProto : null;
  };
  return module.exports;
});
$__System.registerDynamic('2c', ['1a', '2d', '16', '18', '2a', '2e', '26', '28', '29', '15'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  var LIBRARY = $__require('1a'),
      $export = $__require('2d'),
      redefine = $__require('16'),
      hide = $__require('18'),
      has = $__require('2a'),
      Iterators = $__require('2e'),
      $iterCreate = $__require('26'),
      setToStringTag = $__require('28'),
      getPrototypeOf = $__require('29'),
      ITERATOR = $__require('15')('iterator'),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function () {
    return this;
  };
  module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        DEF_VALUES = DEFAULT == VALUES,
        VALUES_BUG = false,
        proto = Base.prototype,
        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        $default = $native || getMethod(DEFAULT),
        $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
        $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
        methods,
        key,
        IteratorPrototype;
    if ($anyNative) {
      IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype) {
        setToStringTag(IteratorPrototype, TAG, true);
        if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() {
        return $native.call(this);
      };
    }
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) redefine(proto, key, methods[key]);
      } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };
  return module.exports;
});
$__System.registerDynamic('2f', ['17', '19', '2e', '30', '2c'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  var addToUnscopables = $__require('17'),
      step = $__require('19'),
      Iterators = $__require('2e'),
      toIObject = $__require('30');
  module.exports = $__require('2c')(Array, 'Array', function (iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
  }, function () {
    var O = this._t,
        kind = this._k,
        index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys') return step(0, index);
    if (kind == 'values') return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');
  return module.exports;
});
$__System.registerDynamic('31', ['32'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var toInteger = $__require('32'),
      max = Math.max,
      min = Math.min;
  module.exports = function (index, length) {
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  };
  return module.exports;
});
$__System.registerDynamic('33', ['30', '34', '31'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var toIObject = $__require('30'),
      toLength = $__require('34'),
      toIndex = $__require('31');
  module.exports = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIObject($this),
          length = toLength(O.length),
          index = toIndex(fromIndex, length),
          value;
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        if (value != value) return true;
      } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };
  return module.exports;
});
$__System.registerDynamic('24', ['35', '36'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var shared = $__require('35')('keys'),
      uid = $__require('36');
  module.exports = function (key) {
    return shared[key] || (shared[key] = uid(key));
  };
  return module.exports;
});
$__System.registerDynamic('37', ['2a', '30', '33', '24'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var has = $__require('2a'),
      toIObject = $__require('30'),
      arrayIndexOf = $__require('33')(false),
      IE_PROTO = $__require('24')('IE_PROTO');
  module.exports = function (object, names) {
    var O = toIObject(object),
        i = 0,
        result = [],
        key;
    for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
    while (names.length > i) if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };
  return module.exports;
});
$__System.registerDynamic('23', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  // IE 8- don't enum bug keys
  module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
  return module.exports;
});
$__System.registerDynamic('1e', ['37', '23'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $keys = $__require('37'),
      enumBugKeys = $__require('23');
  module.exports = Object.keys || function keys(O) {
    return $keys(O, enumBugKeys);
  };
  return module.exports;
});
$__System.registerDynamic("38", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  exports.f = Object.getOwnPropertySymbols;
  return module.exports;
});
$__System.registerDynamic('39', ['1e', '38', '3a', '2b', '3b', '3c'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  var getKeys = $__require('1e'),
      gOPS = $__require('38'),
      pIE = $__require('3a'),
      toObject = $__require('2b'),
      IObject = $__require('3b'),
      $assign = Object.assign;
  module.exports = !$assign || $__require('3c')(function () {
    var A = {},
        B = {},
        S = Symbol(),
        K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) {
      B[k] = k;
    });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) {
    var T = toObject(target),
        aLen = arguments.length,
        index = 1,
        getSymbols = gOPS.f,
        isEnum = pIE.f;
    while (aLen > index) {
      var S = IObject(arguments[index++]),
          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
    return T;
  } : $assign;
  return module.exports;
});
$__System.registerDynamic('2b', ['3d'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var defined = $__require('3d');
  module.exports = function (it) {
    return Object(defined(it));
  };
  return module.exports;
});
$__System.registerDynamic('3e', ['3f'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var cof = $__require('3f');
  module.exports = Array.isArray || function isArray(arg) {
    return cof(arg) == 'Array';
  };
  return module.exports;
});
$__System.registerDynamic('40', ['41', '3e', '15'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var isObject = $__require('41'),
      isArray = $__require('3e'),
      SPECIES = $__require('15')('species');
  module.exports = function (original, length) {
    var C;
    if (isArray(original)) {
      C = original.constructor;
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }
    return new (C === undefined ? Array : C)(length);
  };
  return module.exports;
});
$__System.registerDynamic('42', ['43', '3b', '2b', '34', '40'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var ctx = $__require('43'),
      IObject = $__require('3b'),
      toObject = $__require('2b'),
      toLength = $__require('34'),
      asc = $__require('40');
  module.exports = function (TYPE, $create) {
    var IS_MAP = TYPE == 1,
        IS_FILTER = TYPE == 2,
        IS_SOME = TYPE == 3,
        IS_EVERY = TYPE == 4,
        IS_FIND_INDEX = TYPE == 6,
        NO_HOLES = TYPE == 5 || IS_FIND_INDEX,
        create = $create || asc;
    return function ($this, callbackfn, that) {
      var O = toObject($this),
          self = IObject(O),
          f = ctx(callbackfn, that, 3),
          length = toLength(self.length),
          index = 0,
          result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined,
          val,
          res;
      for (; length > index; index++) if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res;else if (res) switch (TYPE) {
            case 3:
              return true;
            case 5:
              return val;
            case 6:
              return index;
            case 2:
              result.push(val);
          } else if (IS_EVERY) return false;
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };
  return module.exports;
});
$__System.registerDynamic('44', ['45', '46', '1d', '41', '47', '48', '42', '2a'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  var redefineAll = $__require('45'),
      getWeak = $__require('46').getWeak,
      anObject = $__require('1d'),
      isObject = $__require('41'),
      anInstance = $__require('47'),
      forOf = $__require('48'),
      createArrayMethod = $__require('42'),
      $has = $__require('2a'),
      arrayFind = createArrayMethod(5),
      arrayFindIndex = createArrayMethod(6),
      id = 0;
  var uncaughtFrozenStore = function (that) {
    return that._l || (that._l = new UncaughtFrozenStore());
  };
  var UncaughtFrozenStore = function () {
    this.a = [];
  };
  var findUncaughtFrozen = function (store, key) {
    return arrayFind(store.a, function (it) {
      return it[0] === key;
    });
  };
  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;else this.a.push([key, value]);
    },
    'delete': function (key) {
      var index = arrayFindIndex(this.a, function (it) {
        return it[0] === key;
      });
      if (~index) this.a.splice(index, 1);
      return !!~index;
    }
  };
  module.exports = {
    getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, NAME, '_i');
        that._i = id++;
        that._l = undefined;
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
      });
      redefineAll(C.prototype, {
        'delete': function (key) {
          if (!isObject(key)) return false;
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(this)['delete'](key);
          return data && $has(data, this._i) && delete data[this._i];
        },
        has: function has(key) {
          if (!isObject(key)) return false;
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(this).has(key);
          return data && $has(data, this._i);
        }
      });
      return C;
    },
    def: function (that, key, value) {
      var data = getWeak(anObject(key), true);
      if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
      return that;
    },
    ufstore: uncaughtFrozenStore
  };
  return module.exports;
});
$__System.registerDynamic('2d', ['21', '49', '18', '16', '43'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var global = $__require('21'),
      core = $__require('49'),
      hide = $__require('18'),
      redefine = $__require('16'),
      ctx = $__require('43'),
      PROTOTYPE = 'prototype';
  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
        key,
        own,
        out,
        exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      own = !IS_FORCED && target && target[key] !== undefined;
      out = (own ? target : source)[key];
      exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (target) redefine(target, key, out, type & $export.U);
      if (exports[key] != out) hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  global.core = core;
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  $export.U = 64;
  $export.R = 128;
  module.exports = $export;
  return module.exports;
});
$__System.registerDynamic('18', ['1c', '27', '1f'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var dP = $__require('1c'),
      createDesc = $__require('27');
  module.exports = $__require('1f') ? function (object, key, value) {
    return dP.f(object, key, createDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };
  return module.exports;
});
$__System.registerDynamic('16', ['21', '18', '2a', '36', '49'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var global = $__require('21'),
      hide = $__require('18'),
      has = $__require('2a'),
      SRC = $__require('36')('src'),
      TO_STRING = 'toString',
      $toString = Function[TO_STRING],
      TPL = ('' + $toString).split(TO_STRING);
  $__require('49').inspectSource = function (it) {
    return $toString.call(it);
  };
  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) has(val, 'name') || hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === global) {
      O[key] = val;
    } else {
      if (!safe) {
        delete O[key];
        hide(O, key, val);
      } else {
        if (O[key]) O[key] = val;else hide(O, key, val);
      }
    }
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
  return module.exports;
});
$__System.registerDynamic('45', ['16'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var redefine = $__require('16');
  module.exports = function (target, src, safe) {
    for (var key in src) redefine(target, key, src[key], safe);
    return target;
  };
  return module.exports;
});
$__System.registerDynamic('46', ['36', '41', '2a', '1c', '3c'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var META = $__require('36')('meta'),
      isObject = $__require('41'),
      has = $__require('2a'),
      setDesc = $__require('1c').f,
      id = 0;
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var FREEZE = !$__require('3c')(function () {
    return isExtensible(Object.preventExtensions({}));
  });
  var setMeta = function (it) {
    setDesc(it, META, { value: {
        i: 'O' + ++id,
        w: {}
      } });
  };
  var fastKey = function (it, create) {
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has(it, META)) {
      if (!isExtensible(it)) return 'F';
      if (!create) return 'E';
      setMeta(it);
    }
    return it[META].i;
  };
  var getWeak = function (it, create) {
    if (!has(it, META)) {
      if (!isExtensible(it)) return true;
      if (!create) return false;
      setMeta(it);
    }
    return it[META].w;
  };
  var onFreeze = function (it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
    return it;
  };
  var meta = module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };
  return module.exports;
});
$__System.registerDynamic('4a', ['1d'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var anObject = $__require('1d');
  module.exports = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) anObject(ret.call(iterator));
      throw e;
    }
  };
  return module.exports;
});
$__System.registerDynamic('4b', ['2e', '15'], true, function ($__require, exports, module) {
    var define,
        global = this || self,
        GLOBAL = global;
    /* */
    var Iterators = $__require('2e'),
        ITERATOR = $__require('15')('iterator'),
        ArrayProto = Array.prototype;
    module.exports = function (it) {
        return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
    return module.exports;
});
$__System.registerDynamic("32", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  // 7.1.4 ToInteger
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
  return module.exports;
});
$__System.registerDynamic('34', ['32'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var toInteger = $__require('32'),
      min = Math.min;
  module.exports = function (it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
  return module.exports;
});
$__System.registerDynamic('14', ['3f', '15'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var cof = $__require('3f'),
      TAG = $__require('15')('toStringTag'),
      ARG = cof(function () {
    return arguments;
  }()) == 'Arguments';
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) {}
  };
  module.exports = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };
  return module.exports;
});
$__System.registerDynamic("2e", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = {};
  return module.exports;
});
$__System.registerDynamic('4c', ['14', '15', '2e', '49'], true, function ($__require, exports, module) {
    var define,
        global = this || self,
        GLOBAL = global;
    /* */
    var classof = $__require('14'),
        ITERATOR = $__require('15')('iterator'),
        Iterators = $__require('2e');
    module.exports = $__require('49').getIteratorMethod = function (it) {
        if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
    };
    return module.exports;
});
$__System.registerDynamic('48', ['43', '4a', '4b', '1d', '34', '4c'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var ctx = $__require('43'),
      call = $__require('4a'),
      isArrayIter = $__require('4b'),
      anObject = $__require('1d'),
      toLength = $__require('34'),
      getIterFn = $__require('4c');
  module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () {
      return iterable;
    } : getIterFn(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        index = 0,
        length,
        step,
        iterator;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
      entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      call(iterator, f, step.value, entries);
    }
  };
  return module.exports;
});
$__System.registerDynamic('47', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
      throw TypeError(name + ': incorrect invocation!');
    }return it;
  };
  return module.exports;
});
$__System.registerDynamic('4d', ['15'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var ITERATOR = $__require('15')('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][ITERATOR]();
    riter['return'] = function () {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function () {
      throw 2;
    });
  } catch (e) {}
  module.exports = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[ITERATOR]();
      iter.next = function () {
        return { done: safe = true };
      };
      arr[ITERATOR] = function () {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  return module.exports;
});
$__System.registerDynamic('1c', ['1d', '4e', '4f', '1f'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var anObject = $__require('1d'),
      IE8_DOM_DEFINE = $__require('4e'),
      toPrimitive = $__require('4f'),
      dP = Object.defineProperty;
  exports.f = $__require('1f') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
      return dP(O, P, Attributes);
    } catch (e) {}
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  return module.exports;
});
$__System.registerDynamic('35', ['21'], true, function ($__require, exports, module) {
    var define,
        global = this || self,
        GLOBAL = global;
    /* */
    var global = $__require('21'),
        SHARED = '__core-js_shared__',
        store = global[SHARED] || (global[SHARED] = {});
    module.exports = function (key) {
        return store[key] || (store[key] = {});
    };
    return module.exports;
});
$__System.registerDynamic('36', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var id = 0,
      px = Math.random();
  module.exports = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
  return module.exports;
});
$__System.registerDynamic('15', ['35', '36', '21'], true, function ($__require, exports, module) {
    var define,
        global = this || self,
        GLOBAL = global;
    /* */
    var store = $__require('35')('wks'),
        uid = $__require('36'),
        Symbol = $__require('21').Symbol,
        USE_SYMBOL = typeof Symbol == 'function';
    module.exports = function (name) {
        return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
    };
    return module.exports;
});
$__System.registerDynamic('28', ['1c', '2a', '15'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var def = $__require('1c').f,
      has = $__require('2a'),
      TAG = $__require('15')('toStringTag');
  module.exports = function (it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
      configurable: true,
      value: tag
    });
  };
  return module.exports;
});
$__System.registerDynamic('1d', ['41'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var isObject = $__require('41');
  module.exports = function (it) {
    if (!isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };
  return module.exports;
});
$__System.registerDynamic('50', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };
  return module.exports;
});
$__System.registerDynamic('43', ['50'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var aFunction = $__require('50');
  module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function () {
      return fn.apply(that, arguments);
    };
  };
  return module.exports;
});
$__System.registerDynamic("3a", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  exports.f = {}.propertyIsEnumerable;
  return module.exports;
});
$__System.registerDynamic("27", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  return module.exports;
});
$__System.registerDynamic("3f", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var toString = {}.toString;

  module.exports = function (it) {
    return toString.call(it).slice(8, -1);
  };
  return module.exports;
});
$__System.registerDynamic('3b', ['3f'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var cof = $__require('3f');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  return module.exports;
});
$__System.registerDynamic("3d", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  // 7.2.1 RequireObjectCoercible(argument)
  module.exports = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };
  return module.exports;
});
$__System.registerDynamic('30', ['3b', '3d'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var IObject = $__require('3b'),
      defined = $__require('3d');
  module.exports = function (it) {
    return IObject(defined(it));
  };
  return module.exports;
});
$__System.registerDynamic('4f', ['41'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var isObject = $__require('41');
  module.exports = function (it, S) {
    if (!isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };
  return module.exports;
});
$__System.registerDynamic("2a", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function (it, key) {
    return hasOwnProperty.call(it, key);
  };
  return module.exports;
});
$__System.registerDynamic('41', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
  return module.exports;
});
$__System.registerDynamic('21', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

  return module.exports;
});
$__System.registerDynamic('25', ['41', '21'], true, function ($__require, exports, module) {
    var define,
        global = this || self,
        GLOBAL = global;
    /* */
    var isObject = $__require('41'),
        document = $__require('21').document,
        is = isObject(document) && isObject(document.createElement);
    module.exports = function (it) {
        return is ? document.createElement(it) : {};
    };
    return module.exports;
});
$__System.registerDynamic('4e', ['1f', '3c', '25'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = !$__require('1f') && !$__require('3c')(function () {
    return Object.defineProperty($__require('25')('div'), 'a', { get: function () {
        return 7;
      } }).a != 7;
  });
  return module.exports;
});
$__System.registerDynamic("3c", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  return module.exports;
});
$__System.registerDynamic('1f', ['3c'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = !$__require('3c')(function () {
    return Object.defineProperty({}, 'a', { get: function () {
        return 7;
      } }).a != 7;
  });
  return module.exports;
});
$__System.registerDynamic('51', ['3a', '27', '30', '4f', '2a', '4e', '1f'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var pIE = $__require('3a'),
      createDesc = $__require('27'),
      toIObject = $__require('30'),
      toPrimitive = $__require('4f'),
      has = $__require('2a'),
      IE8_DOM_DEFINE = $__require('4e'),
      gOPD = Object.getOwnPropertyDescriptor;
  exports.f = $__require('1f') ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = toIObject(O);
    P = toPrimitive(P, true);
    if (IE8_DOM_DEFINE) try {
      return gOPD(O, P);
    } catch (e) {}
    if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
  };
  return module.exports;
});
$__System.registerDynamic('52', ['41', '1d', '43', '51'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var isObject = $__require('41'),
      anObject = $__require('1d');
  var check = function (O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function (test, buggy, set) {
      try {
        set = $__require('43')(Function.call, $__require('51').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
  return module.exports;
});
$__System.registerDynamic('53', ['41', '52'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var isObject = $__require('41'),
      setPrototypeOf = $__require('52').set;
  module.exports = function (that, target, C) {
    var P,
        S = target.constructor;
    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
      setPrototypeOf(that, P);
    }
    return that;
  };
  return module.exports;
});
$__System.registerDynamic('54', ['21', '2d', '16', '45', '46', '48', '47', '41', '3c', '4d', '28', '53'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  var global = $__require('21'),
      $export = $__require('2d'),
      redefine = $__require('16'),
      redefineAll = $__require('45'),
      meta = $__require('46'),
      forOf = $__require('48'),
      anInstance = $__require('47'),
      isObject = $__require('41'),
      fails = $__require('3c'),
      $iterDetect = $__require('4d'),
      setToStringTag = $__require('28'),
      inheritIfRequired = $__require('53');
  module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = global[NAME],
        C = Base,
        ADDER = IS_MAP ? 'set' : 'add',
        proto = C && C.prototype,
        O = {};
    var fixMethod = function (KEY) {
      var fn = proto[KEY];
      redefine(proto, KEY, KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) {
        fn.call(this, a === 0 ? 0 : a);
        return this;
      } : function set(a, b) {
        fn.call(this, a === 0 ? 0 : a, b);
        return this;
      });
    };
    if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
      new C().entries().next();
    }))) {
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
      redefineAll(C.prototype, methods);
      meta.NEED = true;
    } else {
      var instance = new C(),
          HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance,
          THROWS_ON_PRIMITIVES = fails(function () {
        instance.has(1);
      }),
          ACCEPT_ITERABLES = $iterDetect(function (iter) {
        new C(iter);
      }),
          BUGGY_ZERO = !IS_WEAK && fails(function () {
        var $instance = new C(),
            index = 5;
        while (index--) $instance[ADDER](index, index);
        return !$instance.has(-0);
      });
      if (!ACCEPT_ITERABLES) {
        C = wrapper(function (target, iterable) {
          anInstance(target, C, NAME);
          var that = inheritIfRequired(new Base(), target, C);
          if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }
      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }
      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
      if (IS_WEAK && proto.clear) delete proto.clear;
    }
    setToStringTag(C, NAME);
    O[NAME] = C;
    $export($export.G + $export.W + $export.F * (C != Base), O);
    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
    return C;
  };
  return module.exports;
});
$__System.registerDynamic('55', ['42', '16', '46', '39', '44', '41', '2a', '54'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  var each = $__require('42')(0),
      redefine = $__require('16'),
      meta = $__require('46'),
      assign = $__require('39'),
      weak = $__require('44'),
      isObject = $__require('41'),
      has = $__require('2a'),
      getWeak = meta.getWeak,
      isExtensible = Object.isExtensible,
      uncaughtFrozenStore = weak.ufstore,
      tmp = {},
      InternalMap;
  var wrapper = function (get) {
    return function WeakMap() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  };
  var methods = {
    get: function get(key) {
      if (isObject(key)) {
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(this).get(key);
        return data ? data[this._i] : undefined;
      }
    },
    set: function set(key, value) {
      return weak.def(this, key, value);
    }
  };
  var $WeakMap = module.exports = $__require('54')('WeakMap', wrapper, methods, weak, true, true);
  if (new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
    InternalMap = weak.getConstructor(wrapper);
    assign(InternalMap.prototype, methods);
    meta.NEED = true;
    each(['delete', 'has', 'get', 'set'], function (key) {
      var proto = $WeakMap.prototype,
          method = proto[key];
      redefine(proto, key, function (a, b) {
        if (isObject(a) && !isExtensible(a)) {
          if (!this._f) this._f = new InternalMap();
          var result = this._f[key](a, b);
          return key == 'set' ? this : result;
        }
        return method.call(this, a, b);
      });
    });
  }
  return module.exports;
});
$__System.registerDynamic('49', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var core = module.exports = { version: '2.2.2' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

  return module.exports;
});
$__System.registerDynamic('f', ['13', '2f', '55', '49'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  $__require('13');
  $__require('2f');
  $__require('55');
  module.exports = $__require('49').WeakMap;
  return module.exports;
});
$__System.registerDynamic("d", ["7", "8", "e", "5", "f"], true, function ($__require, exports, module) {
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var _ = $__require("7");
    var jsonld_1 = $__require("8");
    var nonenumerable = $__require("e");
    var Constants_1 = $__require("5");
    var WeakMap = $__require("f");
    var _isProcessed = new WeakMap();
    var _apiDocumentation = new WeakMap();
    var _incomingLinks = new WeakMap();
    var _heracles = new WeakMap();
    var _supportedOperation = new WeakMap();
    var _resource = new WeakMap();
    var Resource = function () {
        function Resource(actualResource) {
            _.extend(this, actualResource);
            _isProcessed.set(this, false);
        }
        Object.defineProperty(Resource.prototype, "id", {
            get: function () {
                return this[Constants_1.JsonLd.Id];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "types", {
            get: function () {
                var types = this[Constants_1.JsonLd.Type];
                if (typeof types === 'string') {
                    return [types];
                }
                return types;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resource.prototype, "_processed", {
            get: function () {
                return _isProcessed.get(this);
            },
            set: function (val) {
                _isProcessed.set(this, val);
            },
            enumerable: true,
            configurable: true
        });
        Resource.prototype.compact = function (context) {
            if (context === void 0) {
                context = null;
            }
            return jsonld_1.promises.compact(this, context || Constants_1.Core.Context);
        };
        __decorate([nonenumerable, __metadata('design:type', Object)], Resource.prototype, "id", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], Resource.prototype, "types", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], Resource.prototype, "_processed", null);
        return Resource;
    }();
    exports.Resource = Resource;
    var HydraResource = function (_super) {
        __extends(HydraResource, _super);
        function HydraResource(heracles, actualResource, apiDoc, incomingLinks) {
            _super.call(this, actualResource);
            _apiDocumentation.set(this, apiDoc);
            _incomingLinks.set(this, incomingLinks);
            _heracles.set(this, heracles);
        }
        Object.defineProperty(HydraResource.prototype, "apiDocumentation", {
            get: function () {
                return _apiDocumentation.get(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HydraResource.prototype, "_heracles", {
            get: function () {
                return _heracles.get(this);
            },
            enumerable: true,
            configurable: true
        });
        HydraResource.prototype.getIncomingLinks = function () {
            return _incomingLinks.get(this);
        };
        Object.defineProperty(HydraResource.prototype, "operations", {
            get: function () {
                var _this = this;
                var classOperations;
                if (_.isArray(this[Constants_1.JsonLd.Type])) {
                    classOperations = _.map(this[Constants_1.JsonLd.Type], function (type) {
                        return _this.apiDocumentation.getOperations(type);
                    });
                } else {
                    classOperations = [this.apiDocumentation.getOperations(this[Constants_1.JsonLd.Type])];
                }
                var propertyOperations = _.chain(this.getIncomingLinks()).map(function (link) {
                    return _.map(link.subject.types, function (type) {
                        return { type: type, predicate: link.predicate };
                    });
                }).flatten().map(function (link) {
                    return _this.apiDocumentation.getOperations(link.type, link.predicate);
                }).union().value();
                var operations = classOperations.concat(propertyOperations);
                return _.flatten(operations).map(function (supportedOperation) {
                    return new Operation(supportedOperation, _this._heracles, _this);
                });
            },
            enumerable: true,
            configurable: true
        });
        __decorate([nonenumerable, __metadata('design:type', Object)], HydraResource.prototype, "apiDocumentation", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], HydraResource.prototype, "_heracles", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], HydraResource.prototype, "operations", null);
        return HydraResource;
    }(Resource);
    exports.HydraResource = HydraResource;
    var Operation = function () {
        function Operation(supportedOperation, heracles, resource) {
            if (!supportedOperation) {
                throw new Error('Missing supportedOperation parameter');
            }
            if (!heracles) {
                throw new Error('Missing heracles parameter');
            }
            _supportedOperation.set(this, supportedOperation);
            _resource.set(this, resource);
            _heracles.set(this, heracles);
        }
        Object.defineProperty(Operation.prototype, "method", {
            get: function () {
                return this._supportedOperation.method;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Operation.prototype, "expects", {
            get: function () {
                return this._supportedOperation.expects;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Operation.prototype, "returns", {
            get: function () {
                return this._supportedOperation.returns;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Operation.prototype, "requiresInput", {
            get: function () {
                return this._supportedOperation.requiresInput;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Operation.prototype, "title", {
            get: function () {
                return this._supportedOperation.title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Operation.prototype, "description", {
            get: function () {
                return this._supportedOperation.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Operation.prototype, "_supportedOperation", {
            get: function () {
                return _supportedOperation.get(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Operation.prototype, "_resource", {
            get: function () {
                return _resource.get(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Operation.prototype, "_heracles", {
            get: function () {
                return _heracles.get(this);
            },
            enumerable: true,
            configurable: true
        });
        Operation.prototype.invoke = function (body, mediaType) {
            if (mediaType === void 0) {
                mediaType = Constants_1.MediaTypes.jsonLd;
            }
            return this._heracles.invokeOperation(this, this._resource.id, body, mediaType);
        };
        __decorate([nonenumerable, __metadata('design:type', Object)], Operation.prototype, "_supportedOperation", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], Operation.prototype, "_resource", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], Operation.prototype, "_heracles", null);
        return Operation;
    }();
    exports.Operation = Operation;
    var PartialCollectionView = function (_super) {
        __extends(PartialCollectionView, _super);
        function PartialCollectionView() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(PartialCollectionView.prototype, "first", {
            get: function () {
                return this[Constants_1.Core.Vocab.first] || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartialCollectionView.prototype, "previous", {
            get: function () {
                return this[Constants_1.Core.Vocab.previous] || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartialCollectionView.prototype, "next", {
            get: function () {
                return this[Constants_1.Core.Vocab.next] || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartialCollectionView.prototype, "last", {
            get: function () {
                return this[Constants_1.Core.Vocab.last] || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartialCollectionView.prototype, "collection", {
            get: function () {
                var collectionLink = _.find(this.getIncomingLinks(), function (linkArray) {
                    return linkArray.predicate === Constants_1.Core.Vocab.view;
                });
                return collectionLink ? collectionLink.subject : null;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([nonenumerable, __metadata('design:type', Object)], PartialCollectionView.prototype, "first", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], PartialCollectionView.prototype, "previous", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], PartialCollectionView.prototype, "next", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], PartialCollectionView.prototype, "last", null);
        __decorate([nonenumerable, __metadata('design:type', Object)], PartialCollectionView.prototype, "collection", null);
        return PartialCollectionView;
    }(HydraResource);
    exports.PartialCollectionView = PartialCollectionView;
    

    return module.exports;
});
$__System.registerDynamic('1', ['7', '3', '5', '10', '11', 'd'], true, function ($__require, exports, module) {
    /// <reference path="../typings/index.d.ts" />
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var _ = $__require('7');
    var FetchUtil_1 = $__require('3');
    var Constants_1 = $__require('5');
    var JsonLdUtil_1 = $__require('10');
    var ResourceFactory_1 = $__require('11');
    var Resources_1 = $__require('d');
    var Heracles = function () {
        function Heracles() {
            this.resourceFactory = new ResourceFactory_1.ResourceFactory();
        }
        Heracles.prototype.loadResource = function (uri) {
            return FetchUtil_1.FetchUtil.fetchResource(uri).then(processFetchUtilResponse.call(this, uri));
        };
        Heracles.prototype.loadDocumentation = function (uri) {
            var _this = this;
            return FetchUtil_1.FetchUtil.fetchResource(uri).then(function (response) {
                var typeOverrides = {};
                typeOverrides[JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(uri)] = Constants_1.Core.Vocab.ApiDocumentation;
                return getRequestedObject(_this, uri, response.resources, typeOverrides)(null);
            }, function () {
                return null;
            });
        };
        Heracles.prototype.invokeOperation = function (operation, uri, body, mediaType) {
            return FetchUtil_1.FetchUtil.invokeOperation(operation.method, uri, body, mediaType).then(processFetchUtilResponse.call(this, uri));
        };
        return Heracles;
    }();
    exports.ResourceFactory = ResourceFactory_1.ResourceFactory;
    exports.Resource = Resources_1.HydraResource;
    exports.Hydra = new Heracles();
    function processFetchUtilResponse(uri) {
        var _this = this;
        return function (response) {
            return _this.loadDocumentation(response.apiDocumentationLink).then(getRequestedObject(_this, uri, response.resources));
        };
    }
    function getRequestedObject(heracles, uri, resources, typeOverrides) {
        if (typeOverrides === void 0) {
            typeOverrides = {};
        }
        return function (apiDocumentation) {
            var resourcified = _.keyBy(resources, function (res) {
                return JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(res[Constants_1.JsonLd.Id]);
            });
            uri = JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(uri);
            _.transform(resources, function (acc, val) {
                var id = JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(val[Constants_1.JsonLd.Id]);
                acc[id] = heracles.resourceFactory.createResource(heracles, val, apiDocumentation, acc, typeOverrides[id]);
            }, resourcified);
            if (!resourcified[uri]) {
                return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
            }
            _.each(resourcified, function (g) {
                return resourcify(heracles, g, resourcified, apiDocumentation, typeOverrides);
            });
            return resourcified[uri];
        };
    }
    function resourcify(heracles, obj, resourcified, apiDoc, typeOverrides) {
        if (_.isObject(obj) === false) {
            return obj;
        }
        if (obj[Constants_1.JsonLd.Value]) {
            return obj[Constants_1.JsonLd.Value];
        }
        var selfId = JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(obj[Constants_1.JsonLd.Id]);
        if (!selfId) {
            return obj;
        }
        var resource = resourcified[selfId];
        if (!resource || typeof resource._processed === 'undefined') {
            var id = JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(obj[Constants_1.JsonLd.Id]);
            resource = heracles.resourceFactory.createResource(heracles, obj, apiDoc, resourcified, id);
            resourcified[selfId] = resource;
        }
        if (resource._processed === true) {
            return resource;
        }
        resource._processed = true;
        _.forOwn(resource, function (value, key) {
            if (_.isArray(value)) {
                resource[key] = _.map(value, function (el) {
                    return resourcify(heracles, el, resourcified, apiDoc, typeOverrides);
                });
                return;
            }
            resource[key] = resourcify(heracles, value, resourcified, apiDoc, typeOverrides);
        });
        return resource;
    }
    

    return module.exports;
});
})
(function(factory) {
  module.exports = factory(require("li"), require("lodash"), require("jsonld"), require("rdf-ext"), require("rdf-formats-common"), require("rdf-serializer-jsonld"));
});
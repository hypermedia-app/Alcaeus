!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1","2"], ["7","8","9","a","b"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("3", [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var ExpandedWithDocs = function () {
        function ExpandedWithDocs(resources, apiDocumentationLink, resourceIdentifier) {
            this.resources = resources;
            this.apiDocumentationLink = apiDocumentationLink;
            this.resourceIdentifier = resourceIdentifier;
        }
        return ExpandedWithDocs;
    }();
    exports.ExpandedWithDocs = ExpandedWithDocs;
    

    return module.exports;
});
$__System.registerDynamic('4', ['7', '8', '5', '9', 'a', 'b', '6', '3'], true, function ($__require, exports, module) {
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
    var li = $__require('7');
    var jsonld_1 = $__require('8');
    var Constants = $__require('5');
    var $rdf = $__require('9');
    var JsonLdParser = $__require('a');
    var JsonLdSerializer = $__require('b');
    var Vocabs_1 = $__require('6');
    var internals_1 = $__require('3');
    $rdf.parsers[Constants.MediaTypes.jsonLd] = JsonLdParser;
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
                    return new internals_1.ExpandedWithDocs(obj, apiDocsUri, res.headers.get('Content-Location') || res.url);
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
                    return new internals_1.ExpandedWithDocs(obj, apiDocsUri, res.headers.get('Content-Location') || res.url);
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
            var links = li(linkHeaders);
            if (links[Constants.Core.Vocab.apiDocumentation]) {
                return links[Constants.Core.Vocab.apiDocumentation].url;
            }
        }
        return null;
    }
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
        return res.text().then(parseResourceRepresentation(mediaType, res)).then(runInference).then(function (graph) {
            return JsonLdSerializer.serialize(graph);
        }).then(flatten(res.url));
    }
    function parseResourceRepresentation(mediaType, res) {
        return function (jsonld) {
            return $rdf.parsers.parse(mediaType, jsonld, null, res.url);
        };
    }
    function runInference(graph) {
        FetchUtil._propertyRangeMappings.map(function (mapping) {
            var matches = graph.match(null, mapping[0], null, null);
            matches.toArray().forEach(function (triple) {
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
$__System.registerDynamic('c', [], true, function ($__require, exports, module) {
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var JsonLdUtil = function () {
        function JsonLdUtil() {}
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
$__System.registerDynamic("d", ["5", "6", "e", "f"], true, function ($__require, exports, module) {
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
    var Constants_1 = $__require("5");
    var Vocabs_1 = $__require("6");
    var Resources_1 = $__require("e");
    var nonenumerable_1 = $__require("f");
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
            var supportedProperty = clas.supportedProperties.find(function (prop) {
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
            return this.classes.find(function (clas) {
                return clas[Constants_1.JsonLd.Id] === classId;
            }) || null;
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
                    return operations;
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
$__System.registerDynamic('10', ['6', 'e', 'd', '5', '11'], true, function ($__require, exports, module) {
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var Vocabs_1 = $__require('6');
    var Types = $__require('e');
    var DocTypes = $__require('d');
    var Constants_1 = $__require('5');
    var LodashUtil_1 = $__require('11');
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
        var instances = LodashUtil_1.values(resources);
        return instances.reduceRight(function (acc, res, index) {
            LodashUtil_1.forOwn(res, function (value, predicate) {
                if (value && value[Constants_1.JsonLd.Id] && value[Constants_1.JsonLd.Id] === object[Constants_1.JsonLd.Id]) {
                    acc.push(new IncomingLink(instances[index][Constants_1.JsonLd.Id], predicate, resources));
                }
            });
            return acc;
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
$__System.registerDynamic('f', ['12'], true, function ($__require, exports, module) {
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
$__System.registerDynamic("e", ["8", "f", "5"], true, function ($__require, exports, module) {
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
    var jsonld_1 = $__require("8");
    var nonenumerable = $__require("f");
    var Constants_1 = $__require("5");
    var _isProcessed = new WeakMap();
    var _apiDocumentation = new WeakMap();
    var _incomingLinks = new WeakMap();
    var _heracles = new WeakMap();
    var _supportedOperation = new WeakMap();
    var _resource = new WeakMap();
    var Resource = function () {
        function Resource(actualResource) {
            Object.assign(this, actualResource);
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
                if (Array.isArray(this[Constants_1.JsonLd.Type])) {
                    classOperations = this[Constants_1.JsonLd.Type].map(function (type) {
                        return _this.apiDocumentation.getOperations(type);
                    });
                } else {
                    classOperations = [this.apiDocumentation.getOperations(this[Constants_1.JsonLd.Type])];
                }
                var mappedLinks = this.getIncomingLinks().map(function (link) {
                    return link.subject.types.map(function (type) {
                        return { type: type, predicate: link.predicate };
                    });
                });
                var flattened = [].concat.apply([], mappedLinks);
                var propertyOperations = flattened.map(function (link) {
                    return _this.apiDocumentation.getOperations(link.type, link.predicate);
                });
                var operations = [].concat.apply([], classOperations.concat(propertyOperations));
                return operations.map(function (supportedOperation) {
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
                var collectionLink = this.getIncomingLinks().find(function (linkArray) {
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
$__System.registerDynamic("11", [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    function forOwn(obj, iteratee) {
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            iteratee(obj[key], key, obj);
        }
    }
    exports.forOwn = forOwn;
    function values(obj) {
        var values = [];
        forOwn(obj, function (o) {
            values.push(o);
        });
        return values;
    }
    exports.values = values;
    

    return module.exports;
});
$__System.registerDynamic('1', ['4', '5', 'c', '10', 'e', '11'], true, function ($__require, exports, module) {
    /// <reference path="../typings/index.d.ts" />
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var FetchUtil_1 = $__require('4');
    var Constants_1 = $__require('5');
    var JsonLdUtil_1 = $__require('c');
    var ResourceFactory_1 = $__require('10');
    var Resources_1 = $__require('e');
    var LodashUtil_1 = $__require('11');
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
                typeOverrides[uri] = Constants_1.Core.Vocab.ApiDocumentation;
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
            return _this.loadDocumentation(response.apiDocumentationLink).then(getRequestedObject(_this, response.resourceIdentifier || uri, response.resources));
        };
    }
    function getRequestedObject(heracles, uri, resources, typeOverrides) {
        if (typeOverrides === void 0) {
            typeOverrides = {};
        }
        return function (apiDocumentation) {
            var resourcified = {};
            resources.forEach(function (res) {
                resourcified[res[Constants_1.JsonLd.Id]] = res;
            });
            resources.reduceRight(function (acc, val) {
                var id = val[Constants_1.JsonLd.Id];
                acc[id] = heracles.resourceFactory.createResource(heracles, val, apiDocumentation, acc, typeOverrides[id]);
                return acc;
            }, resourcified);
            LodashUtil_1.forOwn(resourcified, function (resource) {
                return resourcify(heracles, resource, resourcified, apiDocumentation, typeOverrides);
            });
            var rootResource = resourcified[uri] || resourcified[JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(uri)];
            if (!rootResource) {
                return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
            }
            return rootResource;
        };
    }
    function resourcify(heracles, obj, resourcified, apiDoc, typeOverrides) {
        if (typeof obj === 'object' === false) {
            return obj;
        }
        if (obj[Constants_1.JsonLd.Value]) {
            return obj[Constants_1.JsonLd.Value];
        }
        var selfId = obj[Constants_1.JsonLd.Id];
        if (!selfId) {
            return obj;
        }
        var resource = resourcified[selfId];
        if (!resource || typeof resource._processed === 'undefined') {
            var id = obj[Constants_1.JsonLd.Id];
            resource = heracles.resourceFactory.createResource(heracles, obj, apiDoc, resourcified, id);
            resourcified[selfId] = resource;
        }
        if (resource._processed === true) {
            return resource;
        }
        resource._processed = true;
        LodashUtil_1.forOwn(resource, function (value, key) {
            if (Array.isArray(value)) {
                resource[key] = value.map(function (el) {
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
  module.exports = factory(require("parse-link-header"), require("jsonld"), require("rdf-ext"), require("rdf-parser-jsonld"), require("rdf-serializer-jsonld"));
});
//# sourceMappingURL=heracles.js.map
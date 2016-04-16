!function(e){function r(e,r,t){e in i||(i[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return c[e]||(c[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,s=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var s=0;s<i.dependencies.length;++s)i.dependencies[s]===o&&i.setters[s](a)}return o.locked=!1,r},r.name);o.setters=s.setters,o.execute=s.execute;for(var l=0,d=r.normalizedDeps.length;d>l;l++){var f,p=r.normalizedDeps[l],v=i[p],m=c[p];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=u(p),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[l]&&o.setters[l](f)}}}function o(e){var r={};if("object"==typeof e||"function"==typeof e)if(l){var t;for(var n in e)(t=Object.getOwnPropertyDescriptor(e,n))&&f(r,n,t)}else{var o=e&&e.hasOwnProperty;for(var n in e)(!o||e.hasOwnProperty(n))&&(r[n]=e[n])}return r["default"]=e,f(r,"__useDefault",{value:!0}),r}function a(r,t){var n=i[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,l=n.normalizedDeps.length;l>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(i[d]?a(d,t):u(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function u(e){if(v[e])return v[e];if("@node/"==e.substr(0,6))return p(e.substr(6));var r=i[e];if(!r)throw"Module "+e+" not present.";return n(i[e]),a(e,[]),i[e]=void 0,r.declarative&&f(r.module.exports,"__esModule",{value:!0}),v[e]=r.declarative?r.module.exports:r.esModule}var i={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},l=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(d){l=!1}var f;!function(){try{Object.defineProperty({},"a",{})&&(f=Object.defineProperty)}catch(e){f=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var c={},p="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,v={"@empty":{}};return function(e,t,n){return function(a){a(function(a){for(var i=0;i<t.length;i++)(function(e,r){r&&r.__esModule?v[e]=r:v[e]=o(r)})(t[i],arguments[i]);n({register:r});var s=u(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)u(e[i]);return s.__useDefault?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1","2"], ["4","5","3","9"], function($__System, require) {

$__System.register("2", ["4", "5", "3", "6", "7", "8"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var jsonld_1, _, linkeddata_vocabs_1, Constants_1, FetchUtil_1, JsonLdUtil_1;
    var ApiDocumentation, DocumentedResource, Operation, SupportedProperty, Class;
    return {
        setters:[
            function (jsonld_1_1) {
                jsonld_1 = jsonld_1_1;
            },
            function (_1) {
                _ = _1;
            },
            function (linkeddata_vocabs_1_1) {
                linkeddata_vocabs_1 = linkeddata_vocabs_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            },
            function (FetchUtil_1_1) {
                FetchUtil_1 = FetchUtil_1_1;
            },
            function (JsonLdUtil_1_1) {
                JsonLdUtil_1 = JsonLdUtil_1_1;
            }],
        execute: function() {
            ApiDocumentation = (function () {
                function ApiDocumentation(docId, apiDoc) {
                    this.id = docId;
                    this._original = apiDoc;
                }
                ApiDocumentation.load = function (uri) {
                    return FetchUtil_1.FetchUtil.fetchResource(uri, false)
                        .then(function (expanded) { return new ApiDocumentation(uri, expanded.resources); });
                };
                ApiDocumentation.prototype.getOperations = function (classUri) {
                    var _this = this;
                    return this._getFlattened()
                        .then(function (graph) {
                        var supportedClass = _.find(graph, function (obj) { return JsonLdUtil_1.JsonLdUtil.idsEqual(obj[Constants_1.JsonLd.Id], classUri); });
                        return _.chain(graph)
                            .filter(function (obj) { return JsonLdUtil_1.JsonLdUtil.idsEqual(obj[Constants_1.JsonLd.Id], supportedClass.supportedOperation) || _.some(supportedClass.supportedOperation, function (sp) { return JsonLdUtil_1.JsonLdUtil.idsEqual(sp, obj[Constants_1.JsonLd.Id]); }); })
                            .map(function (op) {
                            op[Constants_1.JsonLd.Context] = Constants_1.Core.Context;
                            return new Operation(op, _this);
                        })
                            .value();
                    });
                };
                ApiDocumentation.prototype.getProperties = function (classUri) {
                    var _this = this;
                    return this._getFlattened()
                        .then(function (graph) {
                        var supportedClass = _.find(graph, function (obj) { return JsonLdUtil_1.JsonLdUtil.idsEqual(obj[Constants_1.JsonLd.Id], classUri); });
                        return _.chain(graph)
                            .filter(function (obj) { return JsonLdUtil_1.JsonLdUtil.idsEqual(obj[Constants_1.JsonLd.Id], supportedClass.supportedProperty) || _.some(supportedClass.supportedProperty, function (sp) { return JsonLdUtil_1.JsonLdUtil.idsEqual(sp, obj[Constants_1.JsonLd.Id]); }); })
                            .map(function (prop) {
                            prop[Constants_1.JsonLd.Context] = Constants_1.Core.Context;
                            return new SupportedProperty(prop, _this);
                        })
                            .value();
                    });
                };
                ApiDocumentation.prototype.getClasses = function () {
                    var _this = this;
                    return this._getFlattened()
                        .then(function (graph) {
                        return _.chain(graph)
                            .filter(function (obj) { return obj[Constants_1.JsonLd.Type] === 'Class'; })
                            .map(function (sc) { return new Class(sc, _this); })
                            .value();
                    });
                };
                ApiDocumentation.prototype.getClass = function (classId) {
                    return this.getClasses().then(function (cs) { return _.find(cs, ['id', classId]); });
                };
                ApiDocumentation.prototype._getFlattened = function () {
                    return jsonld_1.promises.flatten(this._original, Constants_1.Core.Context)
                        .then(function (flat) { return flat[Constants_1.JsonLd.Graph]; });
                };
                return ApiDocumentation;
            }());
            exports_1("ApiDocumentation", ApiDocumentation);
            DocumentedResource = (function () {
                function DocumentedResource(hydraResource) {
                    this._hydraResource = hydraResource;
                }
                Object.defineProperty(DocumentedResource.prototype, "id", {
                    get: function () {
                        return this._hydraResource['@id'];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DocumentedResource.prototype, "description", {
                    get: function () {
                        return this._hydraResource.description ||
                            this._hydraResource[linkeddata_vocabs_1.rdfs.ns + 'comment'] ||
                            this._hydraResource[linkeddata_vocabs_1.schema.description];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DocumentedResource.prototype, "title", {
                    get: function () {
                        return this._hydraResource.title ||
                            this._hydraResource[linkeddata_vocabs_1.rdfs.ns + 'label'] ||
                            this._hydraResource[linkeddata_vocabs_1.schema.title];
                    },
                    enumerable: true,
                    configurable: true
                });
                DocumentedResource.prototype.compact = function (context) {
                    if (context === void 0) { context = null; }
                    return jsonld_1.promises.compact(this._hydraResource, context || Constants_1.Core.Context);
                };
                return DocumentedResource;
            }());
            exports_1("DocumentedResource", DocumentedResource);
            Operation = (function (_super) {
                __extends(Operation, _super);
                function Operation(hydraOperation, apiDoc) {
                    _super.call(this, hydraOperation);
                    this._hydraOperation = hydraOperation;
                    this._apiDoc = apiDoc;
                }
                Object.defineProperty(Operation.prototype, "method", {
                    get: function () {
                        return this._hydraOperation.method;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Operation.prototype, "expects", {
                    get: function () {
                        return this._hydraOperation.expects[Constants_1.JsonLd.Id];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Operation.prototype, "returns", {
                    get: function () {
                        return this._hydraOperation.returns[Constants_1.JsonLd.Id];
                    },
                    enumerable: true,
                    configurable: true
                });
                Operation.prototype.getExpected = function () {
                    return this._apiDoc.getClass(this.expects);
                };
                Operation.prototype.getReturned = function () {
                    return this._apiDoc.getClass(this.returns);
                };
                return Operation;
            }(DocumentedResource));
            exports_1("Operation", Operation);
            SupportedProperty = (function (_super) {
                __extends(SupportedProperty, _super);
                function SupportedProperty(hydraSupportedProperty, apiDoc) {
                    _super.call(this, hydraSupportedProperty);
                    this._hydraSupportedProperty = hydraSupportedProperty;
                    this._apiDoc = apiDoc;
                }
                Object.defineProperty(SupportedProperty.prototype, "readable", {
                    get: function () {
                        if (typeof this._hydraSupportedProperty.readable === 'undefined') {
                            return true;
                        }
                        return this._hydraSupportedProperty.readable;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SupportedProperty.prototype, "writable", {
                    get: function () {
                        if (typeof this._hydraSupportedProperty.writable === 'undefined') {
                            return true;
                        }
                        return this._hydraSupportedProperty.writable;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SupportedProperty.prototype, "required", {
                    get: function () {
                        if (typeof this._hydraSupportedProperty.required === 'undefined') {
                            return false;
                        }
                        return this._hydraSupportedProperty.required;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SupportedProperty.prototype, "property", {
                    get: function () {
                        return this._hydraSupportedProperty.property;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SupportedProperty;
            }(DocumentedResource));
            exports_1("SupportedProperty", SupportedProperty);
            Class = (function (_super) {
                __extends(Class, _super);
                function Class(hydraClass, apiDoc) {
                    _super.call(this, hydraClass);
                    this._hydraClass = hydraClass;
                    this._apiDoc = apiDoc;
                }
                Class.prototype.getSupportedOperations = function () {
                    return this._apiDoc.getOperations(this.id);
                };
                Class.prototype.getSupportedProperties = function () {
                    return this._apiDoc.getProperties(this.id);
                };
                return Class;
            }(DocumentedResource));
            exports_1("Class", Class);
        }
    }
});

$__System.register("7", ["9", "4", "2", "6"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var li, jsonld_1, ApiDocumentation_1, Constants;
    var FetchUtil, ExpandedWithDocs, FetchError;
    function fetchDocumentation(res) {
        if (res.headers.has(Constants.Headers.Link)) {
            var linkHeaders = res.headers.get(Constants.Headers.Link);
            var links = li.parse(linkHeaders);
            if (links[Constants.Core.Vocab.apiDocumentation]) {
                return ApiDocumentation_1.ApiDocumentation.load(links[Constants.Core.Vocab.apiDocumentation]);
            }
        }
        return Promise.resolve(null);
    }
    function getJsObject(res) {
        var mediaType = res.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd;
        if (res.ok === false) {
            return Promise.reject(new FetchError(res));
        }
        if (mediaType === Constants.MediaTypes.jsonLd) {
            return res.json().then(getFlattenedGraph);
        }
        else {
            if (mediaType === Constants.MediaTypes.ntriples ||
                mediaType === Constants.MediaTypes.ntriples) {
                mediaType = 'application/nquads';
            }
            return res.text().then(function (rdf) {
                return jsonld_1.promises.fromRDF(rdf, { format: mediaType }).then(getFlattenedGraph);
            });
        }
    }
    function getFlattenedGraph(json) {
        return jsonld_1.promises.flatten(json, {})
            .then(function (flattened) { return flattened[Constants.JsonLd.Graph]; });
    }
    return {
        setters:[
            function (li_1) {
                li = li_1;
            },
            function (jsonld_1_1) {
                jsonld_1 = jsonld_1_1;
            },
            function (ApiDocumentation_1_1) {
                ApiDocumentation_1 = ApiDocumentation_1_1;
            },
            function (Constants_1) {
                Constants = Constants_1;
            }],
        execute: function() {
            FetchUtil = (function () {
                function FetchUtil() {
                }
                FetchUtil.fetchResource = function (uri, fetchApiDocs) {
                    if (fetchApiDocs === void 0) { fetchApiDocs = true; }
                    var requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads;
                    return window.fetch(uri, {
                        headers: {
                            accept: requestAcceptHeaders
                        }
                    })
                        .then(function (res) {
                        var apiDocsPromise;
                        if (fetchApiDocs) {
                            apiDocsPromise = fetchDocumentation(res);
                        }
                        else {
                            apiDocsPromise = Promise.resolve(null);
                        }
                        return Promise.all([getJsObject(res), apiDocsPromise])
                            .then(function (values) {
                            return new ExpandedWithDocs(values[0], values[1]);
                        });
                    });
                };
                return FetchUtil;
            }());
            exports_1("FetchUtil", FetchUtil);
            ExpandedWithDocs = (function () {
                function ExpandedWithDocs(resources, apiDocumentation) {
                    this.resources = resources;
                    this.apiDocumentation = apiDocumentation;
                }
                return ExpandedWithDocs;
            }());
            FetchError = (function (_super) {
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
            }(Error));
        }
    }
});

$__System.register("6", [], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var Core, JsonLd, MediaTypes, Headers;
    return {
        setters:[],
        execute: function() {
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
                    "Operation": "hydra:Operation",
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
                    previous: Core.Context['hydra'] + 'previous'
                };
            })(Core = Core || (Core = {}));
            exports_1("Core", Core);
            (function (JsonLd) {
                JsonLd.Graph = '@graph';
                JsonLd.Context = '@context';
                JsonLd.Id = '@id';
                JsonLd.Type = '@type';
            })(JsonLd = JsonLd || (JsonLd = {}));
            exports_1("JsonLd", JsonLd);
            (function (MediaTypes) {
                MediaTypes.jsonLd = 'application/ld+json';
                MediaTypes.ntriples = 'application/n-triples';
                MediaTypes.nquads = 'application/n-quads';
            })(MediaTypes = MediaTypes || (MediaTypes = {}));
            exports_1("MediaTypes", MediaTypes);
            (function (Headers) {
                Headers.Link = 'Link';
                Headers.ContentType = 'Content-Type';
            })(Headers = Headers || (Headers = {}));
            exports_1("Headers", Headers);
        }
    }
});

$__System.register("8", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var JsonLdUtil;
    return {
        setters:[],
        execute: function() {
            JsonLdUtil = (function () {
                function JsonLdUtil() {
                }
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
            }());
            exports_1("JsonLdUtil", JsonLdUtil);
        }
    }
});

$__System.register("1", ["5", "7", "6", "8"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var _, FetchUtil_1, Constants_1, JsonLdUtil_1;
    var Resource, ResourceFactory, PartialCollectionView;
    function findIncomingLinks(object, resources) {
        return _.transform(resources, function (acc, res, key) {
            _.forOwn(res, function (value, predicate) {
                if (value && value[Constants_1.JsonLd.Id] && JsonLdUtil_1.JsonLdUtil.idsEqual(value[Constants_1.JsonLd.Id], object[Constants_1.JsonLd.Id])) {
                    acc.push({
                        subjectId: key,
                        predicate: predicate,
                        subject: resources[key]
                    });
                }
            });
        }, []);
    }
    function resourcifyChildren(res, resources, apiDoc) {
        var self = res;
        if (!resources[res[Constants_1.JsonLd.Id]])
            resources[res[Constants_1.JsonLd.Id]] = res;
        _.forOwn(res, function (value, key) {
            if (key.startsWith('_'))
                return;
            if (_.isArray(value)) {
                self[key] = _.map(value, function (el) { return resourcifyChildren(el, resources, apiDoc); });
                return;
            }
            if (_.isObject(value)) {
                if (value instanceof Resource === false) {
                    value = ResourceFactory.instance.createResource(value, apiDoc, resources);
                }
                self[key] = resourcifyChildren(value, resources, apiDoc);
            }
        });
        return resources[res[Constants_1.JsonLd.Id]];
    }
    return {
        setters:[
            function (_1) {
                _ = _1;
            },
            function (FetchUtil_1_1) {
                FetchUtil_1 = FetchUtil_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            },
            function (JsonLdUtil_1_1) {
                JsonLdUtil_1 = JsonLdUtil_1_1;
            }],
        execute: function() {
            Resource = (function () {
                function Resource(actualResource, apiDoc, incomingLinks) {
                    this._apiDoc = apiDoc;
                    this._incomingLinks = incomingLinks;
                    Object.assign(this, actualResource);
                }
                Object.defineProperty(Resource.prototype, "id", {
                    get: function () {
                        return this['@id'];
                    },
                    enumerable: true,
                    configurable: true
                });
                Resource.prototype.getOperations = function () {
                    var _this = this;
                    var classOperations = this._apiDoc.getOperations(this['@type']);
                    var propertyOperations = _.chain(this._incomingLinks)
                        .map(function (link) { return _this._apiDoc.getOperations(link[0], link[1]); })
                        .union()
                        .value();
                    var operationPromises = [classOperations].concat(propertyOperations);
                    return Promise.all(operationPromises)
                        .then(function (results) { return _.flatten(results); });
                };
                Resource.load = function (uri) {
                    return FetchUtil_1.FetchUtil.fetchResource(uri).then(function (resWithDocs) {
                        var groupedResources = _.chain(resWithDocs.resources)
                            .map(function (resObj) { return ResourceFactory.instance.createResource(resObj, resWithDocs.apiDocumentation, resWithDocs.resources); })
                            .groupBy(function (res) { return JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(res[Constants_1.JsonLd.Id]); })
                            .mapValues(function (arr) { return arr[0]; })
                            .value();
                        _.forEach(groupedResources, function (g) { return resourcifyChildren(g, groupedResources, resWithDocs.apiDocumentation); });
                        var resource = groupedResources[JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(uri)];
                        if (!resource) {
                            return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
                        }
                        return resource;
                    });
                };
                return Resource;
            }());
            exports_1("Resource", Resource);
            ResourceFactory = (function () {
                function ResourceFactory() {
                }
                ResourceFactory.prototype.createResource = function (obj, apiDocumentation, resources) {
                    var incomingLinks = findIncomingLinks(obj, resources);
                    switch (obj[Constants_1.JsonLd.Type]) {
                        case Constants_1.Core.Vocab.PartialCollectionView:
                            return new PartialCollectionView(obj, apiDocumentation, incomingLinks);
                    }
                    return new Resource(obj, apiDocumentation, incomingLinks);
                };
                ResourceFactory.instance = new ResourceFactory();
                return ResourceFactory;
            }());
            exports_1("ResourceFactory", ResourceFactory);
            PartialCollectionView = (function (_super) {
                __extends(PartialCollectionView, _super);
                function PartialCollectionView(actualResource, apiDoc, incomingLinks) {
                    _super.call(this, actualResource, apiDoc, incomingLinks);
                }
                Object.defineProperty(PartialCollectionView.prototype, "collection", {
                    get: function () {
                        var collectionLink = _.find(this._incomingLinks, function (linkArray) {
                            return linkArray.predicate === Constants_1.Core.Vocab.view;
                        });
                        return collectionLink ? collectionLink.subject : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PartialCollectionView.prototype, "first", {
                    get: function () { return this[Constants_1.Core.Vocab.first] || null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PartialCollectionView.prototype, "previous", {
                    get: function () { return this[Constants_1.Core.Vocab.previous] || null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PartialCollectionView.prototype, "next", {
                    get: function () { return this[Constants_1.Core.Vocab.next] || null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PartialCollectionView.prototype, "last", {
                    get: function () { return this[Constants_1.Core.Vocab.last] || null; },
                    enumerable: true,
                    configurable: true
                });
                return PartialCollectionView;
            }(Resource));
            exports_1("PartialCollectionView", PartialCollectionView);
        }
    }
});

})
(function(factory) {
  define(["jsonld","lodash","jasnell/linkeddata-vocabs","li"], factory);
});
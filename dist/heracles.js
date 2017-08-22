(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rdf-ext"), require("jsonld"), require("isomorphic-fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["rdf-ext", "jsonld", "isomporphic-fetch"], factory);
	else if(typeof exports === 'object')
		exports["Hydra"] = factory(require("rdf-ext"), require("jsonld"), require("isomporphic-fetch"));
	else
		root["Hydra"] = factory(root["rdf"], root["jsonld"], root["fetch"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_42__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isDescriptor */
/* harmony export (immutable) */ __webpack_exports__["c"] = decorate;
/* harmony export (immutable) */ __webpack_exports__["g"] = metaFor;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getOwnKeys; });
/* harmony export (immutable) */ __webpack_exports__["e"] = getOwnPropertyDescriptors;
/* harmony export (immutable) */ __webpack_exports__["b"] = createDefaultSetter;
/* harmony export (immutable) */ __webpack_exports__["a"] = bind;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return warn; });
/* harmony export (immutable) */ __webpack_exports__["f"] = internalDeprecation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_initialize__ = __webpack_require__(7);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



var defineProperty = Object.defineProperty,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getOwnPropertyNames = Object.getOwnPropertyNames,
    getOwnPropertySymbols = Object.getOwnPropertySymbols;


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
      return handleDescriptor.apply(undefined, Array.prototype.slice.call(arguments).concat([entryArgs]));
    };
  }
}

var Meta = (_class = function Meta() {
  _classCallCheck(this, Meta);

  _initDefineProp(this, 'debounceTimeoutIds', _descriptor, this);

  _initDefineProp(this, 'throttleTimeoutIds', _descriptor2, this);

  _initDefineProp(this, 'throttlePreviousTimestamps', _descriptor3, this);

  _initDefineProp(this, 'throttleTrailingArgs', _descriptor4, this);

  _initDefineProp(this, 'profileLastRan', _descriptor5, this);
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'debounceTimeoutIds', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'throttleTimeoutIds', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'throttlePreviousTimestamps', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'throttleTrailingArgs', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'profileLastRan', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class);


var META_KEY = typeof Symbol === 'function' ? Symbol('__core_decorators__') : '__core_decorators__';

function metaFor(obj) {
  if (obj.hasOwnProperty(META_KEY) === false) {
    defineProperty(obj, META_KEY, {
      // Defaults: NOT enumerable, configurable, or writable
      value: new Meta()
    });
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
      // IS enumerable when reassigned by the outside word
      enumerable: true,
      value: newValue
    });

    return newValue;
  };
}

function bind(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else {
    return function __autobind__() {
      return fn.apply(context, arguments);
    };
  }
}

var warn = function () {
  if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) !== 'object' || !console || typeof console.warn !== 'function') {
    return function () {};
  } else {
    return bind(console.warn, console);
  }
}();

var seenDeprecations = {};
function internalDeprecation(msg) {
  if (seenDeprecations[msg] !== true) {
    seenDeprecations[msg] = true;
    warn('DEPRECATION: ' + msg);
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        code: Core.Context['hydra'] + 'code',
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonld_1 = __webpack_require__(5);
var core_decorators_1 = __webpack_require__(6);
var Constants_1 = __webpack_require__(1);
var _isProcessed = new WeakMap();
var _apiDocumentation = new WeakMap();
var _incomingLinks = new WeakMap();
var _heracles = new WeakMap();
var _supportedOperation = new WeakMap();
var _resource = new WeakMap();
var Resource = (function () {
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
        if (context === void 0) { context = null; }
        return jsonld_1.promises.compact(this, context || Constants_1.Core.Context);
    };
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Resource.prototype, "id", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Resource.prototype, "types", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Boolean])
    ], Resource.prototype, "_processed", null);
    return Resource;
}());
exports.Resource = Resource;
var HydraResource = (function (_super) {
    __extends(HydraResource, _super);
    function HydraResource(heracles, actualResource, apiDoc, incomingLinks) {
        var _this = _super.call(this, actualResource) || this;
        _apiDocumentation.set(_this, apiDoc);
        _incomingLinks.set(_this, incomingLinks);
        _heracles.set(_this, heracles);
        return _this;
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
                classOperations = this[Constants_1.JsonLd.Type].map(function (type) { return _this.apiDocumentation.getOperations(type); });
            }
            else {
                classOperations = [this.apiDocumentation.getOperations(this[Constants_1.JsonLd.Type])];
            }
            var mappedLinks = this.getIncomingLinks()
                .map(function (link) { return link.subject.types.map(function (type) { return ({ type: type, predicate: link.predicate }); }); });
            var flattened = [].concat.apply([], mappedLinks);
            var propertyOperations = flattened.map(function (link) { return _this.apiDocumentation.getOperations(link.type, link.predicate); });
            var operations = [].concat.apply([], classOperations.concat(propertyOperations));
            return operations.map(function (supportedOperation) {
                return new Operation(supportedOperation, _this._heracles, _this);
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HydraResource.prototype, "apiDocumentation", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HydraResource.prototype, "_heracles", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HydraResource.prototype, "operations", null);
    return HydraResource;
}(Resource));
exports.HydraResource = HydraResource;
var Operation = (function (_super) {
    __extends(Operation, _super);
    function Operation(supportedOperation, heracles, resource) {
        var _this = _super.call(this, resource) || this;
        if (!supportedOperation) {
            throw new Error('Missing supportedOperation parameter');
        }
        if (!heracles) {
            throw new Error('Missing heracles parameter');
        }
        _supportedOperation.set(_this, supportedOperation);
        _resource.set(_this, resource);
        _heracles.set(_this, heracles);
        return _this;
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
        if (mediaType === void 0) { mediaType = Constants_1.MediaTypes.jsonLd; }
        return this._heracles.invokeOperation(this, this._resource.id, body, mediaType);
    };
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Operation.prototype, "_supportedOperation", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Operation.prototype, "_resource", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], Operation.prototype, "_heracles", null);
    return Operation;
}(Resource));
exports.Operation = Operation;
var PartialCollectionView = (function (_super) {
    __extends(PartialCollectionView, _super);
    function PartialCollectionView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], PartialCollectionView.prototype, "first", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], PartialCollectionView.prototype, "previous", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], PartialCollectionView.prototype, "next", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], PartialCollectionView.prototype, "last", null);
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], PartialCollectionView.prototype, "collection", null);
    return PartialCollectionView;
}(HydraResource));
exports.PartialCollectionView = PartialCollectionView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__override__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "override", function() { return __WEBPACK_IMPORTED_MODULE_0__override__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__deprecate__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deprecate", function() { return __WEBPACK_IMPORTED_MODULE_1__deprecate__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deprecated", function() { return __WEBPACK_IMPORTED_MODULE_1__deprecate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__suppress_warnings__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "suppressWarnings", function() { return __WEBPACK_IMPORTED_MODULE_2__suppress_warnings__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__memoize__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "memoize", function() { return __WEBPACK_IMPORTED_MODULE_3__memoize__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autobind__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return __WEBPACK_IMPORTED_MODULE_4__autobind__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__readonly__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "readonly", function() { return __WEBPACK_IMPORTED_MODULE_5__readonly__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__enumerable__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "enumerable", function() { return __WEBPACK_IMPORTED_MODULE_6__enumerable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nonenumerable__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "nonenumerable", function() { return __WEBPACK_IMPORTED_MODULE_7__nonenumerable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nonconfigurable__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "nonconfigurable", function() { return __WEBPACK_IMPORTED_MODULE_8__nonconfigurable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__debounce__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return __WEBPACK_IMPORTED_MODULE_9__debounce__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__throttle__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_10__throttle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__decorate__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "decorate", function() { return __WEBPACK_IMPORTED_MODULE_11__decorate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mixin__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mixin", function() { return __WEBPACK_IMPORTED_MODULE_12__mixin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mixins", function() { return __WEBPACK_IMPORTED_MODULE_12__mixin__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lazy_initialize__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "lazyInitialize", function() { return __WEBPACK_IMPORTED_MODULE_13__lazy_initialize__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__time__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "time", function() { return __WEBPACK_IMPORTED_MODULE_14__time__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__extendDescriptor__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendDescriptor", function() { return __WEBPACK_IMPORTED_MODULE_15__extendDescriptor__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__profile__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "profile", function() { return __WEBPACK_IMPORTED_MODULE_16__profile__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__applyDecorators__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyDecorators", function() { return __WEBPACK_IMPORTED_MODULE_17__applyDecorators__["a"]; });
/**
 * core-decorators.js
 * (c) 2017 Jay Phelps and contributors
 * MIT Licensed
 * https://github.com/jayphelps/core-decorators.js
 * @license
 */


















// Helper to apply decorators to a class without transpiler support


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lazyInitialize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);

var defineProperty = Object.defineProperty;


function handleDescriptor(target, key, descriptor) {
  var configurable = descriptor.configurable,
      enumerable = descriptor.enumerable,
      initializer = descriptor.initializer,
      value = descriptor.value;

  return {
    configurable: configurable,
    enumerable: enumerable,

    get: function get() {
      // This happens if someone accesses the
      // property directly on the prototype
      if (this === target) {
        return;
      }

      var ret = initializer ? initializer.call(this) : value;

      defineProperty(this, key, {
        configurable: configurable,
        enumerable: enumerable,
        writable: true,
        value: ret
      });

      return ret;
    },


    set: Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["b" /* createDefaultSetter */])(key)
  };
}

function lazyInitialize() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vocabs_1 = __webpack_require__(3);
var Types = __webpack_require__(2);
var DocTypes = __webpack_require__(29);
var Constants_1 = __webpack_require__(1);
var LodashUtil_1 = __webpack_require__(9);
var ResourceFactory = (function () {
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
}());
exports.ResourceFactory = ResourceFactory;
var IncomingLink = (function () {
    function IncomingLink(id, predicate, resources) {
        this._id = id;
        this._predicate = predicate;
        Object.defineProperty(this, 'subject', {
            get: function () { return resources[id]; }
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
}());
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function forOwn(obj, iteratee) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(key))
            continue;
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(33);
exports.encode = exports.stringify = __webpack_require__(34);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Resources_1 = __webpack_require__(2);
var ResourceFactory_1 = __webpack_require__(8);
var heracles_1 = __webpack_require__(30);
exports.ResourceFactory = ResourceFactory_1.ResourceFactory;
exports.Resource = Resources_1.HydraResource;
exports.Hydra = new heracles_1.Heracles();


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = override;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var GENERIC_FUNCTION_ERROR = '{child} does not properly override {parent}';
var FUNCTION_REGEXP = /^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/;

var SyntaxErrorReporter = function () {
  _createClass(SyntaxErrorReporter, [{
    key: '_getTopic',
    value: function _getTopic(descriptor) {
      if (descriptor === undefined) {
        return null;
      }

      if ('value' in descriptor) {
        return descriptor.value;
      }

      if ('get' in descriptor) {
        return descriptor.get;
      }

      if ('set' in descriptor) {
        return descriptor.set;
      }
    }
  }, {
    key: '_extractTopicSignature',
    value: function _extractTopicSignature(topic) {
      switch (typeof topic === 'undefined' ? 'undefined' : _typeof(topic)) {
        case 'function':
          return this._extractFunctionSignature(topic);
        default:
          return this.key;
      }
    }
  }, {
    key: '_extractFunctionSignature',
    value: function _extractFunctionSignature(fn) {
      var _this = this;

      return fn.toString().replace(FUNCTION_REGEXP, function (match) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.key;
        var params = arguments[2];
        return name + params;
      });
    }
  }, {
    key: 'key',
    get: function get() {
      return this.childDescriptor.key;
    }
  }, {
    key: 'parentNotation',
    get: function get() {
      return this.parentKlass.constructor.name + '#' + this.parentPropertySignature;
    }
  }, {
    key: 'childNotation',
    get: function get() {
      return this.childKlass.constructor.name + '#' + this.childPropertySignature;
    }
  }, {
    key: 'parentTopic',
    get: function get() {
      return this._getTopic(this.parentDescriptor);
    }
  }, {
    key: 'childTopic',
    get: function get() {
      return this._getTopic(this.childDescriptor);
    }
  }, {
    key: 'parentPropertySignature',
    get: function get() {
      return this._extractTopicSignature(this.parentTopic);
    }
  }, {
    key: 'childPropertySignature',
    get: function get() {
      return this._extractTopicSignature(this.childTopic);
    }
  }]);

  function SyntaxErrorReporter(parentKlass, childKlass, parentDescriptor, childDescriptor) {
    _classCallCheck(this, SyntaxErrorReporter);

    this.parentKlass = parentKlass;
    this.childKlass = childKlass;
    this.parentDescriptor = parentDescriptor;
    this.childDescriptor = childDescriptor;
  }

  _createClass(SyntaxErrorReporter, [{
    key: 'assert',
    value: function assert(condition) {
      var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (condition !== true) {
        this.error(GENERIC_FUNCTION_ERROR + msg);
      }
    }
  }, {
    key: 'error',
    value: function error(msg) {
      var _this2 = this;

      msg = msg
      // Replace lazily, because they actually might not
      // be available in all cases
      .replace('{parent}', function (m) {
        return _this2.parentNotation;
      }).replace('{child}', function (m) {
        return _this2.childNotation;
      });
      throw new SyntaxError(msg);
    }
  }]);

  return SyntaxErrorReporter;
}();

function getDescriptorType(descriptor) {
  if (descriptor.hasOwnProperty('value')) {
    return 'data';
  }

  if (descriptor.hasOwnProperty('get') || descriptor.hasOwnProperty('set')) {
    return 'accessor';
  }

  // If none of them exist, browsers treat it as
  // a data descriptor with a value of `undefined`
  return 'data';
}

function checkFunctionSignatures(parent, child, reporter) {
  reporter.assert(parent.length === child.length);
}

function checkDataDescriptors(parent, child, reporter) {
  var parentValueType = _typeof(parent.value);
  var childValueType = _typeof(child.value);

  if (parentValueType === 'undefined' && childValueType === 'undefined') {
    // class properties can be any expression, which isn't ran until the
    // the instance is created, so we can't reliably get type information
    // for them yet (per spec). Perhaps when Babel includes flow-type info
    // in runtime? Tried regex solutions, but super hacky and only feasible
    // on primitives, which is confusing for usage...
    reporter.error('descriptor values are both undefined. (class properties are are not currently supported)\'');
  }

  if (parentValueType !== childValueType) {
    var isFunctionOverUndefined = childValueType === 'function' && parentValueType === undefined;
    // Even though we don't support class properties, this
    // will still handle more than just functions, just in case.
    // Shadowing an undefined value is an error if the inherited
    // value was undefined (usually a class property, not a method)
    if (isFunctionOverUndefined || parentValueType !== undefined) {
      reporter.error('value types do not match. {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
    }
  }

  // Switch, in preparation for supporting more types
  switch (childValueType) {
    case 'function':
      checkFunctionSignatures(parent.value, child.value, reporter);
      break;

    default:
      reporter.error('Unexpected error. Please file a bug with: {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
      break;
  }
}

function checkAccessorDescriptors(parent, child, reporter) {
  var parentHasGetter = typeof parent.get === 'function';
  var childHasGetter = typeof child.get === 'function';
  var parentHasSetter = typeof parent.set === 'function';
  var childHasSetter = typeof child.set === 'function';

  if (parentHasGetter || childHasGetter) {
    if (!parentHasGetter && parentHasSetter) {
      reporter.error('{parent} is setter but {child} is getter');
    }

    if (!childHasGetter && childHasSetter) {
      reporter.error('{parent} is getter but {child} is setter');
    }

    checkFunctionSignatures(parent.get, child.get, reporter);
  }

  if (parentHasSetter || childHasSetter) {
    if (!parentHasSetter && parentHasGetter) {
      reporter.error('{parent} is getter but {child} is setter');
    }

    if (!childHasSetter && childHasGetter) {
      reporter.error('{parent} is setter but {child} is getter');
    }

    checkFunctionSignatures(parent.set, child.set, reporter);
  }
}

function checkDescriptors(parent, child, reporter) {
  var parentType = getDescriptorType(parent);
  var childType = getDescriptorType(child);

  if (parentType !== childType) {
    reporter.error('descriptor types do not match. {parent} is "' + parentType + '", {child} is "' + childType + '"');
  }

  switch (childType) {
    case 'data':
      checkDataDescriptors(parent, child, reporter);
      break;

    case 'accessor':
      checkAccessorDescriptors(parent, child, reporter);
      break;
  }
}

var suggestionTransforms = [function (key) {
  return key.toLowerCase();
}, function (key) {
  return key.toUpperCase();
}, function (key) {
  return key + 's';
}, function (key) {
  return key.slice(0, -1);
}, function (key) {
  return key.slice(1, key.length);
}];

function findPossibleAlternatives(superKlass, key) {
  for (var i = 0, l = suggestionTransforms.length; i < l; i++) {
    var fn = suggestionTransforms[i];
    var suggestion = fn(key);

    if (suggestion in superKlass) {
      return suggestion;
    }
  }

  return null;
}

function handleDescriptor(target, key, descriptor) {
  descriptor.key = key;
  var superKlass = Object.getPrototypeOf(target);
  var superDescriptor = Object.getOwnPropertyDescriptor(superKlass, key);
  var reporter = new SyntaxErrorReporter(superKlass, target, superDescriptor, descriptor);

  if (superDescriptor === undefined) {
    var suggestedKey = findPossibleAlternatives(superKlass, key);
    var suggestion = suggestedKey ? '\n\n  Did you mean "' + suggestedKey + '"?' : '';
    reporter.error('No descriptor matching {child} was found on the prototype chain.' + suggestion);
  }

  checkDescriptors(superDescriptor, descriptor, reporter);

  return descriptor;
}

function override() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deprecate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var DEFAULT_MSG = 'This function will be removed in future versions.';

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      msg = _ref2$ === undefined ? DEFAULT_MSG : _ref2$,
      _ref2$2 = _ref2[1],
      options = _ref2$2 === undefined ? {} : _ref2$2;

  if (typeof descriptor.value !== 'function') {
    throw new SyntaxError('Only functions can be marked as deprecated');
  }

  var methodSignature = target.constructor.name + '#' + key;

  if (options.url) {
    msg += '\n\n    See ' + options.url + ' for more details.\n\n';
  }

  return _extends({}, descriptor, {
    value: function deprecationWrapper() {
      Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["h" /* warn */])('DEPRECATION ' + methodSignature + ': ' + msg);
      return descriptor.value.apply(this, arguments);
    }
  });
}

function deprecate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = suppressWarnings;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



function suppressedWarningNoop() {
  // Warnings are currently suppressed via @suppressWarnings
}

function applyWithoutWarnings(context, fn, args) {
  if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object') {
    var nativeWarn = console.warn;
    console.warn = suppressedWarningNoop;
    var ret = fn.apply(context, args);
    console.warn = nativeWarn;
    return ret;
  } else {
    return fn.apply(context, args);
  }
}

function handleDescriptor(target, key, descriptor) {
  return _extends({}, descriptor, {
    value: function suppressWarningsWrapper() {
      return applyWithoutWarnings(this, descriptor.value, arguments);
    }
  });
}

function suppressWarnings() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = memoize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function toObject(cache, value) {
  if (value === Object(value)) {
    return value;
  }
  return cache[value] || (cache[value] = {});
}

function applyAndCache(context, fn, args, cache, signature) {
  var ret = fn.apply(context, args);
  cache[signature] = ret;
  return ret;
}

function metaForDescriptor(descriptor) {
  var fn = void 0,
      wrapKey = void 0;

  // This is ugly code, but way faster than other
  // ways I tried that *looked* pretty

  if (descriptor.value) {
    fn = descriptor.value;
    wrapKey = 'value';
  } else if (descriptor.get) {
    fn = descriptor.get;
    wrapKey = 'get';
  } else if (descriptor.set) {
    fn = descriptor.set;
    wrapKey = 'set';
  }

  return { fn: fn, wrapKey: wrapKey };
}

function handleDescriptor(target, key, descriptor) {
  var _metaForDescriptor = metaForDescriptor(descriptor),
      fn = _metaForDescriptor.fn,
      wrapKey = _metaForDescriptor.wrapKey;

  var argumentCache = new WeakMap();
  var signatureCache = Object.create(null);
  var primativeRefCache = Object.create(null);
  var argumentIdCounter = 0;

  return _extends({}, descriptor, _defineProperty({}, wrapKey, function memoizeWrapper() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var signature = '0';

    for (var i = 0, l = args.length; i < l; i++) {
      var arg = args[i];
      var argRef = toObject(primativeRefCache, arg);
      var argKey = argumentCache.get(argRef);

      if (argKey === undefined) {
        argKey = ++argumentIdCounter;
        argumentCache.set(argRef, argKey);
      }

      signature += argKey;
    }

    return signatureCache[signature] || applyAndCache(this, fn, arguments, signatureCache, signature);
  }));
}

function memoize() {
  Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["f" /* internalDeprecation */])('@memoize is deprecated and will be removed shortly. Use @memoize from lodash-decorators.\n\n  https://www.npmjs.com/package/lodash-decorators');

  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = autobind;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }


var defineProperty = Object.defineProperty,
    getPrototypeOf = Object.getPrototypeOf;


var mapStore = void 0;

function getBoundSuper(obj, fn) {
  if (typeof WeakMap === 'undefined') {
    throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()\n      See https://github.com/jayphelps/core-decorators.js/issues/20');
  }

  if (!mapStore) {
    mapStore = new WeakMap();
  }

  if (mapStore.has(obj) === false) {
    mapStore.set(obj, new WeakMap());
  }

  var superStore = mapStore.get(obj);

  if (superStore.has(fn) === false) {
    superStore.set(fn, Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["a" /* bind */])(fn, obj));
  }

  return superStore.get(fn);
}

function autobindClass(klass) {
  var descs = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["e" /* getOwnPropertyDescriptors */])(klass.prototype);
  var keys = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["d" /* getOwnKeys */])(descs);

  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var desc = descs[key];

    if (typeof desc.value !== 'function' || key === 'constructor') {
      continue;
    }

    defineProperty(klass.prototype, key, autobindMethod(klass.prototype, key, desc));
  }
}

function autobindMethod(target, key, _ref) {
  var fn = _ref.value,
      configurable = _ref.configurable,
      enumerable = _ref.enumerable;

  if (typeof fn !== 'function') {
    throw new SyntaxError('@autobind can only be used on functions, not: ' + fn);
  }

  var constructor = target.constructor;


  return {
    configurable: configurable,
    enumerable: enumerable,

    get: function get() {
      // Class.prototype.key lookup
      // Someone accesses the property directly on the prototype on which it is
      // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
      if (this === target) {
        return fn;
      }

      // Class.prototype.key lookup
      // Someone accesses the property directly on a prototype but it was found
      // up the chain, not defined directly on it
      // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
      if (this.constructor !== constructor && getPrototypeOf(this).constructor === constructor) {
        return fn;
      }

      // Autobound method calling super.sameMethod() which is also autobound and so on.
      if (this.constructor !== constructor && key in this.constructor.prototype) {
        return getBoundSuper(this, fn);
      }

      var boundFn = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["a" /* bind */])(fn, this);

      defineProperty(this, key, {
        configurable: true,
        writable: true,
        // NOT enumerable when it's a bound method
        enumerable: false,
        value: boundFn
      });

      return boundFn;
    },

    set: Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["b" /* createDefaultSetter */])(key)
  };
}

function handle(args) {
  if (args.length === 1) {
    return autobindClass.apply(undefined, _toConsumableArray(args));
  } else {
    return autobindMethod.apply(undefined, _toConsumableArray(args));
  }
}

function autobind() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 0) {
    return function () {
      return handle(arguments);
    };
  } else {
    return handle(args);
  }
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = readonly;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);


function handleDescriptor(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

function readonly() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = enumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);


function handleDescriptor(target, key, descriptor) {
  descriptor.enumerable = true;
  return descriptor;
}

function enumerable() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = nonenumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);


function handleDescriptor(target, key, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

function nonenumerable() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = nonconfigurable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);


function handleDescriptor(target, key, descriptor) {
  descriptor.configurable = false;
  return descriptor;
}

function nonconfigurable() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = debounce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var DEFAULT_TIMEOUT = 300;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      wait = _ref2$ === undefined ? DEFAULT_TIMEOUT : _ref2$,
      _ref2$2 = _ref2[1],
      immediate = _ref2$2 === undefined ? false : _ref2$2;

  var callback = descriptor.value;

  if (typeof callback !== 'function') {
    throw new SyntaxError('Only functions can be debounced');
  }

  return _extends({}, descriptor, {
    value: function value() {
      var _this = this;

      var _metaFor = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["g" /* metaFor */])(this),
          debounceTimeoutIds = _metaFor.debounceTimeoutIds;

      var timeout = debounceTimeoutIds[key];
      var callNow = immediate && !timeout;
      var args = arguments;

      clearTimeout(timeout);

      debounceTimeoutIds[key] = setTimeout(function () {
        delete debounceTimeoutIds[key];
        if (!immediate) {
          callback.apply(_this, args);
        }
      }, wait);

      if (callNow) {
        callback.apply(this, args);
      }
    }
  });
}

function debounce() {
  Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["f" /* internalDeprecation */])('@debounce is deprecated and will be removed shortly. Use @debounce from lodash-decorators.\n\n  https://www.npmjs.com/package/lodash-decorators');

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throttle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var DEFAULT_TIMEOUT = 300;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      wait = _ref2$ === undefined ? DEFAULT_TIMEOUT : _ref2$,
      _ref2$2 = _ref2[1],
      options = _ref2$2 === undefined ? {} : _ref2$2;

  var callback = descriptor.value;

  if (typeof callback !== 'function') {
    throw new SyntaxError('Only functions can be throttled');
  }

  if (options.leading !== false) {
    options.leading = true;
  }

  if (options.trailing !== false) {
    options.trailing = true;
  }

  return _extends({}, descriptor, {
    value: function value() {
      var _this = this;

      var meta = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["g" /* metaFor */])(this);
      var throttleTimeoutIds = meta.throttleTimeoutIds,
          throttlePreviousTimestamps = meta.throttlePreviousTimestamps;

      var timeout = throttleTimeoutIds[key];
      // last execute timestamp
      var previous = throttlePreviousTimestamps[key] || 0;
      var now = Date.now();

      if (options.trailing) {
        meta.throttleTrailingArgs = arguments;
      }

      // if first be called and disable the execution on the leading edge
      // set last execute timestamp to now
      if (!previous && options.leading === false) {
        previous = now;
      }

      var remaining = wait - (now - previous);

      if (remaining <= 0) {
        clearTimeout(timeout);
        delete throttleTimeoutIds[key];
        throttlePreviousTimestamps[key] = now;
        callback.apply(this, arguments);
      } else if (!timeout && options.trailing) {
        throttleTimeoutIds[key] = setTimeout(function () {
          throttlePreviousTimestamps[key] = options.leading === false ? 0 : Date.now();
          delete throttleTimeoutIds[key];
          callback.apply(_this, meta.throttleTrailingArgs);
          // don't leak memory!
          meta.throttleTrailingArgs = null;
        }, remaining);
      }
    }
  });
}

function throttle() {
  Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["f" /* internalDeprecation */])('@throttle is deprecated and will be removed shortly. Use @throttle from lodash-decorators.\n\n  https://www.npmjs.com/package/lodash-decorators');

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = decorate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }


var defineProperty = Object.defineProperty;


function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _toArray(_ref),
      decorator = _ref2[0],
      args = _ref2.slice(1);

  var configurable = descriptor.configurable,
      enumerable = descriptor.enumerable,
      writable = descriptor.writable;

  var originalGet = descriptor.get;
  var originalSet = descriptor.set;
  var originalValue = descriptor.value;
  var isGetter = !!originalGet;

  return {
    configurable: configurable,
    enumerable: enumerable,
    get: function get() {
      var fn = isGetter ? originalGet.call(this) : originalValue;
      var value = decorator.call.apply(decorator, [this, fn].concat(_toConsumableArray(args)));

      if (isGetter) {
        return value;
      } else {
        var desc = {
          configurable: configurable,
          enumerable: enumerable
        };

        desc.value = value;
        desc.writable = writable;

        defineProperty(this, key, desc);

        return value;
      }
    },

    set: isGetter ? originalSet : Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["b" /* createDefaultSetter */])()
  };
}

function decorate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var defineProperty = Object.defineProperty,
    getPrototypeOf = Object.getPrototypeOf;


function buggySymbol(symbol) {
  return Object.prototype.toString.call(symbol) === '[object Symbol]' && (typeof symbol === 'undefined' ? 'undefined' : _typeof(symbol)) === 'object';
}

function hasProperty(prop, obj) {
  // We have to traverse manually prototypes' chain for polyfilled ES6 Symbols
  // like "in" operator does.
  // I.e.: Babel 5 Symbol polyfill stores every created symbol in Object.prototype.
  // That's why we cannot use construction like "prop in obj" to check, if needed
  // prop actually exists in given object/prototypes' chain.
  if (buggySymbol(prop)) {
    do {
      if (obj === Object.prototype) {
        // Polyfill assigns undefined as value for stored symbol key.
        // We can assume in this special case if there is nothing assigned it doesn't exist.
        return typeof obj[prop] !== 'undefined';
      }
      if (obj.hasOwnProperty(prop)) {
        return true;
      }
    } while (obj = getPrototypeOf(obj));
    return false;
  } else {
    return prop in obj;
  }
}

function handleClass(target, mixins) {
  if (!mixins.length) {
    throw new SyntaxError('@mixin() class ' + target.name + ' requires at least one mixin as an argument');
  }

  for (var i = 0, l = mixins.length; i < l; i++) {
    var descs = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["e" /* getOwnPropertyDescriptors */])(mixins[i]);
    var keys = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["d" /* getOwnKeys */])(descs);

    for (var j = 0, k = keys.length; j < k; j++) {
      var key = keys[j];

      if (!hasProperty(key, target.prototype)) {
        defineProperty(target.prototype, key, descs[key]);
      }
    }
  }
}

function mixin() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["f" /* internalDeprecation */])('@mixin is deprecated and will be removed shortly. Use @mixin from lodash-decorators.\n\n  https://www.npmjs.com/package/lodash-decorators');

  if (typeof mixins[0] === 'function') {
    return handleClass(mixins[0], []);
  } else {
    return function (target) {
      return handleClass(target, mixins);
    };
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultConsole */
/* harmony export (immutable) */ __webpack_exports__["a"] = time;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var labels = {};

// Exported for mocking in tests
var defaultConsole = {
  time: console.time ? console.time.bind(console) : function (label) {
    labels[label] = new Date();
  },
  timeEnd: console.timeEnd ? console.timeEnd.bind(console) : function (label) {
    var timeNow = new Date();
    var timeTaken = timeNow - labels[label];
    delete labels[label];
    console.log(label + ': ' + timeTaken + 'ms');
  }
};

var count = 0;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      prefix = _ref2$ === undefined ? null : _ref2$,
      _ref2$2 = _ref2[1],
      console = _ref2$2 === undefined ? defaultConsole : _ref2$2;

  var fn = descriptor.value;

  if (prefix === null) {
    prefix = target.constructor.name + '.' + key;
  }

  if (typeof fn !== 'function') {
    throw new SyntaxError('@time can only be used on functions, not: ' + fn);
  }

  return _extends({}, descriptor, {
    value: function value() {
      var label = prefix + '-' + count;
      count++;
      console.time(label);

      try {
        return fn.apply(this, arguments);
      } finally {
        console.timeEnd(label);
      }
    }
  });
}

function time() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extendDescriptor;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


var getPrototypeOf = Object.getPrototypeOf,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;


function handleDescriptor(target, key, descriptor) {
  var superKlass = getPrototypeOf(target);
  var superDesc = getOwnPropertyDescriptor(superKlass, key);

  return _extends({}, superDesc, {
    value: descriptor.value,
    initializer: descriptor.initializer,
    get: descriptor.get || superDesc.get,
    set: descriptor.set || superDesc.set
  });
}

function extendDescriptor() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultConsole */
/* harmony export (immutable) */ __webpack_exports__["a"] = profile;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var oc = console;

// Exported for mocking in tests
var defaultConsole = {
  profile: console.profile ? Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["a" /* bind */])(console.profile, console) : function () {},
  profileEnd: console.profileEnd ? Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["a" /* bind */])(console.profileEnd, console) : function () {},
  warn: __WEBPACK_IMPORTED_MODULE_0__private_utils__["h" /* warn */]
};

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      _ref2$ = _ref2[0],
      prefix = _ref2$ === undefined ? null : _ref2$,
      _ref2$2 = _ref2[1],
      onceThrottleOrFunction = _ref2$2 === undefined ? false : _ref2$2,
      _ref2$3 = _ref2[2],
      console = _ref2$3 === undefined ? defaultConsole : _ref2$3;

  if (!profile.__enabled) {
    if (!profile.__warned) {
      console.warn('console.profile is not supported. All @profile decorators are disabled.');
      profile.__warned = true;
    }
    return descriptor;
  }

  var fn = descriptor.value;

  if (prefix === null) {
    prefix = target.constructor.name + '.' + key;
  }

  if (typeof fn !== 'function') {
    throw new SyntaxError('@profile can only be used on functions, not: ' + fn);
  }

  return _extends({}, descriptor, {
    value: function value() {
      var now = Date.now();
      var meta = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["g" /* metaFor */])(this);
      if (onceThrottleOrFunction === true && !meta.profileLastRan || onceThrottleOrFunction === false || typeof onceThrottleOrFunction === 'number' && now - meta.profileLastRan > onceThrottleOrFunction || typeof onceThrottleOrFunction === 'function' && onceThrottleOrFunction.apply(this, arguments)) {
        console.profile(prefix);
        meta.profileLastRan = now;
      }

      try {
        return fn.apply(this, arguments);
      } finally {
        console.profileEnd(prefix);
      }
    }
  });
}

function profile() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

// Only Chrome, Firefox, and Edge support profile.
// Exposing properties for testing.
profile.__enabled = !!console.profile;
profile.__warned = false;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyDecorators;
var defineProperty = Object.defineProperty,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;


function applyDecorators(Class, props) {
  var prototype = Class.prototype;


  for (var key in props) {
    var decorators = props[key];

    for (var i = 0, l = decorators.length; i < l; i++) {
      var decorator = decorators[i];

      defineProperty(prototype, key, decorator(prototype, key, getOwnPropertyDescriptor(prototype, key)));
    }
  }

  return Class;
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = __webpack_require__(1);
var Vocabs_1 = __webpack_require__(3);
var Resources_1 = __webpack_require__(2);
var core_decorators_1 = __webpack_require__(6);
var heraclesWeakMap = new WeakMap();
var ApiDocumentation = (function (_super) {
    __extends(ApiDocumentation, _super);
    function ApiDocumentation(heracles, apiDoc) {
        var _this = _super.call(this, apiDoc) || this;
        heraclesWeakMap.set(_this, heracles);
        return _this;
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
        return this.classes.find(function (clas) { return clas[Constants_1.JsonLd.Id] === classId; }) || null;
    };
    ApiDocumentation.prototype.getEntrypoint = function () {
        return this._heracles.loadResource(this[Constants_1.Core.Vocab.entrypoint][Constants_1.JsonLd.Id]);
    };
    __decorate([
        core_decorators_1.nonenumerable,
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], ApiDocumentation.prototype, "_heracles", null);
    return ApiDocumentation;
}(Resources_1.Resource));
exports.ApiDocumentation = ApiDocumentation;
var DocumentedResource = (function (_super) {
    __extends(DocumentedResource, _super);
    function DocumentedResource(hydraResource) {
        return _super.call(this, hydraResource) || this;
    }
    Object.defineProperty(DocumentedResource.prototype, "description", {
        get: function () {
            return this[Constants_1.Core.Vocab.description] ||
                this[Vocabs_1.rdfs.comment] ||
                this[Vocabs_1.Schema.description];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentedResource.prototype, "title", {
        get: function () {
            return this[Constants_1.Core.Vocab.title] ||
                this[Vocabs_1.rdfs.label] ||
                this[Vocabs_1.Schema.title];
        },
        enumerable: true,
        configurable: true
    });
    return DocumentedResource;
}(Resources_1.Resource));
exports.DocumentedResource = DocumentedResource;
var SupportedOperation = (function (_super) {
    __extends(SupportedOperation, _super);
    function SupportedOperation(hydraOperation, heracles) {
        var _this = _super.call(this, hydraOperation) || this;
        heraclesWeakMap.set(_this, heracles);
        return _this;
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
}(DocumentedResource));
exports.SupportedOperation = SupportedOperation;
var SupportedProperty = (function (_super) {
    __extends(SupportedProperty, _super);
    function SupportedProperty(hydraSupportedProperty) {
        return _super.call(this, hydraSupportedProperty) || this;
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
}(DocumentedResource));
exports.SupportedProperty = SupportedProperty;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(hydraClass) {
        return _super.call(this, hydraClass) || this;
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
}(DocumentedResource));
exports.Class = Class;
var StatusCodeDescription = (function (_super) {
    __extends(StatusCodeDescription, _super);
    function StatusCodeDescription() {
        return _super !== null && _super.apply(this, arguments) || this;
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
}(Resources_1.Resource));
exports.StatusCodeDescription = StatusCodeDescription;
var RdfProperty = (function (_super) {
    __extends(RdfProperty, _super);
    function RdfProperty() {
        return _super !== null && _super.apply(this, arguments) || this;
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
}(DocumentedResource));
exports.RdfProperty = RdfProperty;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FetchUtil_1 = __webpack_require__(31);
var Constants_1 = __webpack_require__(1);
var JsonLdUtil_1 = __webpack_require__(43);
var ResourceFactory_1 = __webpack_require__(8);
var LodashUtil_1 = __webpack_require__(9);
var Heracles = (function () {
    function Heracles() {
        this.resourceFactory = new ResourceFactory_1.ResourceFactory();
    }
    Heracles.prototype.loadResource = function (uri) {
        return FetchUtil_1.FetchUtil.fetchResource(uri)
            .then(processFetchUtilResponse.call(this, uri));
    };
    Heracles.prototype.loadDocumentation = function (uri) {
        var _this = this;
        return FetchUtil_1.FetchUtil.fetchResource(uri)
            .then(function (response) {
            var typeOverrides = {};
            typeOverrides[uri] = Constants_1.Core.Vocab.ApiDocumentation;
            return getRequestedObject(_this, uri, response.resources, typeOverrides)(null);
        }, function () { return null; });
    };
    Heracles.prototype.invokeOperation = function (operation, uri, body, mediaType) {
        return FetchUtil_1.FetchUtil.invokeOperation(operation.method, uri, body, mediaType)
            .then(processFetchUtilResponse.call(this, uri));
    };
    return Heracles;
}());
exports.Heracles = Heracles;
function processFetchUtilResponse(uri) {
    var _this = this;
    return function (response) {
        return _this.loadDocumentation(response.apiDocumentationLink)
            .then(getRequestedObject(_this, response.resourceIdentifier || uri, response.resources));
    };
}
function getRequestedObject(heracles, uri, resources, typeOverrides) {
    if (typeOverrides === void 0) { typeOverrides = {}; }
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
        LodashUtil_1.forOwn(resourcified, function (resource) { return resourcify(heracles, resource, resourcified, apiDocumentation, typeOverrides); });
        var rootResource = resourcified[uri] || resourcified[JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(uri)];
        if (!rootResource) {
            return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
        }
        return rootResource;
    };
}
function resourcify(heracles, obj, resourcified, apiDoc, typeOverrides) {
    if ((typeof obj === 'object') === false) {
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
            resource[key] = value.map(function (el) { return resourcify(heracles, el, resourcified, apiDoc, typeOverrides); });
            return;
        }
        resource[key] = resourcify(heracles, value, resourcified, apiDoc, typeOverrides);
    });
    return resource;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var li = __webpack_require__(32);
var jsonld_1 = __webpack_require__(5);
var Constants = __webpack_require__(1);
var $rdf = __webpack_require__(4);
var JsonLdParser = __webpack_require__(4);
var JsonLdSerializer = __webpack_require__(4);
var Vocabs_1 = __webpack_require__(3);
var internals_1 = __webpack_require__(41);
__webpack_require__(42);
$rdf.parsers[Constants.MediaTypes.jsonLd] = JsonLdParser;
var FetchUtil = (function () {
    function FetchUtil() {
    }
    FetchUtil.fetchResource = function (uri) {
        return fetch(uri, {
            headers: {
                accept: FetchUtil._requestAcceptHeaders
            }
        })
            .then(rejectNotFoundStatus)
            .then(function (res) {
            var apiDocsUri = getDocumentationUri(res);
            return getFlattendGraph(res)
                .then(function (obj) { return new internals_1.ExpandedWithDocs(obj, apiDocsUri, res.headers.get('Content-Location') || res.url); });
        }, function () { return null; });
    };
    FetchUtil.invokeOperation = function (method, uri, body, mediaType) {
        if (mediaType === void 0) { mediaType = Constants.MediaTypes.jsonLd; }
        return fetch(uri, {
            method: method,
            headers: {
                'Content-Type': mediaType,
                Accept: FetchUtil._requestAcceptHeaders
            }
        })
            .then(rejectNotFoundStatus)
            .then(function (res) {
            var apiDocsUri = getDocumentationUri(res);
            return getFlattendGraph(res)
                .then(function (obj) { return new internals_1.ExpandedWithDocs(obj, apiDocsUri, res.headers.get('Content-Location') || res.url); });
        }, function () { return null; });
    };
    FetchUtil._requestAcceptHeaders = Constants.MediaTypes.jsonLd + ', ' + Constants.MediaTypes.ntriples + ', ' + Constants.MediaTypes.nquads;
    FetchUtil._propertyRangeMappings = [
        [Constants.Core.Vocab.supportedClass, Constants.Core.Vocab.Class],
        [Constants.Core.Vocab.expects, Constants.Core.Vocab.Class],
        [Constants.Core.Vocab.returns, Constants.Core.Vocab.Class],
        [Constants.Core.Vocab.supportedOperation, Constants.Core.Vocab.Operation],
        [Constants.Core.Vocab.operation, Constants.Core.Vocab.Operation],
        [Constants.Core.Vocab.supportedProperty, Constants.Core.Vocab.SupportedProperty],
        [Constants.Core.Vocab.statusCodes, Constants.Core.Vocab.StatusCodeDescription],
        [Constants.Core.Vocab.property, Vocabs_1.rdf.Property],
        [Constants.Core.Vocab.mapping, Constants.Core.Vocab.IriTemplateMapping],
    ];
    return FetchUtil;
}());
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
var FetchError = (function (_super) {
    __extends(FetchError, _super);
    function FetchError(response) {
        var _this = _super.call(this, 'Request failed') || this;
        _this._response = response;
        return _this;
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
function getFlattendGraph(res) {
    var mediaType = res.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd;
    if (res.ok === false) {
        return Promise.reject(new FetchError(res));
    }
    return res.text()
        .then(parseResourceRepresentation(mediaType, res))
        .then(runInference)
        .then(function (graph) { return JsonLdSerializer.serialize(graph); })
        .then(flatten(res.url));
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
        return jsonld_1.promises.expand(json, opts)
            .then(function (expanded) { return jsonld_1.promises.flatten(expanded, {}); })
            .then(function (flattened) { return flattened[Constants.JsonLd.Graph]; });
    };
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var qs = __webpack_require__(10)
  , url = __webpack_require__(35)
  , xtend = __webpack_require__(40);

function hasRel(x) {
  return x && x.rel;
}

function intoRels (acc, x) {
  function splitRel (rel) {
    acc[rel] = xtend(x, { rel: rel });
  }

  x.rel.split(/\s+/).forEach(splitRel);

  return acc;
}

function createObjects (acc, p) {
  // rel="next" => 1: rel 2: next
  var m = p.match(/\s*(.+)\s*=\s*"?([^"]+)"?/)
  if (m) acc[m[1]] = m[2];
  return acc;
}

function parseLink(link) {
  try {
    var parts     =  link.split(';')
      , linkUrl   =  parts.shift().replace(/[<>]/g, '')
      , parsedUrl =  url.parse(linkUrl)
      , qry       =  qs.parse(parsedUrl.query);

    var info = parts
      .reduce(createObjects, {});
    
    info = xtend(qry, info);
    info.url = linkUrl;
    return info;
  } catch (e) {
    return null;
  }
}

module.exports = function (linkHeader) {
  if (!linkHeader) return null;

  return linkHeader.split(/,\s*</)
   .map(parseLink)
   .filter(hasRel)
   .reduce(intoRels, {});
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(36);
var util = __webpack_require__(39);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(10);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(37)(module), __webpack_require__(38)))

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExpandedWithDocs = (function () {
    function ExpandedWithDocs(resources, apiDocumentationLink, resourceIdentifier) {
        this.resources = resources;
        this.apiDocumentationLink = apiDocumentationLink;
        this.resourceIdentifier = resourceIdentifier;
    }
    return ExpandedWithDocs;
}());
exports.ExpandedWithDocs = ExpandedWithDocs;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_42__;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonLdUtil = (function () {
    function JsonLdUtil() {
    }
    JsonLdUtil.trimTrailingSlash = function (uri) {
        if (!uri || !uri.replace) {
            return null;
        }
        // todo: is this really correct to ignore trailing slash?
        return uri.replace(/\/$/, '');
    };
    return JsonLdUtil;
}());
exports.JsonLdUtil = JsonLdUtil;


/***/ })
/******/ ]);
});
//# sourceMappingURL=heracles.js.map
!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], ["3","5","6","7","8","9","17"], function($__System) {

$__System.register("2", ["3", "5", "6", "a", "7", "8", "9", "4"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var li, _, jsonld_1, Constants, $rdf, rdf_formats_common_1, JsonLdSerializer, linkeddata_vocabs_1;
    var FetchUtil, ExpandedWithDocs, FetchError;
    function rejectNotFoundStatus(res) {
        if (res.status === 404) {
            return Promise.reject(null);
        }
        return res;
    }
    function getDocumentationUri(res) {
        if (res.headers.has(Constants.Headers.Link)) {
            var linkHeaders = res.headers.get(Constants.Headers.Link);
            var links = li.parse(linkHeaders);
            return links[Constants.Core.Vocab.apiDocumentation];
        }
        return null;
    }
    function getFlattendGraph(res) {
        var mediaType = res.headers.get(Constants.Headers.ContentType) || Constants.MediaTypes.jsonLd;
        if (res.ok === false) {
            return Promise.reject(new FetchError(res));
        }
        return res.text()
            .then(function (jsonld) { return $rdf.parsers.parse(mediaType, jsonld, null, res.url); })
            .then(runInference)
            .then(function (graph) { return JsonLdSerializer.serialize(graph); })
            .then(flatten(res.url));
    }
    function runInference(graph) {
        _.map(FetchUtil._propertyRangeMappings, function (mapping) {
            var matches = graph.match(null, mapping[0], null, null);
            _.forEach(matches.toArray(), function (triple) {
                graph.add(new $rdf.Triple(triple.object, new $rdf.NamedNode(linkeddata_vocabs_1.rdf.type), new $rdf.NamedNode(mapping[1])));
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
    return {
        setters:[
            function (li_1) {
                li = li_1;
            },
            function (_1) {
                _ = _1;
            },
            function (jsonld_1_1) {
                jsonld_1 = jsonld_1_1;
            },
            function (Constants_1) {
                Constants = Constants_1;
            },
            function ($rdf_1) {
                $rdf = $rdf_1;
            },
            function (rdf_formats_common_1_1) {
                rdf_formats_common_1 = rdf_formats_common_1_1;
            },
            function (JsonLdSerializer_1) {
                JsonLdSerializer = JsonLdSerializer_1;
            },
            function (linkeddata_vocabs_1_1) {
                linkeddata_vocabs_1 = linkeddata_vocabs_1_1;
            }],
        execute: function() {
            rdf_formats_common_1.default($rdf);
            FetchUtil = (function () {
                function FetchUtil() {
                }
                FetchUtil.fetchResource = function (uri) {
                    return window.fetch(uri, {
                        headers: {
                            accept: FetchUtil._requestAcceptHeaders
                        }
                    })
                        .then(rejectNotFoundStatus)
                        .then(function (res) {
                        var apiDocsUri = getDocumentationUri(res);
                        return getFlattendGraph(res)
                            .then(function (obj) { return new ExpandedWithDocs(obj, apiDocsUri); });
                    }, function () { return null; });
                };
                FetchUtil.invokeOperation = function (method, uri, body, mediaType) {
                    if (mediaType === void 0) { mediaType = Constants.MediaTypes.jsonLd; }
                    return window.fetch(uri, {
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
                            .then(function (obj) { return new ExpandedWithDocs(obj, apiDocsUri); });
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
                    [Constants.Core.Vocab.property, linkeddata_vocabs_1.rdf.ns + 'Property'],
                    [Constants.Core.Vocab.mapping, Constants.Core.Vocab.IriTemplateMapping],
                ];
                return FetchUtil;
            }());
            exports_1("FetchUtil", FetchUtil);
            ExpandedWithDocs = (function () {
                function ExpandedWithDocs(resources, apiDocumentationLink) {
                    this.resources = resources;
                    this.apiDocumentationLink = apiDocumentationLink;
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

$__System.registerDynamic("b", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('c')(exports, 'http://www.w3.org/ns/activitystreams#', 'as', ['Accept', 'Activity', 'IntransitiveActivity', 'Actor', 'Add', 'Announce', 'Application', 'Arrive', 'Article', 'Audio', 'Block', 'Collection', 'CollectionPage', 'OrderedCollectionPage', 'Relationship', 'Create', 'Delete', 'Dislike', 'Document', 'Event', 'Follow', 'Flag', 'Group', 'Ignore', 'Image', 'Invite', 'Join', 'Leave', 'Like', 'Link', 'Mention', 'Note', 'Object', 'Offer', 'OrderedCollection', 'Page', 'Person', 'Organization', 'Place', 'Profile', 'Question', 'Reject', 'Remove', 'Service', 'TentativeAccept', 'TentativeReject', 'Undo', 'Update', 'Video', 'View', 'Listen', 'Read', 'Move', 'Travel', 'describes', 'subject', 'relationship', 'instrument', 'actor', 'attributedTo', 'attachment', 'attachments', 'author', 'bcc', 'bto', 'cc', 'context', 'current', 'first', 'generator', 'icon', 'image', 'inReplyTo', 'items', 'orderedItems', 'last', 'location', 'next', 'object', 'oneOf', 'anyOf', 'origin', 'partOf', 'prev', 'preview', 'replies', 'result', 'scope', 'tag', 'tags', 'target', 'to', 'url', 'altitude', 'content', 'name', 'downstreamDuplicates', 'duration', 'endTime', 'height', 'href', 'hreflang', 'id', 'latitude', 'longitude', 'mediaType', 'objectType', 'published', 'radius', 'rel', 'startIndex', 'startTime', 'summary', 'totalItems', 'units', 'updated', 'upstreamDuplicates', 'verb', 'width', 'accuracy']);
  return module.exports;
});

$__System.registerDynamic("d", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('c')(exports, 'http://ns.jasnell.me/activitystreams-ex#', 'asx', ['LanguageProperty', 'Number', 'Date', 'PossiblyOrdered']);
  return module.exports;
});

$__System.registerDynamic("e", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('c')(exports, 'http://www.w3.org/2002/07/owl#', 'owl', ['Class', 'DatatypeProperty', 'ObjectProperty', 'FunctionalProperty', 'DeprecatedPropety']);
  return module.exports;
});

$__System.registerDynamic("f", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('c')(exports, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#', 'rdf', ['first', 'rest', 'nil', 'type']);
  return module.exports;
});

$__System.registerDynamic("10", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('c')(exports, 'http://www.w3.org/2000/01/rdf-schema#', 'rdfs', ['subClassOf', 'subPropertyOf']);
  return module.exports;
});

$__System.registerDynamic("11", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('c')(exports, 'http://www.w3.org/2001/XMLSchema#', 'xsd', ['boolean', 'string', 'anyType', 'anySimpleType', 'gMonth', 'gDay', 'gMonthDay', 'gYear', 'gYearMonth', 'date', 'time', 'dateTime', 'duration', 'base64Binary', 'hexBinary', 'float', 'decimal', 'double', 'anyURI', 'QName', 'NOTATION', 'integer', 'nonPositiveInteger', 'long', 'nonNegativeInteger', 'negativeInteger', 'int', 'unsignedLong', 'positiveInteger', 'short', 'byte', 'unsignedInt', 'unsignedShort', 'unsignedByte', 'normalizedString', 'token', 'language', 'Name', 'NMTOKEN', 'NCName', 'NMTOKENS', 'ID', 'IDREF', 'ENTITY', 'IDREFS', 'ENTITIES']);
  return module.exports;
});

$__System.registerDynamic("12", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('c')(exports, 'http://ns.jasnell.me/interval#', 'i', ['lower', 'upper', 'step', 'Interval', 'OpenInterval', 'ClosedInterval', 'OpenClosedInterval', 'ClosedOpenInterval', 'LeftOpenInterval', 'LeftClosedInterval', 'RightOpenInterval', 'RightClosedInterval', 'EmptyInterval', 'UnboundedInterval', 'PositiveIntegers', 'NonNegativeIntegers', 'NegativeIntegers', 'PositiveFloats', 'NonNegativeFloats', 'NegativeFloats', 'PositiveDoubles', 'NonNegativeDoubles', 'NegativeDoubles', 'PositiveDecimals', 'NonNegativeDecimals', 'NegativeDecimals', 'indexRange', 'publishedRange', 'startTimeRange']);
  return module.exports;
});

$__System.registerDynamic("13", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('c')(exports, 'http://ns.jasnell.me/social#', 's', ['Connection', 'a', 'b', 'relationship', 'Population', 'Everyone', 'Public', 'Private', 'Direct', 'Common', 'Interested', 'Self', 'All', 'Any', 'None', 'CompoundPopulation', 'member', 'havingDimension', 'havingRole', 'havingRelationship', 'distance', 'confidence']);
  return module.exports;
});

$__System.registerDynamic("c", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function define(root, name, value) {
    Object.defineProperty(root, name, {
      value: value,
      enumerable: true,
      configurable: false
    });
  }
  ;
  module.exports = function(exports, ns, prefix, terms) {
    define(exports, 'ns', ns);
    define(exports, 'prefix', prefix);
    if (Array.isArray(terms))
      terms.forEach(function(term) {
        define(exports, term, ns + term);
      });
  };
  return module.exports;
});

$__System.registerDynamic("14", ["c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('c')(exports, 'http://schema.org/', 's', ['APIReference', 'AboutPage', 'AcceptAction', 'AccountingService', 'AchieveAction', 'Action', 'ActionStatusType', 'ActivateAction', 'AddAction', 'AdministrativeArea', 'AdultEntertainment', 'AggregateOffer', 'AggregateRating', 'AgreeAction', 'Airline', 'Airport', 'AlignmentObject', 'AllocateAction', 'AmusementPark', 'AnatomicalStructure', 'AnatomicalSystem', 'AnimalShelter', 'Answer', 'ApartmentComplex', 'AppendAction', 'ApplyAction', 'ApprovedIndication', 'Aquarium', 'ArriveAction', 'ArtGallery', 'Artery', 'Article', 'AskAction', 'AssessAction', 'AssignAction', 'Attorney', 'Audience', 'AudioObject', 'AuthorizeAction', 'AutoBodyShop', 'AutoDealer', 'AutoPartsStore', 'AutoRental', 'AutoRepair', 'AutoWash', 'AutomatedTeller', 'AutomotiveBusiness', 'Bakery', 'BankOrCreditUnion', 'BarOrPub', 'Beach', 'BeautySalon', 'BedAndBreakfast', 'BefriendAction', 'BikeStore', 'Blog', 'BlogPosting', 'BloodTest', 'BodyOfWater', 'Bone', 'Book', 'BookFormatType', 'BookSeries', 'BookStore', 'BookmarkAction', 'Boolean', 'BorrowAction', 'BowlingAlley', 'BrainStructure', 'Brand', 'BreadcrumbList', 'Brewery', 'BroadcastEvent', 'BroadcastService', 'BuddhistTemple', 'BusReservation', 'BusStation', 'BusStop', 'BusTrip', 'BusinessAudience', 'BusinessEntityType', 'BusinessEvent', 'BusinessFunction', 'BuyAction', 'CafeOrCoffeeShop', 'Campground', 'Canal', 'CancelAction', 'Car', 'Casino', 'CatholicChurch', 'Cemetery', 'CheckAction', 'CheckInAction', 'CheckOutAction', 'CheckoutPage', 'ChildCare', 'ChildrensEvent', 'ChooseAction', 'Church', 'City', 'CityHall', 'CivicStructure', 'Class', 'Clip', 'ClothingStore', 'Code', 'CollectionPage', 'CollegeOrUniversity', 'ComedyClub', 'ComedyEvent', 'Comment', 'CommentAction', 'CommunicateAction', 'ComputerStore', 'ConfirmAction', 'ConsumeAction', 'ContactPage', 'ContactPoint', 'ContactPointOption', 'Continent', 'ControlAction', 'ConvenienceStore', 'CookAction', 'Corporation', 'Country', 'Courthouse', 'CreateAction', 'CreativeWork', 'CreditCard', 'Crematorium', 'DDxElement', 'DanceEvent', 'DanceGroup', 'DataCatalog', 'DataDownload', 'DataType', 'Dataset', 'Date', 'DateTime', 'DatedMoneySpecification', 'DayOfWeek', 'DaySpa', 'DeactivateAction', 'DefenceEstablishment', 'DeleteAction', 'DeliveryChargeSpecification', 'DeliveryEvent', 'DeliveryMethod', 'Demand', 'Dentist', 'DepartAction', 'DepartmentStore', 'DiagnosticLab', 'DiagnosticProcedure', 'Diet', 'DietarySupplement', 'DisagreeAction', 'DiscoverAction', 'DislikeAction', 'Distance', 'DonateAction', 'DoseSchedule', 'DownloadAction', 'DrawAction', 'DrinkAction', 'Drug', 'DrugClass', 'DrugCost', 'DrugCostCategory', 'DrugLegalStatus', 'DrugPregnancyCategory', 'DrugPrescriptionStatus', 'DrugStrength', 'DryCleaningOrLaundry', 'Duration', 'EatAction', 'EducationEvent', 'EducationalAudience', 'EducationalOrganization', 'Electrician', 'ElectronicsStore', 'ElementarySchool', 'EmailMessage', 'Embassy', 'EmergencyService', 'EmployeeRole', 'EmploymentAgency', 'EndorseAction', 'Energy', 'EntertainmentBusiness', 'EntryPoint', 'Enumeration', 'Episode', 'Event', 'EventReservation', 'EventStatusType', 'EventVenue', 'ExerciseAction', 'ExerciseGym', 'ExercisePlan', 'FastFoodRestaurant', 'Festival', 'FilmAction', 'FinancialService', 'FindAction', 'FireStation', 'Flight', 'FlightReservation', 'Float', 'Florist', 'FollowAction', 'FoodEstablishment', 'FoodEstablishmentReservation', 'FoodEvent', 'FurnitureStore', 'Game', 'GamePlayMode', 'GameServer', 'GameServerStatus', 'GardenStore', 'GasStation', 'GatedResidenceCommunity', 'GeneralContractor', 'GeoCoordinates', 'GeoShape', 'GiveAction', 'GolfCourse', 'GovernmentBuilding', 'GovernmentOffice', 'GovernmentOrganization', 'GovernmentPermit', 'GovernmentService', 'GroceryStore', 'HVACBusiness', 'HairSalon', 'HardwareStore', 'HealthAndBeautyBusiness', 'HealthClub', 'HighSchool', 'HinduTemple', 'HobbyShop', 'HomeAndConstructionBusiness', 'HomeGoodsStore', 'Hospital', 'Hostel', 'Hotel', 'HousePainter', 'IceCreamShop', 'IgnoreAction', 'ImageGallery', 'ImageObject', 'ImagingTest', 'IndividualProduct', 'InfectiousAgentClass', 'InfectiousDisease', 'InformAction', 'InsertAction', 'InstallAction', 'InsuranceAgency', 'Intangible', 'Integer', 'InteractAction', 'InternetCafe', 'InviteAction', 'Invoice', 'ItemAvailability', 'ItemList', 'ItemListOrderType', 'ItemPage', 'JewelryStore', 'JobPosting', 'JoinAction', 'Joint', 'LakeBodyOfWater', 'Landform', 'LandmarksOrHistoricalBuildings', 'Language', 'LeaveAction', 'LegislativeBuilding', 'LendAction', 'Library', 'LifestyleModification', 'Ligament', 'LikeAction', 'LiquorStore', 'ListItem', 'ListenAction', 'LiteraryEvent', 'LocalBusiness', 'LockerDelivery', 'Locksmith', 'LodgingBusiness', 'LodgingReservation', 'LoseAction', 'LymphaticVessel', 'Map', 'MapCategoryType', 'MarryAction', 'Mass', 'MaximumDoseSchedule', 'MediaObject', 'MedicalAudience', 'MedicalCause', 'MedicalClinic', 'MedicalCode', 'MedicalCondition', 'MedicalConditionStage', 'MedicalContraindication', 'MedicalDevice', 'MedicalDevicePurpose', 'MedicalEntity', 'MedicalEnumeration', 'MedicalEvidenceLevel', 'MedicalGuideline', 'MedicalGuidelineContraindication', 'MedicalGuidelineRecommendation', 'MedicalImagingTechnique', 'MedicalIndication', 'MedicalIntangible', 'MedicalObservationalStudy', 'MedicalObservationalStudyDesign', 'MedicalOrganization', 'MedicalProcedure', 'MedicalProcedureType', 'MedicalRiskCalculator', 'MedicalRiskEstimator', 'MedicalRiskFactor', 'MedicalRiskScore', 'MedicalScholarlyArticle', 'MedicalSign', 'MedicalSignOrSymptom', 'MedicalSpecialty', 'MedicalStudy', 'MedicalStudyStatus', 'MedicalSymptom', 'MedicalTest', 'MedicalTestPanel', 'MedicalTherapy', 'MedicalTrial', 'MedicalTrialDesign', 'MedicalWebPage', 'MedicineSystem', 'MensClothingStore', 'MiddleSchool', 'MobileApplication', 'MobilePhoneStore', 'Mosque', 'Motel', 'MotorcycleDealer', 'MotorcycleRepair', 'Mountain', 'MoveAction', 'Movie', 'MovieRentalStore', 'MovieSeries', 'MovieTheater', 'MovingCompany', 'Muscle', 'Museum', 'MusicAlbum', 'MusicAlbumProductionType', 'MusicAlbumReleaseType', 'MusicComposition', 'MusicEvent', 'MusicGroup', 'MusicPlaylist', 'MusicRecording', 'MusicRelease', 'MusicReleaseFormatType', 'MusicStore', 'MusicVenue', 'MusicVideoObject', 'NGO', 'NailSalon', 'Nerve', 'NewsArticle', 'NightClub', 'Notary', 'Number', 'NutritionInformation', 'OceanBodyOfWater', 'Offer', 'OfferItemCondition', 'OfficeEquipmentStore', 'OnDemandEvent', 'OpeningHoursSpecification', 'Optician', 'Order', 'OrderAction', 'OrderStatus', 'Organization', 'OrganizationRole', 'OrganizeAction', 'OutletStore', 'OwnershipInfo', 'PaintAction', 'Painting', 'PalliativeProcedure', 'ParcelDelivery', 'ParcelService', 'ParentAudience', 'Park', 'ParkingFacility', 'PathologyTest', 'PawnShop', 'PayAction', 'PaymentChargeSpecification', 'PaymentMethod', 'PeopleAudience', 'PerformAction', 'PerformanceRole', 'PerformingArtsTheater', 'PerformingGroup', 'Periodical', 'Permit', 'Person', 'PetStore', 'Pharmacy', 'Photograph', 'PhotographAction', 'PhysicalActivity', 'PhysicalActivityCategory', 'PhysicalExam', 'PhysicalTherapy', 'Physician', 'Place', 'PlaceOfWorship', 'PlanAction', 'PlayAction', 'Playground', 'Plumber', 'PoliceStation', 'Pond', 'PostOffice', 'PostalAddress', 'PrependAction', 'Preschool', 'PreventionIndication', 'PriceSpecification', 'Product', 'ProductModel', 'ProfessionalService', 'ProfilePage', 'ProgramMembership', 'Property', 'PropertyValueSpecification', 'PsychologicalTreatment', 'PublicSwimmingPool', 'PublicationEvent', 'PublicationIssue', 'PublicationVolume', 'QAPage', 'QualitativeValue', 'QuantitativeValue', 'Quantity', 'Question', 'QuoteAction', 'RVPark', 'RadiationTherapy', 'RadioClip', 'RadioEpisode', 'RadioSeason', 'RadioSeries', 'RadioStation', 'Rating', 'ReactAction', 'ReadAction', 'RealEstateAgent', 'ReceiveAction', 'Recipe', 'RecommendedDoseSchedule', 'RecyclingCenter', 'RegisterAction', 'RejectAction', 'RentAction', 'RentalCarReservation', 'ReplaceAction', 'ReplyAction', 'ReportedDoseSchedule', 'Reservation', 'ReservationPackage', 'ReservationStatusType', 'ReserveAction', 'Reservoir', 'Residence', 'Restaurant', 'ResumeAction', 'ReturnAction', 'Review', 'ReviewAction', 'RiverBodyOfWater', 'Role', 'RoofingContractor', 'RsvpAction', 'RsvpResponseType', 'SaleEvent', 'ScheduleAction', 'ScholarlyArticle', 'School', 'Sculpture', 'SeaBodyOfWater', 'SearchAction', 'SearchResultsPage', 'Season', 'Seat', 'SelfStorage', 'SellAction', 'SendAction', 'Series', 'Service', 'ServiceChannel', 'ShareAction', 'ShoeStore', 'ShoppingCenter', 'SingleFamilyResidence', 'SiteNavigationElement', 'SkiResort', 'SocialEvent', 'SoftwareApplication', 'SomeProducts', 'Specialty', 'SportingGoodsStore', 'SportsActivityLocation', 'SportsClub', 'SportsEvent', 'SportsOrganization', 'SportsTeam', 'StadiumOrArena', 'State', 'Store', 'StructuredValue', 'SubscribeAction', 'SubwayStation', 'SuperficialAnatomy', 'SuspendAction', 'Synagogue', 'TVClip', 'TVEpisode', 'TVSeason', 'TVSeries', 'Table', 'TakeAction', 'TattooParlor', 'Taxi', 'TaxiReservation', 'TaxiStand', 'TechArticle', 'TelevisionStation', 'TennisComplex', 'Text', 'TheaterEvent', 'TheaterGroup', 'TherapeuticProcedure', 'Thing', 'Ticket', 'TieAction', 'Time', 'TipAction', 'TireShop', 'TouristAttraction', 'TouristInformationCenter', 'ToyStore', 'TrackAction', 'TradeAction', 'TrainReservation', 'TrainStation', 'TrainTrip', 'TransferAction', 'TravelAction', 'TravelAgency', 'TreatmentIndication', 'TypeAndQuantityNode', 'URL', 'UnRegisterAction', 'UnitPriceSpecification', 'UpdateAction', 'UseAction', 'UserBlocks', 'UserCheckins', 'UserComments', 'UserDownloads', 'UserInteraction', 'UserLikes', 'UserPageVisits', 'UserPlays', 'UserPlusOnes', 'UserTweets', 'Vehicle', 'Vein', 'Vessel', 'VeterinaryCare', 'VideoGallery', 'VideoGame', 'VideoGameSeries', 'VideoObject', 'ViewAction', 'VisualArtsEvent', 'VisualArtwork', 'Volcano', 'VoteAction', 'WPAdBlock', 'WPFooter', 'WPHeader', 'WPSideBar', 'WantAction', 'WarrantyPromise', 'WarrantyScope', 'WatchAction', 'Waterfall', 'WearAction', 'WebApplication', 'WebPage', 'WebPageElement', 'WebSite', 'WholesaleStore', 'WinAction', 'Winery', 'WriteAction', 'Zoo', 'Abdomen', 'ActiveActionStatus', 'ActiveNotRecruiting', 'AerobicActivity', 'AlbumRelease', 'AnaerobicActivity', 'Anesthesia', 'Appearance', 'Ayurvedic', 'Bacteria', 'Balance', 'BroadcastRelease', 'CDFormat', 'CT', 'Cardiovascular', 'CardiovascularExam', 'CaseSeries', 'CassetteFormat', 'Chiropractic', 'Clinician', 'CoOp', 'CohortStudy', 'CommunityHealth', 'CompilationAlbum', 'Completed', 'CompletedActionStatus', 'CrossSectional', 'DJMixAlbum', 'DVDFormat', 'DamagedCondition', 'DemoAlbum', 'Dentistry', 'Dermatologic', 'Diagnostic', 'DietNutrition', 'DigitalAudioTapeFormat', 'DigitalFormat', 'Discontinued', 'DoubleBlindedTrial', 'EBook', 'EPRelease', 'Ear', 'Emergency', 'Endocrine', 'EnrollingByInvitation', 'EventCancelled', 'EventPostponed', 'EventRescheduled', 'EventScheduled', 'EvidenceLevelA', 'EvidenceLevelB', 'EvidenceLevelC', 'Eye', 'FDAcategoryA', 'FDAcategoryB', 'FDAcategoryC', 'FDAcategoryD', 'FDAcategoryX', 'FDAnotEvaluated', 'FailedActionStatus', 'False', 'Flexibility', 'Fungus', 'Gastroenterologic', 'Genetic', 'Genitourinary', 'Geriatric', 'Gynecologic', 'Hardcover', 'Head', 'HearingImpairedSupported', 'Hematologic', 'Homeopathic', 'InStock', 'InStoreOnly', 'Infectious', 'InternationalTrial', 'ItemListOrderAscending', 'ItemListOrderDescending', 'ItemListUnordered', 'LaboratoryScience', 'LaserDiscFormat', 'LeisureTimeActivity', 'LimitedAvailability', 'LiveAlbum', 'Longitudinal', 'Lung', 'MRI', 'MedicalResearcher', 'Midwifery', 'MixtapeAlbum', 'MultiCenterTrial', 'MultiPlayer', 'MulticellularParasite', 'Musculoskeletal', 'MusculoskeletalExam', 'Neck', 'Neuro', 'Neurologic', 'NewCondition', 'NoninvasiveProcedure', 'Nose', 'NotYetRecruiting', 'Nursing', 'OTC', 'Observational', 'Obstetric', 'OccupationalActivity', 'OccupationalTherapy', 'OfflinePermanently', 'OfflineTemporarily', 'OnSitePickup', 'Oncologic', 'Online', 'OnlineFull', 'OnlineOnly', 'OpenTrial', 'Optometic', 'OrderCancelled', 'OrderDelivered', 'OrderInTransit', 'OrderPaymentDue', 'OrderPickupAvailable', 'OrderProblem', 'OrderProcessing', 'OrderReturned', 'Osteopathic', 'Otolaryngologic', 'OutOfStock', 'PET', 'Paperback', 'ParkingMap', 'Pathology', 'Patient', 'Pediatric', 'PercutaneousProcedure', 'PharmacySpecialty', 'Physiotherapy', 'PlaceboControlledTrial', 'PlasticSurgery', 'Podiatric', 'PotentialActionStatus', 'PreOrder', 'PrescriptionOnly', 'PrimaryCare', 'Prion', 'Protozoa', 'Psychiatric', 'PublicHealth', 'Pulmonary', 'Radiograpy', 'RandomizedTrial', 'Recruiting', 'RefurbishedCondition', 'Registry', 'ReimbursementCap', 'RemixAlbum', 'Renal', 'Researcher', 'ReservationCancelled', 'ReservationConfirmed', 'ReservationHold', 'ReservationPending', 'RespiratoryTherapy', 'ResultsAvailable', 'ResultsNotAvailable', 'Retail', 'Rheumatologic', 'RsvpResponseMaybe', 'RsvpResponseNo', 'RsvpResponseYes', 'SeatingMap', 'SingleBlindedTrial', 'SingleCenterTrial', 'SinglePlayer', 'SingleRelease', 'Skin', 'SoldOut', 'SoundtrackAlbum', 'SpeechPathology', 'SpokenWordAlbum', 'StrengthTraining', 'StudioAlbum', 'Surgical', 'SurgicalProcedure', 'Suspended', 'Terminated', 'Therapeutic', 'Throat', 'TollFree', 'Toxicologic', 'TraditionalChinese', 'TransitMap', 'TripleBlindedTrial', 'True', 'Ultrasound', 'Urologic', 'UsedCondition', 'VenueMap', 'VinylFormat', 'Virus', 'VitalSign', 'WesternConventional', 'Wholesale', 'Withdrawn', 'XRay', 'about', 'acceptedAnswer', 'acceptedOffer', 'acceptedPaymentMethod', 'acceptsReservations', 'accessCode', 'accessibilityAPI', 'accessibilityControl', 'accessibilityFeature', 'accessibilityHazard', 'accountId', 'accountablePerson', 'acquiredFrom', 'action', 'actionStatus', 'activeIngredient', 'activityDuration', 'activityFrequency', 'actors', 'addOn', 'additionalName', 'additionalNumberOfGuests', 'additionalType', 'additionalVariable', 'address', 'addressCountry', 'addressLocality', 'addressRegion', 'administrationRoute', 'advanceBookingRequirement', 'adverseOutcome', 'affectedBy', 'affiliation', 'agent', 'aggregateRating', 'aircraft', 'albumProductionType', 'albumReleaseType', 'albums', 'alcoholWarning', 'algorithm', 'alignmentType', 'alternateName', 'alternativeHeadline', 'amount', 'amountOfThisGood', 'answerCount', 'antagonist', 'applicableLocation', 'application', 'applicationCategory', 'applicationSubCategory', 'applicationSuite', 'appliesToDeliveryMethod', 'appliesToPaymentMethod', 'area', 'areaServed', 'arrivalAirport', 'arrivalBusStop', 'arrivalGate', 'arrivalPlatform', 'arrivalStation', 'arrivalTerminal', 'arrivalTime', 'artEdition', 'arterialBranch', 'artform', 'articleBody', 'articleSection', 'aspect', 'assembly', 'assemblyVersion', 'associatedAnatomy', 'associatedArticle', 'associatedMedia', 'associatedPathophysiology', 'athlete', 'attendees', 'audience', 'audienceType', 'audio', 'author', 'availability', 'availabilityEnds', 'availabilityStarts', 'availableAtOrFrom', 'availableChannel', 'availableDeliveryMethod', 'availableFrom', 'availableIn', 'availableLanguage', 'availableService', 'availableStrength', 'availableTest', 'availableThrough', 'awards', 'awayTeam', 'background', 'baseSalary', 'benefits', 'bestRating', 'billingAddress', 'billingIncrement', 'billingPeriod', 'biomechnicalClass', 'birthDate', 'birthPlace', 'bitrate', 'blogPosts', 'bloodSupply', 'boardingGroup', 'bodyLocation', 'bookEdition', 'bookFormat', 'bookingAgent', 'bookingTime', 'borrower', 'box', 'branch', 'branchOf', 'brand', 'breadcrumb', 'breastfeedingWarning', 'broadcaster', 'browserRequirements', 'busName', 'busNumber', 'businessFunction', 'buyer', 'byArtist', 'calories', 'candidate', 'caption', 'carbohydrateContent', 'carrier', 'carrierRequirements', 'catalog', 'catalogNumber', 'category', 'cause', 'causeOf', 'character', 'characterAttribute', 'characterName', 'cheatCode', 'checkinTime', 'checkoutTime', 'childMaxAge', 'childMinAge', 'children', 'cholesterolContent', 'circle', 'citation', 'clincalPharmacology', 'clinicalPharmacology', 'clipNumber', 'closes', 'coach', 'code', 'codeRepository', 'codeValue', 'codingSystem', 'colleagues', 'collection', 'color', 'comment', 'commentCount', 'commentText', 'commentTime', 'composer', 'comprisedOf', 'confirmationNumber', 'connectedTo', 'contactOption', 'contactPoints', 'contactType', 'containedIn', 'contentLocation', 'contentRating', 'contentSize', 'contentType', 'contentUrl', 'contraindication', 'contributor', 'cookTime', 'cookingMethod', 'copyrightHolder', 'copyrightYear', 'cost', 'costCategory', 'costCurrency', 'costOrigin', 'costPerUnit', 'countriesNotSupported', 'countriesSupported', 'course', 'creator', 'creditedTo', 'currenciesAccepted', 'currency', 'customer', 'dataset', 'dateCreated', 'dateIssued', 'dateModified', 'datePosted', 'datePublished', 'dateline', 'dayOfWeek', 'deathDate', 'deathPlace', 'defaultValue', 'deliveryAddress', 'deliveryLeadTime', 'deliveryMethod', 'deliveryStatus', 'department', 'departureAirport', 'departureBusStop', 'departureGate', 'departurePlatform', 'departureStation', 'departureTerminal', 'departureTime', 'dependencies', 'depth', 'description', 'device', 'diagnosis', 'diagram', 'diet', 'dietFeatures', 'differentialDiagnosis', 'directors', 'discount', 'discountCode', 'discountCurrency', 'discusses', 'discussionUrl', 'dissolutionDate', 'distance', 'distinguishingSign', 'distribution', 'domainIncludes', 'doorTime', 'dosageForm', 'doseSchedule', 'doseUnit', 'doseValue', 'downloadUrl', 'downvoteCount', 'drainsTo', 'dropoffLocation', 'dropoffTime', 'drug', 'drugClass', 'drugUnit', 'duns', 'duplicateTherapy', 'duration', 'durationOfWarranty', 'editor', 'educationRequirements', 'educationalAlignment', 'educationalFramework', 'educationalRole', 'educationalUse', 'elevation', 'eligibleCustomerType', 'eligibleDuration', 'eligibleQuantity', 'eligibleRegion', 'eligibleTransactionVolume', 'email', 'embedUrl', 'employees', 'employmentType', 'encodesCreativeWork', 'encodingFormat', 'encodingType', 'encodings', 'endDate', 'endTime', 'endorsee', 'endorsers', 'entertainmentBusiness', 'epidemiology', 'episodeNumber', 'episodes', 'equal', 'error', 'estimatedFlightDuration', 'estimatesRiskOf', 'eventStatus', 'events', 'evidenceLevel', 'evidenceOrigin', 'exercisePlan', 'exerciseType', 'exifData', 'expectedArrivalFrom', 'expectedArrivalUntil', 'expectedPrognosis', 'expectsAcceptanceOf', 'experienceRequirements', 'expertConsiderations', 'expires', 'familyName', 'fatContent', 'faxNumber', 'featureList', 'fiberContent', 'fileFormat', 'fileSize', 'firstPerformance', 'flightDistance', 'flightNumber', 'followee', 'follows', 'followup', 'foodEstablishment', 'foodEvent', 'foodWarning', 'founders', 'foundingDate', 'foundingLocation', 'free', 'frequency', 'fromLocation', 'function', 'functionalClass', 'gameItem', 'gameLocation', 'gamePlatform', 'gameTip', 'gender', 'genre', 'geo', 'geographicArea', 'givenName', 'globalLocationNumber', 'greater', 'greaterOrEqual', 'gtin13', 'gtin14', 'gtin8', 'guideline', 'guidelineDate', 'guidelineSubject', 'hasDeliveryMethod', 'hasPOS', 'headline', 'healthCondition', 'height', 'highPrice', 'hiringOrganization', 'homeLocation', 'homeTeam', 'honorificPrefix', 'honorificSuffix', 'hospitalAffiliation', 'hostingOrganization', 'hoursAvailable', 'howPerformed', 'httpMethod', 'iataCode', 'icaoCode', 'identifyingExam', 'identifyingTest', 'illustrator', 'imagingTechnique', 'inAlbum', 'inLanguage', 'inPlaylist', 'incentives', 'includedComposition', 'includedRiskFactor', 'includesObject', 'increasesRiskOf', 'indication', 'industry', 'ineligibleRegion', 'infectiousAgent', 'infectiousAgentClass', 'ingredients', 'insertion', 'installUrl', 'intensity', 'interactingDrug', 'interactionCount', 'interactivityType', 'inventoryLevel', 'inverseOf', 'isAccessoryOrSparePartFor', 'isAvailableGenerically', 'isBasedOnUrl', 'isConsumableFor', 'isFamilyFriendly', 'isGift', 'isProprietary', 'isRelatedTo', 'isSimilarTo', 'isVariantOf', 'isbn', 'isicV4', 'isrcCode', 'issn', 'issueNumber', 'issuedBy', 'issuedThrough', 'iswcCode', 'item', 'itemCondition', 'itemListElement', 'itemListOrder', 'itemOffered', 'itemReviewed', 'itemShipped', 'jobLocation', 'jobTitle', 'keywords', 'knows', 'labelDetails', 'landlord', 'language', 'lastReviewed', 'latitude', 'learningResourceType', 'legalName', 'legalStatus', 'lender', 'lesser', 'lesserOrEqual', 'license', 'line', 'lodgingUnitDescription', 'lodgingUnitType', 'logo', 'longitude', 'loser', 'lowPrice', 'lyricist', 'mainContentOfPage', 'makesOffer', 'manufacturer', 'map', 'mapType', 'maps', 'material', 'maxPrice', 'maxValue', 'maximumIntake', 'mealService', 'mechanismOfAction', 'medicalSpecialty', 'medicineSystem', 'members', 'membershipNumber', 'memoryRequirements', 'mentions', 'menu', 'merchant', 'minPrice', 'minValue', 'minimumPaymentDue', 'model', 'modifiedTime', 'mpn', 'multipleValues', 'musicArrangement', 'musicBy', 'musicCompositionForm', 'musicGroupMember', 'musicReleaseFormat', 'musicalKey', 'naics', 'name', 'namedPosition', 'nationality', 'naturalProgression', 'nerve', 'nerveMotor', 'netWorth', 'nextItem', 'nonEqual', 'nonProprietaryName', 'normalRange', 'numAdults', 'numChildren', 'numTracks', 'numberOfEmployees', 'numberOfEpisodes', 'numberOfItems', 'numberOfPages', 'numberOfPlayers', 'numberOfSeasons', 'numberedPosition', 'nutrition', 'occupationalCategory', 'offerCount', 'offers', 'openingHours', 'openingHoursSpecification', 'opens', 'operatingSystem', 'opponent', 'option', 'orderDate', 'orderNumber', 'orderStatus', 'orderedItem', 'organizer', 'origin', 'originAddress', 'originatesFrom', 'outcome', 'overdosage', 'overview', 'ownedFrom', 'ownedThrough', 'owns', 'pageEnd', 'pageStart', 'pagination', 'parentItem', 'parentService', 'parents', 'partOfEpisode', 'partOfInvoice', 'partOfOrder', 'partOfSeason', 'partOfSystem', 'partOfTVSeries', 'partySize', 'pathophysiology', 'paymentAccepted', 'paymentDue', 'paymentMethod', 'paymentMethodId', 'paymentStatus', 'paymentUrl', 'performerIn', 'performers', 'permissions', 'permitAudience', 'phase', 'photos', 'physiologicalBenefits', 'pickupLocation', 'pickupTime', 'playMode', 'playerType', 'playersOnline', 'polygon', 'population', 'possibleComplication', 'possibleTreatment', 'postOfficeBoxNumber', 'postOp', 'postalCode', 'potentialAction', 'preOp', 'predecessorOf', 'pregnancyCategory', 'pregnancyWarning', 'prepTime', 'preparation', 'prescribingInfo', 'prescriptionStatus', 'previousItem', 'previousStartDate', 'price', 'priceCurrency', 'priceRange', 'priceSpecification', 'priceType', 'priceValidUntil', 'primaryImageOfPage', 'primaryPrevention', 'printColumn', 'printEdition', 'printPage', 'printSection', 'procedure', 'procedureType', 'processingTime', 'processorRequirements', 'producer', 'produces', 'productID', 'productSupported', 'productionCompany', 'proficiencyLevel', 'programMembershipUsed', 'programName', 'programmingLanguage', 'programmingModel', 'proprietaryName', 'proteinContent', 'providesService', 'publication', 'publicationType', 'publishedOn', 'publisher', 'publishingPrinciples', 'purpose', 'qualifications', 'query', 'quest', 'question', 'rangeIncludes', 'ratingCount', 'ratingValue', 'readonlyValue', 'realEstateAgent', 'recipe', 'recipeCategory', 'recipeCuisine', 'recipeInstructions', 'recipeYield', 'recipient', 'recognizingAuthority', 'recommendationStrength', 'recommendedIntake', 'recordLabel', 'referencesOrder', 'regionDrained', 'regionsAllowed', 'relatedAnatomy', 'relatedCondition', 'relatedDrug', 'relatedLink', 'relatedStructure', 'relatedTherapy', 'relatedTo', 'releaseDate', 'releaseNotes', 'releasedEvent', 'relevantSpecialty', 'repetitions', 'replacee', 'replacer', 'replyToUrl', 'representativeOfPage', 'requiredGender', 'requiredMaxAge', 'requiredMinAge', 'requirements', 'requiresSubscription', 'reservationFor', 'reservationId', 'reservationStatus', 'reservedTicket', 'responsibilities', 'restPeriods', 'resultReview', 'reviewBody', 'reviewCount', 'reviewRating', 'reviewedBy', 'reviews', 'riskFactor', 'risks', 'rsvpResponse', 'runsTo', 'runtime', 'safetyConsideration', 'salaryCurrency', 'sameAs', 'sampleType', 'saturatedFatContent', 'scheduledPaymentDate', 'scheduledTime', 'screenshot', 'seasonNumber', 'seasons', 'seatNumber', 'seatRow', 'seatSection', 'seatingType', 'secondaryPrevention', 'seeks', 'sender', 'sensoryUnit', 'serialNumber', 'seriousAdverseOutcome', 'serverStatus', 'servesCuisine', 'serviceArea', 'serviceAudience', 'serviceLocation', 'serviceOperator', 'servicePhone', 'servicePostalAddress', 'serviceSmsNumber', 'serviceType', 'serviceUrl', 'servingSize', 'siblings', 'signDetected', 'signOrSymptom', 'significance', 'significantLinks', 'skills', 'sku', 'sodiumContent', 'softwareAddOn', 'softwareHelp', 'softwareVersion', 'source', 'sourceOrganization', 'sourcedFrom', 'spatial', 'specialCommitments', 'specialty', 'sponsor', 'sport', 'sportsActivityLocation', 'sportsEvent', 'sportsTeam', 'spouse', 'stage', 'stageAsNumber', 'startDate', 'startTime', 'status', 'stepValue', 'storageRequirements', 'streetAddress', 'strengthUnit', 'strengthValue', 'structuralClass', 'study', 'studyDesign', 'studyLocation', 'studySubject', 'subEvents', 'subOrganization', 'subReservation', 'subStageSuffix', 'subStructure', 'subTest', 'subtype', 'successorOf', 'sugarContent', 'suggestedGender', 'suggestedMaxAge', 'suggestedMinAge', 'superEvent', 'supersededBy', 'supplyTo', 'surface', 'target', 'targetDescription', 'targetName', 'targetPlatform', 'targetPopulation', 'targetProduct', 'targetUrl', 'taxID', 'telephone', 'temporal', 'text', 'thumbnail', 'thumbnailUrl', 'tickerSymbol', 'ticketNumber', 'ticketToken', 'ticketedSeat', 'timeRequired', 'tissueSample', 'title', 'toLocation', 'totalPaymentDue', 'totalPrice', 'totalTime', 'trackingNumber', 'trackingUrl', 'tracks', 'trailer', 'trainName', 'trainNumber', 'transFatContent', 'transcript', 'translator', 'transmissionMethod', 'trialDesign', 'tributary', 'typeOfGood', 'typicalAgeRange', 'typicalTest', 'underName', 'unitCode', 'unsaturatedFatContent', 'uploadDate', 'upvoteCount', 'url', 'urlTemplate', 'usedToDiagnose', 'usesDevice', 'validFor', 'validFrom', 'validIn', 'validThrough', 'validUntil', 'value', 'valueAddedTaxIncluded', 'valueMaxLength', 'valueMinLength', 'valueName', 'valuePattern', 'valueReference', 'valueRequired', 'vatID', 'vendor', 'version', 'video', 'videoFrameSize', 'videoQuality', 'volumeNumber', 'warning', 'warranty', 'warrantyPromise', 'warrantyScope', 'webCheckinTime', 'weight', 'width', 'winner', 'wordCount', 'workHours', 'workLocation', 'workPerformed', 'workload', 'worksFor', 'worstRating', 'yearlyRevenue', 'yearsInOperation', 'actor', 'album', 'albumRelease', 'alumni', 'alumniOf', 'attendee', 'award', 'blogPost', 'broker', 'colleague', 'contactPoint', 'director', 'employee', 'encoding', 'episode', 'event', 'exampleOfWork', 'founder', 'game', 'gameServer', 'memberOf', 'muscleAction', 'parent', 'partOfSeries', 'performer', 'photo', 'provider', 'recordedAs', 'recordedAt', 'recordedIn', 'recordingOf', 'releaseOf', 'result', 'review', 'roleName', 'season', 'sibling', 'significantLink', 'subEvent', 'suggestedAnswer', 'track', 'workExample', 'competitor', 'hasMap', 'image', 'seller', 'hasPart', 'member', 'position', 'instrument', 'isPartOf', 'object', 'location', 'participant']);
  return module.exports;
});

$__System.registerDynamic("15", ["b", "d", "e", "f", "10", "11", "12", "13", "14"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.as = $__require('b');
  exports.asx = $__require('d');
  exports.owl = $__require('e');
  exports.rdf = $__require('f');
  exports.rdfs = $__require('10');
  exports.xsd = $__require('11');
  exports.interval = $__require('12');
  exports.social = $__require('13');
  exports.schema = $__require('14');
  return module.exports;
});

$__System.registerDynamic("4", ["15"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('15');
  return module.exports;
});

$__System.register("16", ["5", "4", "a", "18", "17"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var _, linkeddata_vocabs_1, Constants_1, Resources_1, core_decorators_1;
    var heraclesWeakMap, ApiDocumentation, DocumentedResource, SupportedOperation, SupportedProperty, Class, StatusCodeDescription, RdfProperty;
    return {
        setters:[
            function (_1) {
                _ = _1;
            },
            function (linkeddata_vocabs_1_1) {
                linkeddata_vocabs_1 = linkeddata_vocabs_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            },
            function (Resources_1_1) {
                Resources_1 = Resources_1_1;
            },
            function (core_decorators_1_1) {
                core_decorators_1 = core_decorators_1_1;
            }],
        execute: function() {
            heraclesWeakMap = new WeakMap();
            ApiDocumentation = (function (_super) {
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
                __decorate([
                    core_decorators_1.nonenumerable
                ], ApiDocumentation.prototype, "_heracles", null);
                return ApiDocumentation;
            }(Resources_1.Resource));
            exports_1("ApiDocumentation", ApiDocumentation);
            DocumentedResource = (function (_super) {
                __extends(DocumentedResource, _super);
                function DocumentedResource(hydraResource) {
                    _super.call(this, hydraResource);
                }
                Object.defineProperty(DocumentedResource.prototype, "description", {
                    get: function () {
                        return this[Constants_1.Core.Vocab.description] ||
                            this[linkeddata_vocabs_1.rdfs.ns + 'comment'] ||
                            this[linkeddata_vocabs_1.schema.description];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DocumentedResource.prototype, "title", {
                    get: function () {
                        return this[Constants_1.Core.Vocab.title] ||
                            this[linkeddata_vocabs_1.rdfs.ns + 'label'] ||
                            this[linkeddata_vocabs_1.schema.title];
                    },
                    enumerable: true,
                    configurable: true
                });
                return DocumentedResource;
            }(Resources_1.Resource));
            exports_1("DocumentedResource", DocumentedResource);
            SupportedOperation = (function (_super) {
                __extends(SupportedOperation, _super);
                function SupportedOperation(hydraOperation, heracles) {
                    heraclesWeakMap.set(this, heracles);
                    _super.call(this, hydraOperation);
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
                        var operationExpectsBody = !!this.expects && this.expects.id !== linkeddata_vocabs_1.owl.ns + 'Nothing';
                        return methodExpectsBody || operationExpectsBody;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SupportedOperation;
            }(DocumentedResource));
            exports_1("SupportedOperation", SupportedOperation);
            SupportedProperty = (function (_super) {
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
            }(DocumentedResource));
            exports_1("SupportedProperty", SupportedProperty);
            Class = (function (_super) {
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
            }(DocumentedResource));
            exports_1("Class", Class);
            StatusCodeDescription = (function (_super) {
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
            }(Resources_1.Resource));
            exports_1("StatusCodeDescription", StatusCodeDescription);
            RdfProperty = (function (_super) {
                __extends(RdfProperty, _super);
                function RdfProperty() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(RdfProperty.prototype, "range", {
                    get: function () {
                        return this[linkeddata_vocabs_1.rdfs.ns + 'range'];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RdfProperty.prototype, "domain", {
                    get: function () {
                        return this[linkeddata_vocabs_1.rdfs.ns + 'domain'];
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
            exports_1("RdfProperty", RdfProperty);
        }
    }
});

$__System.register("19", [], function(exports_1, context_1) {
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

$__System.register("1a", ["5", "4", "18", "16", "a", "19"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var _, linkeddata_vocabs_1, Types, DocTypes, Constants_1, JsonLdUtil_1;
    var ResourceFactory, IncomingLink;
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
        this.factories[linkeddata_vocabs_1.rdf.ns + 'Property'] = createRdfProperty;
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
    return {
        setters:[
            function (_1) {
                _ = _1;
            },
            function (linkeddata_vocabs_1_1) {
                linkeddata_vocabs_1 = linkeddata_vocabs_1_1;
            },
            function (Types_1) {
                Types = Types_1;
            },
            function (DocTypes_1) {
                DocTypes = DocTypes_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            },
            function (JsonLdUtil_1_1) {
                JsonLdUtil_1 = JsonLdUtil_1_1;
            }],
        execute: function() {
            ResourceFactory = (function () {
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
            exports_1("ResourceFactory", ResourceFactory);
            IncomingLink = (function () {
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
        }
    }
});

$__System.register("a", [], function(exports_1, context_1) {
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
            })(Core = Core || (Core = {}));
            exports_1("Core", Core);
            (function (JsonLd) {
                JsonLd.Graph = '@graph';
                JsonLd.Context = '@context';
                JsonLd.Id = '@id';
                JsonLd.Value = '@value';
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

$__System.register("18", ["5", "6", "17", "a"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var _, jsonld_1, core_decorators_1, Constants_1;
    var _isProcessed, _apiDocumentation, _incomingLinks, _heracles, _supportedOperation, _resource, Resource, HydraResource, Operation, PartialCollectionView;
    return {
        setters:[
            function (_1) {
                _ = _1;
            },
            function (jsonld_1_1) {
                jsonld_1 = jsonld_1_1;
            },
            function (core_decorators_1_1) {
                core_decorators_1 = core_decorators_1_1;
            },
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            }],
        execute: function() {
            _isProcessed = new WeakMap();
            _apiDocumentation = new WeakMap();
            _incomingLinks = new WeakMap();
            _heracles = new WeakMap();
            _supportedOperation = new WeakMap();
            _resource = new WeakMap();
            Resource = (function () {
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
                    if (context === void 0) { context = null; }
                    return jsonld_1.promises.compact(this, context || Constants_1.Core.Context);
                };
                __decorate([
                    core_decorators_1.nonenumerable
                ], Resource.prototype, "id", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], Resource.prototype, "types", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], Resource.prototype, "_processed", null);
                return Resource;
            }());
            exports_1("Resource", Resource);
            HydraResource = (function (_super) {
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
                            classOperations = _.map(this[Constants_1.JsonLd.Type], function (type) { return _this.apiDocumentation.getOperations(type); });
                        }
                        else {
                            classOperations = [this.apiDocumentation.getOperations(this[Constants_1.JsonLd.Type])];
                        }
                        var propertyOperations = _.chain(this.getIncomingLinks())
                            .map(function (link) { return _.map(link.subject.types, function (type) { return ({ type: type, predicate: link.predicate }); }); })
                            .flatten()
                            .map(function (link) { return _this.apiDocumentation.getOperations(link.type, link.predicate); })
                            .union()
                            .value();
                        var operations = classOperations.concat(propertyOperations);
                        return _.flatten(operations).map(function (supportedOperation) {
                            return new Operation(supportedOperation, _this._heracles, _this);
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_decorators_1.nonenumerable
                ], HydraResource.prototype, "apiDocumentation", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], HydraResource.prototype, "_heracles", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], HydraResource.prototype, "operations", null);
                return HydraResource;
            }(Resource));
            exports_1("HydraResource", HydraResource);
            Operation = (function () {
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
                    if (mediaType === void 0) { mediaType = Constants_1.MediaTypes.jsonLd; }
                    return this._heracles.invokeOperation(this, this._resource.id, body, mediaType);
                };
                __decorate([
                    core_decorators_1.nonenumerable
                ], Operation.prototype, "_supportedOperation", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], Operation.prototype, "_resource", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], Operation.prototype, "_heracles", null);
                return Operation;
            }());
            exports_1("Operation", Operation);
            PartialCollectionView = (function (_super) {
                __extends(PartialCollectionView, _super);
                function PartialCollectionView() {
                    _super.apply(this, arguments);
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
                        var collectionLink = _.find(this.getIncomingLinks(), function (linkArray) {
                            return linkArray.predicate === Constants_1.Core.Vocab.view;
                        });
                        return collectionLink ? collectionLink.subject : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_decorators_1.nonenumerable
                ], PartialCollectionView.prototype, "first", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], PartialCollectionView.prototype, "previous", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], PartialCollectionView.prototype, "next", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], PartialCollectionView.prototype, "last", null);
                __decorate([
                    core_decorators_1.nonenumerable
                ], PartialCollectionView.prototype, "collection", null);
                return PartialCollectionView;
            }(HydraResource));
            exports_1("PartialCollectionView", PartialCollectionView);
        }
    }
});

$__System.register("1", ["5", "2", "a", "19", "1a", "18"], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var _, FetchUtil_1, Constants_1, JsonLdUtil_1, ResourceFactory_1, Resources_1;
    var Heracles, ResourceFactory, Resource, Hydra;
    function processFetchUtilResponse(uri) {
        var _this = this;
        return function (response) {
            return _this.loadDocumentation(response.apiDocumentationLink)
                .then(getRequestedObject(_this, uri, response.resources));
        };
    }
    function getRequestedObject(heracles, uri, resources, typeOverrides) {
        if (typeOverrides === void 0) { typeOverrides = {}; }
        return function (apiDocumentation) {
            var resourcified = _.keyBy(resources, function (res) { return JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(res[Constants_1.JsonLd.Id]); });
            uri = JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(uri);
            _.transform(resources, function (acc, val) {
                var id = JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(val[Constants_1.JsonLd.Id]);
                acc[id] = heracles.resourceFactory.createResource(heracles, val, apiDocumentation, acc, typeOverrides[id]);
            }, resourcified);
            if (!resourcified[uri]) {
                return Promise.reject(new Error('Resource ' + uri + ' was not found in the response'));
            }
            _.each(resourcified, function (g) { return resourcify(heracles, g, resourcified, apiDocumentation, typeOverrides); });
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
                resource[key] = _.map(value, function (el) { return resourcify(heracles, el, resourcified, apiDoc, typeOverrides); });
                return;
            }
            resource[key] = resourcify(heracles, value, resourcified, apiDoc, typeOverrides);
        });
        return resource;
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
            },
            function (ResourceFactory_1_1) {
                ResourceFactory_1 = ResourceFactory_1_1;
            },
            function (Resources_1_1) {
                Resources_1 = Resources_1_1;
            }],
        execute: function() {
            Heracles = (function () {
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
                        typeOverrides[JsonLdUtil_1.JsonLdUtil.trimTrailingSlash(uri)] = Constants_1.Core.Vocab.ApiDocumentation;
                        return getRequestedObject(_this, uri, response.resources, typeOverrides)(null);
                    }, function () { return null; });
                };
                Heracles.prototype.invokeOperation = function (operation, uri, body, mediaType) {
                    return FetchUtil_1.FetchUtil.invokeOperation(operation.method, uri, body, mediaType)
                        .then(processFetchUtilResponse.call(this, uri));
                };
                return Heracles;
            }());
            exports_1("ResourceFactory", ResourceFactory = ResourceFactory_1.ResourceFactory);
            exports_1("Resource", Resource = Resources_1.HydraResource);
            exports_1("Hydra", Hydra = new Heracles());
        }
    }
});

})
(function(factory) {
  define(["li","lodash","jsonld","rdf-ext","rdf-formats-common","rdf-serializer-jsonld","core-decorators"], factory);
});
//# sourceMappingURL=heracles.js.map
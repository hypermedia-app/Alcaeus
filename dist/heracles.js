!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1","2"], ["4","6","7","8","9","a","11"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('3', ['4', '6', '7', '5', '8', '9', 'a', 'b'], true, function ($__require, exports, module) {
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
    var _ = $__require('6');
    var jsonld_1 = $__require('7');
    var Constants = $__require('5');
    var $rdf = $__require('8');
    var formats = $__require('9');
    var JsonLdSerializer = $__require('a');
    var rdf = $__require('b');
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
        FetchUtil._propertyRangeMappings = [[Constants.Core.Vocab.supportedClass, Constants.Core.Vocab.Class], [Constants.Core.Vocab.expects, Constants.Core.Vocab.Class], [Constants.Core.Vocab.returns, Constants.Core.Vocab.Class], [Constants.Core.Vocab.supportedOperation, Constants.Core.Vocab.Operation], [Constants.Core.Vocab.operation, Constants.Core.Vocab.Operation], [Constants.Core.Vocab.supportedProperty, Constants.Core.Vocab.SupportedProperty], [Constants.Core.Vocab.statusCodes, Constants.Core.Vocab.StatusCodeDescription], [Constants.Core.Vocab.property, rdf.ns + 'Property'], [Constants.Core.Vocab.mapping, Constants.Core.Vocab.IriTemplateMapping]];
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
                graph.add(new $rdf.Triple(triple.object, new $rdf.NamedNode(rdf.type), new $rdf.NamedNode(mapping[1])));
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
$__System.registerDynamic('c', ['d'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  $__require('d')(exports, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#', 'rdf', ['first', 'rest', 'nil', 'type']);
  return module.exports;
});
$__System.registerDynamic("b", ["c"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("c");
  return module.exports;
});
$__System.registerDynamic('e', ['d'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  $__require('d')(exports, 'http://www.w3.org/2002/07/owl#', 'owl', ['Class', 'DatatypeProperty', 'ObjectProperty', 'FunctionalProperty', 'DeprecatedPropety']);
  return module.exports;
});
$__System.registerDynamic("f", ["e"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("e");
  return module.exports;
});
$__System.registerDynamic('10', ['d', '11'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  (function (process) {
    'use strict';

    $__require('d')(exports, 'http://schema.org/', 's', ['APIReference', 'AboutPage', 'AcceptAction', 'AccountingService', 'AchieveAction', 'Action', 'ActionStatusType', 'ActivateAction', 'AddAction', 'AdministrativeArea', 'AdultEntertainment', 'AggregateOffer', 'AggregateRating', 'AgreeAction', 'Airline', 'Airport', 'AlignmentObject', 'AllocateAction', 'AmusementPark', 'AnatomicalStructure', 'AnatomicalSystem', 'AnimalShelter', 'Answer', 'ApartmentComplex', 'AppendAction', 'ApplyAction', 'ApprovedIndication', 'Aquarium', 'ArriveAction', 'ArtGallery', 'Artery', 'Article', 'AskAction', 'AssessAction', 'AssignAction', 'Attorney', 'Audience', 'AudioObject', 'AuthorizeAction', 'AutoBodyShop', 'AutoDealer', 'AutoPartsStore', 'AutoRental', 'AutoRepair', 'AutoWash', 'AutomatedTeller', 'AutomotiveBusiness', 'Bakery', 'BankOrCreditUnion', 'BarOrPub', 'Beach', 'BeautySalon', 'BedAndBreakfast', 'BefriendAction', 'BikeStore', 'Blog', 'BlogPosting', 'BloodTest', 'BodyOfWater', 'Bone', 'Book', 'BookFormatType', 'BookSeries', 'BookStore', 'BookmarkAction', 'Boolean', 'BorrowAction', 'BowlingAlley', 'BrainStructure', 'Brand', 'BreadcrumbList', 'Brewery', 'BroadcastEvent', 'BroadcastService', 'BuddhistTemple', 'BusReservation', 'BusStation', 'BusStop', 'BusTrip', 'BusinessAudience', 'BusinessEntityType', 'BusinessEvent', 'BusinessFunction', 'BuyAction', 'CafeOrCoffeeShop', 'Campground', 'Canal', 'CancelAction', 'Car', 'Casino', 'CatholicChurch', 'Cemetery', 'CheckAction', 'CheckInAction', 'CheckOutAction', 'CheckoutPage', 'ChildCare', 'ChildrensEvent', 'ChooseAction', 'Church', 'City', 'CityHall', 'CivicStructure', 'Class', 'Clip', 'ClothingStore', 'Code', 'CollectionPage', 'CollegeOrUniversity', 'ComedyClub', 'ComedyEvent', 'Comment', 'CommentAction', 'CommunicateAction', 'ComputerStore', 'ConfirmAction', 'ConsumeAction', 'ContactPage', 'ContactPoint', 'ContactPointOption', 'Continent', 'ControlAction', 'ConvenienceStore', 'CookAction', 'Corporation', 'Country', 'Courthouse', 'CreateAction', 'CreativeWork', 'CreditCard', 'Crematorium', 'DDxElement', 'DanceEvent', 'DanceGroup', 'DataCatalog', 'DataDownload', 'DataType', 'Dataset', 'Date', 'DateTime', 'DatedMoneySpecification', 'DayOfWeek', 'DaySpa', 'DeactivateAction', 'DefenceEstablishment', 'DeleteAction', 'DeliveryChargeSpecification', 'DeliveryEvent', 'DeliveryMethod', 'Demand', 'Dentist', 'DepartAction', 'DepartmentStore', 'DiagnosticLab', 'DiagnosticProcedure', 'Diet', 'DietarySupplement', 'DisagreeAction', 'DiscoverAction', 'DislikeAction', 'Distance', 'DonateAction', 'DoseSchedule', 'DownloadAction', 'DrawAction', 'DrinkAction', 'Drug', 'DrugClass', 'DrugCost', 'DrugCostCategory', 'DrugLegalStatus', 'DrugPregnancyCategory', 'DrugPrescriptionStatus', 'DrugStrength', 'DryCleaningOrLaundry', 'Duration', 'EatAction', 'EducationEvent', 'EducationalAudience', 'EducationalOrganization', 'Electrician', 'ElectronicsStore', 'ElementarySchool', 'EmailMessage', 'Embassy', 'EmergencyService', 'EmployeeRole', 'EmploymentAgency', 'EndorseAction', 'Energy', 'EntertainmentBusiness', 'EntryPoint', 'Enumeration', 'Episode', 'Event', 'EventReservation', 'EventStatusType', 'EventVenue', 'ExerciseAction', 'ExerciseGym', 'ExercisePlan', 'FastFoodRestaurant', 'Festival', 'FilmAction', 'FinancialService', 'FindAction', 'FireStation', 'Flight', 'FlightReservation', 'Float', 'Florist', 'FollowAction', 'FoodEstablishment', 'FoodEstablishmentReservation', 'FoodEvent', 'FurnitureStore', 'Game', 'GamePlayMode', 'GameServer', 'GameServerStatus', 'GardenStore', 'GasStation', 'GatedResidenceCommunity', 'GeneralContractor', 'GeoCoordinates', 'GeoShape', 'GiveAction', 'GolfCourse', 'GovernmentBuilding', 'GovernmentOffice', 'GovernmentOrganization', 'GovernmentPermit', 'GovernmentService', 'GroceryStore', 'HVACBusiness', 'HairSalon', 'HardwareStore', 'HealthAndBeautyBusiness', 'HealthClub', 'HighSchool', 'HinduTemple', 'HobbyShop', 'HomeAndConstructionBusiness', 'HomeGoodsStore', 'Hospital', 'Hostel', 'Hotel', 'HousePainter', 'IceCreamShop', 'IgnoreAction', 'ImageGallery', 'ImageObject', 'ImagingTest', 'IndividualProduct', 'InfectiousAgentClass', 'InfectiousDisease', 'InformAction', 'InsertAction', 'InstallAction', 'InsuranceAgency', 'Intangible', 'Integer', 'InteractAction', 'InternetCafe', 'InviteAction', 'Invoice', 'ItemAvailability', 'ItemList', 'ItemListOrderType', 'ItemPage', 'JewelryStore', 'JobPosting', 'JoinAction', 'Joint', 'LakeBodyOfWater', 'Landform', 'LandmarksOrHistoricalBuildings', 'Language', 'LeaveAction', 'LegislativeBuilding', 'LendAction', 'Library', 'LifestyleModification', 'Ligament', 'LikeAction', 'LiquorStore', 'ListItem', 'ListenAction', 'LiteraryEvent', 'LocalBusiness', 'LockerDelivery', 'Locksmith', 'LodgingBusiness', 'LodgingReservation', 'LoseAction', 'LymphaticVessel', 'Map', 'MapCategoryType', 'MarryAction', 'Mass', 'MaximumDoseSchedule', 'MediaObject', 'MedicalAudience', 'MedicalCause', 'MedicalClinic', 'MedicalCode', 'MedicalCondition', 'MedicalConditionStage', 'MedicalContraindication', 'MedicalDevice', 'MedicalDevicePurpose', 'MedicalEntity', 'MedicalEnumeration', 'MedicalEvidenceLevel', 'MedicalGuideline', 'MedicalGuidelineContraindication', 'MedicalGuidelineRecommendation', 'MedicalImagingTechnique', 'MedicalIndication', 'MedicalIntangible', 'MedicalObservationalStudy', 'MedicalObservationalStudyDesign', 'MedicalOrganization', 'MedicalProcedure', 'MedicalProcedureType', 'MedicalRiskCalculator', 'MedicalRiskEstimator', 'MedicalRiskFactor', 'MedicalRiskScore', 'MedicalScholarlyArticle', 'MedicalSign', 'MedicalSignOrSymptom', 'MedicalSpecialty', 'MedicalStudy', 'MedicalStudyStatus', 'MedicalSymptom', 'MedicalTest', 'MedicalTestPanel', 'MedicalTherapy', 'MedicalTrial', 'MedicalTrialDesign', 'MedicalWebPage', 'MedicineSystem', 'MensClothingStore', 'MiddleSchool', 'MobileApplication', 'MobilePhoneStore', 'Mosque', 'Motel', 'MotorcycleDealer', 'MotorcycleRepair', 'Mountain', 'MoveAction', 'Movie', 'MovieRentalStore', 'MovieSeries', 'MovieTheater', 'MovingCompany', 'Muscle', 'Museum', 'MusicAlbum', 'MusicAlbumProductionType', 'MusicAlbumReleaseType', 'MusicComposition', 'MusicEvent', 'MusicGroup', 'MusicPlaylist', 'MusicRecording', 'MusicRelease', 'MusicReleaseFormatType', 'MusicStore', 'MusicVenue', 'MusicVideoObject', 'NGO', 'NailSalon', 'Nerve', 'NewsArticle', 'NightClub', 'Notary', 'Number', 'NutritionInformation', 'OceanBodyOfWater', 'Offer', 'OfferItemCondition', 'OfficeEquipmentStore', 'OnDemandEvent', 'OpeningHoursSpecification', 'Optician', 'Order', 'OrderAction', 'OrderStatus', 'Organization', 'OrganizationRole', 'OrganizeAction', 'OutletStore', 'OwnershipInfo', 'PaintAction', 'Painting', 'PalliativeProcedure', 'ParcelDelivery', 'ParcelService', 'ParentAudience', 'Park', 'ParkingFacility', 'PathologyTest', 'PawnShop', 'PayAction', 'PaymentChargeSpecification', 'PaymentMethod', 'PeopleAudience', 'PerformAction', 'PerformanceRole', 'PerformingArtsTheater', 'PerformingGroup', 'Periodical', 'Permit', 'Person', 'PetStore', 'Pharmacy', 'Photograph', 'PhotographAction', 'PhysicalActivity', 'PhysicalActivityCategory', 'PhysicalExam', 'PhysicalTherapy', 'Physician', 'Place', 'PlaceOfWorship', 'PlanAction', 'PlayAction', 'Playground', 'Plumber', 'PoliceStation', 'Pond', 'PostOffice', 'PostalAddress', 'PrependAction', 'Preschool', 'PreventionIndication', 'PriceSpecification', 'Product', 'ProductModel', 'ProfessionalService', 'ProfilePage', 'ProgramMembership', 'Property', 'PropertyValueSpecification', 'PsychologicalTreatment', 'PublicSwimmingPool', 'PublicationEvent', 'PublicationIssue', 'PublicationVolume', 'QAPage', 'QualitativeValue', 'QuantitativeValue', 'Quantity', 'Question', 'QuoteAction', 'RVPark', 'RadiationTherapy', 'RadioClip', 'RadioEpisode', 'RadioSeason', 'RadioSeries', 'RadioStation', 'Rating', 'ReactAction', 'ReadAction', 'RealEstateAgent', 'ReceiveAction', 'Recipe', 'RecommendedDoseSchedule', 'RecyclingCenter', 'RegisterAction', 'RejectAction', 'RentAction', 'RentalCarReservation', 'ReplaceAction', 'ReplyAction', 'ReportedDoseSchedule', 'Reservation', 'ReservationPackage', 'ReservationStatusType', 'ReserveAction', 'Reservoir', 'Residence', 'Restaurant', 'ResumeAction', 'ReturnAction', 'Review', 'ReviewAction', 'RiverBodyOfWater', 'Role', 'RoofingContractor', 'RsvpAction', 'RsvpResponseType', 'SaleEvent', 'ScheduleAction', 'ScholarlyArticle', 'School', 'Sculpture', 'SeaBodyOfWater', 'SearchAction', 'SearchResultsPage', 'Season', 'Seat', 'SelfStorage', 'SellAction', 'SendAction', 'Series', 'Service', 'ServiceChannel', 'ShareAction', 'ShoeStore', 'ShoppingCenter', 'SingleFamilyResidence', 'SiteNavigationElement', 'SkiResort', 'SocialEvent', 'SoftwareApplication', 'SomeProducts', 'Specialty', 'SportingGoodsStore', 'SportsActivityLocation', 'SportsClub', 'SportsEvent', 'SportsOrganization', 'SportsTeam', 'StadiumOrArena', 'State', 'Store', 'StructuredValue', 'SubscribeAction', 'SubwayStation', 'SuperficialAnatomy', 'SuspendAction', 'Synagogue', 'TVClip', 'TVEpisode', 'TVSeason', 'TVSeries', 'Table', 'TakeAction', 'TattooParlor', 'Taxi', 'TaxiReservation', 'TaxiStand', 'TechArticle', 'TelevisionStation', 'TennisComplex', 'Text', 'TheaterEvent', 'TheaterGroup', 'TherapeuticProcedure', 'Thing', 'Ticket', 'TieAction', 'Time', 'TipAction', 'TireShop', 'TouristAttraction', 'TouristInformationCenter', 'ToyStore', 'TrackAction', 'TradeAction', 'TrainReservation', 'TrainStation', 'TrainTrip', 'TransferAction', 'TravelAction', 'TravelAgency', 'TreatmentIndication', 'TypeAndQuantityNode', 'URL', 'UnRegisterAction', 'UnitPriceSpecification', 'UpdateAction', 'UseAction', 'UserBlocks', 'UserCheckins', 'UserComments', 'UserDownloads', 'UserInteraction', 'UserLikes', 'UserPageVisits', 'UserPlays', 'UserPlusOnes', 'UserTweets', 'Vehicle', 'Vein', 'Vessel', 'VeterinaryCare', 'VideoGallery', 'VideoGame', 'VideoGameSeries', 'VideoObject', 'ViewAction', 'VisualArtsEvent', 'VisualArtwork', 'Volcano', 'VoteAction', 'WPAdBlock', 'WPFooter', 'WPHeader', 'WPSideBar', 'WantAction', 'WarrantyPromise', 'WarrantyScope', 'WatchAction', 'Waterfall', 'WearAction', 'WebApplication', 'WebPage', 'WebPageElement', 'WebSite', 'WholesaleStore', 'WinAction', 'Winery', 'WriteAction', 'Zoo', 'Abdomen', 'ActiveActionStatus', 'ActiveNotRecruiting', 'AerobicActivity', 'AlbumRelease', 'AnaerobicActivity', 'Anesthesia', 'Appearance', 'Ayurvedic', 'Bacteria', 'Balance', 'BroadcastRelease', 'CDFormat', 'CT', 'Cardiovascular', 'CardiovascularExam', 'CaseSeries', 'CassetteFormat', 'Chiropractic', 'Clinician', 'CoOp', 'CohortStudy', 'CommunityHealth', 'CompilationAlbum', 'Completed', 'CompletedActionStatus', 'CrossSectional', 'DJMixAlbum', 'DVDFormat', 'DamagedCondition', 'DemoAlbum', 'Dentistry', 'Dermatologic', 'Diagnostic', 'DietNutrition', 'DigitalAudioTapeFormat', 'DigitalFormat', 'Discontinued', 'DoubleBlindedTrial', 'EBook', 'EPRelease', 'Ear', 'Emergency', 'Endocrine', 'EnrollingByInvitation', 'EventCancelled', 'EventPostponed', 'EventRescheduled', 'EventScheduled', 'EvidenceLevelA', 'EvidenceLevelB', 'EvidenceLevelC', 'Eye', 'FDAcategoryA', 'FDAcategoryB', 'FDAcategoryC', 'FDAcategoryD', 'FDAcategoryX', 'FDAnotEvaluated', 'FailedActionStatus', 'False', 'Flexibility', 'Fungus', 'Gastroenterologic', 'Genetic', 'Genitourinary', 'Geriatric', 'Gynecologic', 'Hardcover', 'Head', 'HearingImpairedSupported', 'Hematologic', 'Homeopathic', 'InStock', 'InStoreOnly', 'Infectious', 'InternationalTrial', 'ItemListOrderAscending', 'ItemListOrderDescending', 'ItemListUnordered', 'LaboratoryScience', 'LaserDiscFormat', 'LeisureTimeActivity', 'LimitedAvailability', 'LiveAlbum', 'Longitudinal', 'Lung', 'MRI', 'MedicalResearcher', 'Midwifery', 'MixtapeAlbum', 'MultiCenterTrial', 'MultiPlayer', 'MulticellularParasite', 'Musculoskeletal', 'MusculoskeletalExam', 'Neck', 'Neuro', 'Neurologic', 'NewCondition', 'NoninvasiveProcedure', 'Nose', 'NotYetRecruiting', 'Nursing', 'OTC', 'Observational', 'Obstetric', 'OccupationalActivity', 'OccupationalTherapy', 'OfflinePermanently', 'OfflineTemporarily', 'OnSitePickup', 'Oncologic', 'Online', 'OnlineFull', 'OnlineOnly', 'OpenTrial', 'Optometic', 'OrderCancelled', 'OrderDelivered', 'OrderInTransit', 'OrderPaymentDue', 'OrderPickupAvailable', 'OrderProblem', 'OrderProcessing', 'OrderReturned', 'Osteopathic', 'Otolaryngologic', 'OutOfStock', 'PET', 'Paperback', 'ParkingMap', 'Pathology', 'Patient', 'Pediatric', 'PercutaneousProcedure', 'PharmacySpecialty', 'Physiotherapy', 'PlaceboControlledTrial', 'PlasticSurgery', 'Podiatric', 'PotentialActionStatus', 'PreOrder', 'PrescriptionOnly', 'PrimaryCare', 'Prion', 'Protozoa', 'Psychiatric', 'PublicHealth', 'Pulmonary', 'Radiograpy', 'RandomizedTrial', 'Recruiting', 'RefurbishedCondition', 'Registry', 'ReimbursementCap', 'RemixAlbum', 'Renal', 'Researcher', 'ReservationCancelled', 'ReservationConfirmed', 'ReservationHold', 'ReservationPending', 'RespiratoryTherapy', 'ResultsAvailable', 'ResultsNotAvailable', 'Retail', 'Rheumatologic', 'RsvpResponseMaybe', 'RsvpResponseNo', 'RsvpResponseYes', 'SeatingMap', 'SingleBlindedTrial', 'SingleCenterTrial', 'SinglePlayer', 'SingleRelease', 'Skin', 'SoldOut', 'SoundtrackAlbum', 'SpeechPathology', 'SpokenWordAlbum', 'StrengthTraining', 'StudioAlbum', 'Surgical', 'SurgicalProcedure', 'Suspended', 'Terminated', 'Therapeutic', 'Throat', 'TollFree', 'Toxicologic', 'TraditionalChinese', 'TransitMap', 'TripleBlindedTrial', 'True', 'Ultrasound', 'Urologic', 'UsedCondition', 'VenueMap', 'VinylFormat', 'Virus', 'VitalSign', 'WesternConventional', 'Wholesale', 'Withdrawn', 'XRay', 'about', 'acceptedAnswer', 'acceptedOffer', 'acceptedPaymentMethod', 'acceptsReservations', 'accessCode', 'accessibilityAPI', 'accessibilityControl', 'accessibilityFeature', 'accessibilityHazard', 'accountId', 'accountablePerson', 'acquiredFrom', 'action', 'actionStatus', 'activeIngredient', 'activityDuration', 'activityFrequency', 'actors', 'addOn', 'additionalName', 'additionalNumberOfGuests', 'additionalType', 'additionalVariable', 'address', 'addressCountry', 'addressLocality', 'addressRegion', 'administrationRoute', 'advanceBookingRequirement', 'adverseOutcome', 'affectedBy', 'affiliation', 'agent', 'aggregateRating', 'aircraft', 'albumProductionType', 'albumReleaseType', 'albums', 'alcoholWarning', 'algorithm', 'alignmentType', 'alternateName', 'alternativeHeadline', 'amount', 'amountOfThisGood', 'answerCount', 'antagonist', 'applicableLocation', 'application', 'applicationCategory', 'applicationSubCategory', 'applicationSuite', 'appliesToDeliveryMethod', 'appliesToPaymentMethod', 'area', 'areaServed', 'arrivalAirport', 'arrivalBusStop', 'arrivalGate', 'arrivalPlatform', 'arrivalStation', 'arrivalTerminal', 'arrivalTime', 'artEdition', 'arterialBranch', 'artform', 'articleBody', 'articleSection', 'aspect', 'assembly', 'assemblyVersion', 'associatedAnatomy', 'associatedArticle', 'associatedMedia', 'associatedPathophysiology', 'athlete', 'attendees', 'audience', 'audienceType', 'audio', 'author', 'availability', 'availabilityEnds', 'availabilityStarts', 'availableAtOrFrom', 'availableChannel', 'availableDeliveryMethod', 'availableFrom', 'availableIn', 'availableLanguage', 'availableService', 'availableStrength', 'availableTest', 'availableThrough', 'awards', 'awayTeam', 'background', 'baseSalary', 'benefits', 'bestRating', 'billingAddress', 'billingIncrement', 'billingPeriod', 'biomechnicalClass', 'birthDate', 'birthPlace', 'bitrate', 'blogPosts', 'bloodSupply', 'boardingGroup', 'bodyLocation', 'bookEdition', 'bookFormat', 'bookingAgent', 'bookingTime', 'borrower', 'box', 'branch', 'branchOf', 'brand', 'breadcrumb', 'breastfeedingWarning', 'broadcaster', 'browserRequirements', 'busName', 'busNumber', 'businessFunction', 'buyer', 'byArtist', 'calories', 'candidate', 'caption', 'carbohydrateContent', 'carrier', 'carrierRequirements', 'catalog', 'catalogNumber', 'category', 'cause', 'causeOf', 'character', 'characterAttribute', 'characterName', 'cheatCode', 'checkinTime', 'checkoutTime', 'childMaxAge', 'childMinAge', 'children', 'cholesterolContent', 'circle', 'citation', 'clincalPharmacology', 'clinicalPharmacology', 'clipNumber', 'closes', 'coach', 'code', 'codeRepository', 'codeValue', 'codingSystem', 'colleagues', 'collection', 'color', 'comment', 'commentCount', 'commentText', 'commentTime', 'composer', 'comprisedOf', 'confirmationNumber', 'connectedTo', 'contactOption', 'contactPoints', 'contactType', 'containedIn', 'contentLocation', 'contentRating', 'contentSize', 'contentType', 'contentUrl', 'contraindication', 'contributor', 'cookTime', 'cookingMethod', 'copyrightHolder', 'copyrightYear', 'cost', 'costCategory', 'costCurrency', 'costOrigin', 'costPerUnit', 'countriesNotSupported', 'countriesSupported', 'course', 'creator', 'creditedTo', 'currenciesAccepted', 'currency', 'customer', 'dataset', 'dateCreated', 'dateIssued', 'dateModified', 'datePosted', 'datePublished', 'dateline', 'dayOfWeek', 'deathDate', 'deathPlace', 'defaultValue', 'deliveryAddress', 'deliveryLeadTime', 'deliveryMethod', 'deliveryStatus', 'department', 'departureAirport', 'departureBusStop', 'departureGate', 'departurePlatform', 'departureStation', 'departureTerminal', 'departureTime', 'dependencies', 'depth', 'description', 'device', 'diagnosis', 'diagram', 'diet', 'dietFeatures', 'differentialDiagnosis', 'directors', 'discount', 'discountCode', 'discountCurrency', 'discusses', 'discussionUrl', 'dissolutionDate', 'distance', 'distinguishingSign', 'distribution', 'domainIncludes', 'doorTime', 'dosageForm', 'doseSchedule', 'doseUnit', 'doseValue', 'downloadUrl', 'downvoteCount', 'drainsTo', 'dropoffLocation', 'dropoffTime', 'drug', 'drugClass', 'drugUnit', 'duns', 'duplicateTherapy', 'duration', 'durationOfWarranty', 'editor', 'educationRequirements', 'educationalAlignment', 'educationalFramework', 'educationalRole', 'educationalUse', 'elevation', 'eligibleCustomerType', 'eligibleDuration', 'eligibleQuantity', 'eligibleRegion', 'eligibleTransactionVolume', 'email', 'embedUrl', 'employees', 'employmentType', 'encodesCreativeWork', 'encodingFormat', 'encodingType', 'encodings', 'endDate', 'endTime', 'endorsee', 'endorsers', 'entertainmentBusiness', 'epidemiology', 'episodeNumber', 'episodes', 'equal', 'error', 'estimatedFlightDuration', 'estimatesRiskOf', 'eventStatus', 'events', 'evidenceLevel', 'evidenceOrigin', 'exercisePlan', 'exerciseType', 'exifData', 'expectedArrivalFrom', 'expectedArrivalUntil', 'expectedPrognosis', 'expectsAcceptanceOf', 'experienceRequirements', 'expertConsiderations', 'expires', 'familyName', 'fatContent', 'faxNumber', 'featureList', 'fiberContent', 'fileFormat', 'fileSize', 'firstPerformance', 'flightDistance', 'flightNumber', 'followee', 'follows', 'followup', 'foodEstablishment', 'foodEvent', 'foodWarning', 'founders', 'foundingDate', 'foundingLocation', 'free', 'frequency', 'fromLocation', 'function', 'functionalClass', 'gameItem', 'gameLocation', 'gamePlatform', 'gameTip', 'gender', 'genre', 'geo', 'geographicArea', 'givenName', 'globalLocationNumber', 'greater', 'greaterOrEqual', 'gtin13', 'gtin14', 'gtin8', 'guideline', 'guidelineDate', 'guidelineSubject', 'hasDeliveryMethod', 'hasPOS', 'headline', 'healthCondition', 'height', 'highPrice', 'hiringOrganization', 'homeLocation', 'homeTeam', 'honorificPrefix', 'honorificSuffix', 'hospitalAffiliation', 'hostingOrganization', 'hoursAvailable', 'howPerformed', 'httpMethod', 'iataCode', 'icaoCode', 'identifyingExam', 'identifyingTest', 'illustrator', 'imagingTechnique', 'inAlbum', 'inLanguage', 'inPlaylist', 'incentives', 'includedComposition', 'includedRiskFactor', 'includesObject', 'increasesRiskOf', 'indication', 'industry', 'ineligibleRegion', 'infectiousAgent', 'infectiousAgentClass', 'ingredients', 'insertion', 'installUrl', 'intensity', 'interactingDrug', 'interactionCount', 'interactivityType', 'inventoryLevel', 'inverseOf', 'isAccessoryOrSparePartFor', 'isAvailableGenerically', 'isBasedOnUrl', 'isConsumableFor', 'isFamilyFriendly', 'isGift', 'isProprietary', 'isRelatedTo', 'isSimilarTo', 'isVariantOf', 'isbn', 'isicV4', 'isrcCode', 'issn', 'issueNumber', 'issuedBy', 'issuedThrough', 'iswcCode', 'item', 'itemCondition', 'itemListElement', 'itemListOrder', 'itemOffered', 'itemReviewed', 'itemShipped', 'jobLocation', 'jobTitle', 'keywords', 'knows', 'labelDetails', 'landlord', 'language', 'lastReviewed', 'latitude', 'learningResourceType', 'legalName', 'legalStatus', 'lender', 'lesser', 'lesserOrEqual', 'license', 'line', 'lodgingUnitDescription', 'lodgingUnitType', 'logo', 'longitude', 'loser', 'lowPrice', 'lyricist', 'mainContentOfPage', 'makesOffer', 'manufacturer', 'map', 'mapType', 'maps', 'material', 'maxPrice', 'maxValue', 'maximumIntake', 'mealService', 'mechanismOfAction', 'medicalSpecialty', 'medicineSystem', 'members', 'membershipNumber', 'memoryRequirements', 'mentions', 'menu', 'merchant', 'minPrice', 'minValue', 'minimumPaymentDue', 'model', 'modifiedTime', 'mpn', 'multipleValues', 'musicArrangement', 'musicBy', 'musicCompositionForm', 'musicGroupMember', 'musicReleaseFormat', 'musicalKey', 'naics', 'name', 'namedPosition', 'nationality', 'naturalProgression', 'nerve', 'nerveMotor', 'netWorth', 'nextItem', 'nonEqual', 'nonProprietaryName', 'normalRange', 'numAdults', 'numChildren', 'numTracks', 'numberOfEmployees', 'numberOfEpisodes', 'numberOfItems', 'numberOfPages', 'numberOfPlayers', 'numberOfSeasons', 'numberedPosition', 'nutrition', 'occupationalCategory', 'offerCount', 'offers', 'openingHours', 'openingHoursSpecification', 'opens', 'operatingSystem', 'opponent', 'option', 'orderDate', 'orderNumber', 'orderStatus', 'orderedItem', 'organizer', 'origin', 'originAddress', 'originatesFrom', 'outcome', 'overdosage', 'overview', 'ownedFrom', 'ownedThrough', 'owns', 'pageEnd', 'pageStart', 'pagination', 'parentItem', 'parentService', 'parents', 'partOfEpisode', 'partOfInvoice', 'partOfOrder', 'partOfSeason', 'partOfSystem', 'partOfTVSeries', 'partySize', 'pathophysiology', 'paymentAccepted', 'paymentDue', 'paymentMethod', 'paymentMethodId', 'paymentStatus', 'paymentUrl', 'performerIn', 'performers', 'permissions', 'permitAudience', 'phase', 'photos', 'physiologicalBenefits', 'pickupLocation', 'pickupTime', 'playMode', 'playerType', 'playersOnline', 'polygon', 'population', 'possibleComplication', 'possibleTreatment', 'postOfficeBoxNumber', 'postOp', 'postalCode', 'potentialAction', 'preOp', 'predecessorOf', 'pregnancyCategory', 'pregnancyWarning', 'prepTime', 'preparation', 'prescribingInfo', 'prescriptionStatus', 'previousItem', 'previousStartDate', 'price', 'priceCurrency', 'priceRange', 'priceSpecification', 'priceType', 'priceValidUntil', 'primaryImageOfPage', 'primaryPrevention', 'printColumn', 'printEdition', 'printPage', 'printSection', 'procedure', 'procedureType', 'processingTime', 'processorRequirements', 'producer', 'produces', 'productID', 'productSupported', 'productionCompany', 'proficiencyLevel', 'programMembershipUsed', 'programName', 'programmingLanguage', 'programmingModel', 'proprietaryName', 'proteinContent', 'providesService', 'publication', 'publicationType', 'publishedOn', 'publisher', 'publishingPrinciples', 'purpose', 'qualifications', 'query', 'quest', 'question', 'rangeIncludes', 'ratingCount', 'ratingValue', 'readonlyValue', 'realEstateAgent', 'recipe', 'recipeCategory', 'recipeCuisine', 'recipeInstructions', 'recipeYield', 'recipient', 'recognizingAuthority', 'recommendationStrength', 'recommendedIntake', 'recordLabel', 'referencesOrder', 'regionDrained', 'regionsAllowed', 'relatedAnatomy', 'relatedCondition', 'relatedDrug', 'relatedLink', 'relatedStructure', 'relatedTherapy', 'relatedTo', 'releaseDate', 'releaseNotes', 'releasedEvent', 'relevantSpecialty', 'repetitions', 'replacee', 'replacer', 'replyToUrl', 'representativeOfPage', 'requiredGender', 'requiredMaxAge', 'requiredMinAge', 'requirements', 'requiresSubscription', 'reservationFor', 'reservationId', 'reservationStatus', 'reservedTicket', 'responsibilities', 'restPeriods', 'resultReview', 'reviewBody', 'reviewCount', 'reviewRating', 'reviewedBy', 'reviews', 'riskFactor', 'risks', 'rsvpResponse', 'runsTo', 'runtime', 'safetyConsideration', 'salaryCurrency', 'sameAs', 'sampleType', 'saturatedFatContent', 'scheduledPaymentDate', 'scheduledTime', 'screenshot', 'seasonNumber', 'seasons', 'seatNumber', 'seatRow', 'seatSection', 'seatingType', 'secondaryPrevention', 'seeks', 'sender', 'sensoryUnit', 'serialNumber', 'seriousAdverseOutcome', 'serverStatus', 'servesCuisine', 'serviceArea', 'serviceAudience', 'serviceLocation', 'serviceOperator', 'servicePhone', 'servicePostalAddress', 'serviceSmsNumber', 'serviceType', 'serviceUrl', 'servingSize', 'siblings', 'signDetected', 'signOrSymptom', 'significance', 'significantLinks', 'skills', 'sku', 'sodiumContent', 'softwareAddOn', 'softwareHelp', 'softwareVersion', 'source', 'sourceOrganization', 'sourcedFrom', 'spatial', 'specialCommitments', 'specialty', 'sponsor', 'sport', 'sportsActivityLocation', 'sportsEvent', 'sportsTeam', 'spouse', 'stage', 'stageAsNumber', 'startDate', 'startTime', 'status', 'stepValue', 'storageRequirements', 'streetAddress', 'strengthUnit', 'strengthValue', 'structuralClass', 'study', 'studyDesign', 'studyLocation', 'studySubject', 'subEvents', 'subOrganization', 'subReservation', 'subStageSuffix', 'subStructure', 'subTest', 'subtype', 'successorOf', 'sugarContent', 'suggestedGender', 'suggestedMaxAge', 'suggestedMinAge', 'superEvent', 'supersededBy', 'supplyTo', 'surface', 'target', 'targetDescription', 'targetName', 'targetPlatform', 'targetPopulation', 'targetProduct', 'targetUrl', 'taxID', 'telephone', 'temporal', 'text', 'thumbnail', 'thumbnailUrl', 'tickerSymbol', 'ticketNumber', 'ticketToken', 'ticketedSeat', 'timeRequired', 'tissueSample', 'title', 'toLocation', 'totalPaymentDue', 'totalPrice', 'totalTime', 'trackingNumber', 'trackingUrl', 'tracks', 'trailer', 'trainName', 'trainNumber', 'transFatContent', 'transcript', 'translator', 'transmissionMethod', 'trialDesign', 'tributary', 'typeOfGood', 'typicalAgeRange', 'typicalTest', 'underName', 'unitCode', 'unsaturatedFatContent', 'uploadDate', 'upvoteCount', 'url', 'urlTemplate', 'usedToDiagnose', 'usesDevice', 'validFor', 'validFrom', 'validIn', 'validThrough', 'validUntil', 'value', 'valueAddedTaxIncluded', 'valueMaxLength', 'valueMinLength', 'valueName', 'valuePattern', 'valueReference', 'valueRequired', 'vatID', 'vendor', 'version', 'video', 'videoFrameSize', 'videoQuality', 'volumeNumber', 'warning', 'warranty', 'warrantyPromise', 'warrantyScope', 'webCheckinTime', 'weight', 'width', 'winner', 'wordCount', 'workHours', 'workLocation', 'workPerformed', 'workload', 'worksFor', 'worstRating', 'yearlyRevenue', 'yearsInOperation', 'actor', 'album', 'albumRelease', 'alumni', 'alumniOf', 'attendee', 'award', 'blogPost', 'broker', 'colleague', 'contactPoint', 'director', 'employee', 'encoding', 'episode', 'event', 'exampleOfWork', 'founder', 'game', 'gameServer', 'memberOf', 'muscleAction', 'parent', 'partOfSeries', 'performer', 'photo', 'provider', 'recordedAs', 'recordedAt', 'recordedIn', 'recordingOf', 'releaseOf', 'result', 'review', 'roleName', 'season', 'sibling', 'significantLink', 'subEvent', 'suggestedAnswer', 'track', 'workExample', 'competitor', 'hasMap', 'image', 'seller', 'hasPart', 'member', 'position', 'instrument', 'isPartOf', 'object', 'location', 'participant']);
  })($__require('11'));
  return module.exports;
});
$__System.registerDynamic("12", ["10"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("10");
  return module.exports;
});
$__System.registerDynamic('13', [], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  function define(root, name, value) {
    Object.defineProperty(root, name, {
      value: value,
      enumerable: true,
      configurable: false
    });
  };

  module.exports = function (exports, ns, prefix, terms) {
    define(exports, 'ns', ns);
    define(exports, 'prefix', prefix);
    for (let term of terms) define(exports, term, ns + term);
  };
  return module.exports;
});
$__System.registerDynamic("d", ["13"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("13");
  return module.exports;
});
$__System.registerDynamic('14', ['d'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  $__require('d')(exports, 'http://www.w3.org/2000/01/rdf-schema#', 'rdfs', ['subClassOf', 'subPropertyOf']);
  return module.exports;
});
$__System.registerDynamic("15", ["14"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require("14");
  return module.exports;
});
$__System.registerDynamic("16", ["6", "f", "12", "15", "5", "17", "18"], true, function ($__require, exports, module) {
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
    var _ = $__require("6");
    var owl = $__require("f");
    var schema = $__require("12");
    var rdfs = $__require("15");
    var Constants_1 = $__require("5");
    var Resources_1 = $__require("17");
    var nonenumerable_1 = $__require("18");
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
                return this[Constants_1.Core.Vocab.description] || this[rdfs.ns + 'comment'] || this[schema.description];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DocumentedResource.prototype, "title", {
            get: function () {
                return this[Constants_1.Core.Vocab.title] || this[rdfs.ns + 'label'] || this[schema.title];
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
                var operationExpectsBody = !!this.expects && this.expects.id !== owl.ns + 'Nothing';
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
                return this[rdfs.ns + 'range'];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RdfProperty.prototype, "domain", {
            get: function () {
                return this[rdfs.ns + 'domain'];
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
$__System.registerDynamic('19', [], true, function ($__require, exports, module) {
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
$__System.registerDynamic('1a', ['6', 'b', '17', '16', '5', '19'], true, function ($__require, exports, module) {
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var _ = $__require('6');
    var rdf = $__require('b');
    var Types = $__require('17');
    var DocTypes = $__require('16');
    var Constants_1 = $__require('5');
    var JsonLdUtil_1 = $__require('19');
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
        this.factories[rdf.ns + 'Property'] = createRdfProperty;
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
$__System.registerDynamic('2', ['1b'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, '__esModule', { value: true });
  exports['default'] = lazyInitialize;
  var _privateUtils = $__require('1b');
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
$__System.registerDynamic('1b', ['2'], true, function ($__require, exports, module) {
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
$__System.registerDynamic('18', ['1b'], true, function ($__require, exports, module) {
  /* */
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, '__esModule', { value: true });
  exports['default'] = nonenumerable;
  var _privateUtils = $__require('1b');
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
$__System.registerDynamic("17", ["6", "7", "18", "5"], true, function ($__require, exports, module) {
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
    var _ = $__require("6");
    var jsonld_1 = $__require("7");
    var nonenumerable = $__require("18");
    var Constants_1 = $__require("5");
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
$__System.registerDynamic('1', ['6', '3', '5', '19', '1a', '17'], true, function ($__require, exports, module) {
    /// <reference path="../typings/index.d.ts" />
    'use strict';

    var define,
        global = this || self,
        GLOBAL = global;
    var _ = $__require('6');
    var FetchUtil_1 = $__require('3');
    var Constants_1 = $__require('5');
    var JsonLdUtil_1 = $__require('19');
    var ResourceFactory_1 = $__require('1a');
    var Resources_1 = $__require('17');
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
  module.exports = factory(require("li"), require("lodash"), require("jsonld"), require("rdf-ext"), require("rdf-formats-common"), require("rdf-serializer-jsonld"), require("github:jspm/nodelibs-process@0.1.2.js"));
});
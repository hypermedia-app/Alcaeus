import Collection from "./Resources/Collection";
import ApiDocumentation from "./Resources/ApiDocumentation";
import PartialCollectionView from "./Resources/PartialCollectionView";
import Class from "./Resources/Class";
import SupportedProperty from "./Resources/SupportedProperty";
import StatusCodeDescription from "./Resources/StatusCodeDescription";
import RdfProperty from "./Resources/RdfProperty";
import SupportedOperation from "./Resources/SupportedOperation";
import BasicRepresentationExpansion from './Resources/Mixins/BasicRepresentationExpansion';
import ExplicitRepresentationExpansion from './Resources/Mixins/ExplicitRepresentationExpansion';
import IriTemplate from './Resources/IriTemplate';
import IriTemplateMapping from './Resources/IriTemplateMapping';

export default [
    ApiDocumentation,
    Collection,
    PartialCollectionView,
    SupportedProperty,
    SupportedOperation,
    StatusCodeDescription,
    RdfProperty,
    Class,
    BasicRepresentationExpansion,
    ExplicitRepresentationExpansion,
    IriTemplate,
    IriTemplateMapping,
];

import * as Collection from "./Resources/Collection";
import * as ApiDocumentation from "./Resources/ApiDocumentation";
import * as PartialCollectionView from "./Resources/PartialCollectionView";
import * as Class from "./Resources/Class";
import * as SupportedProperty from "./Resources/SupportedProperty";
import * as StatusCodeDescription from "./Resources/StatusCodeDescription";
import * as RdfProperty from "./Resources/RdfProperty";
import * as SupportedOperation from "./Resources/SupportedOperation";
import * as BasicRepresentationExpansion from './Resources/Mixins/BasicRepresentationExpansion';
import * as ExplicitRepresentationExpansion from './Resources/Mixins/ExplicitRepresentationExpansion';
import * as IriTemplate from './Resources/IriTemplate';
import * as IriTemplateMapping from './Resources/IriTemplateMapping';

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

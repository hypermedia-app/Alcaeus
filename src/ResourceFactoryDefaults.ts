import * as Collection from "./Resources/Mixins/Collection";
import * as ApiDocumentation from "./Resources/Mixins/ApiDocumentation";
import * as PartialCollectionView from "./Resources/Mixins/PartialCollectionView";
import * as Class from "./Resources/Mixins/Class";
import * as SupportedProperty from "./Resources/Mixins/SupportedProperty";
import * as StatusCodeDescription from "./Resources/Mixins/StatusCodeDescription";
import * as RdfProperty from "./Resources/Mixins/RdfProperty";
import * as SupportedOperation from "./Resources/Mixins/SupportedOperation";
import * as BasicRepresentationExpansion from './Resources/Mixins/BasicRepresentationExpansion';
import * as ExplicitRepresentationExpansion from './Resources/Mixins/ExplicitRepresentationExpansion';
import * as IriTemplate from './Resources/Mixins/IriTemplate';
import * as IriTemplateMapping from './Resources/Mixins/IriTemplateMapping';
import * as DocumentedResource from './Resources/Mixins/DocumentedResource';

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
    DocumentedResource
];

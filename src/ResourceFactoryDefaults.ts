import * as ApiDocumentation from './Resources/Mixins/ApiDocumentation';
import * as BasicRepresentationExpansion from './Resources/Mixins/BasicRepresentationExpansion';
import * as Class from './Resources/Mixins/Class';
import * as Collection from './Resources/Mixins/Collection';
import * as DocumentedResource from './Resources/Mixins/DocumentedResource';
import * as ExplicitRepresentationExpansion from './Resources/Mixins/ExplicitRepresentationExpansion';
import * as IriTemplate from './Resources/Mixins/IriTemplate';
import * as IriTemplateMapping from './Resources/Mixins/IriTemplateMapping';
import * as ManagesBlock from './Resources/Mixins/ManagesBlock';
import * as PartialCollectionView from './Resources/Mixins/PartialCollectionView';
import * as RdfProperty from './Resources/Mixins/RdfProperty';
import * as StatusCodeDescription from './Resources/Mixins/StatusCodeDescription';
import * as SupportedOperation from './Resources/Mixins/SupportedOperation';
import * as SupportedProperty from './Resources/Mixins/SupportedProperty';

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
    DocumentedResource,
    ManagesBlock,
];

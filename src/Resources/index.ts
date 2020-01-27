import { RdfResource } from '@tpluscode/rdfine'
import { HydraResponse } from '../HydraResponse'
import { OperationFinder } from './CoreMixins/OperationFinder'
import { ManagesBlockPattern } from './Mixins/ManagesBlock'
import { Operation } from './Operation'
import { Resource } from './Resource'
import { SupportedProperty } from './Mixins/SupportedProperty'

export interface HydraResource extends RdfResource, Resource, OperationFinder {
    /**
     * Gets the operations which can be performed on this resource
     */
    readonly operations: Operation[];

    /**
     * Gathers all properties from current resource's classes
     */
    getProperties(): { supportedProperty: SupportedProperty; objects: any[] }[];

    /**
     * Get all property/value pairs for hydra:Link properties
     *
     * @param includeMissing if true, will include properties not present in resource representation
     */
    getLinks(includeMissing?: boolean): { supportedProperty: SupportedProperty; resources: HydraResource[]}[];

    /**
     * Gets objects of hydra:collection property
     */
    getCollections(filter?: ManagesBlockPattern): HydraResource[];

    /**
     * Dereferences the resource
     */
    load?(): Promise<HydraResponse<this>>;
}

export interface View extends HydraResource {
    /**
     * Gets the actual collection resource, of which this view is part
     */
    readonly collection: HydraResource | null;
}

export { DocumentedResource } from './Mixins/DocumentedResource'
export { Class } from './Mixins/Class'
export { SupportedOperation } from './Mixins/SupportedOperation'
export { SupportedProperty } from './Mixins/SupportedProperty'
export { Collection } from './Mixins/Collection'
export { PartialCollectionView } from './Mixins/PartialCollectionView'
export { ApiDocumentation } from './Mixins/ApiDocumentation'

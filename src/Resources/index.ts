import type { RdfResource } from '@tpluscode/rdfine'
import type { DatasetCore } from 'rdf-js'
import type { HydraResponse } from '../alcaeus'
import type { OperationFinder } from './CoreMixins/OperationFinder'
import type { ManagesBlockPattern } from './Mixins/ManagesBlock'
import type { Operation } from './Operation'
import type { SupportedProperty } from './Mixins/SupportedProperty'

export interface HydraResource<D extends DatasetCore = DatasetCore> extends RdfResource<D>, OperationFinder {
    /**
     * Gets the operations which can be performed on this resource
     */
    readonly operations: Operation[]

    /**
     * Gathers all properties from current resource's classes
     */
    getProperties(): { supportedProperty: SupportedProperty; objects: any[] }[]

    /**
     * Get all property/value pairs for hydra:Link properties
     *
     * @param includeMissing if true, will include properties not present in resource representation
     */
    getLinks(includeMissing?: boolean): { supportedProperty: SupportedProperty; resources: HydraResource[]}[]

    /**
     * Gets objects of hydra:collection property
     */
    getCollections(filter?: ManagesBlockPattern): HydraResource[]

    /**
     * Dereferences the resource
     */
    load?(): Promise<HydraResponse<this>>
}

export interface View extends HydraResource {
    /**
     * Gets the actual collection resource, of which this view is part
     */
    readonly collection: HydraResource | null
}

export type { DocumentedResource } from './Mixins/DocumentedResource'
export type { Class } from './Mixins/Class'
export type { SupportedOperation } from './Mixins/SupportedOperation'
export type { SupportedProperty } from './Mixins/SupportedProperty'
export type { Collection } from './Mixins/Collection'
export type { PartialCollectionView } from './Mixins/PartialCollectionView'
export type { ApiDocumentation } from './Mixins/ApiDocumentation'

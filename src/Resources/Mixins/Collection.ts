import { namespace, property } from '@tpluscode/rdfine'
import type { Constructor } from '@tpluscode/rdfine'
import type { View, HydraResource } from '../index'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { ManagesBlockMixin } from './ManagesBlock'
import type { ManagesBlock } from './ManagesBlock'

export interface Collection<T = HydraResource> extends HydraResource {
    /**
     * Gets the total number of items within the entire collection.
     * Note that this number can be larger then the number of `members` in the case of partial collections
     */
    readonly totalItems: number
    /**
     * Gets the collection member included in the current representation.
     * In the case of partial collections they may only be a subset of all members
     */
    readonly members: (HydraResource & T)[]
    /**
     * Gets the views of a partial collection
     */
    readonly views?: View[]
    /**
     * Gets the manages block for current collection
     */
    readonly manages: ManagesBlock[]
}

export function CollectionMixin <TBase extends Constructor<HydraResource>>(Base: TBase) {
    @namespace(hydra)
    class CollectionClass extends Base implements Collection {
        @property.literal({ type: Number, initial: 0 })
        public totalItems!: number

        @property.resource({
            path: 'member',
            values: 'array',
        })
        public members!: HydraResource[]

        @property.resource({
            path: 'view',
            values: 'array',
        })
        public views!: View[]

        @property.resource({
            values: 'array',
            as: [ManagesBlockMixin],
        })
        public manages!: ManagesBlock[]
    }

    return CollectionClass
}

CollectionMixin.appliesTo = hydra.Collection

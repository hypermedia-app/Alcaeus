import { Constructor, namespace, property, RdfResource } from '@tpluscode/rdfine'
import { View, HydraResource } from '../index'
import { hydra } from '../../Vocabs'
import { ManagesBlock, ManagesBlockMixin } from './ManagesBlock'

export interface Collection extends HydraResource {
    /**
     * Gets the total number of items within the entire collection.
     * Note that this number can be larger then the number of `members` in the case of partial collections
     */
    readonly totalItems: number;
    /**
     * Gets the collection member included in the current representation.
     * In the case of partial collections they may only be a subset of all members
     */
    readonly members: HydraResource[];
    /**
     * Gets the views of a partial collection
     */
    readonly views?: View[];
    /**
     * Gets the manages block for current collection
     */
    readonly manages: ManagesBlock[];
}

export function CollectionMixin <TBase extends Constructor<HydraResource>> (Base: TBase) {
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

export const shouldApply = (res: RdfResource) => res.hasType(hydra.Collection)

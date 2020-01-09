import { Constructor, namespace, property, RdfResource } from '@tpluscode/rdfine'
import { ICollection, View, IManagesBlock, HydraResource } from '../index'
import { hydra } from '../../Vocabs'
import { ManagesBlockMixin } from './ManagesBlock'

export function CollectionMixin <TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class Collection extends Base implements ICollection {
        @property.literal({ type: Number, initial: 0 })
        public totalItems!: number

        @property.resource({
            path: 'member',
            array: true,
        })
        public members!: HydraResource[]

        @property.resource({
            path: 'view',
            array: true,
        })
        public views!: View[]

        @property.resource({
            array: true,
            as: [ManagesBlockMixin],
        })
        public manages!: IManagesBlock[]
    }

    return Collection
}

export const shouldApply = (res: RdfResource) => res.hasType(hydra.Collection)

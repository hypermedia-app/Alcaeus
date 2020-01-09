import { Constructor, namespace, property } from '@tpluscode/rdfine'
import { hydra } from '../../Vocabs'
import { Collection, HydraResource, IPartialCollectionView, IView } from '../index'
import { IResource } from '../Resource'

export function PartialCollectionViewMixin<TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class PartialCollectionView extends Base implements IPartialCollectionView, IView {
        @property.resource()
        public first!: HydraResource

        @property.resource()
        public previous!: HydraResource

        @property.resource()
        public next!: HydraResource

        @property.resource()
        public last!: HydraResource

        public get collection () {
            const collection = this._node.in(hydra.view)
            if (!collection.term) {
                return null
            }

            return (this.constructor as Constructor).factory.createEntity<Collection>(collection)
        }
    }

    return PartialCollectionView
}

PartialCollectionViewMixin.shouldApply = (res: IResource) => res.hasType(hydra.PartialCollectionView)

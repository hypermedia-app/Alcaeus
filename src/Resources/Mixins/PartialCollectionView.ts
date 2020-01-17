import { Constructor, namespace, property, ResourceIdentifier } from '@tpluscode/rdfine'
import { SingleContextClownface } from 'clownface'
import { DatasetCore } from 'rdf-js'
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

            return collection.toArray()
                .reduce((namedNodes, node) => {
                    if (node.term.termType === 'BlankNode' || node.term.termType === 'NamedNode') {
                        namedNodes.push(node as any)
                    }

                    return namedNodes
                }, [] as SingleContextClownface<DatasetCore, ResourceIdentifier>[])
                .map(collectionNode => {
                    return this._create<Collection>(collectionNode)
                })[0] || null
        }
    }

    return PartialCollectionView
}

PartialCollectionViewMixin.shouldApply = (res: IResource) => res.hasType(hydra.PartialCollectionView)

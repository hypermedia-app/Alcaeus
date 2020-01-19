import { Constructor, namespace, property, RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import { SingleContextClownface } from 'clownface'
import { DatasetCore } from 'rdf-js'
import { hydra } from '../../Vocabs'
import { Collection, HydraResource, View } from '../index'

export interface PartialCollectionView extends View {
    /**
     * Gets the first page resource of a collection
     */
    readonly first: HydraResource | undefined;
    /**
     * Gets the previous page resource of a collection
     */
    readonly previous: HydraResource | undefined;
    /**
     * Gets the next page resource of a collection
     */
    readonly next: HydraResource | undefined;
    /**
     * Gets the last page resource of a collection
     */
    readonly last: HydraResource | undefined;
}

export function PartialCollectionViewMixin<TBase extends Constructor<HydraResource>> (Base: TBase) {
    @namespace(hydra)
    class PartialCollectionViewClass extends Base implements PartialCollectionView {
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

    return PartialCollectionViewClass
}

PartialCollectionViewMixin.shouldApply = (res: RdfResource) => res.hasType(hydra.PartialCollectionView)

import { Constructor, namespace, property, ResourceIdentifier } from '@tpluscode/rdfine'
import { GraphPointer } from 'clownface'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { Collection, HydraResource, View } from '../index'

export interface PartialCollectionView extends View {
    /**
     * Gets the first page resource of a collection
     */
    readonly first: HydraResource | undefined
    /**
     * Gets the previous page resource of a collection
     */
    readonly previous: HydraResource | undefined
    /**
     * Gets the next page resource of a collection
     */
    readonly next: HydraResource | undefined
    /**
     * Gets the last page resource of a collection
     */
    readonly last: HydraResource | undefined
}

export function PartialCollectionViewMixin<TBase extends Constructor<HydraResource>>(Base: TBase) {
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

        public get collection() {
            const collection = this.pointer.in(hydra.view)

            return collection.toArray()
                .reduce((namedNodes, node) => {
                    if (node.term.termType === 'BlankNode' || node.term.termType === 'NamedNode') {
                        namedNodes.push(node as any)
                    }

                    return namedNodes
                }, [] as GraphPointer<ResourceIdentifier>[])
                .map(collectionNode => {
                    return this._create<Collection>(collectionNode)
                })[0] || null
        }
    }

    return PartialCollectionViewClass
}

PartialCollectionViewMixin.appliesTo = hydra.PartialCollectionView

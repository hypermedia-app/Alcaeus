import type { PartialCollectionView, Collection } from '@rdfine/hydra'
import { namespace } from '@tpluscode/rdfine'
import type { Constructor, ResourceIdentifier } from '@tpluscode/rdfine'
import type { GraphPointer } from 'clownface'
import { hydra } from '@tpluscode/rdf-ns-builders'

declare module '@rdfine/hydra' {
    export interface PartialCollectionView {
        parent: Collection
    }
}

export type { PartialCollectionView } from '@rdfine/hydra'

export function PartialCollectionViewMixin<TBase extends Constructor<Omit<PartialCollectionView, 'parent'>>>(Base: TBase) {
    @namespace(hydra)
    class PartialCollectionViewClass extends Base implements PartialCollectionView {
        public get parent() {
            const collection = this.pointer.in(hydra.view)

            return collection.toArray()
                .reduce((namedNodes, node) => {
                    if (node.term.termType === 'BlankNode' || node.term.termType === 'NamedNode') {
                        namedNodes.push(node)
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

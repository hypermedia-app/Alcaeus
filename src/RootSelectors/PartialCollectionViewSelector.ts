import { hydra } from '../Vocabs'
import { IHydraResponse } from '../HydraResponse'
import { IResourceGraph } from '../ResourceGraph'
import { View } from '../Resources'
import { IResponseWrapper } from '../ResponseWrapper'
import { IRootSelector } from './index'

export default function (selector: IRootSelector): IRootSelector {
    return {
        selectRoot (resources: IResourceGraph, response: IResponseWrapper & IHydraResponse) {
            const maybeView = selector.selectRoot(resources, response) as View | undefined

            if (maybeView && maybeView.types.has(hydra.PartialCollectionView)) {
                return maybeView.collection || undefined
            }

            return maybeView
        },
    }
}

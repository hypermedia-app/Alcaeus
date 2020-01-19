import { hydra } from '../Vocabs'
import { HydraResponse } from '../HydraResponse'
import { ResourceGraph } from '../ResourceGraph'
import { View } from '../Resources'
import { ResponseWrapper } from '../ResponseWrapper'
import { RootSelector } from './index'

export default function (selector: RootSelector): RootSelector {
    return {
        selectRoot (resources: ResourceGraph, response: ResponseWrapper & HydraResponse) {
            const maybeView = selector.selectRoot(resources, response) as View | undefined

            if (maybeView && maybeView.types.has(hydra.PartialCollectionView)) {
                return maybeView.collection || undefined
            }

            return maybeView
        },
    }
}

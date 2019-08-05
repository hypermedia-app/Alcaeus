import { Vocab } from '../index'
import { IHydraResponse } from '../HydraResponse'
import { IResourceGraph } from '../ResourceGraph'
import { IResponseWrapper } from '../ResponseWrapper'
import { IRootSelector } from './index'

export default function (selector: IRootSelector): IRootSelector {
    return {
        selectRoot (resources: IResourceGraph, response: IResponseWrapper & IHydraResponse) {
            const maybeView = selector.selectRoot(resources, response) as any

            if (maybeView && maybeView.types.contains(Vocab('PartialCollectionView'))) {
                return maybeView.collection
            }

            return maybeView
        },
    }
}

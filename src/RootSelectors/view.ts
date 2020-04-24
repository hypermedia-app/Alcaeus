import { hydra } from '@tpluscode/rdf-ns-builders'
import { HydraResponse } from '../HydraResponse'
import { ResourceGraph } from '../ResourceGraph'
import { View } from '../Resources'
import { ResponseWrapper } from '../ResponseWrapper'
import { RootSelector } from './index'

export function wrappedViewSelector(select: RootSelector): RootSelector {
    return (resources: ResourceGraph, response: ResponseWrapper & HydraResponse) => {
        const maybeView = select(resources, response) as View | undefined

        if (maybeView && maybeView._selfGraph.in(hydra.view).values.some(Boolean)) {
            return maybeView.collection || undefined
        }

        return maybeView
    }
}

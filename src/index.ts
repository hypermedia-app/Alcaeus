import type { SinkMap } from '@rdf-esm/sink-map'
import type { EventEmitter } from 'events'
import RdfResource, { ResourceFactory } from '@tpluscode/rdfine'
import type { Stream } from 'rdf-js'
import type { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import { Alcaeus } from './alcaeus'
import type { HydraClient } from './alcaeus'
import * as inferences from './inferences'
import * as coreMixins from './Resources/CoreMixins'
import * as mixins from './ResourceFactoryDefaults'
import ResourceStoreImpl from './ResourceStore'
import { defaultSelectors } from './RootSelectors'
import type { RootNodeCandidate } from './RootSelectors'

export type { ResourceIdentifier, ResourceIndexer, ResourceFactory } from '@tpluscode/rdfine'
export * from './Resources/index'
export type { Operation } from './Resources/Operation'
export type { HydraResponse } from './alcaeus'

interface AlcaeusInit<D extends DatasetIndexed> {
    rootSelectors?: [string, RootNodeCandidate][]
    parsers: SinkMap<EventEmitter, Stream>
    datasetFactory: () => D
    dataset?: D
    fetch: typeof fetch
    Headers: typeof Headers
}

export function create <D extends DatasetIndexed = DatasetIndexed>({ dataset, fetch, Headers, parsers, rootSelectors, datasetFactory }: AlcaeusInit<D>): HydraClient<D> {
    class HydraResource extends RdfResource {
        public static get factory() {
            return factory
        }
    }

    const factory = new ResourceFactory(HydraResource)
    const alcaeus = new Alcaeus<D>({
        datasetFactory,
        rootSelectors: Object.entries(rootSelectors || defaultSelectors),
        parsers: parsers,
        resources: new ResourceStoreImpl<D>({
            dataset: dataset || datasetFactory(),
            inferences: Object.values(inferences),
            factory,
            datasetFactory,
        }),
        fetch,
        Headers,
    })

    factory.addMixin(coreMixins.createResourceLoaderMixin(alcaeus))
    factory.addMixin(coreMixins.createHydraResourceMixin(alcaeus))
    factory.addMixin(coreMixins.OperationFinderMixin)
    Object.values(mixins).forEach(mixin => factory.addMixin(mixin))

    return alcaeus
}

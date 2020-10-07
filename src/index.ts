import type { SinkMap } from '@rdf-esm/sink-map'
import type { EventEmitter } from 'events'
import RdfResource from '@tpluscode/rdfine'
import * as rdfine from '@tpluscode/rdfine'
import * as Hydra from '@rdfine/hydra'
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
export type { RuntimeOperation } from './Resources/Operation'
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
    const factory = new rdfine.ResourceFactory<D>(RdfResource)
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
    factory.addMixin(...Object.values(mixins))
    factory.addMixin(...Object.values(Hydra))

    return alcaeus
}

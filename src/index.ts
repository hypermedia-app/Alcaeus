import type { EventEmitter } from 'events'
import type { Stream, DatasetCore, DatasetCoreFactory, Quad } from '@rdfjs/types'
import type { SinkMap } from '@rdf-esm/sink-map'
import type { Mixin } from '@tpluscode/rdfine/lib/ResourceFactory'
import RdfResource from '@tpluscode/rdfine'
import * as rdfine from '@tpluscode/rdfine'
import * as Hydra from '@rdfine/hydra'
import { Alcaeus } from './alcaeus'
import type { HydraClient } from './alcaeus'
import * as inferences from './inferences'
import * as CoreMixins from './Resources/CoreMixins'
import * as Extensions from './Resources/Mixins'
import ResourceStoreImpl from './ResourceStore'
import { defaultSelectors } from './RootSelectors'
import type { RootNodeCandidate } from './RootSelectors'
import './Resources/Mixins'
import './Resources/CoreMixins'

export type { ResourceIdentifier, ResourceIndexer, ResourceFactory, RdfResource } from '@tpluscode/rdfine'
export * from '@rdfine/hydra'
export type { RuntimeOperation } from './Resources/Operation'
export type { HydraResponse } from './alcaeus'

interface AlcaeusInit<D extends DatasetCore> {
    rootSelectors?: [string, RootNodeCandidate][]
    parsers: SinkMap<EventEmitter, Stream>
    datasetFactory: DatasetCoreFactory<Quad, Quad, D>['dataset']
    dataset?: D
    fetch: typeof fetch
    Headers: typeof Headers
}

export function create <D extends DatasetCore = DatasetCore>({ dataset, fetch, Headers, parsers, rootSelectors, datasetFactory }: AlcaeusInit<D>): HydraClient<D> {
    const getClient = () => alcaeus

    const coreMixins: Mixin[] = [
        CoreMixins.createResourceLoaderMixin(getClient),
        CoreMixins.createHydraResourceMixin(getClient),
        CoreMixins.OperationFinderMixin,
    ]
    const AlcaeusGenerated = coreMixins.reduce((base, mixin) => mixin(base), RdfResource)

    const factory = new rdfine.ResourceFactory<D>(AlcaeusGenerated)
    AlcaeusGenerated.factory = factory

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
    factory.addMixin(...Object.values(Hydra))
    factory.addMixin(...Object.values(Extensions))

    return alcaeus
}

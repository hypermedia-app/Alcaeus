import { SinkMap } from '@rdfjs/sink-map'
import { EventEmitter } from 'events'
import RdfResource from '@tpluscode/rdfine'
import ResourceFactory from '@tpluscode/rdfine/lib/ResourceFactory'
import datasetIndexed from 'rdf-dataset-indexed'
import { DatasetCore, Stream } from 'rdf-js'
import { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import { Alcaeus, HydraClient } from './alcaeus'
import * as inferences from './inferences'
import * as coreMixins from './Resources/CoreMixins'
import * as mixins from './ResourceFactoryDefaults'
import ResourceStoreImpl from './ResourceStore'
import { defaultSelectors, RootNodeCandidate } from './RootSelectors'

export { ResourceIdentifier, ResourceIndexer } from '@tpluscode/rdfine'
export * from './Resources/index'
export { Operation } from './Resources/Operation'
export { HydraResponse } from './alcaeus'

interface AlcaeusInit<D extends DatasetIndexed = DatasetIndexed> {
    rootSelectors?: [string, RootNodeCandidate][]
    parsers?: SinkMap<EventEmitter, Stream>
    datasetFactory?: () => D
    dataset?: D
}

export function create <D extends DatasetIndexed = DatasetIndexed>(init: AlcaeusInit<D> = {}): HydraClient<D> {
    let factory: ResourceFactory<DatasetCore, HydraResource>
    class HydraResource extends RdfResource {
        public static get factory() {
            return factory
        }
    }

    const datasetFactory = init.datasetFactory || datasetIndexed

    factory = new ResourceFactory(HydraResource)
    const alcaeus = new Alcaeus({
        datasetFactory,
        rootSelectors: Object.entries(init.rootSelectors || defaultSelectors),
        resources: new ResourceStoreImpl({
            dataset: init.dataset || datasetFactory(),
            inferences: Object.values(inferences),
            factory,
            datasetFactory,
        }),
    })

    if (init.parsers) {
        init.parsers.forEach((parser, mediaType) => alcaeus.parsers.set(mediaType, parser))
    }

    factory.addMixin(coreMixins.createResourceLoaderMixin(alcaeus))
    factory.addMixin(coreMixins.createHydraResourceMixin(alcaeus))
    factory.addMixin(coreMixins.OperationFinderMixin)
    Object.values(mixins).forEach(mixin => factory.addMixin(mixin))

    return alcaeus
}

export default create()

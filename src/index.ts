import { SinkMap } from '@rdfjs/sink-map'
import { EventEmitter } from 'events'
import ResourceFactory from '@tpluscode/rdfine/lib/ResourceFactory'
import { DatasetCore, Stream } from 'rdf-js'
import { DatasetIndexed } from 'rdf-dataset-indexed/dataset'
import { Alcaeus, HydraClient } from './alcaeus'
import * as coreMixins from './Resources/CoreMixins'
import * as mixins from './ResourceFactoryDefaults'
import { defaultSelectors, RootSelector } from './RootSelectors'
import Resource from './Resources/Resource'

export { default as Resource } from './Resources/Resource'
export { ResourceIdentifier, ResourceIndexer } from '@tpluscode/rdfine'
export * from './Resources/index'
export { Operation } from './Resources/Operation'

interface AlcaeusInit<D extends DatasetIndexed = DatasetIndexed> {
    rootSelectors?: RootSelector[];
    parsers?: SinkMap<EventEmitter, Stream>;
    dataset?: D;
}

export function create <D extends DatasetIndexed = DatasetIndexed> ({ rootSelectors, parsers, dataset }: AlcaeusInit<D> = {}): HydraClient<D> {
    let factory: ResourceFactory<DatasetCore, HydraResource>
    class HydraResource extends Resource {
        public static get factory () {
            return factory
        }
    }

    factory = new ResourceFactory(HydraResource)
    const alcaeus = new Alcaeus({
        rootSelectors: rootSelectors || Object.values(defaultSelectors),
        factory,
        dataset,
    })

    if (parsers) {
        parsers.forEach((parser, mediaType) => alcaeus.parsers.set(mediaType, parser))
    }

    factory.addMixin(coreMixins.createResourceLoaderMixin(alcaeus))
    factory.addMixin(coreMixins.createHydraResourceMixin(alcaeus))
    factory.addMixin(coreMixins.OperationFinderMixin)
    Object.values(mixins).forEach(mixin => factory.addMixin(mixin))

    return alcaeus
}

export default create()

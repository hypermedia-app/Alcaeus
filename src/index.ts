import { EventEmitter } from 'events'
import { ResourceFactoryImpl } from '@tpluscode/rdfine'
import { Sink, Stream } from 'rdf-js'
import { Alcaeus, HydraClient } from './alcaeus'
import * as coreMixins from './Resources/CoreMixins'
import * as mixins from './ResourceFactoryDefaults'
import { AllDefault, RootSelector } from './RootSelectors'
import Resource from './Resources/Resource'

export { Alcaeus } from './alcaeus'
export { default as Resource } from './Resources/Resource'
export { ResourceIdentifier, ResourceIndexer } from '@tpluscode/rdfine'
export * from './Resources/index'
export { Operation } from './Resources/Operation'

export const defaultRootSelectors = Object.values(AllDefault)

interface AlcaeusInit {
    rootSelectors?: RootSelector[];
    parsers?: Record<string, Sink<EventEmitter, Stream>>;
}

export function create ({ rootSelectors, parsers }: AlcaeusInit = {}): HydraClient {
    let factory: ResourceFactoryImpl<HydraResource>
    class HydraResource extends Resource {
        public static get factory () {
            return factory
        }
    }

    factory = new ResourceFactoryImpl(HydraResource)
    const alcaeus = new Alcaeus(rootSelectors || defaultRootSelectors, factory)

    if (parsers) {
        Object.entries(parsers).forEach(pair => alcaeus.parsers.set(...pair))
    }

    factory.addMixin(coreMixins.createResourceLoaderMixin(alcaeus))
    factory.addMixin(coreMixins.createHydraResourceMixin(alcaeus))
    factory.addMixin(coreMixins.OperationFinderMixin)
    Object.values(mixins).forEach(mixin => factory.addMixin(mixin))

    return alcaeus
}

export default create()

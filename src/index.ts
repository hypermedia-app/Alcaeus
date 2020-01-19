import { ResourceFactory } from '@tpluscode/rdfine'
import { Alcaeus } from './alcaeus'
import * as coreMixins from './Resources/CoreMixins'
import RdfProcessor from './MediaTypeProcessors/RdfProcessor'
import * as mixins from './ResourceFactoryDefaults'
import { AllDefault } from './RootSelectors'
import Resource from './Resources/Resource'

export { Alcaeus } from './alcaeus'
export { default as Resource } from './Resources/Resource'
export { ResourceIdentifier } from '@tpluscode/rdfine'
export * from './Resources/index'
export { Operation } from './Resources/Operation'

export const defaultRootSelectors = Object.values(AllDefault)
export const defaultProcessors = {
    RDF: new RdfProcessor(),
}

export function create ({ rootSelectors = defaultRootSelectors, mediaTypeProcessors = defaultProcessors } = {}) {
    let factory: ResourceFactory
    class HydraResource extends Resource {
        public static get factory () {
            return factory
        }
    }

    factory = new ResourceFactory(HydraResource)
    const alcaeus = new Alcaeus(rootSelectors, mediaTypeProcessors, factory)

    factory.addMixin(coreMixins.createResourceLoaderMixin(alcaeus))
    factory.addMixin(coreMixins.createHydraResourceMixin(alcaeus))
    factory.addMixin(coreMixins.OperationFinderMixin)
    Object.values(mixins).forEach(mixin => factory.addMixin(mixin))

    return alcaeus
}

export default create()

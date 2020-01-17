import { ResourceFactory } from '@tpluscode/rdfine'
import { Alcaeus } from './alcaeus'
import { createResourceLoaderMixin } from './Resources/CoreMixins/ResourceLoaderMixin'
import { createHydraResourceMixin } from './Resources/HydraResource'
import { hydra } from './Vocabs'
import RdfProcessor from './MediaTypeProcessors/RdfProcessor'
import * as mixins from './ResourceFactoryDefaults'
import { AllDefault } from './RootSelectors'
import Resource from './Resources/Resource'

export { Alcaeus } from './alcaeus'
export { default as Resource } from './Resources/Resource'
export { ResourceIdentifier } from '@tpluscode/rdfine'

const defaultRootSelectors = Object.values(AllDefault)
const defaultProcessors = {
    RDF: new RdfProcessor(),
}

export const Vocab = hydra
export const Hydra = (rootSelectors = defaultRootSelectors, mediaTypeProcessors = defaultProcessors) => {
    let factory: ResourceFactory
    class HydraResource extends Resource {
        public static get factory () {
            return factory
        }
    }

    factory = new ResourceFactory(HydraResource)
    const alcaeus = new Alcaeus(rootSelectors, mediaTypeProcessors, factory)

    factory.addMixin(createResourceLoaderMixin(alcaeus))
    factory.addMixin(createHydraResourceMixin(alcaeus))
    Object.values(mixins).forEach(mixin => factory.addMixin(mixin))

    return alcaeus
}

export default Hydra()

import type { RdfineEnvironment } from '@tpluscode/rdfine/environment'
import type { Mixin } from '@tpluscode/rdfine/lib/ResourceFactory'
import * as CoreMixins from './CoreMixins/index.js'
import * as HydraExMixins from './Mixins/index.js'

export class AlcaeusHydraFactory {
  init(this: RdfineEnvironment) {
    const resourceFactory: any = this.rdfine().factory

    const coreMixins: Mixin[] = [
      CoreMixins.createResourceLoaderMixin(this as any),
      CoreMixins.createHydraResourceMixin(this as any),
      CoreMixins.OperationFinderMixin,
    ]
    const AlcaeusGenerated = coreMixins.reduce((base, mixin) => mixin(base), resourceFactory.BaseClass)
    resourceFactory.BaseClass = AlcaeusGenerated
    AlcaeusGenerated.factory = resourceFactory

    this._initVocabulary(HydraExMixins)
  }
}

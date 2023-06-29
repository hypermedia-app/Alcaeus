import type { DatasetCore } from '@rdfjs/types'
import type { Mixin } from '@tpluscode/rdfine/lib/ResourceFactory'
import RdfResource from '@tpluscode/rdfine'
import * as rdfine from '@tpluscode/rdfine'
import * as HydraModel from '@rdfine/hydra'
import { Alcaeus } from './alcaeus.js'
import type { HydraClient } from './alcaeus.js'
import * as inferences from './inferences/index.js'
import * as CoreMixins from './Resources/CoreMixins/index.js'
import * as Extensions from './Resources/Mixins/index.js'
import ResourceStoreImpl from './ResourceStore.js'
import { defaultSelectors } from './RootSelectors/index.js'
import type { RootNodeCandidate } from './RootSelectors/index.js'
import './Resources/Mixins/index.js'
import './Resources/CoreMixins/index.js'
import environment, { HydraEnvironment } from './environment.js'

export type { ResourceIdentifier, ResourceIndexer, ResourceFactory, RdfResource } from '@tpluscode/rdfine'
export * from '@rdfine/hydra'
export type { RuntimeOperation } from './Resources/Operation.js'
export type { HydraResponse } from './alcaeus.js'

export interface Init<D extends DatasetCore> {
  rootSelectors?: [string, RootNodeCandidate][]
  environment: HydraEnvironment<D>
  dataset?: D
  fetch: typeof fetch
  Headers: typeof Headers
}

function _create <D extends DatasetCore = DatasetCore>({ dataset, fetch, Headers, environment, rootSelectors }: Init<D>): HydraClient<D> {
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
    environment,
    rootSelectors: Object.entries(rootSelectors || defaultSelectors),
    resources: new ResourceStoreImpl<D>({
      dataset: dataset || environment.dataset(),
      inferences: Object.values(inferences),
      factory,
      environment,
    }),
    fetch,
    Headers,
  })
  factory.addMixin(...Object.values(HydraModel))
  factory.addMixin(...Object.values(Extensions))

  return alcaeus
}

export function create<D extends DatasetCore>(opts: Omit<Init<D>, 'fetch' | 'Headers'>) {
  return _create<D>({
    fetch,
    Headers,
    ...opts,
  })
}

export const Hydra = create({
  environment,
})

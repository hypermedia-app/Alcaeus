import { RdfineFactory } from '@tpluscode/rdfine'
import { HydraFactory } from '@rdfine/hydra/Factory'
import { AlcaeusHydraFactory } from 'alcaeus-model/Factory.js'
import create from './Factory.js'

export type { ResourceIdentifier, ResourceIndexer, ResourceFactory, RdfResource } from '@tpluscode/rdfine'
export * from 'alcaeus-model'
export type { RuntimeOperation } from 'alcaeus-model/Operation.js'
export type { HydraResponse } from './alcaeus.js'

export default function (init: Parameters<typeof create>[0] = {}) {
  return [RdfineFactory, HydraFactory, AlcaeusHydraFactory, create(init)]
}

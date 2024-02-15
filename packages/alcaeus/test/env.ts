import Environment from '@zazuko/env/Environment.js'
import parent from '@zazuko/env'
import { HydraFactory } from '@rdfine/hydra/Factory'
import { RdfineFactory } from '@tpluscode/rdfine'
import { AlcaeusHydraFactory } from 'alcaeus-model/Factory.js'
import { DatasetCore } from '@rdfjs/types'
import create from '../Factory.js'
import { Alcaeus } from '../alcaeus.js'
import createFactories from '../index.js'

export function testEnv(init: Parameters<typeof create>[0] = {}) {
  return new Environment(createFactories(init), { parent })
}

export default testEnv()

export function mockEnv(client: Alcaeus<DatasetCore>) {
  class MockFactory {
    hydra!: Alcaeus<DatasetCore>

    init() {
      this.hydra = client
    }
  }

  return new Environment([RdfineFactory, HydraFactory, AlcaeusHydraFactory, MockFactory], { parent })
}

import type { DatasetCore, Quad } from '@rdfjs/types'
import { Alcaeus, HydraClient, HydraEnvironment, RootNodeCandidate } from './alcaeus.js'
import ResourceStoreImpl from './ResourceStore.js'
import defaultSelectors from './RootSelectors/index.js'
import inferences from './inferences/index.js'

interface AlcaeusInit<D extends DatasetCore> {
  rootSelectors?: [string, RootNodeCandidate][]
  dataset?: D
  fetch?: typeof fetch
  Headers?: typeof Headers
}

export default <D extends DatasetCore<Quad, Quad>>({ dataset, fetch, Headers, rootSelectors }: AlcaeusInit<D> = {}) => class AlcaeusFactory {
  hydra!: HydraClient<D>

  init(this: HydraEnvironment<D>) {
    this.hydra = new Alcaeus<D>({
      environment: this,
      rootSelectors: rootSelectors || defaultSelectors,
      resources: new ResourceStoreImpl<D>({
        dataset: dataset || this.dataset(),
        inferences,
        environment: this,
      }),
      fetch: fetch || global.fetch,
      Headers: Headers || global.Headers,
    })
  }
}

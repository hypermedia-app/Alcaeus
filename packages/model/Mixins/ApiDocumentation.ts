import type { DatasetCore } from '@rdfjs/types'
import type { Constructor } from '@tpluscode/rdfine'
import { namespace } from '@tpluscode/rdfine'
import { hydra } from '@tpluscode/rdf-ns-builders'
import type { ApiDocumentation } from '@rdfine/hydra'
import type { HydraResponse } from 'alcaeus-core'

declare module '@rdfine/hydra' {
  export interface ApiDocumentation<D extends DatasetCore = DatasetCore> {
    loadEntrypoint(): Promise<HydraResponse<D>>
  }
}

export type { ApiDocumentation } from '@rdfine/hydra'

export function ApiDocumentationMixin<TBase extends Constructor<Omit<ApiDocumentation, 'loadEntrypoint'>>>(Base: TBase) {
  @namespace(hydra)
  class ApiDocumentationClass extends Base implements Partial<ApiDocumentation> {
    public loadEntrypoint(): Promise<HydraResponse<any>> {
      const entrypoint = this.entrypoint

      if (!entrypoint) {
        return Promise.reject(new Error('The ApiDocumentation doesn\'t have an entrypoint.'))
      }

      if (!entrypoint.load) {
        return Promise.reject(new Error('Cannot load entrypoint. Is it anonymous resource?'))
      }

      return entrypoint.load()
    }
  }

  return ApiDocumentationClass
}

ApiDocumentationMixin.appliesTo = hydra.ApiDocumentation

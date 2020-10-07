import type { Constructor } from '@tpluscode/rdfine'
import { namespace } from '@tpluscode/rdfine'
import { hydra } from '@tpluscode/rdf-ns-builders'
import type { ApiDocumentation } from '@rdfine/hydra'
import type { DatasetCore } from 'rdf-js'
import type { HydraResponse } from '../../alcaeus'

declare module '@rdfine/hydra' {
    export interface ApiDocumentation<D extends DatasetCore = DatasetCore> {
        loadEntryPoint(): Promise<HydraResponse<D>>
    }
}

export type { ApiDocumentation } from '@rdfine/hydra'

export function ApiDocumentationMixin<TBase extends Constructor<Omit<ApiDocumentation, 'loadEntryPoint'>>>(Base: TBase) {
    @namespace(hydra)
    class ApiDocumentationClass extends Base implements Partial<ApiDocumentation> {
        public loadEntrypoint() {
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

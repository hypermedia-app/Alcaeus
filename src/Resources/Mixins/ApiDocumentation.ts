import { Constructor, property, namespace } from '@tpluscode/rdfine'
import { HydraResponse } from '../../alcaeus'
import { Class, HydraResource } from '../index'
import { hydra } from '@tpluscode/rdf-ns-builders'

export interface ApiDocumentation extends HydraResource {
    classes: Class[]

    loadEntrypoint(): Promise<HydraResponse>
}

export function ApiDocumentationMixin<TBase extends Constructor<HydraResource>>(Base: TBase) {
    @namespace(hydra)
    class ApiDocumentationClass extends Base implements ApiDocumentation {
        @property.resource({
            path: 'supportedClass',
            values: 'array',
        })
        public classes!: Class[]

        @property.resource()
        public entrypoint!: HydraResource

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

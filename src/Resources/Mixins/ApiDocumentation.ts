import { Constructor, property, namespace } from '@tpluscode/rdfine'
import { Class, HydraResource, IApiDocumentation } from '../index'
import { IResource } from '../Resource'
import { hydra } from '../../Vocabs'

export function ApiDocumentationMixin<TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class ApiDocumentation extends Base implements IApiDocumentation {
        @property.resource({
            path: 'supportedClass',
            array: true,
        })
        public classes!: Class[]

        @property.resource()
        public entrypoint!: HydraResource

        public loadEntrypoint () {
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

    return ApiDocumentation
}

ApiDocumentationMixin.shouldApply = (res: IResource) => res.hasType(hydra.ApiDocumentation)

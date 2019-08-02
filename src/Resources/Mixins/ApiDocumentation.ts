import { deprecated } from 'core-decorators'
import { Core, JsonLd } from '../../Constants'
import { Class, HydraResource, IApiDocumentation, ISupportedProperty } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    abstract class ApiDocumentation extends Base implements IApiDocumentation {
        public abstract get _alcaeus();

        public get classes () {
            return this.getArray<Class>(Core.Vocab('supportedClass'))
        }

        public getOperations (classUri: string, predicateUri?: string) {
            const clas = this.getClass(classUri)
            if (!clas) {
                return []
            }

            if (!predicateUri) {
                return clas.supportedOperations
            }

            const supportedProperty = clas.supportedProperties.find((prop: ISupportedProperty) => {
                return prop.property && prop.property.id === predicateUri
            })
            if (!supportedProperty) {
                return []
            }

            return supportedProperty.property.supportedOperations
        }

        public getProperties (classUri: string) {
            const clas = this.getClass(classUri)
            if (!clas) {
                return []
            }
            return clas.supportedProperties
        }

        public getClass (classId) {
            return this.classes.find((clas) => clas[JsonLd.Id] === classId) || null
        }

        @deprecated
        public getEntrypoint () {
            return this.loadEntrypoint()
        }

        public loadEntrypoint () {
            const entrypoint = this.get<HydraResource>(Core.Vocab('entrypoint'))
            if (!entrypoint) {
                return Promise.reject(new Error('The ApiDocumentation doesn\'t have an entrypoint.'))
            }

            return this._alcaeus.loadResource(entrypoint.id)
        }
    }

    return ApiDocumentation
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('ApiDocumentation'))

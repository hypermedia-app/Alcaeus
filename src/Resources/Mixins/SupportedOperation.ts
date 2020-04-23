import { Constructor, namespace, property, RdfResource } from '@tpluscode/rdfine'
import { hydra, owl } from '@tpluscode/rdf-ns-builders'
import { HydraResource } from '../index'
import { Class } from './Class'
import { DocumentedResourceMixin, DocumentedResource } from './DocumentedResource'

export interface SupportedOperation extends DocumentedResource {
    method: string
    expects: Class
    returns: Class
    requiresInput: boolean
}

export function SupportedOperationMixin<TBase extends Constructor<HydraResource>>(Base: TBase) {
    @namespace(hydra)
    abstract class SupportedOperationClass extends DocumentedResourceMixin(Base) implements SupportedOperation {
        @property.literal({
            initial: '',
        })
        public method!: string

        @property.resource({
            initial: () => owl.Nothing,
        })
        public expects!: Class

        @property.resource({
            initial: () => owl.Nothing,
        })
        public returns!: Class

        public get requiresInput(): boolean {
            const method = this.method || ''
            const methodExpectsBody = method.toUpperCase() !== 'GET' && this.method.toUpperCase() !== 'DELETE'

            const operationExpectsBody = !!this.expects && !owl.Nothing.equals(this.expects.id)

            return methodExpectsBody || operationExpectsBody
        }
    }

    return SupportedOperationClass
}

SupportedOperationMixin.shouldApply = (res: RdfResource) => res.hasType(hydra.Operation)

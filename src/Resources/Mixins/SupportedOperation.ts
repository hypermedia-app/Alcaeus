import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import { namespace, property } from '@tpluscode/rdfine'
import { hydra, owl } from '@tpluscode/rdf-ns-builders'
import type { HydraResource } from '../index'
import type { Class } from './Class'
import { DocumentedResourceMixin } from './DocumentedResource'
import type { DocumentedResource } from './DocumentedResource'

export interface SupportedOperation extends DocumentedResource {
    method: string
    expects: Array<Class | RdfResource>
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
            values: 'array',
        })
        public expects!: Array<Class | RdfResource>

        @property.resource({
            initial: () => owl.Nothing,
        })
        public returns!: Class

        public get requiresInput(): boolean {
            const method = this.method || ''
            const methodExpectsBody = method.toUpperCase() !== 'GET' && this.method.toUpperCase() !== 'DELETE'

            const operationExpectsBody = this.expects.length > 0 && !this.expects.some(expects => expects.equals(owl.Nothing))

            return methodExpectsBody || operationExpectsBody
        }
    }

    return SupportedOperationClass
}

SupportedOperationMixin.appliesTo = hydra.Operation

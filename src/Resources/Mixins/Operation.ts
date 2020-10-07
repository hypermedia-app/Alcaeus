import type { Operation } from '@rdfine/hydra'
import type { Constructor } from '@tpluscode/rdfine'
import { namespace, property } from '@tpluscode/rdfine'
import { hydra, owl } from '@tpluscode/rdf-ns-builders'

declare module '@rdfine/hydra' {
    export interface Operation {
        requiresInput: boolean
    }
}

export type { Operation } from '@rdfine/hydra'

export function OperationMixin<TBase extends Constructor<Omit<Operation, 'requiresInput'>>>(Base: TBase) {
    @namespace(hydra)
    abstract class OperationClass extends Base implements Operation {
        @property.literal({
            initial: '',
        })
        public method!: string

        public get requiresInput(): boolean {
            const method = this.method || ''
            const methodExpectsBody = method.toUpperCase() !== 'GET' && this.method.toUpperCase() !== 'DELETE'

            const operationExpectsBody = this.expects.length > 0 && !this.expects.some(expects => expects.equals(owl.Nothing))

            return methodExpectsBody || operationExpectsBody
        }
    }

    return OperationClass
}

OperationMixin.appliesTo = hydra.Operation

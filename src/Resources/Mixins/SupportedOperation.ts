import { Constructor, namespace, property, RdfResource } from '@tpluscode/rdfine'
import { hydra, owl } from '../../Vocabs'
import { Class, ISupportedOperation } from '../index'
import { DocumentedResourceMixin } from './DocumentedResource'

export function SupportedOperationMixin<TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    abstract class SupportedOperation extends Base implements ISupportedOperation {
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

        public get requiresInput (): boolean {
            const method = this.method || ''
            const methodExpectsBody = method.toUpperCase() !== 'GET' && this.method.toUpperCase() !== 'DELETE'

            const operationExpectsBody = !!this.expects && !owl.Nothing.equals(this.expects.id)

            return methodExpectsBody || operationExpectsBody
        }
    }

    return DocumentedResourceMixin(SupportedOperation)
}

SupportedOperationMixin.shouldApply = (res: RdfResource) => res.hasType(hydra.Operation)

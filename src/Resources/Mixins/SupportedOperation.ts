import { Maybe } from 'tsmonad'
import { Core } from '../../Constants'
import { owl } from '../../Vocabs'
import { ApiDocumentation, Class, ISupportedOperation } from '../index'
import { Constructor } from '../Mixin'
import Nothing from '../Nothing'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    abstract class SupportedOperation extends Base implements ISupportedOperation {
        public abstract apiDocumentation: Maybe<ApiDocumentation>

        public get method () {
            return this.getString(Core.Vocab('method')) || ''
        }

        public get expects () {
            return this.get<Class>(Core.Vocab('expects')) || new Nothing(this.apiDocumentation)
        }

        public get returns () {
            return this.get<Class>(Core.Vocab('returns')) || new Nothing(this.apiDocumentation)
        }

        public get requiresInput (): boolean {
            const method = this.method || ''
            const methodExpectsBody = method.toUpperCase() !== 'GET' && this.method.toUpperCase() !== 'DELETE'

            const operationExpectsBody = !!this.expects && this.expects.id !== owl.Nothing

            return methodExpectsBody || operationExpectsBody
        }
    }

    return SupportedOperation
}

export const shouldApply = (res: IResource) => res.types.contains(Core.Vocab('Operation'))

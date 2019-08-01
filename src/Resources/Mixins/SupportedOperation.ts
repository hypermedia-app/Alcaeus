import { Core } from '../../Constants'
import { owl } from '../../Vocabs'
import { Class, ISupportedOperation } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    class SupportedOperation extends Base implements ISupportedOperation {
        public get method (): string {
            return this.getString(Core.Vocab('method'))
        }

        public get expects () {
            return this.get<Class>(Core.Vocab('expects'))
        }

        public get returns () {
            return this.get<Class>(Core.Vocab('returns'))
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

import { Constructor, RdfResource } from '@tpluscode/rdfine'
import { IHydraResponse } from '../HydraResponse'
import { owl } from '../Vocabs'
import { IOperation } from './index'
import { ClassMixin } from './Mixins/Class'

export function NothingMixin<Base extends Constructor> (base: Base) {
    class Nothing extends base {
        public get title () {
            return 'Nothing'
        }

        public get description () {
            return 'Nothing'
        }
        public get operations (): IOperation[] {
            return []
        }

        public getCollections () {
            return []
        }

        public getLinks () {
            return []
        }

        public getProperties () {
            return []
        }

        public load () {
            return Promise.reject<IHydraResponse>(new Error('Method not implemented.'))
        }

        public findOperations () { return [] }
        public findOperationsDeep () { return [] }
        public getOperationsDeep () { return [] }
    }

    return ClassMixin(Nothing)
}

NothingMixin.shouldApply = (res: RdfResource) => owl.Nothing.equals(res.id)

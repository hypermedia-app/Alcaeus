import { Constructor, RdfResource } from '@tpluscode/rdfine'
import { owl } from '../Vocabs'
import { IDocumentedResource } from './index'
import { ClassMixin } from './Mixins/Class'

export function NothingMixin<Base extends Constructor> (base: Base) {
    class Nothing extends base implements IDocumentedResource {
        public get title () {
            return 'Nothing'
        }

        public get description () {
            return 'Nothing'
        }
    }

    return ClassMixin(Nothing)
}

NothingMixin.shouldApply = (res: RdfResource) => owl.Nothing.equals(res.id)

import { Constructor, RdfResource } from '@tpluscode/rdfine'
import { owl } from '../Vocabs'
import { HydraResource } from './index'
import { ClassMixin } from './Mixins/Class'
import { DocumentedResource } from './Mixins/DocumentedResource'

export function NothingMixin<Base extends Constructor<HydraResource>> (base: Base) {
    class Nothing extends base implements DocumentedResource {
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

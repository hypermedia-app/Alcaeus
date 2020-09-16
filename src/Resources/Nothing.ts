import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import { owl } from '@tpluscode/rdf-ns-builders'
import type { HydraResource } from './index'
import { ClassMixin } from './Mixins/Class'
import type { DocumentedResource } from './Mixins/DocumentedResource'

export function NothingMixin<Base extends Constructor<HydraResource>>(base: Base) {
    class Nothing extends base implements DocumentedResource {
        public get title() {
            return 'Nothing'
        }

        public get description() {
            return 'Nothing'
        }
    }

    return ClassMixin(Nothing)
}

NothingMixin.shouldApply = (res: RdfResource) => owl.Nothing.equals(res.id)

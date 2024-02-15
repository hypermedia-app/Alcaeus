import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { Resource } from '@rdfine/hydra'
import { owl } from '@tpluscode/rdf-ns-builders'

export function NothingMixin<Base extends Constructor<Resource>>(base: Base) {
  class Nothing extends base {
    public get title() {
      return 'Nothing'
    }

    public get description() {
      return 'Nothing'
    }
  }

  return Nothing
}

NothingMixin.shouldApply = (res: RdfResource) => owl.Nothing.equals(res.id)

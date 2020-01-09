import { Constructor, RdfResource } from '@tpluscode/rdfine'
import { IHydraClient } from '../../alcaeus'

export function createResourceLoaderMixin (alcaeus: IHydraClient) {
    function ResourceLoaderMixin<Base extends Constructor> (base: Base) {
        return class extends base {
            public load () {
                return alcaeus.loadResource(this.id.value)
            }
        }
    }

    ResourceLoaderMixin.shouldApply = (resource: RdfResource) => {
        return resource.id.termType === 'NamedNode'
    }

    return ResourceLoaderMixin
}

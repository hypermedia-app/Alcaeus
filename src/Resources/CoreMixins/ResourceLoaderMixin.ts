import type { Resource } from '@rdfine/hydra'
import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { RdfResourceCore, ResourceNode } from '@tpluscode/rdfine/RdfResource'
import type { HydraClient, HydraResponse } from '../../alcaeus'

declare module '@tpluscode/rdfine' {
    export interface RdfResource<ID extends ResourceNode = ResourceNode> {
        load?<T extends RdfResource<ID>>(): Promise<HydraResponse<ID, T>>
    }
}

export function createResourceLoaderMixin(alcaeus: () => HydraClient<any>) {
    function ResourceLoaderMixin<Base extends Constructor>(base: Base) {
        return class extends base {
            public load<T extends Resource<any>>() {
                return alcaeus().loadResource<T>(this.id.value)
            }
        }
    }

    ResourceLoaderMixin.shouldApply = <D extends ResourceNode = ResourceNode>(resource: RdfResourceCore<D>) => {
        return resource.id.termType === 'NamedNode'
    }

    return ResourceLoaderMixin
}

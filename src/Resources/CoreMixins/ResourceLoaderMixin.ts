import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { DatasetCore } from 'rdf-js'
import type { HydraClient, HydraResponse } from '../../alcaeus'

declare module '@tpluscode/rdfine' {
    export interface RdfResource<D extends DatasetCore = DatasetCore> {
        load?<T extends RdfResource<D>>(): Promise<HydraResponse<D, T>>
    }
}

export function createResourceLoaderMixin(alcaeus: HydraClient) {
    function ResourceLoaderMixin<Base extends Constructor>(base: Base) {
        return class extends base {
            public load<T extends RdfResource<any>>() {
                return alcaeus.loadResource<T>(this.id.value)
            }
        }
    }

    ResourceLoaderMixin.shouldApply = (resource: RdfResource) => {
        return resource.id.termType === 'NamedNode'
    }

    return ResourceLoaderMixin
}

import type { DatasetCore } from 'rdf-js'
import type { Resource } from '@rdfine/hydra'
import type { Constructor } from '@tpluscode/rdfine'
import type { RdfResourceCore } from '@tpluscode/rdfine/RdfResource'
import type { HydraClient, HydraResponse } from '../../alcaeus'

declare module '@tpluscode/rdfine' {
    export interface RdfResource<D extends DatasetCore = DatasetCore> {
        load?<T extends RdfResource<D>>(): Promise<HydraResponse<D, T>>
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

    ResourceLoaderMixin.shouldApply = <D extends DatasetCore = DatasetCore>(resource: RdfResourceCore<D>) => {
        return resource.id.termType === 'NamedNode'
    }

    return ResourceLoaderMixin
}

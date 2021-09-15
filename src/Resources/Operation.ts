import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { RdfResourceCore } from '@tpluscode/rdfine/RdfResource'
import type { DatasetCore } from '@rdfjs/types'
import type { Resource } from '@rdfine/hydra'
import type { HydraClient, HydraResponse } from '../alcaeus'
import type * as Supported from './Mixins/Operation'

export interface RuntimeOperation extends Supported.Operation {
    /**
     * Gets the title of the operation
     */
    invoke<T extends RdfResourceCore = Resource>(body?: BodyInit, headers?: HeadersInit): Promise<HydraResponse<DatasetCore, T>>

    /**
     * Gets the resource on which the operation will be invoked
     */
    target: RdfResource
}

export function createMixin(client: HydraClient, target: RdfResource) {
    return function RuntimeOperationMixin<Base extends Constructor<Supported.Operation>>(Resource: Base) {
        return class extends Resource implements RuntimeOperation {
            get target() {
                return target
            }

            public invoke<T extends RdfResourceCore<any> = Resource<DatasetCore>>(body?: BodyInit, headers?: HeadersInit): Promise<HydraResponse<DatasetCore, T>> {
                if (body !== null && typeof body !== 'undefined' && headers !== null && typeof headers !== 'undefined') {
                    return client.invokeOperation<T>(this, headers, body)
                }

                return client.invokeOperation<T>(this)
            }
        }
    }
}

import type { Constructor, RdfResource } from '@tpluscode/rdfine'
import type { HydraClient, HydraResponse } from '../alcaeus'
import type * as Supported from './Mixins/Operation'

export interface RuntimeOperation extends Supported.Operation {
    /**
     * Gets the title of the operation
     */
    invoke(body?: BodyInit, headers?: HeadersInit): Promise<HydraResponse>

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

            public invoke(body?: BodyInit, headers?: HeadersInit): Promise<HydraResponse> {
                if (body !== null && typeof body !== 'undefined' && headers !== null && typeof headers !== 'undefined') {
                    return client.invokeOperation(this, headers, body)
                }

                return client.invokeOperation(this)
            }
        }
    }
}

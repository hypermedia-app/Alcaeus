import type { SupportedProperty } from '@rdfine/hydra'
import type { Constructor } from '@tpluscode/rdfine'
import { namespace } from '@tpluscode/rdfine'
import { hydra } from '@tpluscode/rdf-ns-builders'

declare module '@rdfine/hydra' {
    export interface SupportedProperty {
        /**
         * Gets the value indicating if the property can be written by requests
         */
        writable: boolean | undefined
    }
}

export type { SupportedProperty } from '@rdfine/hydra'

export function SupportedPropertyMixin<TBase extends Constructor<Omit<SupportedProperty, 'writable'>>>(Base: TBase) {
    @namespace(hydra)
    class SupportedPropertyClass extends Base implements SupportedProperty {
        public get writable() {
            return this.writeable
        }
    }

    return SupportedPropertyClass
}

SupportedPropertyMixin.appliesTo = hydra.SupportedProperty

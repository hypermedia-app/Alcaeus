import { Constructor, namespace, property } from '@tpluscode/rdfine'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { HydraResource } from '../index'
import { DocumentedResourceMixin, DocumentedResource } from './DocumentedResource'
import { RdfProperty, RdfPropertyMixin } from './RdfProperty'

export interface SupportedProperty extends DocumentedResource {
    /**
     * Gets the value indicating if the property can be read from responses
     */
    readable: boolean
    /**
     * Gets the value indicating if the property can be written by requests
     */
    writable: boolean
    /**
     * Gets the value indicating if the property in required in request payload
     */
    required: boolean
    /**
     * The actual RDF predicate to use in representations
     */
    property: RdfProperty
}

export function SupportedPropertyMixin<TBase extends Constructor<HydraResource>>(Base: TBase) {
    @namespace(hydra)
    class SupportedPropertyClass extends DocumentedResourceMixin(Base) implements SupportedProperty {
        @property.literal({
            type: Boolean,
            initial: true,
        })
        public readable!: boolean

        @property.literal({
            type: Boolean,
            path: hydra.writeable,
            initial: true,
        })
        public writable!: boolean

        @property.literal({
            type: Boolean,
            initial: false,
        })
        public required!: boolean

        @property.resource({
            strict: true,
            as: [RdfPropertyMixin],
        })
        public property!: RdfProperty
    }

    return SupportedPropertyClass
}

SupportedPropertyMixin.appliesTo = hydra.SupportedProperty

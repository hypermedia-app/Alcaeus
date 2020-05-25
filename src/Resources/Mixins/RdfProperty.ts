import { Constructor, property } from '@tpluscode/rdfine'
import { hydra, rdf, rdfs } from '@tpluscode/rdf-ns-builders'
import { Class, HydraResource, SupportedOperation } from '../index'
import { ClassMixin } from './Class'
import { DocumentedResource, DocumentedResourceMixin } from './DocumentedResource'
import { SupportedOperationMixin } from './SupportedOperation'

export interface RdfProperty extends DocumentedResource {
    /**
     * Gets the rdfs:range of a property
     */
    range: Class | null
    /**
     * Gets the rdfs:domain of a property
     */
    domain: Class | null
    /**
     * Gets the property's supported operations
     */
    supportedOperations: SupportedOperation[]
    /**
     * Gets a value indicating whether the property is a hydra:Link
     */
    isLink: boolean
}

export function RdfPropertyMixin<TBase extends Constructor<HydraResource>>(Base: TBase) {
    abstract class RdfPropertyClass extends DocumentedResourceMixin(Base) implements RdfProperty {
        @property.resource({
            path: rdfs.range,
            as: [ClassMixin],
        })
        public range!: Class

        @property.resource({
            path: rdfs.domain,
            as: [ClassMixin],
        })
        public domain!: Class

        @property.resource({
            path: hydra.supportedOperation,
            values: 'array',
            as: [SupportedOperationMixin],
        })
        public supportedOperations!: SupportedOperation[]

        public get isLink() {
            return this.hasType(hydra.Link)
        }
    }

    return RdfPropertyClass
}

RdfPropertyMixin.appliesTo = rdf.Property

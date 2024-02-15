import { property } from '@tpluscode/rdfine'
import type { Constructor } from '@tpluscode/rdfine'
import { hydra, rdf, rdfs } from '@tpluscode/rdf-ns-builders'
import type { Class, Operation } from '@rdfine/hydra'
import type { Property } from '@rdfine/rdf'
import { ClassMixin } from './Class.js'
import { OperationMixin } from './Operation.js'

interface PropertyEx {
  /**
     * Gets the rdfs:range of a property
     */
  range: Class[]
  /**
     * Gets the rdfs:domain of a property
     */
  domain: Class[]
  /**
     * Gets the property's supported operations
     */
  supportedOperations: Operation[]
  /**
     * Gets a value indicating whether the property is a hydra:Link
     */
  isLink: boolean
}

declare module '@rdfine/rdf' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Property extends PropertyEx {
  }
}

export function RdfPropertyMixin<TBase extends Constructor<Omit<Property, keyof PropertyEx>>>(Base: TBase) {
  abstract class RdfPropertyClass extends Base implements Property {
    @property.resource({
      path: rdfs.range,
      as: [ClassMixin],
      values: 'array',
    })
    public range!: Class[]

    @property.resource({
      path: rdfs.domain,
      as: [ClassMixin],
      values: 'array',
    })
    public domain!: Class[]

    @property.resource({
      path: hydra.supportedOperation,
      values: 'array',
      as: [OperationMixin],
    })
    public supportedOperations!: Operation[]

    public get isLink() {
      return this.types.has(hydra.Link)
    }
  }

  return RdfPropertyClass
}

RdfPropertyMixin.appliesTo = rdf.Property

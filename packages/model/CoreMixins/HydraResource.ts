import type { DatasetCore, Term, Literal, BlankNode, NamedNode } from '@rdfjs/types'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'
import type { Constructor, RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import type { ApiDocumentation, Resource, SupportedProperty } from '@rdfine/hydra'
import type { GraphPointer } from 'clownface'
import literal from 'rdf-literal'
import type { HydraEnvironment } from 'alcaeus-core'
import type { MemberAssertionPattern } from '../Mixins/MemberAssertion.js'
import { RuntimeOperation, createMixin } from '../Operation.js'

export interface GetProperties {
  termTypes: (Literal | NamedNode | BlankNode)['termType'][]
}

declare module '@tpluscode/rdfine' {
  export interface RdfResource<D extends DatasetCore = DatasetCore>{
    /**
         * Gets the operations which can be performed on this resource
         */
    readonly operations: RuntimeOperation[]

    /**
         * Gets the hydra:ApiDocumentation linked to the original response
         */
    readonly apiDocumentation: ApiDocumentation | undefined

    /**
         * Gathers all properties from current resource's classes
         */
    getProperties(options?: GetProperties): { supportedProperty: SupportedProperty; objects: any[] }[]

    /**
         * Get all property/value pairs for hydra:Link properties
         *
         * @param includeMissing if true, will include properties not present in resource representation
         */
    getLinks(includeMissing?: boolean): { supportedProperty: SupportedProperty; resources: RdfResource<D>[] }[]

    /**
         * Gets objects of hydra:collection property
         */
    getCollections(filter?: MemberAssertionPattern): RdfResource<D>[]
  }
}

function only(termTypes: Term['termType'][] = ['BlankNode', 'NamedNode', 'Literal']) {
  return function (term: GraphPointer): term is GraphPointer<ResourceIdentifier | Literal> {
    return termTypes.includes(term.term.termType)
  }
}

function getObject(this: RdfResource, obj: GraphPointer<ResourceIdentifier | Literal>) {
  if (obj.term.termType === 'BlankNode' || obj.term.termType === 'NamedNode') {
    return this._create(obj, [], {
      parent: this,
    })
  }

  return literal.fromRdf(obj.term)
}

export function createHydraResourceMixin(env: HydraEnvironment) {
  function * getSupportedClasses(resource: GraphPointer): Iterable<GraphPointer> {
    for (const { root: docs } of env.hydra.apiDocumentations) {
      if (!docs) {
        continue
      }
      const classes = docs.pointer.node(resource.out(rdf.type))
      for (const clas of classes.toArray()) {
        yield clas
      }
    }
  }

  function HydraResourceMixin<Base extends Constructor<Resource>>(base: Base) {
    return class extends base implements Resource {
      public get operations(): RuntimeOperation[] {
        const classOperations = [...getSupportedClasses(this.pointer)]
          .reduce<GraphPointer[]>((operations, clas) => [...operations, ...clas.out(hydra.supportedOperation).toArray()], [])

        const propertyOperations = [...this.pointer.dataset.match(null, null, this.pointer.term)]
          .reduce((operations, quad) => {
            if (quad.subject.termType !== 'NamedNode') {
              return operations
            }

            return [...getSupportedClasses(this.pointer.namedNode(quad.subject))]
              .reduce((operations, clas) => {
                return [...operations, ...clas
                  .out(hydra.supportedProperty)
                  .has(hydra.property, quad.predicate)
                  .out(hydra.property)
                  .out(hydra.supportedOperation).toArray()]
              }, operations)
          }, [] as GraphPointer[])

        const supportedOperations: GraphPointer[] = Array.prototype.concat.apply([], [...classOperations, ...propertyOperations])
        const operations = supportedOperations.reduce((map, pointer) => {
          if (!map.has(pointer.term)) {
            map.set(pointer.term, this._create<RuntimeOperation>(pointer, [createMixin(env.hydra, this)]))
          }

          return map
        }, env.termMap<Term, RuntimeOperation>())

        return [...operations.values()]
      }

      public get apiDocumentation(): ApiDocumentation | undefined {
        const client = env.hydra
        const id = this.pointer.out(hydra.apiDocumentation).value ||
                  client.resources.get(this.pointer)?.response.apiDocumentationLink

        if (id) {
          const idNode = env.namedNode(id)
          const representation = client.apiDocumentations.find(apiDoc => apiDoc.root?.equals(idNode))
          if (representation?.root) {
            return representation.root
          }
        }

        return undefined
      }

      public getLinks(includeMissing = false) {
        return this.getProperties({ termTypes: ['NamedNode'] })
          .filter((tuple) => tuple.supportedProperty.property?.isLink)
          .filter((tuple) => tuple.objects.length > 0 || includeMissing)
          .map((tuple) => ({
            resources: tuple.objects,
            supportedProperty: tuple.supportedProperty,
          }))
      }

      public getProperties(options?: GetProperties): { supportedProperty: SupportedProperty; objects: any[] }[] {
        const classProperties = [...getSupportedClasses(this.pointer)]
          .reduce<GraphPointer[]>((operations, clas) => [...operations, ...clas.out(hydra.supportedProperty).toArray()], [])

        const map = classProperties.reduce((current, supportedProperty) => {
          const predicate = supportedProperty.out(hydra.property).toArray()[0]
          if (predicate.term.termType !== 'NamedNode' || current.has(predicate.term)) {
            return current
          }

          const objects = this._getObjects(predicate.term)
            .toArray()
            .filter(only(options?.termTypes))
            .map(getObject, this)
          return current.set(predicate.term, {
            objects,
            supportedProperty: this._create<SupportedProperty>(supportedProperty),
          })
        }, env.termMap<Term, { supportedProperty: SupportedProperty; objects: any[] }>())

        return [...map.values()]
      }

      public getCollections(filter?: MemberAssertionPattern) {
        if (filter) {
          return this.collection.filter((c) => {
            const memberAssertions = [
              ...c.memberAssertion || [],
              ...c.manages || [],
            ]
            return memberAssertions.find((assertion) => assertion.matches(filter))
          })
        }

        return this.collection
      }
    }
  }

  HydraResourceMixin.shouldApply = true

  return HydraResourceMixin
}

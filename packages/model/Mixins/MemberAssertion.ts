import type { NamedNode } from '@rdfjs/types'
import type { ExtendingConstructor, RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import { namespace } from '@tpluscode/rdfine'
import type { Class, MemberAssertion } from '@rdfine/hydra'
import type { Property } from '@rdfine/rdf'
import type { MultiPointer } from 'clownface'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'

export interface MemberAssertionPattern {
  subject?: string | RdfResource | NamedNode
  predicate?: string | Property | NamedNode
  object?: string | Class | NamedNode
}

interface MemberAssertionEx {
  /**
     * Checks if the current member assertion matches the given pattern
     * @param filter {MemberAssertionPattern}
     */
  matches(filter: MemberAssertionPattern): boolean
}

declare module '@rdfine/hydra' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface MemberAssertion extends MemberAssertionEx {
  }
}

function getUri(factory: MultiPointer, resource: string | RdfResource | NamedNode): ResourceIdentifier {
  if (typeof resource === 'string') {
    return factory.namedNode(resource).term
  }

  if ('id' in resource) {
    return resource.id
  }

  return resource
}

export function MemberAssertionMixin<TBase extends ExtendingConstructor<MemberAssertion, MemberAssertionEx>>(Base: TBase) {
  @namespace(hydra)
  class MemberAssertionClass extends Base implements MemberAssertionEx {
    public matches({ subject = '', predicate = rdf.type, object = '' }: MemberAssertionPattern): boolean {
      const predicateId = getUri(this.pointer, predicate)
      const objectId = getUri(this.pointer, object)
      const subjectId = getUri(this.pointer, subject)

      if (object && this.object && this.property) {
        const predicateIsRdfType = rdf.type.equals(predicateId)

        return predicateIsRdfType && objectId.equals(this.object.id) && predicateId.equals(this.property.id)
      }

      if (subject && predicate && this.subject && this.property) {
        return subjectId.equals(this.subject.id) && predicateId.equals(this.property.id)
      }

      return false
    }
  }

  return MemberAssertionClass
}

MemberAssertionMixin.shouldApply = (res: RdfResource) => {
  return res.pointer.in([hydra.manages, hydra.memberAssertion]).terms.length > 0
}

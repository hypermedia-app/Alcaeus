import type { Constructor, RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import { namespace, property } from '@tpluscode/rdfine'
import type { MultiPointer } from 'clownface'
import type { NamedNode } from 'rdf-js'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'
import type { HydraResource } from '../index'
import type { Class } from './Class'
import type { RdfProperty } from './RdfProperty'

export interface ManagesBlockPattern {
    subject?: string | RdfResource | NamedNode
    predicate?: string | RdfProperty | NamedNode
    object?: string | Class | NamedNode
}

/**
 * Represents the "manages block"
 */
export interface ManagesBlock {
    /**
     * Gets the subject resource from the manages block
     */
    subject: HydraResource | null
    /**
     * Gets the predicate from the manages block
     */
    property: RdfProperty | null
    /**
     * Gets the object class from the manages block
     */
    object: Class | null

    /**
     * Checks if the current manages block matches the given pattern
     * @param filter {ManagesBlockPattern}
     */
    matches(filter: ManagesBlockPattern): boolean
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

export function ManagesBlockMixin<TBase extends Constructor>(Base: TBase) {
    @namespace(hydra)
    class ManagesBlockClass extends Base implements ManagesBlock {
        @property.resource()
        public subject!: HydraResource

        @property.resource()
        public property!: RdfProperty

        @property.resource()
        public object!: Class

        public matches({ subject = '', predicate = rdf.type, object = '' }: ManagesBlockPattern): boolean {
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

    return ManagesBlockClass
}

ManagesBlockMixin.shouldApply = (res: RdfResource) => {
    return res.pointer.in(hydra.manages).terms.length > 0
}

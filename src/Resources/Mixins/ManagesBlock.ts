import type { Constructor, RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import { namespace } from '@tpluscode/rdfine'
import type { Class, ManagesBlock } from '@rdfine/hydra'
import type { Property } from '@rdfine/rdf'
import type { MultiPointer } from 'clownface'
import type { NamedNode } from 'rdf-js'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'

export interface ManagesBlockPattern {
    subject?: string | RdfResource | NamedNode
    predicate?: string | Property | NamedNode
    object?: string | Class | NamedNode
}

declare module '@rdfine/hydra' {
    export interface ManagesBlock {
        /**
         * Checks if the current manages block matches the given pattern
         * @param filter {ManagesBlockPattern}
         */
        matches(filter: ManagesBlockPattern): boolean
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

export function ManagesBlockMixin<TBase extends Constructor<Omit<ManagesBlock, 'matches'>>>(Base: TBase) {
    @namespace(hydra)
    class ManagesBlockClass extends Base implements ManagesBlock {
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

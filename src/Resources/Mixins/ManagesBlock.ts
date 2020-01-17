import { Constructor, namespace, property, RdfResource, ResourceIdentifier } from '@tpluscode/rdfine'
import { SafeClownface } from 'clownface'
import { NamedNode } from 'rdf-js'
import { hydra, rdf } from '../../Vocabs'
import { Class, IManagesBlock, ManagesBlockPattern, RdfProperty } from '../index'
import { IResource } from '../Resource'

function getUri (factory: SafeClownface, resource: string | IResource | NamedNode): ResourceIdentifier {
    if (typeof resource === 'string') {
        return factory.namedNode(resource).term
    }

    if ('id' in resource) {
        return resource.id
    }

    return resource
}

export function ManagesBlockMixin<TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class ManagesBlock extends Base implements IManagesBlock {
        @property.resource()
        public subject!: IResource

        @property.resource()
        public property!: RdfProperty

        @property.resource()
        public object!: Class

        public matches ({ subject = '', predicate = rdf.type, object = '' }: ManagesBlockPattern): boolean {
            const predicateId = getUri(this._node, predicate)
            const objectId = getUri(this._node, object)
            const subjectId = getUri(this._node, subject)

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

    return ManagesBlock
}

ManagesBlockMixin.shouldApply = (res: RdfResource) => {
    return res._node.in(hydra.manages).terms.length > 0
}

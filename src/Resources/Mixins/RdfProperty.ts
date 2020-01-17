import { Constructor, property } from '@tpluscode/rdfine'
import { hydra, rdf, rdfs } from '../../Vocabs'
import { Class, IRdfProperty, SupportedOperation } from '../index'
import { IResource } from '../Resource'
import { ClassMixin } from './Class'
import { SupportedOperationMixin } from './SupportedOperation'

export function RdfPropertyMixin<TBase extends Constructor> (Base: TBase) {
    abstract class RdfProperty extends Base implements IRdfProperty {
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

        public get isLink () {
            return this.hasType(hydra.Link)
        }
    }

    return RdfProperty
}

RdfPropertyMixin.shouldApply = (res: IResource) => res.hasType(rdf.Property)

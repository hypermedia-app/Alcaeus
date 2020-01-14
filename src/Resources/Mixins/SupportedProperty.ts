import { Constructor, namespace, property } from '@tpluscode/rdfine'
import { hydra } from '../../Vocabs'
import { ISupportedProperty, RdfProperty } from '../index'
import { IResource } from '../Resource'
import { DocumentedResourceMixin } from './DocumentedResource'
import { RdfPropertyMixin } from './RdfProperty'

export function SupportedPropertyMixin<TBase extends Constructor> (Base: TBase) {
    @namespace(hydra)
    class SupportedProperty extends Base implements ISupportedProperty {
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

    return DocumentedResourceMixin(SupportedProperty)
}

SupportedPropertyMixin.shouldApply = (res: IResource) => res.hasType(hydra.SupportedProperty)

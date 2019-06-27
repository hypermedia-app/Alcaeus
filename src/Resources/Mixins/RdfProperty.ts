import { Core } from '../../Constants'
import { rdf, rdfs } from '../../Vocabs'
import { IRdfProperty } from '../index'
import { Constructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends Constructor> (Base: TBase) {
    abstract class RdfProperty extends Base implements IRdfProperty {
        public get range () {
            return this[rdfs('range')]
        }

        public get domain () {
            return this[rdfs('domain')]
        }

        public get supportedOperations () {
            return this._getArray(Core.Vocab('supportedOperation'))
        }

        public get isLink () {
            return this.types.contains(Core.Vocab('Link'))
        }
    }

    return RdfProperty
}

export const shouldApply = (res: IResource) => res.types.contains(rdf.Property)

import {Core} from '../../Constants';
import {IRdfProperty, IResource} from '../../interfaces';
import {rdf, rdfs} from '../../Vocabs';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    abstract class RdfProperty extends Base implements IRdfProperty {
        get range() {
            return this[rdfs('range')];
        }

        get domain() {
            return this[rdfs('domain')];
        }

        get supportedOperations() {
            return this._getArray(Core.Vocab('supportedOperation'));
        }
    }

    return RdfProperty;
}

export const shouldApply = (res: IResource) => res.types.contains(rdf.Property);

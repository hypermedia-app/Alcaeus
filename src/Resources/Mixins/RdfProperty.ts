import {Core} from '../../Constants';
import {IRdfProperty} from '../../interfaces';
import ensureArray, {isA} from '../../ResourceHelper';
import {rdf, rdfs} from '../../Vocabs';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class RdfProperty extends Base implements IRdfProperty {
        get range() {
            return this[rdfs('range')];
        }

        get domain() {
            return this[rdfs('domain')];
        }

        get supportedOperations() {
            return ensureArray(this, Core.Vocab('supportedOperation'));
        }
    }

    return RdfProperty;
}

export const shouldApply = isA(rdf.Property);

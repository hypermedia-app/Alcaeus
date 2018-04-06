import {Core} from '../../Constants';
import {IClass, ISupportedOperation} from '../../interfaces';
import ensureArray, {isA} from '../../ResourceHelper';
import {rdf, rdfs} from '../../Vocabs';
import {Constructor} from '../Mixin';

export function Mixin<TBase extends Constructor>(Base: TBase) {
    class RdfProperty extends Base {
        get range(): IClass {
            return this[rdfs('range')];
        }

        get domain(): IClass {
            return this[rdfs('domain')];
        }

        get supportedOperations(): ISupportedOperation[] {
            return ensureArray(this, Core.Vocab('supportedOperation'));
        }
    }

    return RdfProperty;
}

export const shouldApply = isA(rdf.Property);

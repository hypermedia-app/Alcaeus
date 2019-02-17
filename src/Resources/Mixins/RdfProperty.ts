import {Core} from '../../Constants';
import {rdf, rdfs} from '../../Vocabs';
import {IRdfProperty} from '../index';
import {Constructor} from '../Mixin';
import {IResource} from '../Resource';

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

        get isLink() {
            return this.types.contains(Core.Vocab('Link'));
        }
    }

    return RdfProperty;
}

export const shouldApply = (res: IResource) => res.types.contains(rdf.Property);

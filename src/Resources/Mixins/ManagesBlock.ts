import {Core} from '../../Constants';
import {IAsObject} from '../../internals';
import {rdf} from '../../Vocabs';
import {IManagesBlock} from '../index';
import {HydraConstructor} from '../Mixin';

export function Mixin<TBase extends HydraConstructor>(Base: TBase) {
    abstract class ManagesBlock extends Base implements IManagesBlock {
        get subject() {
            return this._get(rdf.subject);
        }

        get predicate() {
            return this._get(rdf.predicate);
        }

        get object() {
            const obj = this._get(rdf.object);
            if (!obj) {
                return null;
            }

            return this.apiDocumentation.getClass(obj.id) || obj;
        }
    }

    return ManagesBlock;
}

export const shouldApply = (res: IAsObject) => {
    return res._reverseLinks.filter((link) => link.predicate === Core.Vocab('manages')).length > 0;
};

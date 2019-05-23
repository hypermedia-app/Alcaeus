import {Maybe} from 'tsmonad';
import {Core} from '../../Constants';
import {IAsObject} from '../../internals';
import {rdf} from '../../Vocabs';
import {Class, IManagesBlock, ManagesBlockPattern} from '../index';
import {HydraConstructor} from '../Mixin';

export function Mixin<TBase extends HydraConstructor>(Base: TBase) {
    abstract class ManagesBlock extends Base implements IManagesBlock {
        get subject() {
            return this._get(Core.Vocab('subject'));
        }

        get property() {
            return this._get(Core.Vocab('property'));
        }

        get object() {
            const maybeObject = Maybe.maybe(this._get(Core.Vocab('object')));

            const seq = Maybe.sequence({
                getClass: this.apiDocumentation.map((doc) => doc.getClass.bind(doc)),
                object: maybeObject,
            });

            return seq
                .map((t) => t.getClass(t.object.id) as Class)
                .caseOf({
                    just: (t) => t,
                    nothing: () => maybeObject.valueOr(null),
                });
        }

        public matches({ subject = '', predicate = rdf.type, object = '' }: ManagesBlockPattern): boolean {
            const predicateId = typeof predicate === 'string' ? predicate : predicate.id;
            const objectId = typeof object === 'string' ? object : object.id;
            const subjectId = typeof subject === 'string' ? subject : subject.id;

            if (object && this.object && this.property) {
                const predicateIsRdfType = predicateId === rdf.type;

                return predicateIsRdfType && this.object.id === objectId && this.property.id === predicateId;
            }

            if (subject && predicate && this.subject && this.property) {
                return this.subject.id === subjectId && this.property.id === predicateId;
            }

            return false;
        }
    }

    return ManagesBlock;
}

export const shouldApply = (res: IAsObject) => {
    return res._reverseLinks.filter((link) => link.predicate === Core.Vocab('manages')).length > 0;
};

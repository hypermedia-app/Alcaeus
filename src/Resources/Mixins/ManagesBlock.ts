import { Maybe } from 'tsmonad'
import { Core } from '../../Constants'
import { IAsObject } from '../../internals'
import { rdf } from '../../Vocabs'
import { Class, IManagesBlock, ManagesBlockPattern, RdfProperty } from '../index'
import { HydraConstructor } from '../Mixin'
import { IResource } from '../Resource'

export function Mixin<TBase extends HydraConstructor> (Base: TBase) {
    abstract class ManagesBlock extends Base implements IManagesBlock {
        public get subject () {
            return this.get<IResource>(Core.Vocab('subject'))
        }

        public get property () {
            return this.get<RdfProperty>(Core.Vocab('property'))
        }

        public get object () {
            const maybeClass = Maybe.maybe(this.get<Class>(Core.Vocab('object')))
            const classId = maybeClass.bind(c => Maybe.maybe(c.id))

            const getClass = this.apiDocumentation.map((doc) => doc.getClass.bind(doc))

            return classId
                .chain(id => getClass.bind(fun => Maybe.maybe(fun(id))))
                .caseOf({
                    just: c => c,
                    nothing: () => maybeClass.valueOr(null as any),
                })
        }

        public matches ({ subject = '', predicate = rdf.type, object = '' }: ManagesBlockPattern): boolean {
            const predicateId = typeof predicate === 'string' ? predicate : predicate.id
            const objectId = typeof object === 'string' ? object : object.id
            const subjectId = typeof subject === 'string' ? subject : subject.id

            if (object && this.object && this.property) {
                const predicateIsRdfType = predicateId === rdf.type

                return predicateIsRdfType && this.object.id === objectId && this.property.id === predicateId
            }

            if (subject && predicate && this.subject && this.property) {
                return this.subject.id === subjectId && this.property.id === predicateId
            }

            return false
        }
    }

    return ManagesBlock
}

export const shouldApply = (res: IAsObject) => {
    return res._reverseLinks.filter((link) => link.predicate === Core.Vocab('manages')).length > 0
}

import { nonenumerable } from 'core-decorators'
import { promises as jsonld } from 'jsonld'
import { JsonLd } from '../Constants'
import TypeCollection, { ITypeCollection } from '../TypeCollection'

export interface IResource {
    id: string;
    types: ITypeCollection;
    isAnonymous: boolean;
}

const isProcessed = new WeakMap<IResource, boolean>()

export default class implements IResource {
    public constructor (actualResource: object) {
        Object.assign(this, actualResource)

        isProcessed.set(this, false)
    }

    @nonenumerable
    public get id (): string {
        return this[JsonLd.Id]
    }

    @nonenumerable
    public get types () {
        return TypeCollection.create(this[JsonLd.Type])
    }

    @nonenumerable
    public get isAnonymous () {
        return this.id.startsWith('_')
    }

    @nonenumerable
    public get _processed () {
        return isProcessed.get(this)
    }

    public set _processed (val: boolean) {
        isProcessed.set(this, val)
    }

    public compact (context: any = 'https://www.w3.org/ns/hydra/core') {
        return jsonld.compact(this, context)
    }

    public _get (property: string) {
        if (this[property] === false) {
            return false
        }

        return this[property] || null
    }

    public _getArray (property: string) {
        const values = this[property]

        if (!values) {
            return []
        }

        if (Array.isArray(values) === false) {
            return [ values ]
        }

        return values
    }
}

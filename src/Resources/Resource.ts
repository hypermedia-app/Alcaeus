import { deprecated, nonenumerable } from 'core-decorators'
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
    [prop: string]: unknown;

    public constructor (actualResource: object) {
        Object.assign(this, actualResource)

        isProcessed.set(this, false)
    }

    @nonenumerable
    public get id (): string {
        const id = this[JsonLd.Id]
        if (typeof id !== 'string') {
            throw new Error('Resource identifier must be a string')
        }

        return id
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

    public compact (context: unknown = 'https://www.w3.org/ns/hydra/core') {
        return jsonld.compact(this, context)
    }

    /**
     * @deprecated Use method without underscore
     */
    @deprecated('Use method without underscore')
    public _get<T = unknown> (property: string): T {
        return this.get<T>(property)
    }

    public get<T = unknown> (property: string): T {
        if (typeof this[property] !== 'undefined') {
            // @ts-ignore
            return this[property]
        }

        return null
    }

    /**
     * @deprecated Use method without underscore
     */
    @deprecated('Use method without underscore')
    public _getArray<T = unknown> (property: string): T[] {
        return this.getArray<T>(property)
    }

    public getArray<T = unknown> (property: string): T[] {
        const values = this[property]

        if (!values) {
            return []
        }

        if (Array.isArray(values)) {
            return values
        }

        return [values as T]
    }

    public getNumber (property: string): number | null {
        const value = this.get(property)

        if (value === null || typeof value === 'undefined') {
            return null
        }

        if (typeof value === 'number') {
            return value
        }

        throw new Error(`Expected property '${property}' to be a number but found '${value}'`)
    }

    public getString (property: string): string | null {
        const value = this.get(property)

        if (value === null || typeof value === 'undefined') {
            return null
        }

        if (typeof value === 'string') {
            return value
        }

        throw new Error(`Expected property '${property}' to be a string but found '${value}'`)
    }

    public getBoolean (property: string): boolean {
        const value = this.get(property)

        if (value === null || typeof value === 'undefined') {
            return false
        }

        if (typeof value === 'boolean') {
            return value
        }

        throw new Error(`Expected property '${property}' to be a boolean but found '${value}'`)
    }
}

import { deprecated, nonenumerable } from 'core-decorators'
import { promises as jsonld } from 'jsonld'
import { JsonLd } from '../Constants'
import TypeCollection, { ITypeCollection } from '../TypeCollection'

export interface IResource {
    /**
     * Gets the resource identifiers
     */
    id: string;
    /**
     * Gets the resource types
     */
    types: ITypeCollection;
    /**
     * Gets a value indicating whether the resource is a blank node
     */
    isAnonymous: boolean;
    /**
     * Gets the value of a property
     * @param property
     */
    get<T = unknown> (property: string): T | null;
    /**
     * Gets the value of a property and ensures that an array will be returned
     * @param property
     */
    getArray<T = unknown> (property: string): T[];
    /**
     * Gets the property value if it's boolean. Throws if it's not
     * @param property
     */
    getBoolean (property: string): boolean;
    /**
     * Gets the property value if it's a string. Throws if it's not
     * @param property
     */
    getString (property: string): string | null;
    /**
     * Gets the property value if it's a number. Throws if it's not
     * @param property
     */
    getNumber (property: string): number | null;
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
        return isProcessed.get(this) || false
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
    public _get<T = unknown> (property: string): T | null {
        return this.get<T>(property)
    }

    public get<T = unknown> (property: string, { strict } = { strict: false }): T | null {
        if (typeof this[property] !== 'undefined') {
            // @ts-ignore
            return this[property]
        }

        if (strict) {
            throw new Error(`Value for predicate <${property}> was missing`)
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

    public getArray<T = unknown> (property: string, options = { strict: false }): T[] {
        const values = this.get(property, options)

        if (!values) {
            return []
        }

        if (Array.isArray(values)) {
            return values
        }

        return [values as T]
    }

    public getNumber (property: string, options = { strict: false }): number | null {
        const value = this.get(property, options)

        if (value === null || typeof value === 'undefined') {
            return null
        }

        if (typeof value === 'number') {
            return value
        }

        throw new Error(`Expected property '${property}' to be a number but found '${value}'`)
    }

    public getString (property: string, options = { strict: false }): string | null {
        const value = this.get(property, options)

        if (value === null || typeof value === 'undefined') {
            return null
        }

        if (typeof value === 'string') {
            return value
        }

        throw new Error(`Expected property '${property}' to be a string but found '${value}'`)
    }

    public getBoolean (property: string, options = { strict: false }): boolean {
        const value = this.get(property, options)

        if (value === null || typeof value === 'undefined') {
            return false
        }

        if (typeof value === 'boolean') {
            return value
        }

        throw new Error(`Expected property '${property}' to be a boolean but found '${value}'`)
    }
}

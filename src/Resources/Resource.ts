import { RdfResource, RdfResourceImpl, Constructor } from '@tpluscode/rdfine'
import nonenumerable from '../helpers/nonenumerable'
import { NamedNode, Term } from 'rdf-js'
import { xsd } from '../Vocabs'

export interface IResource extends RdfResource {
    /**
     * Gets a value indicating whether the resource is a blank node
     */
    isAnonymous: boolean;
    /**
     * Gets the value of a property
     * @param property
     */
    get<T extends RdfResource = RdfResourceImpl> (property: string | NamedNode): T | null;
    /**
     * Gets the value of a property and ensures that an array will be returned
     * @param property
     */
    getArray<T extends RdfResource = RdfResourceImpl> (property: string | NamedNode): T[];
    /**
     * Gets the property value if it's boolean. Throws if it's not
     * @param property
     */
    getBoolean (property: string | NamedNode): boolean;
    /**
     * Gets the property value if it's a string. Throws if it's not
     * @param property
     */
    getString (property: string | NamedNode): string | null;
    /**
     * Gets the property value if it's a number. Throws if it's not
     * @param property
     */
    getNumber (property: string | NamedNode): number | null;
}

export default class Resource extends RdfResourceImpl implements IResource {
    @nonenumerable
    public get isAnonymous () {
        return this.id.termType === 'BlankNode'
    }

    public get<T extends RdfResource = RdfResourceImpl> (property: string | NamedNode, { strict } = { strict: false }): T | null {
        let propertyNode = typeof property === 'string' ? this._node.namedNode(property) : property

        const objects = this._node.out(propertyNode)
            .map(obj => {
                return (this.constructor as Constructor).factory.createEntity<T>(obj)
            })

        if (objects.length > 0) {
            return objects[0]
        }

        if (strict) {
            throw new Error(`Value for predicate <${property}> was missing`)
        }

        return null
    }

    public getArray<T extends RdfResource = RdfResourceImpl> (property: string | NamedNode, options = { strict: false }): T[] {
        let propertyNode = typeof property === 'string' ? this._node.namedNode(property) : property
        const values = this._node.out(propertyNode)
            .map(obj => {
                return (this.constructor as Constructor).factory.createEntity<T>(obj)
            })

        if (!values) {
            return []
        }

        if (Array.isArray(values)) {
            return values
        }

        return [values as T]
    }

    public getNumber (property: string | NamedNode, options = { strict: false }): number | null {
        const value = this.__getNodes(property, options)[0]

        if (typeof value === 'undefined') {
            return null
        }

        if (value.termType === 'Literal') {
            return parseFloat(value.value)
        }

        throw new Error(`Expected property '${property}' to be a number but found '${value}'`)
    }

    public getString (property: string | NamedNode, options = { strict: false }): string | null {
        const value = this.__getNodes(property, options)[0]

        if (typeof value === 'undefined') {
            return null
        }

        if (value.termType === 'Literal') {
            return value.value
        }

        throw new Error(`Expected property '${property}' to be a string but found '${value}'`)
    }

    public getBoolean (property: string | NamedNode, options = { strict: false }): boolean {
        const value = this.__getNodes(property, options)[0]

        if (typeof value === 'undefined') {
            return false
        }

        if (value.termType === 'Literal' && xsd.boolean.equals(value.datatype)) {
            return value.equals(this._node.literal(true).term)
        }

        throw new Error(`Expected property '${property}' to be a boolean but found '${value}'`)
    }

    private __getNodes (property: string | NamedNode, { strict } = { strict: false }): Term[] {
        let propertyNode = typeof property === 'string' ? this._node.namedNode(property) : property

        const objects = this._node.out(propertyNode).terms

        if (objects.length > 0) {
            return objects
        }

        if (strict) {
            throw new Error(`Value for predicate <${property}> was missing`)
        }

        return []
    }
}

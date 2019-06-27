export interface ITypeCollection extends ReadonlyArray<string> {
    contains(clas: string): boolean;
}

export default class TypeCollection extends Array<string> implements ITypeCollection {
    public static create (classes?: any) {
        const collection: TypeCollection = Object.create(TypeCollection.prototype)

        if (typeof classes === 'undefined') {
            return collection
        }

        if (Array.isArray(classes) === false) {
            classes = [ classes ]
        }

        collection.push(...classes)

        return collection
    }

    private constructor (classes: string[]) {
        super(...classes)
    }

    public contains (clas: string): boolean {
        return this.filter((value) => value === clas).length > 0
    }
}

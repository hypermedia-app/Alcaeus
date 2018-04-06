import {ITypeCollection} from './interfaces';

export default class TypeCollection extends Array<string> implements ITypeCollection {
    private constructor(classes: string[]) {
        super(...classes);
    }

    contains(clas: string): boolean {
        return this.filter(value => value === clas).length > 0;
    }

    static create(classes: any) {
        let collection:TypeCollection = Object.create(TypeCollection.prototype);

        if (typeof classes === 'undefined') {
            return collection;
        }

        if(Array.isArray(classes) === false) {
            classes = [ classes ];
        }

        collection.push(...classes);

        return collection;
    }
}

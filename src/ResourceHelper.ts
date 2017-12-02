import {JsonLd} from "./Constants";

export default function ensureArray(obj: object, property: string) {
    const values = obj[property];

    if (!values) {
        return [];
    }

    if(Array.isArray(values) === false) {
        return [ values ];
    }

    return values;
}

export function isA(typeId) {
    return obj => {
        const types = obj[JsonLd.Type];

        return types === typeId || (Array.isArray(types) && types.indexOf(typeId) !== -1);
    };
}

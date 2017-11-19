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

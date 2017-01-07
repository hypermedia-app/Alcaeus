export function forOwn(obj:Object, iteratee) {
    for(let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        iteratee(obj[key], key, obj);
    }
}

export function values(obj:Object):Array<any> {
    const values = [];

    forOwn(obj, o => {
        values.push(o);
    });

    return values;
}
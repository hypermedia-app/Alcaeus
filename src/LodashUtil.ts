export function forOwn(obj:Object, iteratee) {
    for(var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        iteratee(obj[key], key, obj);
    }
}

export function values(obj:Object):Array<any> {
    var values = [];

    forOwn(obj, o => {
        values.push(o);
    });

    return values;
}
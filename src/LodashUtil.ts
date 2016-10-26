export function forOwn(obj:Object, iteratee) {
    for(var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        iteratee(obj[key], key, obj);
    }
}
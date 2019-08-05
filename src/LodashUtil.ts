export function forOwn (obj: object, iteratee) {
    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) { continue }

        iteratee(obj[key], key, obj)
    }
}

export function values<T> (obj: object): T[] {
    const result: T[] = []

    forOwn(obj, (o) => {
        result.push(o)
    })

    return result
}

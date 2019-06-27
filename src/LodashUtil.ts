export function forOwn (obj: object, iteratee) {
    for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) { continue }

        iteratee(obj[key], key, obj)
    }
}

export function values (obj: object): any[] {
    const result = []

    forOwn(obj, (o) => {
        result.push(o)
    })

    return result
}

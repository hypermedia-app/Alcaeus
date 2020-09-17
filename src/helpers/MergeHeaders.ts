export function merge(headers: Headers, overrides: Headers, _headers: typeof Headers): Headers {
    const merged = new _headers(headers)

    overrides.forEach((value, key) => {
        merged.delete(key)
        merged.append(key, value)
    })

    return merged
}

export function merge (headers: Headers, overrides: Headers): Headers {
    const merged = new Headers(headers)

    overrides.forEach((value, key) => {
        merged.delete(key)
        merged.append(key, value)
    })

    return merged
}

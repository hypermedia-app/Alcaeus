function mergeNormalize (left, right) {
    return Object.entries(right)
        .reduce((obj, [key, value]) => ({
            ...obj,
            [key.toLowerCase()]: value,
        }),
        left)
}

export function merge (headers: HeadersInit, overrides: HeadersInit): HeadersInit {
    const normalized = mergeNormalize({}, headers)

    return mergeNormalize(normalized, overrides)
}

function mergeNormalize (left: string[][], right: HeadersInit) {
    let rightAsArr: string[][]
    if (Array.isArray(right)) {
        rightAsArr = right
    } else {
        rightAsArr = Object.entries(right)
    }

    return rightAsArr
        .reduce((obj, [key, value]) => ({
            ...obj,
            [key.toLowerCase()]: value,
        }),
        left)
}

export function merge (headers: HeadersInit, overrides: HeadersInit): HeadersInit {
    const normalized = mergeNormalize([], headers)

    return mergeNormalize(normalized, overrides)
}

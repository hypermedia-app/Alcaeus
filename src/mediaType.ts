export function stripContentTypeParameters(mediaType: string | null) {
    return mediaType?.split(';').shift() || ''
}

import { HydraResponse } from './alcaeus'

export interface ResourceCacheStrategy {
    shouldLoad(previous: Required<HydraResponse<any, any>>): boolean
    requestCacheHeaders(previous: Required<HydraResponse<any, any>>): HeadersInit | null
}

export const shouldLoad = () => true

export function requestCacheHeaders({ response }: Pick<Required<HydraResponse>, 'response'>): HeadersInit {
    const etag = response.xhr.headers.get('ETag')
    if (etag) {
        return {
            'if-none-match': etag,
        }
    }

    const lastModified = response.xhr.headers.get('Last-Modified')
    if (lastModified) {
        return {
            'if-modified-since': lastModified,
        }
    }

    return {}
}

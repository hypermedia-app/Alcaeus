import { DatasetCore } from '@rdfjs/types'
import { RdfResourceCore } from '@tpluscode/rdfine/RdfResource'
import { HydraResponse } from './alcaeus.js'

export interface ResourceCacheStrategy {
  shouldLoad(previous: Required<HydraResponse<DatasetCore, RdfResourceCore>>): boolean
  requestCacheHeaders(previous: Required<HydraResponse<DatasetCore, RdfResourceCore>>): HeadersInit | null
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

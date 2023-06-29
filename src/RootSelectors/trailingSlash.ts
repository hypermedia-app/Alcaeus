import type { NamedNode } from '@rdfjs/types'
import $rdf from '../environment.js'
import type { ResponseWrapper } from '../ResponseWrapper.js'

export function trailingSlash(response: ResponseWrapper): NamedNode | undefined {
  let id: string

  if (response.requestedUri.endsWith('/')) {
    id = response.requestedUri.substr(0, response.requestedUri.length - 1)
  } else {
    id = response.requestedUri + '/'
  }

  return $rdf.namedNode(id)
}

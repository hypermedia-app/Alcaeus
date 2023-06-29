import type { NamedNode } from '@rdfjs/types'
import $rdf from '../environment.js'
import type { ResponseWrapper } from '../ResponseWrapper.js'

export function redirectTarget(response: ResponseWrapper): NamedNode | undefined {
  if (response.redirectUrl != null) {
    return $rdf.namedNode(response.redirectUrl)
  }

  return undefined
}

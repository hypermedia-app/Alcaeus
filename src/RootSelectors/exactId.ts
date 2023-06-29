import type { NamedNode } from '@rdfjs/types'
import $rdf from '../environment.js'
import type { ResponseWrapper } from '../ResponseWrapper.js'

export function exactId(response: ResponseWrapper): NamedNode {
  return $rdf.namedNode(response.resourceUri)
}

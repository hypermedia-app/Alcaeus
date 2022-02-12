import type { NamedNode } from '@rdfjs/types'
import * as $rdf from '@rdf-esm/data-model'
import type { ResponseWrapper } from '../ResponseWrapper'

export function exactId(response: ResponseWrapper): NamedNode {
    return $rdf.namedNode(response.resourceUri)
}

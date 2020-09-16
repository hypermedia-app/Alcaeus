import * as $rdf from '@rdf-esm/data-model'
import type { NamedNode } from 'rdf-js'
import type { ResponseWrapper } from '../ResponseWrapper'

export function exactId(response: ResponseWrapper): NamedNode {
    return $rdf.namedNode(response.resourceUri)
}

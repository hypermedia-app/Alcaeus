import * as $rdf from '@rdf-esm/data-model'
import { NamedNode } from 'rdf-js'
import { ResponseWrapper } from '../ResponseWrapper'

export function exactId(response: ResponseWrapper): NamedNode {
    return $rdf.namedNode(response.resourceUri)
}

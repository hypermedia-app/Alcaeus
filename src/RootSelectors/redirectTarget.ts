import { NamedNode } from 'rdf-js'
import $rdf from '@rdfjs/data-model'
import { ResponseWrapper } from '../ResponseWrapper'

export function redirectTarget(response: ResponseWrapper): NamedNode | undefined {
    if (response.redirectUrl != null) {
        return $rdf.namedNode(response.redirectUrl)
    }

    return undefined
}

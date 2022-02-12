import type { NamedNode } from '@rdfjs/types'
import * as $rdf from '@rdf-esm/data-model'
import type { ResponseWrapper } from '../ResponseWrapper'

export function redirectTarget(response: ResponseWrapper): NamedNode | undefined {
    if (response.redirectUrl != null) {
        return $rdf.namedNode(response.redirectUrl)
    }

    return undefined
}

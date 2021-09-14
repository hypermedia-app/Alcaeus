import type { NamedNode } from 'rdf-js'
import * as $rdf from '@rdf-esm/data-model'
import type { ResponseWrapper } from '../ResponseWrapper'

export function trailingSlash(response: ResponseWrapper): NamedNode | undefined {
    let id: string

    if (response.requestedUri.endsWith('/')) {
        id = response.requestedUri.substr(0, response.requestedUri.length - 1)
    } else {
        id = response.requestedUri + '/'
    }

    return $rdf.namedNode(id)
}

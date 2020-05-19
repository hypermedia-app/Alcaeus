import * as $rdf from '@rdfjs/data-model'
import { NamedNode } from 'rdf-js'
import { ResponseWrapper } from '../ResponseWrapper'

export function trailingSlash(response: ResponseWrapper): NamedNode | undefined {
    let id: string

    if (response.requestedUri.endsWith('/')) {
        id = response.requestedUri.substr(0, response.requestedUri.length - 1)
    } else {
        id = response.requestedUri + '/'
    }

    return $rdf.namedNode(id)
}

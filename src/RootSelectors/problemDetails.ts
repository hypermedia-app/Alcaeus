import { DatasetCore } from 'rdf-js'
import clownface from 'clownface'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders/strict'
import { ResponseWrapper } from '../ResponseWrapper'
import { Headers, ContentTypes } from '../Constants'
import { stripContentTypeParameters } from '../mediaType'

export function problemDetails(response: ResponseWrapper, dataset: DatasetCore) {
    if (stripContentTypeParameters(response.xhr.headers.get(Headers.ContentType)) === ContentTypes.problemDetails) {
        const ptr = clownface({ dataset })
        const term = ptr.has(rdf.type, hydra.Error).term || ptr.in().filter(p => !p.in().terms.length).term

        if (term?.termType === 'NamedNode' || term?.termType === 'BlankNode') {
            return term
        }
    }

    return undefined
}

import type { DatasetCore } from '@rdfjs/types'
import clownface, { AnyPointer, MultiPointer } from 'clownface'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders/strict'
import TermSet from '@rdf-esm/term-set'
import { ResponseWrapper } from '../ResponseWrapper'
import { Headers, ContentTypes } from '../Constants'
import { stripContentTypeParameters } from '../mediaType'

function distinct(any: AnyPointer, ptrs: MultiPointer): MultiPointer {
    const nodes = new TermSet(ptrs.terms)
    return any.node([...nodes])
}

export function problemDetails(response: ResponseWrapper, dataset: DatasetCore) {
    if (stripContentTypeParameters(response.xhr.headers.get(Headers.ContentType)) === ContentTypes.problemDetails) {
        const ptr = clownface({ dataset })
        const term = ptr.has(rdf.type, hydra.Error).term || distinct(ptr, ptr.in().filter(p => !p.in().terms.length)).term

        if (term?.termType === 'NamedNode' || term?.termType === 'BlankNode') {
            return term
        }
    }

    return undefined
}

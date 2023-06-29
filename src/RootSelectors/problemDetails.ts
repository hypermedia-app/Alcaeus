import type { DatasetCore } from '@rdfjs/types'
import clownface, { AnyPointer, MultiPointer } from 'clownface'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'
import $rdf from '../environment.js'
import { ResponseWrapper } from '../ResponseWrapper.js'
import { Headers, ContentTypes } from '../Constants.js'
import { stripContentTypeParameters } from '../mediaType.js'

function distinct(any: AnyPointer, ptrs: MultiPointer): MultiPointer {
  const nodes = $rdf.termSet(ptrs.terms)
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

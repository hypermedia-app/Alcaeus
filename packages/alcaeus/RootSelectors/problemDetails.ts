import type { DatasetCore } from '@rdfjs/types'
import type { AnyPointer, MultiPointer } from 'clownface'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'
import { HydraEnvironment, ResponseWrapper } from 'alcaeus-core'
import { Headers, ContentTypes } from '../Constants.js'
import { stripContentTypeParameters } from '../mediaType.js'

function distinct(env: HydraEnvironment, any: AnyPointer, ptrs: MultiPointer): MultiPointer {
  const nodes = env.termSet(ptrs.terms)
  return any.node([...nodes])
}

export function problemDetails(env: HydraEnvironment, response: ResponseWrapper, dataset: DatasetCore) {
  if (stripContentTypeParameters(response.xhr.headers.get(Headers.ContentType)) === ContentTypes.problemDetails) {
    const ptr = env.clownface({ dataset })
    const term = ptr.has(rdf.type, hydra.Error).term || distinct(env, ptr, ptr.in().filter(p => !p.in().terms.length)).term

    if (term?.termType === 'NamedNode' || term?.termType === 'BlankNode') {
      return term
    }
  }

  return undefined
}

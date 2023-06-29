import type { NamedNode, Quad } from '@rdfjs/types'
import $rdf from '../environment.js'

export function tripleToQuad(graph: NamedNode) {
  return ({ subject, predicate, object }: Quad): Quad => {
    return $rdf.quad(subject, predicate, object, graph)
  }
}

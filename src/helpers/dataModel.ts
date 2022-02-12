import type { NamedNode, Quad } from '@rdfjs/types'
import { quad } from '@rdf-esm/data-model'

export function tripleToQuad(graph: NamedNode) {
    return ({ subject, predicate, object }: Quad): Quad => {
        return quad(subject, predicate, object, graph)
    }
}

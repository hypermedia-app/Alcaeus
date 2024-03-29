import type { Quad, DatasetCore } from '@rdfjs/types'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'
import { HydraEnvironment } from 'alcaeus-core'

const propertyRangeMappings = [
  [hydra.supportedClass, hydra.Class],
  [hydra.expects, hydra.Class],
  [hydra.returns, hydra.Class],
  [hydra.supportedOperation, hydra.Operation],
  [hydra.operation, hydra.Operation],
  [hydra.supportedProperty, hydra.SupportedProperty],
  [hydra.statusCode, hydra.Status],
  [hydra.property, rdf.Property],
  [hydra.mapping, hydra.IriTemplateMapping],
]

export function * inferTypesFromPropertyRanges(dataset: DatasetCore, env: HydraEnvironment<DatasetCore>): Iterable<Quad> {
  const node = env.clownface({ dataset })

  for (const mapping of propertyRangeMappings) {
    const [property, type] = mapping
    const subjects = node.out(property)

    for (const subject of subjects.terms) {
      yield env.quad(<any>subject, rdf.type, type)
    }
  }
}

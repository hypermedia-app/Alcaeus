import type { BaseQuad, DatasetCore } from 'rdf-js'
import cf from 'clownface'
import * as RDF from '@rdf-esm/data-model'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'

const propertyRangeMappings = [
    [hydra.supportedClass, hydra.Class],
    [hydra.expects, hydra.Class],
    [hydra.returns, hydra.Class],
    [hydra.supportedOperation, hydra.Operation],
    [hydra.operation, hydra.Operation],
    [hydra.supportedProperty, hydra.SupportedProperty],
    [hydra.statusCodes, hydra.StatusCodeDescription],
    [hydra.property, rdf.Property],
    [hydra.mapping, hydra.IriTemplateMapping],
]

export function * inferTypesFromPropertyRanges(dataset: DatasetCore): Iterable<BaseQuad> {
    const node = cf({ dataset })

    for (const mapping of propertyRangeMappings) {
        const [property, type] = mapping
        const subjects = node.out(property)

        for (const subject of subjects.terms) {
            yield RDF.quad<BaseQuad>(subject, rdf.type, type)
        }
    }
}

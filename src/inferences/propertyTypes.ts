import cf from 'clownface'
import { DatasetCore } from 'rdf-js'
import { hydra, rdf } from '@tpluscode/rdf-ns-builders'

const propertyRangeMappings = [
    [hydra.supportedClass, hydra.Class],
    [hydra.expects, hydra.Class],
    [hydra.returns, hydra.Class],
    [hydra.supportedOperation, hydra.SupportedOperation],
    [hydra.operation, hydra.Operation],
    [hydra.supportedProperty, hydra.SupportedProperty],
    [hydra.statusCodes, hydra.StatusCodeDescription],
    [hydra.property, rdf.Property],
    [hydra.mapping, hydra.IriTemplateMapping],
]

export function inferTypesFromPropertyRanges(dataset: DatasetCore) {
    const node = cf({ dataset })

    propertyRangeMappings.map(([ property, type ]) => {
        node.out(property).addOut(rdf.type, type)
    })
}
